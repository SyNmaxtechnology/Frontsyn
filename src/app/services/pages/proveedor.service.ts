import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService
    ) { }

  token = this.usuarioService.obtenerToken();

  obtenerProveedores(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/proveedores/', { headers, responseType: 'text' as 'json' });
  }

  obtenerProveedorPorId(id){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/proveedor/'+id, { headers, responseType: 'text' as 'json' });
  }

  tipoCedula() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/tipoCedula', {headers, responseType: 'text' as 'json'});
  }

  actualizarEstado(obj){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/proveedor/actualizar/estado/', obj, {headers, responseType: 'text' as 'json'});
  }

  obtenerActividad(cedula){
    //
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/consultar-actividad/'+cedula, {headers, responseType: 'text' as 'json'});
  }

  buscarProveedor(query){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/buscar-proveedor/', {query}, {headers, responseType: 'text' as 'json'});
  }

  buscarProveedorCoincidencia(query){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.get<string>(baseURL() + '/proveedores/obtener/'+query, {headers, responseType: 'text' as 'json'});
  }

  // proveedores/obtener/:query

  actualizarProveedor(obj){

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.put<string>(baseURL() + '/proveedor/'+obj.id, obj, {headers, responseType: 'text' as 'json'});
  }
}
