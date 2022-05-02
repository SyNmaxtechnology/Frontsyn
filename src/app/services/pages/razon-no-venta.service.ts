import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

export interface Razon {
  razon: string,
  id? : number,
  auditoria?: string
}


@Injectable({
  providedIn: 'root'
})

export class RazonNoVentaService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private token = this.usuarioService.obtenerToken();

  agregarRazon(obj: Razon){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.post<string>( baseURL() +'/razon',obj,{headers,responseType: 'text' as 'json'})
  }

  actualizarRazon(obj: Razon){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.put<string>( baseURL() +'/actualizar-razon',obj,{headers,responseType: 'text' as 'json'})
  }

  obtenerRazones(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<Razon[]>( baseURL() +'/listar-razones/',{headers});
  }
  
  obtenerRazonPorId(id: number){
    
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<Razon[]>( baseURL() +'/razon/'+id+'/',{headers});
  }

  eliminarRazon(id: number){
    
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.delete<Razon[]>( baseURL() +'/razon/'+id+'/',{headers});
  }
}
