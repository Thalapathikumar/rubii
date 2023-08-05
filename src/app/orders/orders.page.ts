import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WoocommerceService } from '../services/woocommerce.service';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  spinner =false;

  customLabels = {
    delivery_date: 'Delivery Date',
    delivery_time: 'Delivery Time',
    pickup_date: 'Pickup Date',
    pickup_time: 'Pickup Time',
  };

  constructor(
    private router: Router,
    private getOrders : WoocommerceService,) {
   }

  display_name:any;
  allOrders:any = [];
  userOrders:any = [];
  newDate: any;

  ngOnInit() {

    this.spinner=true;
    this.display_name = localStorage.getItem ('display_name')

    

    this.getOrders.getOrders().subscribe(res=> {
      this.allOrders = res
      this.spinner=false
      this.userOrders =  this.allOrders.filter(item=>{
        if(item.billing.first_name === this.display_name){
          return item
        }
      });
      console.log(this.userOrders)

      this.newDate = this.userOrders

    })
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const formattedTime = `${parseInt(hours)}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
    return formattedTime;
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
