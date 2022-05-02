import { VisitaService } from './visita.service';
import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PreguntaEncuestaServicio } from 'src/app/services/pages/encuesta-servicio.service';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config'; 

export interface ResultadoEncuestaRequerimiento {
  idpregunta: number;
  pregunta: string;
  observacion?: string;
  requerimiento?: string;
  cantidad?: string;
  indice: number;
  idcliente?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResultadoEncuestaRequerimientoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private visitaService: VisitaService
  ) { }

  private token = this.usuarioService.obtenerToken();

  agregarRespuesta(obj: ResultadoEncuestaRequerimiento[]){
    
    const headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.post<string>( baseURL() + '/agregar-resultado-requerimiento',{resultados: obj},{headers,responseType: 'text' as 'json'});
  }

  cargarPreguntas(){
    
    const headers= new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<PreguntaEncuestaServicio[]>( baseURL() + '/encuesta-requerimiento/preguntas-resultado',{headers});
  }

  cargarClientes(){ return this.visitaService.obtenerClientes()}
} 
