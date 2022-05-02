import { UsuarioService } from './usuario.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Injectable } from '@angular/core';

export interface Cuenta {
  numctabanco: string;
  decripcion: string;
  saldoant: number | string;
  saldoact: number | string;
  id? : number;//es una propiedad que puede ir o no
}

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private token = this.usuarioService.obtenerToken();

  agregarCuenta(obj: Cuenta){
    console.log("token",this.token);
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() + '/cuenta',obj,{headers,responseType: 'text' as 'json'});
  };

  actualizarCuenta(obj: Cuenta){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.put<string>( baseURL() + '/actualizar-cuenta',obj,{headers,responseType: 'text' as 'json'});
  };

  buscarCuenta(id: number){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() + '/cuenta/'+id,{headers, responseType: 'text' as 'json'})
  }

  actualizarEstadoCuenta(id: number,estado: boolean){
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });

    const obj = {
      id,
      estado
    };

    return this.http.put<string>( baseURL() + '/estado-cuenta',obj,{headers,responseType: 'text' as 'json'})
  }  

  listarCuentas(){
    console.log(this.token);
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token
    });

    return this.http.get<string>( baseURL() + '/listar-cuentas',{headers, responseType: 'text' as 'json'})
  }
}
