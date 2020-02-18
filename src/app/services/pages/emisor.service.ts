import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { Observable } from 'rxjs';

// emisor

export interface EmisorGetResponse {
  mensaje: String;
}

@Injectable({
  providedIn: 'root'
})

export class EmisorService {

  constructor(private http: HttpClient) { }

  obtenerProvincias() {
    return this.http.get(baseURL() + '/provincias');
  }

  obtenerCantones(idprovincia) {
    return this.http.get(baseURL() + '/cantones/' + idprovincia  ); //
  }
  obtenerDistritos(obj) {
    const url = '/distritos/' + obj.idcanton.trim() + '&' + obj.idprovincia;
    return this.http.get(baseURL() + url);
  }
  obtenerBarrios(obj) {
    const {idcanton, idprovincia, iddistrito} = obj;
    const url = '/barrios/' + idcanton + '&' + idprovincia + '&' + iddistrito;
    return this.http.get(baseURL() + url);
  }

  guardarEmisor(emisor: object) {

    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/emisor', emisor, {  });

  }
  
  obtenerCodigosActividad(cedula: string) {
    const url = 'https://api.hacienda.go.cr/fe/ae?identificacion=' + cedula;
    return this.http.get(url);
  }

  buscarEmisor(query: string){
   return this.http.get(baseURL() + '/emisor/' + query); 
  }

  actualizarEmisor(obj: FormData){

    return this.http.put(baseURL() + '/emisor/' + obj.getAll("id"),obj,{});
  }
  tipoServicio() {
    return [
      {
        codigo: '01',
        tipo_codigo: 'Código del producto del vendedor'
      },
      {
        codigo: '02',
        tipo_codigo: 'Código del producto del comprador'
      },
      {
        codigo: '03',
        tipo_codigo: 'Código del producto asignado por la industria'
      },
      {
        codigo: '04',
        tipo_codigo: 'Código uso interno'
      },
      {
        codigo: '99',
        tipo_codigo: 'Otros'
      }
    ];
  }

  tipoIdentificacion() {

    return [
      {
        codigo: '01',
        descripcion: 'Física'
      },
      {
        codigo: '02',
        descripcion: 'Jurídica'
      },
      {
        codigo: '03',
        descripcion: 'DIMEX'
      },
      {
        codigo: '04',
        descripcion: 'NITE'
      }
    ];
  }
}
