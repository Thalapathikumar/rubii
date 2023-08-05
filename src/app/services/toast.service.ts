import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
  ) {

  }

  async presentToast(data: {message: string, color: string}) {
    const toast = await this.toastController.create({
      message: data.message,
      duration: data.color === 'danger' ? 5000 : 2000,
      keyboardClose: true,
      cssClass: 'toaster d-ltr',
      color: data.color,
      position: 'bottom'
    });
    return toast.present();
  }
}
