import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../../modelos/login.model';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {baseURL} from '../../config/config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private role: any;
  private usuario: any;
  private imagen: any;
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { 
    this.obtenerImagen();
  }


  autenticarUsuario(obj: object) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/login', obj, {headers}).pipe(
      map((data: Login) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('permiso',data.permiso);
        this.role = localStorage.getItem('permiso');
        this.usuario = data.usuario;
        this.imagen = data.imagen;
        return data.message;
      }),
      catchError(err => throwError(err))
    );
  }

  obtenerRole() {
    return this.role;
  }
  obtenerUsuario(){
    return this.usuario;
  }
  obtenerImagen(){
    return this.imagen;
  }
  estaAutenticado() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}


