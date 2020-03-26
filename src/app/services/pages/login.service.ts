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

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }


  autenticarUsuario(obj: object) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/login', obj, {headers}).pipe(
      map((data: Login) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.permiso);
        localStorage.setItem('imagenUsuario', data.imagen);
        localStorage.setItem('usuario', data.usuario);
        this.role = localStorage.getItem('permiso');
        return data.message;
      }),
      catchError(err => throwError(err))
    );
  }

  obtenerRole() {
    return this.role;
  }
  estaAutenticado(token) {
    return !this.jwtHelper.isTokenExpired(token);
  }

  existeToken(){
    const token = localStorage.getItem('token');

    if(token != null){
      return token;
    } else {
      return false;
    }
  }
}


