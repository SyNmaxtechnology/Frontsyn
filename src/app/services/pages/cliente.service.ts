import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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

  guardarCliente(cliente: object) {

    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(baseURL() + '/cliente', cliente, { headers });

  }

  actualizarCliente(cliente: any) {

    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const {id} = cliente;
    return this.http.put(baseURL() + '/cliente/' + id, cliente, { headers });

  }

  buscarCliente(query: string){
    return this.http.get(baseURL() +'/cliente/' + query);
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
