import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }
  
  token = this.usuarioService.obtenerToken();

  nuevoImpuesto(obj: object){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post(baseURL() + '/tipoImpuesto', obj, {headers} );
  }

  buscarImpuesto(query: string){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get(baseURL() + '/tipoImpuesto/' + query, {headers} );
  }
  actualizarImpuesto(obj: any){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.put(baseURL() + '/tipoImpuesto/' + obj.id, obj, { headers });
  }

  listarImpuestos(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/listar-impuestos', {headers, responseType: 'text' as 'json'} );
  }

  // actualizar-estado/

  actualizarEstado(obj: any){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.put(baseURL() + '/actualizar-impuesto/estado/',obj, { headers, responseType: 'text' as 'json' });
  }

  // /obtener-impuesto/:id

  obtenerImpuestoPorId(id){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/obtener/impuesto/'+id, {headers, responseType: 'text' as 'json'} );
  }

  obtenerImpuestoPorQuery(query){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/obtener-impuesto/query/'+query, {headers, responseType: 'text' as 'json'} );
  }
}
