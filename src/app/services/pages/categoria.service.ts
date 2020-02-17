import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  guardarCategoria( categoria: object) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/categoria', categoria , { headers});
  }
  actualizarCategoria(obj: any) {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(baseURL() + '/categoria/' +obj.id,obj,{headers});
  }

  obtenerCategoria(query: string) {
   return this.http.get(baseURL() +'/categoria/' + query);
  }
}
