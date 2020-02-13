import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  UnidadesMedidaServicios() {
    return  ['Al', 'Alc', 'Cm', 'I', 'Os', 'Sp', 'Spe', 'St', 'd', 'h', 's'];
  }

  obtenerCategorias() {
    return this.http.get(baseURL() + '/categorias');
  }
  obtenerDescuentos() {
    return this.http.get(baseURL() + '/descuentos');
  }
  obtenerImpuestos() {
    return this.http.get(baseURL() + '/impuestos');
  }

  obtenerUnidadesMedida() {
    return this.http.get(baseURL() + '/unidades');
  }

  nuevoProducto(producto: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(baseURL() + '/producto', producto, {headers});
  }

  obtenerProducto(query: string) {
    return this.http.get(baseURL() + '/producto/' + query);
  }
}
