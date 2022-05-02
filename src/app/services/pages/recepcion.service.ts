import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
  ) { }
  
  token= this.usuarioService.obtenerToken();

  estadoAceptacion(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get( baseURL() + '/estadoAceptacion',{headers});
  }

  condicionImpuesto(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get( baseURL() + '/condicionImpuesto',{headers});
  }

  recepcionComprobante(obj: object) {
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + this.token
    });

    return this.http.post(baseURL() +'/recepcion', obj, {headers});
  }
}


