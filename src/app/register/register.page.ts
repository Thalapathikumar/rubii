import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WoocommerceService } from '../services/woocommerce.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  spinner=false;
  showAddress =false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService,
    public toastController: ToastController,
    private customer: WoocommerceService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

addAddress(){
 this.showAddress = true;
}

  register(){
    this.router.navigate(['/register']);
  }

  onSubmit(form: FormGroup) {

    const payload = {
        "email" : form.value.email,
        "first_name" : form.value.firstname,
        "last_name" : form.value.lastname,
        "password" : form.value.password,
        "username" : form.value.username,
        "billing": {
          "first_name": form.value.firstname,
          "last_name": form.value.lastname,
          "company": "",
          "address_1": form.value.addressLine1,
          "address_2": form.value.addressLine2,
          "city": form.value.city,
          "state": "Tamil Nadu",
          "postcode": form.value.pincode,
          "country": "India",
          "email": form.value.email,
          "phone": form.value.phone
        },
        "shipping": {
          "first_name": form.value.firstname,
          "last_name": form.value.lastname,
          "company": "",
          "address_1": form.value.addressLine1,
          "address_2": form.value.addressLine2,
          "city": form.value.city,
          "state": "Tamil Nadu",
          "postcode": form.value.pincode,
          "country": "India",
        }
      }

    this.spinner =true

    this.customer.createCustomer(payload).subscribe(res=> {
      if (res){

        console.log(res)
      this.spinner =false;
      this.toast.presentToast({ message: "Registration Success", color: 'success' });
      this.router.navigate(['/login'])
      }
      else {
        this.toast.presentToast({ message: "Registration failed", color: 'danger' });
      }
      
      });
    
  }
}
