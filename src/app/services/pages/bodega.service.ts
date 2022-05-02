import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

export interface Bodega {
  descripcion: string;
  Principal : number;
}

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { 

  }

  token = this.usuarioService.obtenerToken();

  nuevaBodega(obj: Bodega){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });
    return this.http.post<string>( baseURL() + '/bodega', obj, {headers, responseType:'text' as 'json'});
  }


}
