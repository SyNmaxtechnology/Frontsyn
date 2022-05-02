import  Swal  from 'sweetalert2';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ListaEmisoresService {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) { }
  
  token = this.usuarioService.obtenerToken();

  cerrarSesion () {
    localStorage.setItem('token', '');
    localStorage.setItem('permiso', '');
    localStorage.setItem('imagenUsuario', '');
    localStorage.setItem('imagenUsuario', '');
    localStorage.setItem('usuario', '');
    this.router.navigate(['/login']);
  }

  obtenerEmisores(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() +'/lista-emisores',{headers,responseType: 'text' as 'json'});
  }

  obtenerLoginSuperUsuario(obj){
    console.log(obj);
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.post<string>(baseURL() +'/superusuario/autenticar/',obj,{headers,responseType: 'text' as 'json'})
      .pipe(
        map((response) => {
          const datosLogin = JSON.parse(response);

          const { permiso, message, token, usuario, nombrecomercial,imagen} = datosLogin;
          if(message === 'Autenticado'){
            console.log("Entró");
            console.log(datosLogin);
            localStorage.setItem("role", permiso);
            localStorage.setItem("token", token);
            localStorage.setItem("usuario",usuario);
            localStorage.setItem("nombrecomercial", nombrecomercial);
            localStorage.setItem("imagen", imagen);
            return true;
          } else {
            Swal.fire('Ingresar','Ha ocurrido un error en el servidor', 'error');
            return false;
          }
        })
      );
  }


  actualizarEstado(obj){
    //emisor/actualizar-estado
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.post<string>(baseURL() +'/emisor/actualizar-estado',obj,{headers,responseType: 'text' as 'json'});
  }

  obtenerPermisos(){
    
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/usuarios/obtener-permisos/', {headers,responseType: 'text' as 'json'});
  }
}
