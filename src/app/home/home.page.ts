import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loggedInObservable: Observable<any> = this.authenticationService.isLoggedIn();

  username: any;

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:true,
  }

  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.username = localStorage.getItem ('display_name')

    this.authenticationService.loggedUserObservable()
    .subscribe(user => {
      this.loggedInObservable = user == null ? of(false): of(true);
    });

    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
    })
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
