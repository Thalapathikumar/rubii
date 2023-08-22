import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loggedInObservable: Observable<any> = this.authenticationService.isLoggedIn();

  username: any;
  latValue: any;
  userId:any;
  profiledata:any;
  profiledataArray:any =[];
  longValue:any;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:true,
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  }

  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private http : HttpClient,
    private geolocation: Geolocation,
    private route: ActivatedRoute,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    
    this.getCurrentCoordinates();
    this.getprofile();

    this.username = localStorage.getItem ('display_name');

    this.userId = localStorage.getItem('user_id')
    console.log(this.userId)

       


    this.authenticationService.loggedUserObservable()
    .subscribe(user => {
      this.loggedInObservable = user == null ? of(false): of(true);
    });

    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
    })
  }

  getprofile (){

   

    return this.http.get('');
    
  }

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log("latitude", this.latitude)
      console.log("longitude", this.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     this.latValue = localStorage.setItem ('latitude', this.latitude),
     this.longValue = localStorage.setItem ('longitude', this.longitude)
   
  }

  profile () {
    this.router.navigate(['/profile']);
  }
  editCheckout(){
    this.router.navigate(['/checkout']);
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }
  test(){
    this.router.navigate(['/test']);
  }
  about(){
    this.router.navigate(['/about-us']);
  }
  orders() {
    this.router.navigate(['/orders']);
  }
  wallet() {
    this.router.navigate(['/wallet']);
  }
  logout(){
    this.authenticationService.logOut()
    .then(
      res => this.router.navigate(['/login']),
      err => console.log('Error logging out')
    )
  }

}
