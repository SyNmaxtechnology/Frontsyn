import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  tipoDocumento() {
    return this.http.get(baseURL() + '/tipoDocumento');
  }

  condicionVenta() {
    return this.http.get(baseURL() + '/condicionVenta');
  }

  medioPago() {
    return this.http.get(baseURL() + '/medioPago');
  }

  obtenerTipoCambio() {
    return this.http.get(baseURL() + '/tipoCambio');
  }

  obtenerMonedas() {
    return this.http.get(baseURL() + '/monedas');
  }

  nuevoComprobante(obj: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(baseURL() + '/factura', obj, {headers});
  }
}


