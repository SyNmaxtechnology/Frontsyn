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

  buscarFacturaPorFechaOtipo(obj: any){
    const { tipoFactura, fechaInicio, fechaFin} = obj;
    // tslint:disable-next-line: max-line-length
    const url = baseURL() + '/facturas/fechaOtipo/?' + 'tipoFactura=' + tipoFactura + '&fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin;

    return this.http.get(url);
  }

  reporteFactura(id: number) {
    console.log("Id factura desde el servicio", id);
    return this.http.get(baseURL() + '/reportes/facturas/?idfactura=' + id);
  }
}
