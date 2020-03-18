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

  nuevoUsuario(obj: object) {
    console.log(obj);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/usuario', obj, { });
  }

  obtenerPermisos(){
    return this.http.get(baseURL() + '/permisos');
  }

  obtenerUsuario(usuario: string): Observable<Usuario> {
    return this.http.get(baseURL() + '/usuario/' + usuario).pipe(
      map(data => new Usuario().deserialize(data)),
      catchError(err => throwError(err))
    );
  }
}
