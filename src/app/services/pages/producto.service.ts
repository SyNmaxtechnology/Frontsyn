import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

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

  nuevoProducto() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
}
