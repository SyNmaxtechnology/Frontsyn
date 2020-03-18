import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private clienteService: UsuarioService) { }
  token = this.clienteService.obtenerToken();
  obtenerProvincias() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/provincias',{headers});
  }

  obtenerCantones(idprovincia) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/cantones/' + idprovincia,{headers}); //
  }
  obtenerDistritos(obj) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    const url = '/distritos/' + obj.idcanton.trim() + '&' + obj.idprovincia;
    return this.http.get(baseURL() + url,{headers});
  }
  obtenerBarrios(obj) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    const {idcanton, idprovincia, iddistrito} = obj;
    const url = '/barrios/' + idcanton + '&' + idprovincia + '&' + iddistrito;
    return this.http.get(baseURL() + url,{headers});
  }

  guardarCliente(cliente: object) {
  
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    
    return this.http.post(baseURL() + '/cliente', cliente, { headers });

  }

  actualizarCliente(cliente: any) {

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    const {id} = cliente;
    return this.http.put(baseURL() + '/cliente/' + id, cliente, { headers });

  }

  buscarCliente(query: string){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() +'/cliente/' + query,{ headers });
  }
  
  tipoExoneracion() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/tipoDocumentoExoneracion',{ headers });
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
