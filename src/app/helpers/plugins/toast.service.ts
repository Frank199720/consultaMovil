import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async showToast(message:string,duration:number) {
    const toast = await this.toastController.create({
      message,
      duration,
      
    });
    toast.present();
  }
  async confirmMessage(message:string,duration:number){
    const toast = await this.toastController.create({
      message,
      duration
    });
    setTimeout(() => {
      
      toast.present();
    }, 1000);
  }
}
