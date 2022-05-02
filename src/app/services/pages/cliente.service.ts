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

  guardarCliente(cliente) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/cliente', cliente, { headers, responseType: 'text' as 'json' });
  } 

  obtenerClientePorId(id) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/cliente-id/'+id, { headers });
  } 

  actualizarCliente(cliente: any) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    const {id} = cliente;
    return this.http.put<string>(baseURL() + '/actualizar-cliente/' + id, cliente, { headers, responseType: 'text' as 'json' });
  }

  buscarCliente(query: string){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() +'/cliente/pos/'+query+'/vender' ,{ headers });
  }

  buscarClienteCoincidencia(query: string){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() +'/cliente/obtener/' + query,{ headers });
  }

  obtenertipoCedula(cedula: string) {
    const url = 'https://api.hacienda.go.cr/fe/ae?identificacion=' + cedula;
    return this.http.get(url);
  }

  obtenerClientes(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/clientes',{ headers });
  }

  actualizarEstado(obj: object){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post(baseURL() + '/cliente/estado/',obj, { headers });
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

  autorizarClienteProforma(idcliente: number, clave: string){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/cliente/autorizar-cliente-proforma/',{idcliente,clave}, { headers, responseType: 'text' as 'json' });
  }

  innhabilitarEstadoAutorizado(idcliente: number){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.get<string>(baseURL() + '/cliente/inhabilitar-proforma/'+idcliente+'/autorizado', { headers, responseType: 'text' as 'json' });
  }

  obtenerClientesListado(){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.get<string>(baseURL() + '/cliente/listado-clientes/actualizar', { headers, responseType: 'text' as 'json' });
  }

  actualizarUbicacion(obj:{ubicacion: string, id:number}){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.patch<string>(baseURL() + '/cliente/ubicacion/actualizar', obj,{ headers, responseType: 'text' as 'json' });
  }
}


/*
  se puede usar el JOIN entre tablas sin necesidad de seleccionar datos de esas tablas
  simplemente se llama la tabla en el from 
  y luego se filtra por el campo 

*/