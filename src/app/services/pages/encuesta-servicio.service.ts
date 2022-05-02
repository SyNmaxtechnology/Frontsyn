import { UsuarioService } from './usuario.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

export interface PreguntaEncuestaServicio {
  id?: number,
  pregunta: string,
  valor?: number
  auditoria?: string
}

export interface Calificacion {
  calificacion: number
}

@Injectable({
  providedIn: 'root'
})
export class EncuestaServicioService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private token = this.usuarioService.obtenerToken();

  agregarPregunta(obj: PreguntaEncuestaServicio){
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.post<string>( baseURL() +'/pregunta',obj,{headers,responseType: 'text' as 'json'});
  }

  actualizarPregunta(obj: PreguntaEncuestaServicio){
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.put<string>( baseURL() +'/actualizar-pregunta',obj,{headers,responseType: 'text' as 'json'});
  }

  obtenerPreguntaPorId(id: number){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<PreguntaEncuestaServicio[]>( baseURL() +'/pregunta/'+id,{headers})
  }

  obtenerPreguntas(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<PreguntaEncuestaServicio[]>( baseURL() +'/listar-preguntas',{headers})
  }

  eliminarPregunta(id: number){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.delete<string>( baseURL() +'/encuesta-servicio/'+id,{headers,responseType: 'text' as 'json'});
  } 
}
 