import { UsuarioService } from './usuario.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

export interface movimientoBanco {
  monto: number;
  idcuenta: number | string;
  tipomovimiento: string;
  descripcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})

export class MovimientosBancoService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) { }

  private token = this.usuarioService.obtenerToken();

  agregarMovimiento(obj: movimientoBanco){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    })

    return this.http.post<string>( baseURL() + '/agregar-movimiento',obj,{headers, responseType: 'text' as 'json'});
  }

  cargarTiposMovimiento(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.get<string>( baseURL() + '/tipo-transaccion',{headers, responseType: 'text' as 'json'});
  }

  cargarCuentas(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })
    return this.http.get<string>( baseURL() + '/cuentas-movimientos',{headers, responseType: 'text' as 'json'});
  }
  
}



