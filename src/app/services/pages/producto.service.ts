import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';


export const URL_SERVER = baseURL();
@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  token = this.usuarioService.obtenerToken();

  UnidadesMedidaServicios() {
    //return  ['Al', 'Alc', 'Cm', 'I', 'Os', 'Sp', 'Spe', 'St', 'd', 'h', 's'];
    //return  ['Al','Alc','Cm','I','Os','Sp','Spe','St','m','kg','s','A','K','mol','cd','m²','m³'];
    return ['Al', 'Alc', 'Cm', 'I', 'Os', 'Sp', 'Spe', 'St', 'd', 'h', 's'];
  }

  obtenerCategorias() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/categorias', { headers });
  }
  obtenerDescuentos() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/descuentos', { headers });
  }
  obtenerImpuestos() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/impuestos', { headers });
  }

  obtenerUnidadesMedida() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/unidades', { headers });
  }

  nuevoProducto(producto: object) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });
    return this.http.post(baseURL() + '/producto', producto, {headers});
  }

  actualizarProducto(obj: FormData) {
    console.log("idproducto",obj.get("id"));
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.put(baseURL() + '/producto/' + obj.getAll('id'), obj, {headers});
  }

  obtenerProducto(query: string,type: string) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/producto/?query=' + query + '&type=' + type, {headers});
  }

  obtenerProductoPorId(id: Number) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.post(baseURL() + '/producto/'+id,{}, {headers});
  }

  actualizarEstado(obj: object) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.post(baseURL() + '/producto-estado/',obj, {headers});
  }

  obtenerProductos(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/productos/listar/', {headers});
  }
  
}
