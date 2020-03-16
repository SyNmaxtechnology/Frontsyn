import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario.model';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  nuevoUsuario(obj: Usuario) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(baseURL() + '/usuario', obj, {headers});
  }

  obtenerPermisos(){
    return this.http.get(baseURL() + '/permisos');
  }
}
