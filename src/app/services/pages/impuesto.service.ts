import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  constructor(private http: HttpClient) { }

  nuevoImpuesto(obj: object){
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/tipoImpuesto', obj, {headers} );
  }

  buscarImpuesto(query: string){
    return this.http.get(baseURL() + '/tipoImpuesto/' + query);
  }
  actualizarImpuesto(obj: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(baseURL() + '/tipoImpuesto/' + obj.id, obj, { headers });
  }


}
