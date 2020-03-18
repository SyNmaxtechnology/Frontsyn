import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario.model';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient) { }

  token = this.obtenerToken();

  nuevoUsuario(obj: object) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.post(baseURL() + '/usuario', obj, { headers });
  }

  obtenerPermisos(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/permisos', { headers });
  }

  obtenerUsuario(usuario: string): Observable<Usuario> {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/usuario/' + usuario, { headers }).pipe(
      map(data => new Usuario().deserialize(data)),
      catchError(err => throwError(err))
    );
  }
  obtenerToken(){
    return localStorage.getItem('token');
  }
}
