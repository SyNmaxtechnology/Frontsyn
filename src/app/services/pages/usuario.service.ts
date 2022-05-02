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

  private token = this.obtenerToken();

  nuevoUsuario(obj: object) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.post(baseURL() + '/usuario', obj, { headers });
  }

  obtenerPermisos(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/permisos', { headers });
  }

  obtenerUsuario(usuario: string): Observable<Usuario> {
    console.log(usuario);
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/usuario/' + usuario, { headers }).pipe(
      map(data => new Usuario().deserialize(data)),
      catchError(err => throwError(err))
    );
  }

  actualizarUsuario(obj){

    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.put(baseURL() +'/usuario/'+ obj.id, obj,{headers});
  }

  obtenerToken(){
    return localStorage.getItem('token');
  }

  obtenerEmisores(){
   
   const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/emisores/listado-emisores/ ', { headers, responseType: 'text' as 'json' });
  } 

  obtenerBodegas(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/bodegas-listar/ ', { headers, responseType: 'text' as 'json' });
  }

  obtenerAccesos(): Promise<string>{
    
    return new Promise((resolve,reject) => {
      const headers = new HttpHeaders({
        'Authorization': 'bearer '+this.token
      });
  
      return this.http.get<string>( baseURL() +'/usuarios/obtener-permisos/', {headers,responseType: 'text' as 'json'})
        .subscribe(data => {
          if(JSON.parse(data).length === 0){
            return this.http.get<string>( baseURL() +'/accesos/', {headers,responseType: 'text' as 'json'})
              .subscribe(accesos => {
                resolve(accesos)
              },
              err => {
                reject(err.error.message);
              })
          } else {
            resolve(data)
          }
        },
        err => {
          reject(err.error.message);
        })
    })
  }

  obtenerAccesosNull () {
    
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });
    return this.http.get<string>( baseURL() +'/accesos/', {headers,responseType: 'text' as 'json'})
  }
  
}
