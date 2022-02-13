import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private _httpClient:HttpClient) { }

  getApiCliente(doi:string){
    
    console.log('doi',doi);

    if(doi.toString().length==8){

      
      return this._httpClient.get(`https://apiperu.dev/api/dni/${doi}`);

    }else{
      
      return this._httpClient.get(`https://apiperu.dev/api/ruc/${doi}`);
    }
  }
}
