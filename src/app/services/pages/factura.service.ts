import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }


  tipoDocumento(){
    return [{

      descripcion: 'Factura Electrónica',
      codigo: '01'
      },
      {
      descripcion: 'Nota de débito electrónica',
      codigo: '02'
      },
      {
      descripcion: 'Nota de crédito electrónica',
      codigo: '03'
      },
      {
      descripcion: 'Tiquete electrónico',
      codigo: '04'
      },
      {
      descripcion: 'Confirmación de aceptación del comprobante electrónico',
      codigo: '05'
      },
      {
      descripcion: 'Confirmación de aceptación parcial del comprobante electrónico',
      codigo: '06'
      },
      {
      descripcion: 'Confirmación de rechazo del comprobante electrónico',
      codigo: '07'
    }];
  }

  condicionVenta() {
    return [{

      condicion: 'Contado',
      id: '01'
     },
     {
      condicion: 'Crédito',
      id: '02'
    }];
  }

  medioPago(){
    return [{
      id: '01',
      medio: 'Efectivo'
    },
    {
      id: '02',
      medio: 'Tarjeta'
    },
    {
      id: '03',
      medio: 'Cheque'
    },
    {
      id: '04',
      medio: 'Depósito bancario'
    },
    {
      id: '05',
      medio: 'Recaudado por terceros'
    },
    {
      id: '99',
      medio: 'Otros'
    }];
  }

  obtenerTipoCambio(){
    return this.http.get(baseURL() + '/tipoCambio');
  }

  obtenerMonedas(){
    return this.http.get(baseURL() + '/monedas');
  }
}


