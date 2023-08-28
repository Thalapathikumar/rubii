import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profiledata:any;
  profiledataArray: any =[];
  userId:any;
  fullName:any;
  userName:any;
  add1:any;
  add2:any;
  city:any;
  postcode:any;
  country:any;
  state:any;
  phone:any;
  email:any;
  spinner =false;


  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.spinner=true;
    this.userId = localStorage.getItem('user_id')
    console.log(this.userId)

    this.http.get<any>('https://rubiiecotec.com/laundry/wp-json/wc/v3/customers/' + this.userId  +'?consumer_key=ck_428c9eceb428be1f769c945c8700fb2095fc584c&consumer_secret=cs_309bd918c7abe106ad4f26858954e40558e09535').subscribe(data => {
    this.spinner =false;  
    
    this.profiledata = data.billing;

      this.fullName = this.profiledata.first_name + " " + this.profiledata.last_name;
      this.userName=data.username
      this.email = this.profiledata.email
      this.phone = this.profiledata.phone
      this.add1 = this.profiledata.address_1
      this.add2 = this.profiledata.address_2
      this.state = this.profiledata.state
      this.postcode = this.profiledata.postcode
      this.state = this.profiledata.state
      this.city = this.profiledata.city

      this.profiledataArray.push (this.profiledata)
      console.log('array',this.profiledataArray)

      console.log(this.profiledata.phone)
      localStorage.setItem ('user_info', this.profiledataArray)
  })  
    
  }

  home(){
    this.router.navigate(['/home'])
  }

}
