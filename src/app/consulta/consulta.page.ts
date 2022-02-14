import { Component, OnInit } from '@angular/core';
import { ToastService } from '../helpers/plugins/toast.service';
import { Persona } from './interfaces/persona.interface';
import { ConsultaService } from './services/consulta.service';
import { LoadingService } from '../helpers/plugins/loading.service';
import { Screenshot } from '@ionic-native/screenshot/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  public doi: string = '';

  public viewResult: boolean = false;

  public person: Persona = {
    nombre_completo: '',
    codigo_verificacion: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
  };

  constructor(
    private _toastService: ToastService,
    private _consultaService: ConsultaService,
    private _loadingService: LoadingService,
    private _screenshot: Screenshot,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {}

  consulta() {
    console.log('doi', this.doi);
    if (this.doi.length == 0) {
      this._toastService.confirmMessage('Ingrese un DNI o RUC', 2000);
    } else {
      this.viewResult = false;
      this._loadingService.presentLoading('Consultando...');
      this._consultaService.getApiCliente(this.doi).subscribe(
        (resp: any) => {
          this._loadingService.dismissLoader();
          if (resp.success) {
            this.person = resp.data;
            this.viewResult = true;
          } else {
            this._toastService.confirmMessage(resp.message, 2000);
          }
        },
        (err) => {
          this._loadingService.dismissLoader();
          this._toastService.confirmMessage('Error de servidor', 2000);
        }
      );
    }
  }
  screenshot() {
    this._screenshot
      .URI( 80)
      .then(async (val) => {
        const { URI } = val;
        console.log('filepath', URI);
        this.socialSharing.share(`Consulta DNI ${this.doi}: `, `${this.doi}.png`,URI)
                            .then(val =>{
                              console.log('valor al compartir',val)
                            })
                            .catch(err=>{
                              console.log('error al compartir: ',JSON.stringify(err))
                            })
        
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  refresh() {
    this.doi = '';
    this.viewResult = false;
  }
}
