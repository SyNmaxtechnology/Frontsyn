import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';


export interface Existencia {
  descripcion: string;
}
@Injectable({
  providedIn: 'root'
})
export class ExistenciaService {

  constructor(
      private http: HttpClient,
      private usuarioService: UsuarioService
  ) {
    
    }

  token = this.usuarioService.obtenerToken();

  obtenerExistencia(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    })
    return this.http.post<string>( baseURL() + '/obtener-existencia',obj,{headers, responseType: 'text' as 'json'});
  }

  obtenerBodegas(){

    return this.usuarioService.obtenerBodegas();
  }
}
