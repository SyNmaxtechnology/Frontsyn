import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService {

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

  buscarFacturaPorFechaOtipo(obj: any){
    const { tipoFactura, fechaInicio, fechaFin} = obj;
    // tslint:disable-next-line: max-line-length
    const url = baseURL() + '/facturas/fechaOtipo/?' + 'tipoFactura=' + tipoFactura + '&fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin;

    return this.http.get(url);
  }

  reporteFactura(id: number) {
    return this.http.get(baseURL() + '/reportes/facturas/?idfactura=' + id);
  }

  reportesYCorreos(obj: any) {
    const url = baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo;
    const a = document.createElement('a');
    a.href = url;
    a.click();
    a.remove();
    // return this.http.get(baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo);
  }
}
