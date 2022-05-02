import { PreguntaEncuestaServicio,Calificacion } from './encuesta-servicio.service';
import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';

export interface RespuestaEncuestaServicio {
  idcliente?: number,
  idpregunta?: number,
  observacion?: string,
  calificacion?: number,
  pregunta: string,
  valor: number;
}

@Injectable({
  providedIn: 'root'
})

export class ResultadoEncuestaServicioService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) { }

  private token = this.usuarioService.obtenerToken();

  cargarCalificaciones(){
  
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<Calificacion[]>( baseURL() + '/encuesta-servicio-calificaciones',{headers});
  }

  cargarPreguntas(){

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'bearer '+this.token
    })

    return this.http.get<PreguntaEncuestaServicio[]>( baseURL() + '/encuesta-servicio/preguntas-resultado',{headers});
  }

  agregarRespuesta(obj: RespuestaEncuestaServicio[]){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.post<string>( baseURL() + '/resultado',{resultados: obj},{headers, responseType: 'text' as 'json'});
  }

  obtenerAgente(idcliente: number){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/usuario/obtener-usuario-por-cliente/'+idcliente,{headers,responseType: 'text' as 'json'});
  }
}
