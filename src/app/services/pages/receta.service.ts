import { Receta } from './../../pages/receta/receta.component';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,

  ) { }

  private token = this.usuarioService.obtenerToken();


  obtenerProductos(obj){
    
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.post<string>( baseURL() + '/receta/obtener-receta/',obj,{headers, responseType: 'text' as 'json'})
  }


  obtenerArticulos(obj){
    // /articulos/listar/articulos-receta
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.post<string>( baseURL() + '/articulos/listar/articulos-receta',obj,{headers, responseType: 'text' as 'json'});
  }

  guardarReceta(obj: Receta[]){
    // /receta

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    })

    return this.http.post<string>( baseURL() + '/receta',obj,{headers, responseType: 'text' as 'json'});
  }

  actualizarReceta(obj: Receta[]){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    })

    return this.http.put<string>( baseURL() + '/receta/actualizar-receta/articulos',obj,{headers, responseType: 'text' as 'json'});
  }
}
