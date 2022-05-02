import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { PreguntaEncuestaServicio } from './encuesta-servicio.service';
import { baseURL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})

export class EncuestaRequerimientoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private token = this.usuarioService.obtenerToken();
  
  agregarPregunta(obj: PreguntaEncuestaServicio){
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    })

    return this.http.post<string>( baseURL() +'/pregunta-requerimiento',obj,{headers,responseType: 'text' as 'json'})
  }

  actualizarPregunta(obj: PreguntaEncuestaServicio){
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    })

    return this.http.put<string>( baseURL() +'/actualizar-pregunta-requerimiento',obj,{headers,responseType: 'text' as 'json'});
  }

  obtenerPreguntas(){
   
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.get<PreguntaEncuestaServicio[]>( baseURL() +'/listar-preguntas-requerimiento',{headers});
  }

  obtenerPreguntaPorId(id: number){
    
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.get<PreguntaEncuestaServicio[]>( baseURL() +'/pregunta-requerimiento/'+id,{headers});
  }

  eliminarLinea(id: number){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.delete<string>( baseURL() +'/encuesta-requerimiento/'+id,{headers,responseType: 'text' as 'json'});
  }
}
