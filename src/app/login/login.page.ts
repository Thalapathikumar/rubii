import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
// import { AuthenticationService } from '../services/authentication.service';
// import { WoocommerceService } from '../services/woocommerce.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  spinner= false;



  
  constructor(
    private router: Router,
    private http: HttpClient,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    private loader: LoaderService,
    private toast: ToastService
    // public loginService: WoocommerceService

  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  
  register(){
    this.router.navigate (['/register'])
  }


  onSubmit(form: FormGroup) {
    console.log('Name', form.value.username);
    console.log('password', form.value.password);
    var formData: any = new FormData();
    formData.append('username', form.value.username);
    formData.append('password', form.value.password);

    this.spinner = true
    
    
    this.http.post('https://digitaldreamers.in/laundry/wp-json/cocart/v2/login', formData).subscribe(
      (response:any) => {
        console.log(response);
        this.spinner =false;
        if (response.display_name  !== null) {

          console.log ("display name", response.display_name)
        console.log ("user id", response.user_id)
        localStorage.setItem('display_name', response.display_name)
        localStorage.setItem('user_id', response.user_id)
        this.toast.presentToast({ message: "Loggedin successfully", color: 'success' });
        this.router.navigate(['/home'])

        } 

        else {
          console.log ('Invalid Credentials')
          this.toast.presentToast({ message: "Invalid Credentials", color: 'danger' });
        }

        
      },
      
      (error) => {
        console.log(error.message);
        
      }
  )}

    
   
  }


