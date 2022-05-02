import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,

  ) { }

  token = this.usuarioService.obtenerToken();
  obtenerArticulos(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL()+ '/listar-articulos/',{headers, responseType: 'text' as 'json'});
  }

  actualizarEstado(obj){

    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<string>(baseURL()+ '/articulo/actualizar/estado/',obj,{headers, responseType: 'text' as 'json'});
    //
  }

  buscarArticulo(query){
    //

    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<string>(baseURL()+ '/buscar-articulo/',{query},{headers, responseType: 'text' as 'json'});
  }

  nuevoArticulo(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<string>(baseURL()+ '/articulo',obj,{headers, responseType: 'text' as 'json'});
  }

  actualizarArticulo(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    }); // /articulo/:id
    return this.http.put<string>(baseURL()+ '/articulo/'+obj.id,obj,{headers, responseType: 'text' as 'json'});
  }

  buscarArticuloPorId(id){

    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL()+ '/articulo/?idarticulo='+id,{headers, responseType: 'text' as 'json'});
  }
}
