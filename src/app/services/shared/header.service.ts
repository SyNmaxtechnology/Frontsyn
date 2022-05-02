import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './../../services/pages/usuario.service';
import {baseURL} from '../../config/config';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private usuarioService: UsuarioService,
    private http: HttpClient
    ) { }

  token = this.usuarioService.obtenerToken();

  cerrarSesion() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/logout', {headers});
  }
}
