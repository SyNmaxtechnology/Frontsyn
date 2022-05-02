import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';
import { ConsultaService } from './consulta.service';
import { saveAs } from 'file-saver';
import  Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient, 
              private usuarioService: UsuarioService,
              private consultaService: ConsultaService) { }
    
  token = this.usuarioService.obtenerToken();

  tipoDocumento() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/tipoDocumento', {headers});
  }

  condicionVenta() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/condicionVenta', {headers});
  }

  medioPago() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/medioPago', {headers});
  }

  obtenerTipoCambio() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/tipoCambio', {headers});
  }

  obtenerMonedas() {
    
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/monedas', {headers});
  }

  nuevoComprobante(obj: any) {
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    console.log(this.token);
    return this.http.post(baseURL() + '/factura', obj, {headers});
  }

  guardarFactura(obj: any){
    
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/guardar-factura',obj,{headers, responseType: 'text' as 'json'});
    /*this.http.post(baseURL() + '/guardar-factura',obj,{headers, responseType: "blob"})
    .toPromise()
    .then(blob => {
      saveAs(blob,'reportePOS');
    })
    .catch(err => console.error("download error = ", err))*/
  }


  enviarCorreo(obj){
    return this.consultaService.enviarCorreo(obj);
  }

  obtenerProforma(obj){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>( baseURL() +'/factura/obtener-proforma/id/',obj, {headers,responseType: 'text' as 'json'});
  }

  obtenerRole(){
    return localStorage.getItem('role');
  }

  obtenerExistencia(idproducto,idbodega: number){
    ///productos/buscar/productos-existencia/:idproducto'
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/productos/buscar/productos-existencia/'+idproducto+'/'+idbodega, {headers, responseType: 'text' as 'json'});
  }

  descargarReporteProforma(idfactura: number){
    // '/factura/proforma/descargar-reporte/pos/:idfactura'
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    this.http.get(baseURL() + '/factura/proforma/descargar-reporte/pos/'+idfactura,{headers, responseType: "blob"})
    .toPromise()
    .then(blob => {
      saveAs(blob,'proforma');
    })
    .catch(err => {
      Swal.fire('Descargar Reporte','Hubo un error en la generación del reporte','error');
    })
  }

  obtenerEstadoAutorizadoCliente(idcliente: number){
    //

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.get<string>( baseURL() +'/cliente/estado-autorizado/'+idcliente+'/proforma/', {headers,responseType: 'text' as 'json'});    
  }

  cargarClientes(){

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.get<string>( baseURL() +'/clientes/listado-clientes/facturar', {headers,responseType: 'text' as 'json'});    
  }

  agregarLineaTemporal(obj) {

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });

    return this.http.post<string>( baseURL() +'/factura/linea-temporal/agregar-linea',obj, {headers,responseType: 'text' as 'json'}); 
  }

  cargarLineasTemporales(){

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });

    return this.http.get<string>( baseURL() +'/facturas/listar/obtener-lineas-temporales/', {headers,responseType: 'text' as 'json'}); 
  }

  eliminarLineaTemporal(id: string){
    
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });

    return this.http.delete<string>( baseURL() +'/eliminar-lineas/'+id, {headers,responseType: 'text' as 'json'}); 
  }

  enviarEstadoCuentaPorCorreo(idcliente:number,correo: string) {

    //cliente/estado-cuenta/envio-correo/:idcliente
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });

    return this.http.get<string>( baseURL() +'/cliente/estado-cuenta/envio-correo/'+idcliente+'/'+correo, {headers,responseType: 'text' as 'json'}); 
  }

  validacionDatosTokenHacienda() {

    //emisor/validacion-token/mostrar-mensaje-error
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });

    return this.http.get<string>( baseURL() +'/emisor/validacion-token/mostrar-mensaje-error', {headers,responseType: 'text' as 'json'});
  }

  obtenerBodegas() {
    
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });

    return this.http.get<string>(baseURL()+'/emisor/bodegas/listar-bodegas', {headers,responseType: 'text' as 'json'});
  }

  obtenerProductosPorIdBodega(idbodega:number, existencia?: number) {

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });

    return this.http.get<string>( baseURL() +'/productos/obtener/listados-por-bodega/'+idbodega+'/'+existencia, {headers,responseType: 'text' as 'json'});
  }

  eliminarLineas(){
    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      Authorization: 'bearer ' + this.token
    });

    return this.http.delete<string>( baseURL() +'/factura/eliminar-lineas', {headers,responseType: 'text' as 'json'});
  }

  descargarReporteFacturaPDF (idfactura: number) {
     // '/factura/proforma/descargar-reporte/pos/:idfactura'
     const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
     this.http.get(baseURL() + '/factura/descargar/reporte-pdf/'+idfactura,{headers, responseType: "blob"})
     .toPromise()
     .then(blob => {
       saveAs(blob,'Factura'+Date.now());
     })
     .catch(err => {
       Swal.fire('Descargar Reporte','Hubo un error en la generación del reporte','error');
     })
  }

  procesarComprobanteElectronico(obj: any){//

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    return this.http.post<string>(baseURL() + '/factura/procesar-comprobante-electronico/hacienda/',obj,{headers, responseType: 'text' as 'json'});
  }
}


