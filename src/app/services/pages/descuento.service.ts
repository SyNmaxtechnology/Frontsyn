import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  constructor(private http: HttpClient) { }

  guardarDescuento( descuento: object) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/descuento', descuento , { headers});
  }

  buscarDescuento( query: string){
    return this.http.get(baseURL() + '/descuento/' + query);
  }

  actualizarDescuento(obj: any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(baseURL() +'/descuento/' +obj.id,obj,{headers});
  }

  obtenerDescuentos() {
    return this.http.get(baseURL() + '/descuentos');
  }
}
