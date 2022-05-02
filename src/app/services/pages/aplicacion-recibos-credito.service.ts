import { FacturaService } from './factura.service';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AplicacionRecibosCreditoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private facturaService: FacturaService

  ) { }

  private token = this.usuarioService.obtenerToken();

  obtenerFacturas(idcliente: number){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>(baseURL() + '/cliente/facturas-credito/listar/'+idcliente, {headers,responseType: 'text' as 'json'});
  }

  pagarFacturasCredito(obj){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });
    return this.http.put<string>(baseURL() + '/cliente/facturas-credito/pagar/',obj, {headers,responseType: 'text' as 'json'});
  }

  obtenerTipoCambio(){
    // facturaService

    return this.facturaService.obtenerTipoCambio();
  }

  obtenerMedioPago() {
    return this.facturaService.medioPago();
  }

  obtenerMonedas(){
    return this.facturaService.obtenerMonedas();
  }

  obtenerClientes(){
    // cliente/facturas-credito/obtener-clientes/

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });
    return this.http.get<string>(baseURL() + '/cliente/facturas-credito/obtener-clientes/', {headers,responseType: 'text' as 'json'});
  }
}
