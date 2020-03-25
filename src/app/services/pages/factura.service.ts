import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }
    
  token = this.usuarioService.obtenerToken();

  tipoDocumento() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/tipoDocumento', {headers});
  }

  condicionVenta() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/condicionVenta', {headers});
  }

  medioPago() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/medioPago', {headers});
  }

  obtenerTipoCambio() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/tipoCambio', {headers});
  }

  obtenerMonedas() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/monedas', {headers});
  }

  nuevoComprobante(obj: any) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post(baseURL() + '/factura', obj, {headers});
  }

  guardarFactura(obj: any){
   
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post(baseURL() + '/guardar-factura',obj,{headers});
  }
}


