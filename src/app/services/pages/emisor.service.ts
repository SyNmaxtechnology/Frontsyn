import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

// emisor

export interface EmisorGetResponse {
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})

export class EmisorService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }
  token = this.usuarioService.obtenerToken();

  obtenerPermiso() {
    const permiso = localStorage.getItem("role");
    return permiso;
  }

  obtenerProvincias() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/provincias', { headers });
  }

  obtenerCantones(idprovincia) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/cantones/' + idprovincia, { headers }); //
  }
  obtenerDistritos(obj) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    const url = '/distritos/' + obj.idcanton.trim() + '&' + obj.idprovincia;
    return this.http.get(baseURL() + url, { headers });
  }
  obtenerBarrios(obj) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    const { idcanton, idprovincia, iddistrito } = obj;
    const url = '/barrios/' + idcanton + '&' + idprovincia + '&' + iddistrito;
    return this.http.get(baseURL() + url, { headers });
  }

  guardarEmisor(emisor: object) {

    // const headers = new HttpHeaders().set('Content-type', 'application/json');
    // headers.set('Authorization', this.token);
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.post(baseURL() + '/emisor', emisor, { headers });

  }

  obtenerCodigosActividad(cedula: string) {
    console.log(cedula);
    const url = 'https://api.hacienda.go.cr/fe/ae?identificacion=' + cedula;
    return this.http.get(url);
  }

  buscarEmisor(query: string) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/emisor/' + query, { headers });
  }

  actualizarEmisor(obj: FormData) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.put(baseURL() + '/emisor/' + obj.getAll('id'), obj, { headers });
  }

  cargarEmisor() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/cargar-emisor', { headers, responseType: 'text' as 'json' });
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

  obtenerUsuarios() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/ususarios/', { headers, responseType: 'text' as 'json' });
  }

  obtenerRole() {
    return localStorage.getItem('role');
  }

  eliminarFacturas(fecha1: string, fecha2: string) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.delete<string>(baseURL() + '/eliminar-facturas/?numeroInternoInicio=' + fecha1 + '&numeroInternoFin=' + fecha2, { headers, responseType: 'text' as 'json' });
  }

  mostrarMensajeArchivoP12Validado() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/emisor/validar/archivo-p12', { headers, responseType: 'text' as 'json' });
  }

  obtenerDatosGlobales() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/emisor/default/cargar-datos-default', { headers, responseType: 'text' as 'json' });
  }

  actualizarPrioridad(prioridad: number) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/emisor/actualizar-prioridad-envio-comprobantes/' + prioridad, { headers, responseType: 'text' as 'json' });
  }
}
