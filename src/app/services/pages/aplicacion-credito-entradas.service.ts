import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AplicacionCreditoEntradasService {

  constructor(
    private usuarioService:UsuarioService,
    private http: HttpClient
  ) {}

  private token = this.usuarioService.obtenerToken();

  obtenerProveedores(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });
    return this.http.get<string>(baseURL()+'/proveedores-credito',{headers,responseType:'text' as 'json'});
  }

  obtenerFacturasPorProveedor(idproveedor:number){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.get<string>(baseURL()+'/recibos-no-cancelados/'+idproveedor,{headers,responseType:'text' as 'json'});
  }

  actualizarTotalesFacturasCredito(obj: any) {
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(baseURL()+'/ajuste-entrada-credito',obj,{headers,responseType:'text' as 'json'});
  }
}
