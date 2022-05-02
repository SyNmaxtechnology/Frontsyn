import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient, private usuarioService : UsuarioService) { }

  token = this.usuarioService.obtenerToken();
  
  guardarCategoria( categoria: object) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post(baseURL() + '/categoria', categoria , { headers});
  }
  actualizarCategoria(obj: any) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.put(baseURL() + '/categoria/' +obj.id,obj,{headers});
  }

  obtenerCategoria(query: string) {
   const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
   return this.http.get(baseURL() +'/categoria/' + query,{headers});
  }


  obtenerCategorias() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() +'/categorias ',{headers, responseType: 'text' as 'json'});
   }
  // /obtener-categoria

  obtenerCategoriaPorId(id){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/obtener-categoria', {idcategoria: id} , { headers, responseType: 'text' as 'json'});
  }

  actualizarEstado(obj: any) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      'Authorization': 'bearer ' + this.token
    });
    return this.http.put<string>(baseURL() + '/actualizar/estado/',obj,{headers});
  }
  
  buscarCodigoCabysPorDescripcion(descripcion: string){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })
    return this.http.get<string>(baseURL() +'/codigosCabys-servicio-web-hacienda/'+descripcion, {headers, responseType: 'text' as 'json'});
  }
}
