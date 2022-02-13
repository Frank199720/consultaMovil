import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public _loadingController:LoadingController) { }
  async presentLoading(message:string) {
    
    this._loadingController.create({
      message
    }).then((response) => {
      response.present();
    });
  }
  async checkAndCloseLoader() {
    // Use getTop function to find the loader and dismiss only if loader is present.
    const loader = await this._loadingController.getTop();
    // if loader present then dismiss
     if(loader !== undefined) { 
       await this._loadingController.dismiss();
     }
   }
  dismissLoader() {
    this.checkAndCloseLoader();
	
    // sometimes there's delay in finding the loader. so check if the loader is closed after one second. if not closed proceed to close again
    setTimeout(() => this.checkAndCloseLoader(), 1000);
    
  }
}
