import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  constructor(private http: HttpClient) { }

  guardarDescuento( descuento: object) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/descuento', descuento , { headers});
  }
}
