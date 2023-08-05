import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: HTMLIonLoadingElement | undefined;
  loaderPresent = false;
  onGoingAPI = 0;
  constructor(
    private loadingController: LoadingController
  ) { }
  /**
   * @desc method to show loader
   */
  async showLoader() {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: '<ion-img src="assets/images/loader.gif"></ion-img>',
      cssClass: 'custom-loading'
    });
    await this.loading.present();
  }
  /**
   * @desc method to hide a loader
   */
  async hideLoader() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
  async createLoader(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: null,
      message: '<ion-img src="assets/images/loader.gif"></ion-img>',
      cssClass: 'custom-loading'
    });
    return loading;
  }
  checkLoader(): boolean {
    if (this.onGoingAPI) {
      this.loaderPresent = true;
    } else {
      this.loaderPresent = false;
    }
    return  this.loaderPresent;
  }
}
