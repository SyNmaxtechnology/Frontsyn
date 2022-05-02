import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../../modelos/login.model';
import { throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {baseURL} from '../../config/config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private role: any;

  constructor(private http: HttpClient, 
      public jwtHelper: JwtHelperService,
      public usuarioService: UsuarioService) { }

    private token :string = '';
  autenticarUsuario(obj: object) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/login', obj, {headers}).pipe(
      map((data: Login) => {
        console.log(data);
        const  {permiso,message, token, usuario, imagen, nombrecomercial,sucursales} = data;
       
        if(permiso === 'superusuario'){

          localStorage.setItem('role', permiso);
          localStorage.setItem('imagenUsuario', imagen);
          localStorage.setItem('usuario', usuario);
          this.role = localStorage.getItem('permiso');
          localStorage.setItem('token', token);
          return 'SP';

        } else if(permiso === 'integrador') {

          localStorage.setItem('token', token);
          localStorage.setItem('role', permiso);
          localStorage.setItem('imagenUsuario', imagen); //comentario
          localStorage.setItem('usuario', usuario);
          localStorage.setItem("imagen", imagen);
          this.role = localStorage.getItem('permiso');

          if(sucursales  > 0) {
            return 'IS';
          } else {
            return 'I';  
          }
          
        } else {
          
          localStorage.setItem('token', token);
          localStorage.setItem('role', permiso);
          localStorage.setItem('imagenUsuario', imagen);
          localStorage.setItem('usuario', usuario);
          localStorage.setItem("nombrecomercial", nombrecomercial);
          localStorage.setItem("imagen", imagen);
         
          this.role = localStorage.getItem('permiso');

          if(sucursales  > 0) {
            return 'FS';
          } else {
            return 'F';  
          }
        }
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

  obtenerPermisos(){
    this.token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/usuarios/obtener-permisos/', {headers,responseType: 'text' as 'json'});
  }
}


