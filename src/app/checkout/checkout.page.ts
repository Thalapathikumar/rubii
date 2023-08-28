import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WoocommerceService } from '../services/woocommerce.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  orderForm: any = FormGroup
  spinner= false;
  profiledata:any;
  profiledataArray: any =[];
  display_name: any;
  gatewaysArray:any = [];
  paymentTitle: any;
  gatewaysArraynew: any =[];
  userId:any;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private orderService : WoocommerceService,
    private http: HttpClient,
    private toast: ToastService
  ) { 
    this.orderForm = new FormGroup({
      counter: new FormControl(5),
      pickup_date: new FormControl(''),
      pickup_time: new FormControl(''),
      delivery_date: new FormControl(''),
      delivery_time: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      payment: new FormControl ('')
    });
  }

  ngOnInit() {

    this.display_name = localStorage.getItem ('display_name')
    this.userId = localStorage.getItem('user_id')
    console.log(this.userId)

    this.http.get<any>('https://rubiiecotec.com/laundry/wp-json/wc/v3/customers/' + this.userId  +'?consumer_key=ck_428c9eceb428be1f769c945c8700fb2095fc584c&consumer_secret=cs_309bd918c7abe106ad4f26858954e40558e09535').subscribe(data => {
      this.profiledata = data.billing;

      this.profiledataArray.push (this.profiledata)
      console.log('array',this.profiledataArray)

      console.log(this.profiledata.phone)
      localStorage.setItem ('user_info', this.profiledataArray)
  })  

    

    this.orderService.getPayments().subscribe(res=> {
      this.gatewaysArray = res
      this.gatewaysArraynew =  this.gatewaysArray.filter(item=>{
        if(item.enabled == true){
          return item
        }
      });
      console.log(this.gatewaysArraynew)
    })
   
  }

  createOrder(form: FormGroup ){
   
    console.log (this.orderForm.value)

    if (form.value.payment == "cod"){
      this.paymentTitle = "Cash on Delivery"
    }
    else {
      this.paymentTitle = "Credit Card/Debit Card/NetBanking"
    }
console.log (this.paymentTitle)
    const payload = {
      
      "payment_method": form.value.payment,
      "payment_method_title": this.paymentTitle,
      "set_paid": true,
      "billing": {
        "first_name":  this.display_name,
        "last_name": "",
        "address_1": this.profiledata.address_1,
        "address_2": this.profiledata.address_2,
        "city": this.profiledata.city,
        "state": "TN",
        "postcode": this.profiledata.postcode,
        "country": "IN",
        "email": this.profiledata.email,
        "phone": this.profiledata.phone,
      },
      "meta_data": [
        {
          "key": "delivery_date",
          "value": form.value.delivery_date
        },
        {
          "key": "delivery_time",
          "value": form.value.delivery_time
        },
        {
          "key": "pickup_date",
          "value": form.value.pickup_date
        },
        {
          "key": "pickup_time",
          "value": form.value.pickup_time
        },
        {
          "key": "co_ordinates",
          "value": "1128839,8888"
        }
      ],
      "shipping": {
        "first_name": form.value.display_name,
        "last_name": "",
        "address_1": this.profiledata.address_1,
        "address_2": this.profiledata.address_2,
        "city": this.profiledata.city,
        "state": "TN",
        "postcode": this.profiledata.postcode,
        "country": "IN"
      },
      "line_items": [
        {
          "product_id": 11,
          "quantity": form.value.counter
        }
      ],
      "shipping_lines": [
        {
          "method_id": "flat_rate",
          "method_title": "Flat Rate",
          "total": "0.00"
        }
      ]

    }
    this.spinner= true
    this.orderService.newOrder(payload).subscribe({next:res=>{
      console.log(res);
      this.spinner= false
      this.toast.presentToast({ message: "Order placed", color: 'success' });
      this.router.navigate(['/thank-you'])
    },error:err=>{
      this.toast.presentToast({ message: "Order not created", color: 'danger' });
    }});
  }
  
  
  logout() {
    this.router.navigate(['/login']);
  }
  home(){
    this.router.navigate(['/home']);
  }
  orders(){
    this.router.navigate(['/orders']);
  }
  wallet() {
    this.router.navigate(['/wallet']);
  }


}
