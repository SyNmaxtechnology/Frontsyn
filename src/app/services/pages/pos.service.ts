import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL} from '../../config/config';

interface Productos {
  productos: Producto[]

}

export const URL_SERVICIOS = baseURL();

export interface Producto {
  idproducto: number; 
  descripcion: string;
  precio_producto: number;
}

export interface Descuento {
  id: number; 
  descripcion: string;
  porcentaje: number;
}

@Injectable({
  providedIn: 'root'
})
export class POSService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  token = this.usuarioService.obtenerToken();

  obtenerProductos(){
    const headers = new HttpHeaders().set('Authorization','bearer '+this.token);
    return this.http.get<string>(baseURL() + '/productos/listar/pos/', {headers, responseType: 'text' as 'json'});
  }

  obtenerCategorias(){
    const headers = new HttpHeaders().set('Authorization','bearer '+this.token);
    return this.http.get<string>(baseURL() + '/categorias/listar/pos', {headers, responseType: 'text' as 'json'});
  }


  obtenerDescuentos(){
    // obtener-descuentos/pos/

    const headers = new HttpHeaders().set('Authorization','bearer '+this.token);
    return this.http.get<string>(baseURL() + '/obtener-descuentos/pos/', {headers, responseType: 'text' as 'json'});
  }

  // /cliente/:query

  obtenerProductosPorCategoria(idcategoria: number){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/productos/listar/categoria/'+idcategoria, {headers, responseType: 'text' as 'json'});
  }


  obtenerReporte(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/pos', {headers,  responseType: 'text' as 'json'});
  }
}
