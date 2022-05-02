import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseURL} from '../../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})

export class FacturaCompraService {

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService
  ){ }

  token = this.usuarioService.obtenerToken();
  
  consultarActividad(cedula: Number) {

    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });

    return this.http.get<string>( baseURL() +'/consultar-actividad/'+cedula, {headers, responseType: 'text' as 'json'})
  }
  
  obtenerProvincias() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/provincias',{headers, responseType: 'text' as 'json'});
  }

  obtenerCantones(idprovincia) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/cantones/' + idprovincia,{headers, responseType: 'text' as 'json'}); //
  }
  obtenerDistritos(obj) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    const url = '/distritos/' + obj.idcanton.trim() + '&' + obj.idprovincia;
    return this.http.get<string>(baseURL() + url,{headers, responseType: 'text' as 'json'});
  }
  obtenerBarrios(obj) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    const {idcanton, idprovincia, iddistrito} = obj;
    const url = '/barrios/' + idcanton + '&' + idprovincia + '&' + iddistrito;
    return this.http.get<string>(baseURL() + url,{headers, responseType: 'text' as 'json'});
  }

  condicionVenta() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/condicionVenta', {headers, responseType: 'text' as 'json'});
  }

  medioPago() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/medioPago', {headers, responseType: 'text' as 'json'});
  }

  obtenerTipoCambio() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/tipoCambio', {headers, responseType: 'text'});
  }

  obtenerMonedas() {
    
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/monedas', {headers, responseType: 'text' as 'json'});
  }

  tipoCedulas() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/tipoCedula', {headers, responseType: 'text' as 'json'}); 
  }

  nuevoProveedor(obj) {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<string>( baseURL() +'/proveedor', obj, {headers, responseType: 'text' as 'json'})
  }

  buscarProveedor(query) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/buscar-proveedor/'+query, {headers, responseType: 'text' as 'json'}); 
  }

  nuevoArticulo(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<string>( baseURL() +'/articulo', obj, {headers, responseType: 'text' as 'json'})
  }

  //
  actualizarArticulo(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<string>( baseURL() +'/articulo/'+obj.id, obj, {headers, responseType: 'text' as 'json'})
  }

  unidadesMedida(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get<string>(baseURL() + '/unidadesMedida', {headers, responseType: 'text' as 'json'});
  }

  UnidadesMedidaServicios() {
    //return  ['Al', 'Alc', 'Cm', 'I', 'Os', 'Sp', 'Spe', 'St', 'd', 'h', 's'];
    //return  ['Al','Alc','Cm','I','Os','Sp','Spe','St','m','kg','s','A','K','mol','cd','m²','m³'];
    return ['Al', 'Alc', 'Cm', 'I', 'Os', 'Sp', 'Spe', 'St', 'd', 'h', 's'];
  }

  obtenerCategorias() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/categorias', { headers, responseType: 'text' as 'json' });
  }
  obtenerDescuentos() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/descuentos', { headers, responseType: 'text' as 'json' });
  }
  obtenerImpuestos() {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/impuestos', { headers, responseType: 'text' as 'json' });
  }

  buscarArticulos(query){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/articulos/cargar-lista', { headers, responseType: 'text' as 'json' });
  }

  buscarArticulosPorId(id: Number){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/articulo/?idarticulo='+id,{ headers, responseType: 'text' as 'json' });
  }

  generarFactura(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() +'/entrada', obj, {headers, responseType: 'text' as 'json'})
  }

  obtenerExistenciaArticulo(id: number){
    ///existencia/articulo/:idarticulo
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });

    return this.http.get<string>( baseURL() +'/existencia/articulo/'+id,  {headers, responseType: 'text' as 'json'})
  }

  cargarProveedores(){

    //

    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() +'/proveedores/obtener-listado/facturar', {}, {headers, responseType: 'text' as 'json'})
  }

  cargarFacturaPorId(id: number){
    ///entrada/obtener-entrada-actualizar/:idfactura

    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token
    });

    return this.http.get<string>(baseURL() +'/entrada/obtener-entrada-actualizar/'+id,{headers, responseType: 'text' as 'json'});

  }


  reemplazarCompra(obj: any){

    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() +'/entrada/reemplazar-entrada', obj, {headers, responseType: 'text' as 'json'})
  }
}
