import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';

export interface Sucursales {

  idemisor: number;
  idusuario:number;
  emisor_nombre: string;
  emisor_nombrecomercial: string;
}

interface LoginSucursal {

  permiso: string;
  message: string; 
  token: string;
   usuario: string; 
   imagen?: string; 
   nombrecomercial: string;
   sucursales: number;
}
@Injectable({
  providedIn: 'root'
})
export class ListadoSucursalesService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router
  ) { }

  private token: string = this.usuarioService.obtenerToken();
  role: string = '';
  obtenerSucursales(){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.get<Sucursales[]>(baseURL()+'/emisor/sucursales/listar-sucursales/',{headers});
  }

  ingresarASucursal(idsucursal: number){
    // usuario/sucursal/autenticar/

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    })

    return this.http.post(baseURL()+'/usuario/sucursal/autenticar/',{idsucursal},{headers}).pipe(
      map((data: LoginSucursal) => {
        const  {permiso,message, token, usuario, imagen, nombrecomercial,sucursales} = data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', permiso);
        localStorage.setItem('imagenUsuario', !imagen?'':imagen);
        localStorage.setItem('usuario', usuario);
        localStorage.setItem("nombrecomercial", nombrecomercial);
        localStorage.setItem("imagen", imagen);
        localStorage.setItem("sucursal", !sucursales || sucursales.toString().length === 0 ? '0': sucursales.toString());
    
        this.role = localStorage.getItem('permiso');

        return message;
        
      }),
      catchError(err => throwError(err))
    );
  }

  cerrarsesion(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
