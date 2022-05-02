import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }


  token = this.usuarioService.obtenerToken();


  obtenerBodegas (){

    return this.usuarioService.obtenerBodegas();
  }

  obtenerArticulos(obj){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    })

    return this.http.post<string>( baseURL() + '/articulos/movimientos/obtener-articulos', obj, {headers, responseType: 'text' as 'json'});
  }

  nuevoMovimiento(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<string>( baseURL() + '/movimiento', obj, {headers, responseType: 'text' as 'json'});
  }
}
