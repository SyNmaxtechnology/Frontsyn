import { UsuarioService } from './usuario.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Injectable } from '@angular/core';

interface Recepciones {
  id: number,
  proveedor: string,
  tipo: string,
  total: number,
  fecha: string,
  clavenumerica: string,
  marcado: boolean,
  estadoDoc: string,
  condicionDoc: string
}

@Injectable({
  providedIn: 'root'
})
export class RecepcionesService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
  ) {}

  private token = this.usuarioService.obtenerToken();

  cargarFacturasProveedor() {

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>(  baseURL() +'/recepciones/no-procesadas',{headers, responseType: 'text' as 'json'});
  }


  procesarFacturas(facturas: Recepciones[]){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() +'/recepciones/procesar-recepciones',{facturas},{headers, responseType: 'text' as 'json'})
  }

  estadoAceptacion(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>( baseURL() + '/estadoAceptacion',{headers, responseType: 'text' as 'json'});
  }

  condicionImpuesto(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>( baseURL() + '/condicionImpuesto',{headers, responseType: 'text' as 'json'});
  }

  visualizarRecepcion(idfactura: number){
    // recepcion/visualizar-factura/:idfactura
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + this.token
    });

    return this.http.get<string>( baseURL() + '/recepcion/visualizar-factura/'+idfactura,{headers,responseType: 'text' as 'json'});
  }
}
