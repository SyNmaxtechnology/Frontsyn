import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  constructor(private http: HttpClient, private usuarioService : UsuarioService) { }
  
  token = this.usuarioService.obtenerToken();

  guardarDescuento( descuento: object) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post(baseURL() + '/descuento', descuento , { headers});
  }

  buscarDescuento( query: string){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/descuento/' + query, { headers});
  }

  actualizarDescuento(obj: any){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.put(baseURL() +'/descuento/' +obj.id,obj,{headers});
  }

  obtenerDescuentos() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/descuentos',{headers});
  }

  obtenerDescuentoPorId(id: number) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/obtener-descuento/', {id} , { headers, responseType: 'text' as 'json'});
  }

  actualizarEstado(obj){
    
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.put<string>(baseURL() + '/actualizar-estado/', obj , { headers, responseType: 'text' as 'json'});
  }
}
