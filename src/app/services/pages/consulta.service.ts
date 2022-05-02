import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { LoginService } from './login.service';
import { Workbook } from 'exceljs';
import { map,catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService {

  constructor(
      private http: HttpClient, 
      private router: Router, 
      private usuarioService: UsuarioService,
      private loginService: LoginService
    ) { }
    
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

  buscarFacturas(obj: any) {

    const headers = new HttpHeaders({ // asi se envian varias cabeceras en el mismo objeto de cabecera
      'Content-type': 'application/json',
      Authorization: 'bearer ' + this.token
    });
    if(obj.tipoFactura == '05' || obj.tipoFactura == '08'){
      return this.http.post(baseURL() + '/buscar-entradas', obj, {headers});
    } else {
      return this.http.post(baseURL() + '/facturas/buscar/', obj, {headers});
    }
  }

  reporteFactura(obj: any) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/reportes/facturas/?idfactura=' + obj.id + '&tipo=' +obj.tipo_factura, {headers});
  }

  descargarPDF(obj: any) {

    try {
      if(this.loginService.existeToken()){
        if(!this.loginService.estaAutenticado(this.token)){
          this.router.navigate(['/login']);
        } else {
          if(obj.tipo_factura == '05'){
            const url = baseURL() + '/descargar-respuesta/?idfactura='+obj.id;
            const a = document.createElement('a');
            a.href = url;
            a.click();
      
          } else if(obj.tipo_factura == '08'){
            const url = baseURL() + '/descargar-compra/?id='+obj.id+'&token='+this.token;
            const a = document.createElement('a');
            a.href = url;
            a.click();
      
          } else {
        
            const url = baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo + '&tipoFactura=' + obj.tipo_factura +'&token='+this.token;
            const a = document.createElement('a');
            a.href = url;
            a.click();
          }
        }
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
        console.log(error)
    }
    // return this.http.get(baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo);
  }


  obtenerCorreoCliente(idfactura,tipo_factura){
    console.log(idfactura,tipo_factura);
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/factura/correo/'+idfactura+ '&' +tipo_factura, {headers});
  }

  enviarCorreo(obj: any) { // TIPO 02 ENVIA EL CORREO

    /*const url = baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo;
    const a = document.createElement('a');
    a.href = url;
    a.click();
    a.remove();*/
    
    return this.http.get(baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo + '&listaCorreos=' + obj.listaCorreos + '&tipoFactura=' + obj.tipo_factura+'&token='+this.token);
  }

  cargarVistaFacturas(obj: any){
    try {
      if(this.loginService.existeToken()){
        if(!this.loginService.estaAutenticado(this.token)){
          this.router.navigate(['/login']);
        } else {
          // HAY QUE PASAR LOS TIPOS DE FILTROS, NUMERO DE RESULTADOS 
          if(obj.length === 0){
            return;
          } else {

            /*
                this.router.navigate(['/reporte'], {queryParams: {
                  fecha1: '20-20-2020',
                  fecha2: '20-20-2020',
                  tipoFactura: '01'
                }});
            */

            const pestana = window.open('#/reporte/comprobantes/01', '_blank');
            pestana.focus();

          }
        }
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
        console.log(error)
    }

  }

  anularComprobante(obj) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/notacredito-anular/ ' + obj.id+ '&' +obj.tipo_factura, {headers});
  }


  visualizarRespuestAceptacionHacienda(id) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/visualizar/'+id,{headers});
  }

  visualizarFacturaCompra(id) {
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.token);
    return this.http.get(baseURL() + '/visualizar-compra/'+id,{headers});
  }

  descargarAcuseEntrada(id) {
    //descargar-acuse/

    try {
      if(this.loginService.existeToken()){
        if(!this.loginService.estaAutenticado(this.token)){
          this.router.navigate(['/login']);
        } else {
         
          const url = baseURL() + '/descargar-acuse/?id='+id+'&token='+this.token;
          const a = document.createElement('a');
          a.href = url;
          a.click();
        }
      } else {
        this.router.navigate(['/login']);
      }
    } catch(err){
      console.log(err);
    }
  }

  anularCompra(id:number){
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
    });

    return this.http.get<string>( baseURL() +'/entrada/anular-entrada/'+id, {headers, responseType: 'text' as 'json'});
  }

  reporteExcel(obj, tipoComprobante) {
    
    try {
      if(this.loginService.existeToken()){
        if(!this.loginService.estaAutenticado(this.token)){
          this.router.navigate(['/login']);
        } else {
          if (typeof obj === 'undefined' || obj == null) {
            alert('No hay datos para exportar');
            return;
          } else {
            // tslint:disable-next-line: one-variable-per-declaration
            let tipoFactura = '',
                condicionVenta = '',
                medioPago = '',
                arr= [],
                header = null;

                let codigomoneda = '', 
                monto_descuento_total=0,
                subtotal=0,
                totalservgravados=0,
                totalservexentos=0,
                totalservexonerado=0,
                totalmercanciasgravadas=0,
                totalmercanciasexentas=0,
                totalmercanciaexonerada=0,
                totalgravado=0,
                totalexento=0,
                totalexonerado=0,
                totalventa=0,
                totaldescuentos=0,
                totalventaneta=0,
                totalimpuesto=0,
                totalcomprobante=0,
                TotalOtrosCargos=0;

                

              let arrTotales = [];
                if(tipoComprobante == '01'){
                    header = ["Cliente", "Clavenumérica", "Consecutivo", "Número Interno","Número Documento", "Tipo Factura", 
                                  "Fecha","Condición Venta", "Medio Pago","Moneda","Tipo Cambio","Plazo Cŕedito",
                                  "Porcentaje \n Descuento", "Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                                  "Total Exonerado", "Total Venta", "Venta Neta", "Total Impuesto",
                                  "Total \n Comprobante","IVA Devuelto", "Otros Cargos", "Estado"];
        
                                  tipoFactura = 'Factura Electrónica';

                    arr.push(["FACURAS EN COLONES"]);
                    arr.push([""]);
                    arr.push([""]);
                  
                    obj.forEach(elemento => {
        
                      /*switch (elemento.tipo_factura) {
                        case '01':
                          tipoFactura = 'Factura Electrónica';
                          break;
                        case '04':
                          tipoFactura = 'Tiquete Electrónico';
                          break;
                        case '03':
                          tipoFactura = 'Nota Crédito';
                          break;
                        default:
                          throw new Error('El valor para el tipo de factura no esta dentro de los parametros permitidos');
                      }*/
            
                      switch (elemento.medio_pago) {
                        case '01':
                          medioPago = 'Efectivo';
                          break;
                        case '02':
                          medioPago = 'Tarjeta';
                          break;
                        case '03':
                          medioPago = 'Cheque';
                          break;
                        case '04':
                          medioPago = 'Depósito bancario';
                          break;
                        case '05':
                          medioPago = 'Recaudado por terceros';
                          break;
                        case '99':
                          medioPago = 'Otros';
                          break;
                      }
            
                      switch (elemento.condicion_venta) {
                        case '01':
                          condicionVenta = 'Contado';
                          break;
                        case '02':
                          condicionVenta = 'Crédito';
                          break;
                      }
            
                    
                      if(elemento.codigomoneda == 'CRC'){
                        arr.push([(typeof elemento.cliente_nombre == null) ? '' : elemento.cliente_nombre,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          elemento.num_documento.toString(),
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          elemento.codigomoneda,
                          Number(elemento.tipocambio),
                          Number(elemento.plazo_credito),
                          Number(elemento.porcentaje_descuento_total),
                          Number(elemento.monto_descuento_total),
                          Number(elemento.subtotal),
                          Number(elemento.totalservgravados),
                          Number(elemento.totalservexentos),
                          Number(elemento.totalservexonerado),
                          Number(elemento.totalmercanciasgravadas),
                          Number(elemento.totalmercanciasexentas),
                          Number(elemento.totalmercanciaexonerada),
                          Number(elemento.totalgravado),
                          Number(elemento.totalexento),
                          Number(elemento.totalexonerado),
                          Number(elemento.totalventa),
                          Number(elemento.totaldescuentos),
                          Number(elemento.totalventaneta),
                          Number(elemento.totalimpuesto),
                          Number(elemento.totalcomprobante),
                          Number(elemento.totalIVADevuelto),
                          (elemento.TotalOtrosCargos == null) ? 0 : Number(elemento.TotalOtrosCargos),
                          (elemento.status_factura == null) ? '' : elemento.status_factura
                        ])
                        codigomoneda= 'CRC',
                        monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                        subtotal+=Number(elemento.subtotal),
                        totalservgravados+=Number(elemento.totalservgravados),
                        totalservexentos+=Number(elemento.totalservexentos),
                        totalservexonerado+=Number(elemento.totalservexonerado),
                        totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                        totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                        totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                        totalgravado+=Number(elemento.totalgravado),
                        totalexento+=Number(elemento.totalexento),
                        totalexonerado+=Number(elemento.totalexonerado),
                        totalventa+=Number(elemento.totalventa),
                        totalventaneta+=Number(elemento.totalventaneta),
                        totalimpuesto+=Number(elemento.totalimpuesto),
                        totalcomprobante+=Number(elemento.totalcomprobante),
                        TotalOtrosCargos += Number(elemento.TotalOtrosCargos);
                      } 
                  });

                  arrTotales.push([
                    codigomoneda,
                    monto_descuento_total,
                    subtotal,
                    totalservgravados,
                    totalservexentos,
                    totalservexonerado,
                    totalmercanciasgravadas,
                    totalmercanciasexentas,
                    totalmercanciaexonerada,
                    totalgravado,
                    totalexento,
                    totalexonerado,
                    totalventa,
                    totaldescuentos,
                    totalventaneta,
                    totalimpuesto,
                    totalcomprobante,
                    TotalOtrosCargos
                  ]);

                  monto_descuento_total=0,
                  subtotal=0,
                  totalservgravados=0,
                  totalservexentos=0,
                  totalservexonerado=0,
                  totalmercanciasgravadas=0,
                  totalmercanciasexentas=0,
                  totalmercanciaexonerada=0,
                  totalgravado=0,
                  totalexento=0,
                  totalexonerado=0,
                  totalventa=0,
                  totaldescuentos=0,
                  totalventaneta=0,
                  totalimpuesto=0,
                  totalcomprobante=0,
                  TotalOtrosCargos=0;
                  arr.push(["FACURAS EN DÓLARES"]);
                    arr.push([""]);
                    arr.push([""]);

                  obj.forEach(elemento => {
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
          
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
          
                  
                    if(elemento.codigomoneda == 'USD'){
                      arr.push([(typeof elemento.cliente_nombre == null) ? '' : elemento.cliente_nombre,
                        elemento.clavenumerica,
                        elemento.consecutivo,
                        elemento.numero_interno,
                        elemento.num_documento.toString(),
                        tipoFactura,
                        elemento.fecha_factura,
                        condicionVenta,
                        medioPago,
                        elemento.codigomoneda,
                        Number(elemento.tipocambio),
                        Number(elemento.plazo_credito),
                        Number(elemento.porcentaje_descuento_total),
                        Number(elemento.monto_descuento_total),
                        Number(elemento.subtotal),
                        Number(elemento.totalservgravados),
                        Number(elemento.totalservexentos),
                        Number(elemento.totalservexonerado),
                        Number(elemento.totalmercanciasgravadas),
                        Number(elemento.totalmercanciasexentas),
                        Number(elemento.totalmercanciaexonerada),
                        Number(elemento.totalgravado),
                        Number(elemento.totalexento),
                        Number(elemento.totalexonerado),
                        Number(elemento.totalventa),
                        Number(elemento.totaldescuentos),
                        Number(elemento.totalventaneta),
                        Number(elemento.totalimpuesto),
                        Number(elemento.totalcomprobante),
                        Number(elemento.totalIVADevuelto),
                        (elemento.TotalOtrosCargos == null) ? 0 : Number(elemento.TotalOtrosCargos),
                        (elemento.status_factura == null) ? '' : elemento.status_factura
                      ])
                      

                      codigomoneda= 'USD',
                      monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                      subtotal+=Number(elemento.subtotal),
                      totalservgravados+=Number(elemento.totalservgravados),
                      totalservexentos+=Number(elemento.totalservexentos),
                      totalservexonerado+=Number(elemento.totalservexonerado),
                      totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                      totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                      totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                      totalgravado+=Number(elemento.totalgravado),
                      totalexento+=Number(elemento.totalexento),
                      totalexonerado+=Number(elemento.totalexonerado),
                      totalventa+=Number(elemento.totalventa),
                      totalventaneta+=Number(elemento.totalventaneta),
                      totalimpuesto+=Number(elemento.totalimpuesto),
                      totalcomprobante+=Number(elemento.totalcomprobante),
                      TotalOtrosCargos += Number(elemento.TotalOtrosCargos);
                    } 
                });

                arrTotales.push([
                  codigomoneda,
                  monto_descuento_total,
                  subtotal,
                  totalservgravados,
                  totalservexentos,
                  totalservexonerado,
                  totalmercanciasgravadas,
                  totalmercanciasexentas,
                  totalmercanciaexonerada,
                  totalgravado,
                  totalexento,
                  totalexonerado,
                  totalventa,
                  totaldescuentos,
                  totalventaneta,
                  totalimpuesto,
                  totalcomprobante,
                  TotalOtrosCargos
                ])
                arr.push(["TOTALES POR MONEDA"]);
                arr.push([""]);
                arr.push([""]);
                arr.push(["Moneda","Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                "Total \n Comprobante", "Otros Cargos"]);
                arr.push(arrTotales[0]);
                arr.push(arrTotales[1]);


        
                } else if(tipoComprobante == '04'){
        
                  header = ["Cliente", "Clavenumérica", "Consecutivo", "Número Interno","Número Documento", "Tipo Factura", 
                                  "Fecha","Condición Venta", "Medio Pago","Moneda","Tipo Cambio","Plazo Cŕedito",
                                  "Porcentaje \n Descuento", "Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                                  "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                                  "Total \n Comprobante","IVA Devuelto", "Otros Cargos", "Estado"];
                                  tipoFactura = 'Tiquete Electrónico';
         
                  obj.forEach(elemento => {
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
          
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
                          
                    arr.push([(typeof elemento.cliente_nombre == null) ? '' : elemento.cliente_nombre,
                      elemento.clavenumerica,
                      elemento.consecutivo,
                      elemento.numero_interno,
                      (elemento.num_documento )? elemento.num_documento.toString() : '',
                      tipoFactura,
                      elemento.fecha_factura,
                      condicionVenta,
                      medioPago,
                      elemento.codigomoneda,
                      Number(elemento.tipocambio),
                      Number(elemento.plazo_credito),
                      Number(elemento.porcentaje_descuento_total),
                      Number(elemento.monto_descuento_total),
                      Number(elemento.subtotal),
                      Number(elemento.totalservgravados),
                      Number(elemento.totalservexentos),
                      Number(elemento.totalservexonerado),
                      Number(elemento.totalmercanciasgravadas),
                      Number(elemento.totalmercanciasexentas),
                      Number(elemento.totalmercanciaexonerada),
                      Number(elemento.totalgravado),
                      Number(elemento.totalexento),
                      Number(elemento.totalexonerado),
                      Number(elemento.totalventa),
                      Number(elemento.totaldescuentos),
                      Number(elemento.totalventaneta),
                      Number(elemento.totalimpuesto),
                      Number(elemento.totalcomprobante),
                      Number(elemento.totalIVADevuelto),
                      (elemento.TotalOtrosCargos == null) ? 0 : Number(elemento.TotalOtrosCargos),
                      (elemento.status_factura == null) ? '' : elemento.status_factura
                    ])
                  });
        

                } else if(tipoComprobante == '05'){ //RECEPCION
        
                  let condicion_impuesto = '';
                  let proveedor ='';
                  let codigoMoneda = '';
                  let monto_descuento_totalNC=0,
                    subtotalNC=0,
                    totalservgravadosNC=0,
                    totalservexentosNC=0,
                    totalservexoneradoNC=0,
                    totalmercanciasgravadasNC=0,
                    totalmercanciasexentasNC=0,
                    totalmercanciaexoneradaNC=0,
                    totalgravadoNC=0,
                    totalexentoNC=0,
                    totalexoneradoNC=0,
                    totalventaNC=0,
                    totaldescuentosNC=0,
                    totalventanetaNC=0,
                    totalimpuestoNC=0,
                    totalcomprobanteNC=0,
                    TotalOtrosCargosNC=0;
                  header = ["Proveedor", "Clavenumérica", "Consecutivo", "Número Interno","Consecutivo \n Receptor" ,"Tipo Factura", 
                                  "Fecha","Condición Venta", "Medio Pago","Condición \n Impuesto","Moneda","Tipo Cambio","Plazo Cŕedito",
                                  "Porcentaje \n Descuento", "Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                                  "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                                  "Total \n Comprobante","IVA Devuelto", "Otros Cargos","Código Estado", "Estado"];
        
                                  tipoFactura = 'Recepción';

                  
                  arr.push(["FACURAS EN COLONES"]);
                  arr.push([""]);
                  arr.push([""]);
                  obj.forEach(elemento => {
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
                    
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
        
                    switch(elemento.codicion_impuesto){
                      case '01':
                        condicion_impuesto = 'Genera Crédito IVA';
                      break;
        
                      case '02':
                        condicion_impuesto = 'Genera Crédito Parcial del IVA';
                      break;
        
                      case '03':
                        condicion_impuesto = 'Bienes de Capital';
                      break;
        
                      case '04':
                        condicion_impuesto = 'Gasto Corriente no Genera Crédito';
                      break;
        
                      case '05':
                        condicion_impuesto = 'Proporcionalidad';
                      break;
                    }
                    if( !elemento.proveedor_nombre_comercial){
                      proveedor = elemento.proveedor_nombre;
                    } else if( !elemento.proveedor_nombre){
                      proveedor = elemento.proveedor_nombre_comercial;
                    } else if( elemento.proveedor_nombre_comercial != null && elemento.proveedor_nombre_comercial.toString().length > 0
                            && elemento.proveedor_nombre != null && elemento.proveedor_nombre.toString().length > 0){
                          proveedor = elemento.proveedor_nombre_comercial;
                      }

                      if( elemento.codigomoneda == 'CRC'){
                      
                          if(elemento.numero_interno.charAt(0) == 'N') {
                            console.log("NOta colones")

                            monto_descuento_totalNC=totaldescuentosNC+=Number(elemento.totaldescuentos),
                            subtotalNC+=Number(elemento.subtotal),
                            totalservgravadosNC+=Number(elemento.totalservgravados),
                            totalservexentosNC+=Number(elemento.totalservexentos),
                            totalservexoneradoNC+=Number(elemento.totalservexonerado),
                            totalmercanciasgravadasNC+=Number(elemento.totalmercanciasgravadas),
                            totalmercanciasexentasNC+=Number(elemento.totalmercanciasexentas),
                            totalmercanciaexoneradaNC+=Number(elemento.totalmercanciaexonerada),
                            totalgravadoNC+=Number(elemento.totalgravado),
                            totalexentoNC+=Number(elemento.totalexento),
                            totalexoneradoNC+=Number(elemento.totalexonerado),
                            totalventaNC+=Number(elemento.totalventa),
                            totalventanetaNC+=Number(elemento.totalventaneta),
                            totalimpuestoNC+=Number(elemento.totalimpuesto),
                            totalcomprobanteNC+=Number(elemento.totalcomprobante),
                            TotalOtrosCargosNC+= Number(elemento.TotalOtrosCargos);

                            elemento.porcentaje_descuento_total= - Number(elemento.porcentaje_descuento_total) 
                            elemento.monto_descuento_total= -Number(elemento.monto_descuento_total)
                            elemento.subtotal= -Number(elemento.subtotal)
                            elemento.totalservgravados= -Number(elemento.totalservgravados)
                            elemento.totalservexentos= -Number(elemento.totalservexentos)
                            elemento.totalservexonerado= -Number(elemento.totalservexonerado)
                            elemento.totalmercanciasgravadas= -Number(elemento.totalmercanciasgravadas)
                            elemento.totalmercanciasexentas= -Number(elemento.totalmercanciasexentas)
                            elemento.totalmercanciaexonerada= -Number(elemento.totalmercanciaexonerada)
                            elemento.totalgravado= -Number(elemento.totalgravado)
                            elemento.totalexento= -Number(elemento.totalexento)
                            elemento.totalexonerado= -Number(elemento.totalexonerado)
                            elemento.totalventa= -Number(elemento.totalventa)
                            elemento.totaldescuentos= -Number(elemento.totaldescuentos)
                            elemento.totalventaneta= -Number(elemento.totalventaneta)
                            elemento.totalimpuesto= -Number(elemento.totalimpuesto)
                            elemento.totalcomprobante= -Number(elemento.totalcomprobante)
                            elemento.totalIVADevuelto= -Number(elemento.totalIVADevuelto)

                          if(elemento.TotalOtrosCargos == null){
                            elemento.TotalOtrosCargos = 0; 
                          } else {
                            elemento.TotalOtrosCargos = -Number(elemento.TotalOtrosCargos);
                          }
                        } else {

                          codigomoneda= 'CRC',
                          monto_descuento_total=totaldescuentos+=Number(elemento.totaldescuentos),
                          subtotal+=Number(elemento.subtotal),
                          totalservgravados+=Number(elemento.totalservgravados),
                          totalservexentos+=Number(elemento.totalservexentos),
                          totalservexonerado+=Number(elemento.totalservexonerado),
                          totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                          totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                          totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                          totalgravado+=Number(elemento.totalgravado),
                          totalexento+=Number(elemento.totalexento),
                          totalexonerado+=Number(elemento.totalexonerado),
                          totalventa+=Number(elemento.totalventa),
                          totalventaneta+=Number(elemento.totalventaneta),
                          totalimpuesto+=Number(elemento.totalimpuesto),
                          totalcomprobante+=Number(elemento.totalcomprobante),
                          TotalOtrosCargos += Number(elemento.TotalOtrosCargos);
                        }    

                        arr.push([
                          proveedor,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          elemento.consecutivo_receptor,
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          condicion_impuesto,
                          elemento.codigomoneda,
                          elemento.tipocambio,
                          elemento.plazo_credito,
                          elemento.porcentaje_descuento_total,
                          elemento.monto_descuento_total,
                          elemento.subtotal,
                          elemento.totalservgravados,
                          elemento.totalservexentos,
                          elemento.totalservexonerado,
                          elemento.totalmercanciasgravadas,
                          elemento.totalmercanciasexentas,
                          elemento.totalmercanciaexonerada,
                          elemento.totalgravado,
                          elemento.totalexento,
                          elemento.totalexonerado,
                          elemento.totalventa,
                          elemento.totaldescuentos,
                          elemento.totalventaneta,
                          elemento.totalimpuesto,
                          elemento.totalcomprobante,
                          elemento.totalIVADevuelto,
                          elemento.TotalOtrosCargos,
                          elemento.status_factura,
                          (elemento.estadoHacienda == null) ? '' : elemento.estadoHacienda
                        ])
                      }
                  });

                    monto_descuento_total -= monto_descuento_totalNC,
                    subtotal -= subtotalNC,
                    totalservgravados -= totalservgravadosNC,
                    totalservexentos -= totalservexentosNC,
                    totalservexonerado -= totalservexoneradoNC,
                    totalmercanciasgravadas -= totalmercanciasgravadasNC,
                    totalmercanciasexentas -= totalmercanciasexentasNC,
                    totalmercanciaexonerada -= totalmercanciaexoneradaNC,
                    totalgravado -= totalgravadoNC,
                    totalexento -= totalexentoNC,
                    totalexonerado -= totalexoneradoNC,
                    totalventa -= totalventaNC,
                    totaldescuentos -= totaldescuentosNC,
                    totalventaneta -= totalventanetaNC,
                    totalimpuesto -= totalimpuestoNC,
                    totalcomprobante -= totalcomprobanteNC,
                    TotalOtrosCargos -= TotalOtrosCargosNC;

                  arrTotales.push([
                    codigomoneda,
                    monto_descuento_total,
                    subtotal,
                    totalservgravados,
                    totalservexentos,
                    totalservexonerado,
                    totalmercanciasgravadas,
                    totalmercanciasexentas,
                    totalmercanciaexonerada,
                    totalgravado,
                    totalexento,
                    totalexonerado,
                    totalventa,
                    totaldescuentos,
                    totalventaneta,
                    totalimpuesto,
                    totalcomprobante,
                    TotalOtrosCargos
                  ]);

                  monto_descuento_total=0,
                  subtotal=0,
                  totalservgravados=0,
                  totalservexentos=0,
                  totalservexonerado=0,
                  totalmercanciasgravadas=0,
                  totalmercanciasexentas=0,
                  totalmercanciaexonerada=0,
                  totalgravado=0,
                  totalexento=0,
                  totalexonerado=0,
                  totalventa=0,
                  totaldescuentos=0,
                  totalventaneta=0,
                  totalimpuesto=0,
                  totalcomprobante=0,
                  TotalOtrosCargos=0;

                  monto_descuento_totalNC=0,
                  subtotalNC=0,
                  totalservgravadosNC=0,
                  totalservexentosNC=0,
                  totalservexoneradoNC=0,
                  totalmercanciasgravadasNC=0,
                  totalmercanciasexentasNC=0,
                  totalmercanciaexoneradaNC=0,
                  totalgravadoNC=0,
                  totalexentoNC=0,
                  totalexoneradoNC=0,
                  totalventaNC=0,
                  totaldescuentosNC=0,
                  totalventanetaNC=0,
                  totalimpuestoNC=0,
                  totalcomprobanteNC=0,
                  TotalOtrosCargosNC=0;

                  arr.push(["FACURAS EN DOLARES"]);
                  arr.push([""]);
                  arr.push([""]);

                  obj.forEach(elemento => {
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
                    
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
        
                    switch(elemento.codicion_impuesto){
                      case '01':
                        condicion_impuesto = 'Genera Crédito IVA';
                      break;
        
                      case '02':
                        condicion_impuesto = 'Genera Crédito Parcial del IVA';
                      break;
        
                      case '03':
                        condicion_impuesto = 'Bienes de Capital';
                      break;
        
                      case '04':
                        condicion_impuesto = 'Gasto Corriente no Genera Crédito';
                      break;
        
                      case '05':
                        condicion_impuesto = 'Proporcionalidad';
                      break;
                    }
                    if( !elemento.proveedor_nombre_comercial){
                      proveedor = elemento.proveedor_nombre;
                    } else if( !elemento.proveedor_nombre){
                      proveedor = elemento.proveedor_nombre_comercial;
                    } else if( elemento.proveedor_nombre_comercial != null && elemento.proveedor_nombre_comercial.toString().length > 0
                            && elemento.proveedor_nombre != null && elemento.proveedor_nombre.toString().length > 0){
                          proveedor = elemento.proveedor_nombre_comercial;
                      }

                      if(elemento.codigomoneda == 'USD'){

                          
                          
                          if(elemento.numero_interno.charAt(0) == 'N'){

                            monto_descuento_totalNC=totaldescuentosNC+=Number(elemento.totaldescuentos),
                            subtotalNC+=Number(elemento.subtotal),
                            totalservgravadosNC+=Number(elemento.totalservgravados),
                            totalservexentosNC+=Number(elemento.totalservexentos),
                            totalservexoneradoNC+=Number(elemento.totalservexonerado),
                            totalmercanciasgravadasNC+=Number(elemento.totalmercanciasgravadas),
                            totalmercanciasexentasNC+=Number(elemento.totalmercanciasexentas),
                            totalmercanciaexoneradaNC+=Number(elemento.totalmercanciaexonerada),
                            totalgravadoNC+=Number(elemento.totalgravado),
                            totalexentoNC+=Number(elemento.totalexento),
                            totalexoneradoNC+=Number(elemento.totalexonerado),
                            totalventaNC+=Number(elemento.totalventa),
                            totalventanetaNC+=Number(elemento.totalventaneta),
                            totalimpuestoNC+=Number(elemento.totalimpuesto),
                            totalcomprobanteNC+=Number(elemento.totalcomprobante),
                            TotalOtrosCargosNC+= Number(elemento.TotalOtrosCargos);

                            elemento.porcentaje_descuento_total= - Number(elemento.porcentaje_descuento_total) 
                            elemento.monto_descuento_total= -Number(elemento.monto_descuento_total)
                            elemento.subtotal= -Number(elemento.subtotal)
                            elemento.totalservgravados= -Number(elemento.totalservgravados)
                            elemento.totalservexentos= -Number(elemento.totalservexentos)
                            elemento.totalservexonerado= -Number(elemento.totalservexonerado)
                            elemento.totalmercanciasgravadas= -Number(elemento.totalmercanciasgravadas)
                            elemento.totalmercanciasexentas= -Number(elemento.totalmercanciasexentas)
                            elemento.totalmercanciaexonerada= -Number(elemento.totalmercanciaexonerada)
                            elemento.totalgravado= -Number(elemento.totalgravado)
                            elemento.totalexento= -Number(elemento.totalexento)
                            elemento.totalexonerado= -Number(elemento.totalexonerado)
                            elemento.totalventa= -Number(elemento.totalventa)
                            elemento.totaldescuentos= -Number(elemento.totaldescuentos)
                            elemento.totalventaneta= -Number(elemento.totalventaneta)
                            elemento.totalimpuesto= -Number(elemento.totalimpuesto)
                            elemento.totalcomprobante= -Number(elemento.totalcomprobante)
                            elemento.totalIVADevuelto= -Number(elemento.totalIVADevuelto)

                            //valores de notas de credito
                            

                          if(elemento.TotalOtrosCargos == null){
                            elemento.TotalOtrosCargos = 0; 
                          } else {
                            elemento.TotalOtrosCargos = -Number(elemento.TotalOtrosCargos);
                          }
                        }else {
                          codigomoneda= 'USD',
                          monto_descuento_total=totaldescuentos+=Number(elemento.totaldescuentos),
                          subtotal+=Number(elemento.subtotal),
                          totalservgravados+=Number(elemento.totalservgravados),
                          totalservexentos+=Number(elemento.totalservexentos),
                          totalservexonerado+=Number(elemento.totalservexonerado),
                          totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                          totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                          totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                          totalgravado+=Number(elemento.totalgravado),
                          totalexento+=Number(elemento.totalexento),
                          totalexonerado+=Number(elemento.totalexonerado),
                          totalventa+=Number(elemento.totalventa),
                          totalventaneta+=Number(elemento.totalventaneta),
                          totalimpuesto+=Number(elemento.totalimpuesto),
                          totalcomprobante+=Number(elemento.totalcomprobante),
                          TotalOtrosCargos += Number(elemento.TotalOtrosCargos);
                        }

                        arr.push([
                          proveedor,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          elemento.consecutivo_receptor,
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          condicion_impuesto,
                          elemento.codigomoneda,
                          elemento.tipocambio,
                          elemento.plazo_credito,
                          elemento.porcentaje_descuento_total,
                          elemento.monto_descuento_total,
                          elemento.subtotal,
                          elemento.totalservgravados,
                          elemento.totalservexentos,
                          elemento.totalservexonerado,
                          elemento.totalmercanciasgravadas,
                          elemento.totalmercanciasexentas,
                          elemento.totalmercanciaexonerada,
                          elemento.totalgravado,
                          elemento.totalexento,
                          elemento.totalexonerado,
                          elemento.totalventa,
                          elemento.totaldescuentos,
                          elemento.totalventaneta,
                          elemento.totalimpuesto,
                          elemento.totalcomprobante,
                          elemento.totalIVADevuelto,
                          elemento.TotalOtrosCargos,
                          elemento.status_factura,
                          (elemento.estadoHacienda == null) ? '' : elemento.estadoHacienda
                          
                        ])
                      }          
                  });


                    monto_descuento_total -= monto_descuento_totalNC,
                    subtotal -= subtotalNC,
                    totalservgravados -= totalservgravadosNC,
                    totalservexentos -= totalservexentosNC,
                    totalservexonerado -= totalservexoneradoNC,
                    totalmercanciasgravadas -= totalmercanciasgravadasNC,
                    totalmercanciasexentas -= totalmercanciasexentasNC,
                    totalmercanciaexonerada -= totalmercanciaexoneradaNC,
                    totalgravado -= totalgravadoNC,
                    totalexento -= totalexentoNC,
                    totalexonerado -= totalexoneradoNC,
                    totalventa -= totalventaNC,
                    totaldescuentos -= totaldescuentosNC,
                    totalventaneta -= totalventanetaNC,
                    totalimpuesto -= totalimpuestoNC,
                    totalcomprobante -= totalcomprobanteNC,
                    TotalOtrosCargos -= TotalOtrosCargosNC;

                  arrTotales.push([
                    codigomoneda,
                    monto_descuento_total,
                    subtotal,
                    totalservgravados,
                    totalservexentos,
                    totalservexonerado,
                    totalmercanciasgravadas,
                    totalmercanciasexentas,
                    totalmercanciaexonerada,
                    totalgravado,
                    totalexento,
                    totalexonerado,
                    totalventa,
                    totaldescuentos,
                    totalventaneta,
                    totalimpuesto,
                    totalcomprobante,
                    TotalOtrosCargos
                  ]);

                  arr.push(["TOTALES POR MONEDA"]);
                  arr.push([""]);
                  arr.push([""]);
                  arr.push(["Moneda","Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                  "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                  "Total \n Comprobante", "Otros Cargos"]);
                  arr.push(arrTotales[0]);
                  arr.push(arrTotales[1]);
                } else if(tipoComprobante == '03'){ //NOTA CREDITO ANULACION
                  let tipoDocReferencia = '';
                  let razon= '';
        
                  header = ["Cliente", "Clavenumérica", "Consecutivo", "Número Interno","Número Documento","Tipo Factura", 
                                  "Fecha","Condición Venta", "Medio Pago","Moneda","Tipo Cambio","Plazo Cŕedito",
                                  "Porcentaje \n Descuento", "Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                                  "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                                  "Total \n Comprobante","IVA Devuelto", "Otros Cargos","Fecha \n Documento \n Referencia", 
                                  ,"Tipo \n Documento \n Referencia","Número \n Documento \n Referencia","Razón","Estado"];
        
                                  tipoFactura = 'Nota de Crédito Anulación';
                  
                  arr.push(["FACURAS EN COLONES"]);
                  arr.push([""]);
                  arr.push([""]);
                  obj.forEach(elemento => {
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
                    
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
        
                    switch (elemento.tipoDocReferencia) {
                      case '01':
                        tipoDocReferencia = 'Factura Electrónica';
                        break;
                      case '04':
                        tipoDocReferencia = 'Tiquete Electrónico';
                        break;
                    }
        
                    switch (elemento.codigo) {
                      case '01':
                        razon = 'Anulación del Comprobante';
                        break;
        
                    }
                    
                    if(elemento.codigomoneda == 'CRC'){

                      codigomoneda= 'CRC',
                      monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                      subtotal+=Number(elemento.subtotal),
                      totalservgravados+=Number(elemento.totalservgravados),
                      totalservexentos+=Number(elemento.totalservexentos),
                      totalservexonerado+=Number(elemento.totalservexonerado),
                      totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                      totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                      totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                      totalgravado+=Number(elemento.totalgravado),
                      totalexento+=Number(elemento.totalexento),
                      totalexonerado+=Number(elemento.totalexonerado),
                      totalventa+=Number(elemento.totalventa),
                      totalventaneta+=Number(elemento.totalventaneta),
                      totalimpuesto+=Number(elemento.totalimpuesto),
                      totalcomprobante+=Number(elemento.totalcomprobante),
                      TotalOtrosCargos += Number(elemento.TotalOtrosCargos);

                      arr.push([
                        (typeof elemento.cliente_nombre === 'undefined') ? '' : elemento.cliente_nombre,
                        elemento.clavenumerica,
                        elemento.consecutivo,
                        elemento.numero_interno,
                        elemento.num_documento.toString(),
                        tipoFactura,
                        elemento.fecha_factura,
                        condicionVenta,
                        medioPago,
                        elemento.codigomoneda,
                        Number(elemento.tipocambio),
                        Number(elemento.plazo_credito),
                        - Number(elemento.porcentaje_descuento_total),
                        - Number(elemento.monto_descuento_total),
                        - Number(elemento.subtotal),
                        - Number(elemento.totalservgravados),
                        - Number(elemento.totalservexentos),
                        - Number(elemento.totalservexonerado),
                        - Number(elemento.totalmercanciasgravadas),
                        - Number(elemento.totalmercanciasexentas),
                        - Number(elemento.totalmercanciaexonerada),
                        - Number(elemento.totalgravado),
                        - Number(elemento.totalexento),
                        - Number(elemento.totalexonerado),
                        - Number(elemento.totalventa),
                        - Number(elemento.totaldescuentos),
                        - Number(elemento.totalventaneta),
                        - Number(elemento.totalimpuesto),
                        - Number(elemento.totalcomprobante),
                        - Number(elemento.totalIVADevuelto),
                        (elemento.TotalOtrosCargos == null) ? 0 : - Number(elemento.TotalOtrosCargos),
                        elemento.fecha_emision,
                        tipoDocReferencia,
                        elemento.numeroReferencia,
                        elemento.razon,
                        (elemento.status_factura == null) ? '' : elemento.status_factura
                      ])
                    }
                  });

                  arrTotales.push([
                    codigomoneda,
                    Number( - monto_descuento_total),
                    Number( - subtotal),
                    Number( - totalservgravados),
                    Number( - totalservexentos),
                    Number( - totalservexonerado),
                    Number( - totalmercanciasgravadas),
                    Number( - totalmercanciasexentas),
                    Number( - totalmercanciaexonerada),
                    Number( - totalgravado),
                    Number( - totalexento),
                    Number( - totalexonerado),
                    Number( - totalventa),
                    Number( - totaldescuentos),
                    Number( - totalventaneta),
                    Number( - totalimpuesto),
                    Number( - totalcomprobante),
                    Number( - TotalOtrosCargos)
                  ]);

                  monto_descuento_total=0,
                  subtotal=0,
                  totalservgravados=0,
                  totalservexentos=0,
                  totalservexonerado=0,
                  totalmercanciasgravadas=0,
                  totalmercanciasexentas=0,
                  totalmercanciaexonerada=0,
                  totalgravado=0,
                  totalexento=0,
                  totalexonerado=0,
                  totalventa=0,
                  totaldescuentos=0,
                  totalventaneta=0,
                  totalimpuesto=0,
                  totalcomprobante=0,
                  TotalOtrosCargos=0;

                  // dolares

                  arr.push(["FACURAS EN DOLARES"]);
                  arr.push([""]);
                  arr.push([""]);

                  obj.forEach(elemento => {
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
                    
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
        
                    switch (elemento.tipoDocReferencia) {
                      case '01':
                        tipoDocReferencia = 'Factura Electrónica';
                        break;
                      case '04':
                        tipoDocReferencia = 'Tiquete Electrónico';
                        break;
                    }
        
                    switch (elemento.codigo) {
                      case '01':
                        razon = 'Anulación del Comprobante';
                        break;
        
                    }
                    
                    if(elemento.codigomoneda == 'USD'){

                      codigomoneda= 'USD',
                      monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                      subtotal+=Number(elemento.subtotal),
                      totalservgravados+=Number(elemento.totalservgravados),
                      totalservexentos+=Number(elemento.totalservexentos),
                      totalservexonerado+=Number(elemento.totalservexonerado),
                      totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                      totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                      totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                      totalgravado+=Number(elemento.totalgravado),
                      totalexento+=Number(elemento.totalexento),
                      totalexonerado+=Number(elemento.totalexonerado),
                      totalventa+=Number(elemento.totalventa),
                      totalventaneta+=Number(elemento.totalventaneta),
                      totalimpuesto+=Number(elemento.totalimpuesto),
                      totalcomprobante+=Number(elemento.totalcomprobante),
                      TotalOtrosCargos += Number(elemento.TotalOtrosCargos);

                      arr.push([
                        (typeof elemento.cliente_nombre === 'undefined') ? '' : elemento.cliente_nombre,
                        elemento.clavenumerica,
                        elemento.consecutivo,
                        elemento.numero_interno,
                        elemento.num_documento.toString(),
                        tipoFactura,
                        elemento.fecha_factura,
                        condicionVenta,
                        medioPago,
                        elemento.codigomoneda,
                        Number(elemento.tipocambio),
                        Number(elemento.plazo_credito),
                        - Number(elemento.porcentaje_descuento_total),
                        - Number(elemento.monto_descuento_total),
                        - Number(elemento.subtotal),
                        - Number(elemento.totalservgravados),
                        - Number(elemento.totalservexentos),
                        - Number(elemento.totalservexonerado),
                        - Number(elemento.totalmercanciasgravadas),
                        - Number(elemento.totalmercanciasexentas),
                        - Number(elemento.totalmercanciaexonerada),
                        - Number(elemento.totalgravado),
                        - Number(elemento.totalexento),
                        - Number(elemento.totalexonerado),
                        - Number(elemento.totalventa),
                        - Number(elemento.totaldescuentos),
                        - Number(elemento.totalventaneta),
                        - Number(elemento.totalimpuesto),
                        - Number(elemento.totalcomprobante),
                        - Number(elemento.totalIVADevuelto),
                        (elemento.TotalOtrosCargos == null) ? 0 : - Number(elemento.TotalOtrosCargos),
                        elemento.fecha_emision,
                        tipoDocReferencia,
                        elemento.numeroReferencia,
                        elemento.razon,
                        (elemento.status_factura == null) ? '' : elemento.status_factura
                      ])
                    }
                  });

                  arrTotales.push([
                    codigomoneda,
                    Number( - monto_descuento_total),
                    Number( - subtotal),
                    Number( - totalservgravados),
                    Number( - totalservexentos),
                    Number( - totalservexonerado),
                    Number( - totalmercanciasgravadas),
                    Number( - totalmercanciasexentas),
                    Number( - totalmercanciaexonerada),
                    Number( - totalgravado),
                    Number( - totalexento),
                    Number( - totalexonerado),
                    Number( - totalventa),
                    Number( - totaldescuentos),
                    Number( - totalventaneta),
                    Number( - totalimpuesto),
                    Number( - totalcomprobante),
                    Number( - TotalOtrosCargos)
                  ]);

                  arr.push(["TOTALES POR MONEDA"]);
                  arr.push([""]);
                  arr.push([""]);
                  arr.push(["Moneda","Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                  "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                  "Total \n Comprobante", "Otros Cargos"]);
                  arr.push(arrTotales[0]);
                  arr.push(arrTotales[1]);

                } else if(tipoComprobante == '08'){ // Factura de compra
                  let proveedor = '';
                  header = ["Proveedor", "Clavenumérica", "Consecutivo", "Número Interno", "Tipo Factura", 
                                  "Fecha","Condición Venta", "Medio Pago","Moneda","Tipo Cambio",
                                  "Plazo Cŕedito","Porcentaje \n Descuento", "Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                                  "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                                  "Total \n Comprobante","IVA Devuelto", "Otros Cargos", "Estado"];
        
                  tipoFactura = 'Factura Compra Electrónica';
                  arr.push(["FACURAS EN COLONES"]);
                    arr.push([""]);
                    arr.push([""]);
                  obj.forEach(elemento => {

                    console.log(obj)
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
                    
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
                    if(typeof elemento.proveedor_nombre_comercial === 'undefined' || elemento.proveedor_nombre_comercial == ""){
                      proveedor = elemento.proveedor_nombre;
                    } else if(typeof elemento.proveedor_nombre === 'undefined' || elemento.proveedor_nombre == ""){
                      proveedor = elemento.proveedor_nombre_comercial;
                    } else if((typeof elemento.proveedor_nombre_comercial !== 'undefined' && elemento.proveedor_nombre_comercial.length > 0)
                            && (typeof elemento.proveedor_nombre !== 'undefined' && elemento.proveedor_nombre.length > 0) ){
                          proveedor = elemento.proveedor_nombre_comercial;
                      }
        
                    if(elemento.codigomoneda == 'CRC'){


                      if(elemento.claveReferencia) {
                        codigomoneda= 'CRC',
                        monto_descuento_total-=totaldescuentos+=Number(elemento.totaldescuentos),
                        subtotal+=Number(elemento.subtotal),
                        totalservgravados-=Number(elemento.totalservgravados),
                        totalservexentos-=Number(elemento.totalservexentos),
                        totalservexonerado-=Number(elemento.totalservexonerado),
                        totalmercanciasgravadas-=Number(elemento.totalmercanciasgravadas),
                        totalmercanciasexentas-=Number(elemento.totalmercanciasexentas),
                        totalmercanciaexonerada-=Number(elemento.totalmercanciaexonerada),
                        totalgravado-=Number(elemento.totalgravado),
                        totalexento-=Number(elemento.totalexento),
                        totalexonerado-=Number(elemento.totalexonerado),
                        totalventa-=Number(elemento.totalventa),
                        totalventaneta-=Number(elemento.totalventaneta),
                        totalimpuesto-=Number(elemento.totalimpuesto),
                        totalcomprobante-=Number(elemento.totalcomprobante),
                        TotalOtrosCargos -= Number(elemento.TotalOtrosCargos);

                        arr.push([
                          proveedor,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          elemento.codigomoneda,
                          elemento.tipocambio,
                          elemento.plazo_credito,
                          -elemento.porcentaje_descuento_total,
                          -elemento.monto_descuento_total,
                          -elemento.subtotal,
                          -elemento.totalservgravados,
                          -elemento.totalservexentos,
                          -elemento.totalservexonerado,
                          -elemento.totalmercanciasgravadas,
                          -elemento.totalmercanciasexentas,
                          -elemento.totalmercanciaexonerada,
                          -elemento.totalgravado,
                          -elemento.totalexento,
                          -elemento.totalexonerado,
                          -elemento.totalventa,
                          -elemento.totaldescuentos,
                          -elemento.totalventaneta,
                          -elemento.totalimpuesto,
                          -elemento.totalcomprobante,
                          -elemento.totalIVADevuelto,
                          (elemento.TotalOtrosCargos == null) ? '0' : -elemento.TotalOtrosCargos,
                          (elemento.estadoHacienda == null) ? '' : elemento.estadoHacienda
                        ])
                      }
                        
                      else {
                        codigomoneda= 'CRC',
                        monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                        subtotal+=Number(elemento.subtotal),
                        totalservgravados+=Number(elemento.totalservgravados),
                        totalservexentos+=Number(elemento.totalservexentos),
                        totalservexonerado+=Number(elemento.totalservexonerado),
                        totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                        totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                        totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                        totalgravado+=Number(elemento.totalgravado),
                        totalexento+=Number(elemento.totalexento),
                        totalexonerado+=Number(elemento.totalexonerado),
                        totalventa+=Number(elemento.totalventa),
                        totalventaneta+=Number(elemento.totalventaneta),
                        totalimpuesto+=Number(elemento.totalimpuesto),
                        totalcomprobante+=Number(elemento.totalcomprobante),
                        TotalOtrosCargos += Number(elemento.TotalOtrosCargos);

                        arr.push([
                          proveedor,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          elemento.codigomoneda,
                          elemento.tipocambio,
                          elemento.plazo_credito,
                          elemento.porcentaje_descuento_total,
                          elemento.monto_descuento_total,
                          elemento.subtotal,
                          elemento.totalservgravados,
                          elemento.totalservexentos,
                          elemento.totalservexonerado,
                          elemento.totalmercanciasgravadas,
                          elemento.totalmercanciasexentas,
                          elemento.totalmercanciaexonerada,
                          elemento.totalgravado,
                          elemento.totalexento,
                          elemento.totalexonerado,
                          elemento.totalventa,
                          elemento.totaldescuentos,
                          elemento.totalventaneta,
                          elemento.totalimpuesto,
                          elemento.totalcomprobante,
                          elemento.totalIVADevuelto,
                          (elemento.TotalOtrosCargos == null) ? '0' : elemento.TotalOtrosCargos,
                          (elemento.estadoHacienda == null) ? '' : elemento.estadoHacienda
                        ])
                      }
                    }
                  });

                  arrTotales.push([
                    codigomoneda,
                    monto_descuento_total,
                    subtotal,
                    totalservgravados,
                    totalservexentos,
                    totalservexonerado,
                    totalmercanciasgravadas,
                    totalmercanciasexentas,
                    totalmercanciaexonerada,
                    totalgravado,
                    totalexento,
                    totalexonerado,
                    totalventa,
                    totaldescuentos,
                    totalventaneta,
                    totalimpuesto,
                    totalcomprobante,
                    TotalOtrosCargos
                  ]);

                  monto_descuento_total=0,
                  subtotal=0,
                  totalservgravados=0,
                  totalservexentos=0,
                  totalservexonerado=0,
                  totalmercanciasgravadas=0,
                  totalmercanciasexentas=0,
                  totalmercanciaexonerada=0,
                  totalgravado=0,
                  totalexento=0,
                  totalexonerado=0,
                  totalventa=0,
                  totaldescuentos=0,
                  totalventaneta=0,
                  totalimpuesto=0,
                  totalcomprobante=0,
                  TotalOtrosCargos=0;

                  


                  //DOLARES
                  arr.push(["FACURAS EN DOLARES"]);
                  arr.push([""]);
                  arr.push([""]);

                  obj.forEach(elemento => {
        
                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
                    
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
                    if(typeof elemento.proveedor_nombre_comercial === 'undefined' || elemento.proveedor_nombre_comercial == ""){
                      proveedor = elemento.proveedor_nombre;
                    } else if(typeof elemento.proveedor_nombre === 'undefined' || elemento.proveedor_nombre == ""){
                      proveedor = elemento.proveedor_nombre_comercial;
                    } else if((typeof elemento.proveedor_nombre_comercial !== 'undefined' && elemento.proveedor_nombre_comercial.length > 0)
                            && (typeof elemento.proveedor_nombre !== 'undefined' && elemento.proveedor_nombre.length > 0) ){
                          proveedor = elemento.proveedor_nombre_comercial;
                      }
        
                    if(elemento.codigomoneda == 'USD'){

                       if(elemento.claveReferencia) {
                        codigomoneda= 'USD',
                        monto_descuento_total-=totaldescuentos+=Number(elemento.totaldescuentos),
                        subtotal-=Number(elemento.subtotal),
                        totalservgravados-=Number(elemento.totalservgravados),
                        totalservexentos-=Number(elemento.totalservexentos),
                        totalservexonerado-=Number(elemento.totalservexonerado),
                        totalmercanciasgravadas-=Number(elemento.totalmercanciasgravadas),
                        totalmercanciasexentas-=Number(elemento.totalmercanciasexentas),
                        totalmercanciaexonerada-=Number(elemento.totalmercanciaexonerada),
                        totalgravado-=Number(elemento.totalgravado),
                        totalexento-=Number(elemento.totalexento),
                        totalexonerado-=Number(elemento.totalexonerado),
                        totalventa-=Number(elemento.totalventa),
                        totalventaneta-=Number(elemento.totalventaneta),
                        totalimpuesto-=Number(elemento.totalimpuesto),
                        totalcomprobante-=Number(elemento.totalcomprobante),
                        TotalOtrosCargos -= Number(elemento.TotalOtrosCargos);

                        arr.push([
                          proveedor,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          elemento.codigomoneda,
                          elemento.tipocambio,
                          elemento.plazo_credito,
                          -elemento.porcentaje_descuento_total,
                          -elemento.monto_descuento_total,
                          -elemento.subtotal,
                          -elemento.totalservgravados,
                          -elemento.totalservexentos,
                          -elemento.totalservexonerado,
                          -elemento.totalmercanciasgravadas,
                          -elemento.totalmercanciasexentas,
                          -elemento.totalmercanciaexonerada,
                          -elemento.totalgravado,
                          -elemento.totalexento,
                          -elemento.totalexonerado,
                          -elemento.totalventa,
                          -elemento.totaldescuentos,
                          -elemento.totalventaneta,
                          -elemento.totalimpuesto,
                          -elemento.totalcomprobante,
                          -elemento.totalIVADevuelto,
                          (elemento.TotalOtrosCargos == null) ? '0' : -elemento.TotalOtrosCargos,
                          (elemento.estadoHacienda == null) ? '' : elemento.estadoHacienda
                        ])
                       } else  {
                          codigomoneda= 'USD',
                          monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                          subtotal+=Number(elemento.subtotal),
                          totalservgravados+=Number(elemento.totalservgravados),
                          totalservexentos+=Number(elemento.totalservexentos),
                          totalservexonerado+=Number(elemento.totalservexonerado),
                          totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                          totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                          totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                          totalgravado+=Number(elemento.totalgravado),
                          totalexento+=Number(elemento.totalexento),
                          totalexonerado+=Number(elemento.totalexonerado),
                          totalventa+=Number(elemento.totalventa),
                          totalventaneta+=Number(elemento.totalventaneta),
                          totalimpuesto+=Number(elemento.totalimpuesto),
                          totalcomprobante+=Number(elemento.totalcomprobante),
                          TotalOtrosCargos += Number(elemento.TotalOtrosCargos);

                        arr.push([
                          proveedor,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          elemento.codigomoneda,
                          elemento.tipocambio,
                          elemento.plazo_credito,
                          elemento.porcentaje_descuento_total,
                          elemento.monto_descuento_total,
                          elemento.subtotal,
                          elemento.totalservgravados,
                          elemento.totalservexentos,
                          elemento.totalservexonerado,
                          elemento.totalmercanciasgravadas,
                          elemento.totalmercanciasexentas,
                          elemento.totalmercanciaexonerada,
                          elemento.totalgravado,
                          elemento.totalexento,
                          elemento.totalexonerado,
                          elemento.totalventa,
                          elemento.totaldescuentos,
                          elemento.totalventaneta,
                          elemento.totalimpuesto,
                          elemento.totalcomprobante,
                          elemento.totalIVADevuelto,
                          (elemento.TotalOtrosCargos == null) ? '0' : elemento.TotalOtrosCargos,
                          (elemento.estadoHacienda == null) ? '' : elemento.estadoHacienda
                        ])
                       }
                    }
                  });

                  arrTotales.push([
                    codigomoneda,
                    monto_descuento_total,
                    subtotal,
                    totalservgravados,
                    totalservexentos,
                    totalservexonerado,
                    totalmercanciasgravadas,
                    totalmercanciasexentas,
                    totalmercanciaexonerada,
                    totalgravado,
                    totalexento,
                    totalexonerado,
                    totalventa,
                    totaldescuentos,
                    totalventaneta,
                    totalimpuesto,
                    totalcomprobante,
                    TotalOtrosCargos
                  ]);

                  arr.push(["TOTALES POR MONEDA"]);
                  arr.push([""]);
                  arr.push([""]);
                  arr.push(["Moneda","Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                  "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                  "Total \n Comprobante", "Otros Cargos"]);
                  arr.push(arrTotales[0]);
                  arr.push(arrTotales[1]);

                } else if(tipoComprobante == '04_01'){
                  header = ["Cliente", "Clavenumérica", "Consecutivo", "Número Interno","Número Documento", "Tipo Factura", 
                                  "Fecha","Condición Venta", "Medio Pago","Moneda","Tipo Cambio","Plazo Cŕedito",
                                  "Porcentaje \n Descuento", "Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                                  "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                                  "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                                  "Total Exonerado", "Total Venta", "Venta Neta", "Total Impuesto",
                                  "Total \n Comprobante","IVA Devuelto", "Otros Cargos", "Estado"];
        
                                  tipoFactura ='';
                                  let titulo = 'Reporte Facturas y Tiquetes';

                    arr.push(["FACURAS EN COLONES"]);
                    arr.push([""]);
                    arr.push([""]);
                  
                    obj.forEach(elemento => {
        
                      switch (elemento.tipo_factura) {
                        case '01':
                          tipoFactura = 'Factura Electrónica';
                          break;
                        case '04':
                          tipoFactura = 'Tiquete Electrónico';
                          break;
                        case '03':
                          tipoFactura = 'Nota Crédito';
                          break;
                        default:
                          throw new Error('El valor para el tipo de factura no esta dentro de los parametros permitidos');
                      }
            
                      switch (elemento.medio_pago) {
                        case '01':
                          medioPago = 'Efectivo';
                          break;
                        case '02':
                          medioPago = 'Tarjeta';
                          break;
                        case '03':
                          medioPago = 'Cheque';
                          break;
                        case '04':
                          medioPago = 'Depósito bancario';
                          break;
                        case '05':
                          medioPago = 'Recaudado por terceros';
                          break;
                        case '99':
                          medioPago = 'Otros';
                          break;
                      }
            
                      switch (elemento.condicion_venta) {
                        case '01':
                          condicionVenta = 'Contado';
                          break;
                        case '02':
                          condicionVenta = 'Crédito';
                          break;
                      }
            
                    
                      if(elemento.codigomoneda == 'CRC'){
                        arr.push([(typeof elemento.cliente_nombre == null) ? '' : elemento.cliente_nombre,
                          elemento.clavenumerica,
                          elemento.consecutivo,
                          elemento.numero_interno,
                          elemento.num_documento.toString(),
                          tipoFactura,
                          elemento.fecha_factura,
                          condicionVenta,
                          medioPago,
                          elemento.codigomoneda,
                          Number(elemento.tipocambio),
                          Number(elemento.plazo_credito),
                          Number(elemento.porcentaje_descuento_total),
                          Number(elemento.monto_descuento_total),
                          Number(elemento.subtotal),
                          Number(elemento.totalservgravados),
                          Number(elemento.totalservexentos),
                          Number(elemento.totalservexonerado),
                          Number(elemento.totalmercanciasgravadas),
                          Number(elemento.totalmercanciasexentas),
                          Number(elemento.totalmercanciaexonerada),
                          Number(elemento.totalgravado),
                          Number(elemento.totalexento),
                          Number(elemento.totalexonerado),
                          Number(elemento.totalventa),
                          Number(elemento.totaldescuentos),
                          Number(elemento.totalventaneta),
                          Number(elemento.totalimpuesto),
                          Number(elemento.totalcomprobante),
                          Number(elemento.totalIVADevuelto),
                          (elemento.TotalOtrosCargos == null) ? 0 : Number(elemento.TotalOtrosCargos),
                          (elemento.status_factura == null) ? '' : elemento.status_factura
                        ])
                        codigomoneda= 'CRC',
                        monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                        subtotal+=Number(elemento.subtotal),
                        totalservgravados+=Number(elemento.totalservgravados),
                        totalservexentos+=Number(elemento.totalservexentos),
                        totalservexonerado+=Number(elemento.totalservexonerado),
                        totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                        totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                        totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                        totalgravado+=Number(elemento.totalgravado),
                        totalexento+=Number(elemento.totalexento),
                        totalexonerado+=Number(elemento.totalexonerado),
                        totalventa+=Number(elemento.totalventa),
                        totalventaneta+=Number(elemento.totalventaneta),
                        totalimpuesto+=Number(elemento.totalimpuesto),
                        totalcomprobante+=Number(elemento.totalcomprobante),
                        TotalOtrosCargos += Number(elemento.TotalOtrosCargos);
                      } 
                  });

                  arrTotales.push([
                    codigomoneda,
                    monto_descuento_total,
                    subtotal,
                    totalservgravados,
                    totalservexentos,
                    totalservexonerado,
                    totalmercanciasgravadas,
                    totalmercanciasexentas,
                    totalmercanciaexonerada,
                    totalgravado,
                    totalexento,
                    totalexonerado,
                    totalventa,
                    totaldescuentos,
                    totalventaneta,
                    totalimpuesto,
                    totalcomprobante,
                    TotalOtrosCargos
                  ]);

                  monto_descuento_total=0,
                  subtotal=0,
                  totalservgravados=0,
                  totalservexentos=0,
                  totalservexonerado=0,
                  totalmercanciasgravadas=0,
                  totalmercanciasexentas=0,
                  totalmercanciaexonerada=0,
                  totalgravado=0,
                  totalexento=0,
                  totalexonerado=0,
                  totalventa=0,
                  totaldescuentos=0,
                  totalventaneta=0,
                  totalimpuesto=0,
                  totalcomprobante=0,
                  TotalOtrosCargos=0;
                  arr.push(["FACURAS EN DÓLARES"]);
                    arr.push([""]);
                    arr.push([""]);

                  obj.forEach(elemento => {
                    
                    switch (elemento.tipo_factura) {
                      case '01':
                        tipoFactura = 'Factura Electrónica';
                        break;
                      case '04':
                        tipoFactura = 'Tiquete Electrónico';
                        break;
                      case '03':
                        tipoFactura = 'Nota Crédito';
                        break;
                      default:
                        throw new Error('El valor para el tipo de factura no esta dentro de los parametros permitidos');
                    }
          

                    switch (elemento.medio_pago) {
                      case '01':
                        medioPago = 'Efectivo';
                        break;
                      case '02':
                        medioPago = 'Tarjeta';
                        break;
                      case '03':
                        medioPago = 'Cheque';
                        break;
                      case '04':
                        medioPago = 'Depósito bancario';
                        break;
                      case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                      case '99':
                        medioPago = 'Otros';
                        break;
                    }
          
                    switch (elemento.condicion_venta) {
                      case '01':
                        condicionVenta = 'Contado';
                        break;
                      case '02':
                        condicionVenta = 'Crédito';
                        break;
                    }
          
                  
                    if(elemento.codigomoneda == 'USD'){
                      arr.push([(typeof elemento.cliente_nombre == null) ? '' : elemento.cliente_nombre,
                        elemento.clavenumerica,
                        elemento.consecutivo,
                        elemento.numero_interno,
                        elemento.num_documento.toString(),
                        tipoFactura,
                        elemento.fecha_factura,
                        condicionVenta,
                        medioPago,
                        elemento.codigomoneda,
                        Number(elemento.tipocambio),
                        Number(elemento.plazo_credito),
                        Number(elemento.porcentaje_descuento_total),
                        Number(elemento.monto_descuento_total),
                        Number(elemento.subtotal),
                        Number(elemento.totalservgravados),
                        Number(elemento.totalservexentos),
                        Number(elemento.totalservexonerado),
                        Number(elemento.totalmercanciasgravadas),
                        Number(elemento.totalmercanciasexentas),
                        Number(elemento.totalmercanciaexonerada),
                        Number(elemento.totalgravado),
                        Number(elemento.totalexento),
                        Number(elemento.totalexonerado),
                        Number(elemento.totalventa),
                        Number(elemento.totaldescuentos),
                        Number(elemento.totalventaneta),
                        Number(elemento.totalimpuesto),
                        Number(elemento.totalcomprobante),
                        Number(elemento.totalIVADevuelto),
                        (elemento.TotalOtrosCargos == null) ? 0 : Number(elemento.TotalOtrosCargos),
                        (elemento.status_factura == null) ? '' : elemento.status_factura
                      ])
                      

                      codigomoneda= 'USD',
                      monto_descuento_total+=totaldescuentos+=Number(elemento.totaldescuentos),
                      subtotal+=Number(elemento.subtotal),
                      totalservgravados+=Number(elemento.totalservgravados),
                      totalservexentos+=Number(elemento.totalservexentos),
                      totalservexonerado+=Number(elemento.totalservexonerado),
                      totalmercanciasgravadas+=Number(elemento.totalmercanciasgravadas),
                      totalmercanciasexentas+=Number(elemento.totalmercanciasexentas),
                      totalmercanciaexonerada+=Number(elemento.totalmercanciaexonerada),
                      totalgravado+=Number(elemento.totalgravado),
                      totalexento+=Number(elemento.totalexento),
                      totalexonerado+=Number(elemento.totalexonerado),
                      totalventa+=Number(elemento.totalventa),
                      totalventaneta+=Number(elemento.totalventaneta),
                      totalimpuesto+=Number(elemento.totalimpuesto),
                      totalcomprobante+=Number(elemento.totalcomprobante),
                      TotalOtrosCargos += Number(elemento.TotalOtrosCargos);
                    } 
                });

                arrTotales.push([
                  codigomoneda,
                  monto_descuento_total,
                  subtotal,
                  totalservgravados,
                  totalservexentos,
                  totalservexonerado,
                  totalmercanciasgravadas,
                  totalmercanciasexentas,
                  totalmercanciaexonerada,
                  totalgravado,
                  totalexento,
                  totalexonerado,
                  totalventa,
                  totaldescuentos,
                  totalventaneta,
                  totalimpuesto,
                  totalcomprobante,
                  TotalOtrosCargos
                ])
                arr.push(["TOTALES POR MONEDA"]);
                arr.push([""]);
                arr.push([""]);
                arr.push(["Moneda","Monto \n Descuento","Subtotal", "Servicios \n Gravados",
                "Servicios \n Exentos", "Servicios \n Exonerados","Merncacías \n Gravadas", 
                "Merncacías \n Exentas","Merncacías \n Exoneradas","Total Gravado", "Total Exento",
                "Total Exonerado", "Total Venta", "Total Descuentos", "Venta Neta", "Total Impuesto",
                "Total \n Comprobante", "Otros Cargos"]);
                arr.push(arrTotales[0]);
                arr.push(arrTotales[1]);
                tipoFactura = titulo;
                }
          
              //const objetoExcel = this.objetoADatosExcel(datos);
              //this.descargarExcel(objetoExcel);
        
              let workbook = new Workbook();
              let worksheet = workbook.addWorksheet('Reporte Facturas');
              let headerRow = worksheet.addRow(header);
        
        
              /*headerRow.eachCell((cell, number) => {
                cell.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'FFFFFF00' },
                  bgColor: { argb: 'FFFFFF00' }
                }
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
              })
              */
              arr.forEach(d => {
                let row = worksheet.addRow(d);
                let ventaneta = row.getCell(25);
                /*let color = 'FF99FF99';
                if (+ventaneta.value < 500) {
                  color = 'FF9999'
                }
                ventaneta.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: color }
                }*/
              }
              );
              worksheet.getColumn(3).width = 30;
              worksheet.getColumn(4).width = 30;
              worksheet.addRow([]);
              //Footer Row
             /* let footerRow = worksheet.addRow(['']);
              footerRow.getCell(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFCCFFE5' }
              };
              footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
              
              //Merge Cells
              worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);*/
              //Generate Excel File with given name
              workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fs.saveAs(blob, `reporte ${tipoFactura}.xlsx`);
              })
          }
        }
      } else {
        this.router.navigate(['/login']);
      }
    } catch(err){
      console.log(err);
    }
  }
}


/*reporteExcel(obj: any) {
    if (typeof obj === 'undefined' || obj == null) {
      alert('No hay datos para exportar');
      return;
    } else {
        // tslint:disable-next-line: one-variable-per-declaration
        let tipoFactura = '',
            condicionVenta = '',
            medioPago = '';
        const datos = obj.map(elemento => {

          switch (elemento.tipo_factura) {
            case '01':
              tipoFactura = 'Factura Electrónica';
              break;
            case '04':
              tipoFactura = 'Tiquete Electrónico';
              break;
            case '03':
              tipoFactura = 'Nota Crédito';
              break;
            default:
              throw new Error('El valor para el tipo de factura no esta dentro de los parametros permitidos');
          }

          switch (elemento.medio_pago) {
            case '01':
              medioPago = 'Efectivo';
              break;
            case '02':
              medioPago = 'Tarjeta';
              break;
            case '03':
              medioPago = 'Cheque';
              break;
            case '04':
              medioPago = 'Depósito bancario';
              break;
            case '05':
              medioPago = 'Recaudado por terceros';
              break;
            case '99':
              medioPago = 'Otros';
              break;
          }

          switch (elemento.condicion_venta) {
            case '01':
              condicionVenta = 'Contado';
              break;
            case '02':
              condicionVenta = 'Crédito';
              break;
          }

          return {
            Cliente: (typeof elemento.cliente_nombre === 'undefined') ? '' : elemento.cliente_nombre,
            Clavenumerica: elemento.clavenumerica,
            Consecutivo: elemento.consecutivo,
            NumeroInterno: elemento.numero_interno,
            TipoComprobante: tipoFactura,
            Fecha: elemento.fecha_factura,
            CondicionVenta: condicionVenta,
            MedioPago: medioPago,
            CodigoMoneda: elemento.codigomoneda,
            TipoCambio: elemento.tipocambio,
            PlazoCredito: elemento.plazo_credito,
            PorcentajeDescuento: elemento.porcentaje_descuento_total,
            MontoDescuento: elemento.monto_descuento_total,
            Subtotal: elemento.subtotal,
            ServiciosGravados: elemento.totalservgravados,
            ServiciosExentos: elemento.totalservexentos,
            ServiciosExonerados: elemento.totalservexonerado,
            MercanciasGravadas: elemento.totalmercanciasgravadas,
            MercanciasExentas: elemento.totalmercanciasexentas,
            MercanciasExoneradas: elemento.totalmercanciaexonerada,
            TotalGravado: elemento.totalgravado,
            TotalExento: elemento.totalexento,
            TotalExonerado: elemento.totalexonerado,
            TotalVenta: elemento.totalventa,
            TotalDescuentos: elemento.totaldescuentos,
            TotalVentaNeta: elemento.totalventaneta,
            TotalImpuestos: elemento.totalimpuesto,
            TotalFactura: elemento.totalcomprobante,
            TotalIVADevuelto: elemento.totalIVADevuelto,
            TotalOtrosCargos: (elemento.TotalOtrosCargos == null) ? '0' : elemento.TotalOtrosCargos,
            Estado: (elemento.status_factura == null) ? '' : elemento.status_factura
          };
        });

        const objetoExcel = this.objetoADatosExcel(datos);
        this.descargarExcel(objetoExcel);
    }
  }

  objetoADatosExcel(objeto){
    const excelFilas = [];
    const cabeceras = Object.keys(objeto[0]);
    excelFilas.push(cabeceras.join(','));
    for (const fila of objeto) {
      const valor = cabeceras.map(cabecera => {
        const filaEscapada = fila[cabecera].replace(/"/g, '\\"');
        return `"${filaEscapada}"`;
      });
      excelFilas.push(valor);
    }
    return excelFilas.join('\n');
  }

  descargarExcel(objeto){
    // obtener la fecha para agregarla al nombre del archivo a exportar
    // tslint:disable-next-line: one-variable-per-declaration
    let mesFecha, anioFecha, diaFecha;
    const fechaBusqueda = new Date();
    mesFecha = Number(fechaBusqueda.getMonth()) + 1;
    diaFecha = Number(fechaBusqueda.getDate()) + 1;
    anioFecha = fechaBusqueda.getFullYear();

    if (mesFecha < 10) { mesFecha = '0' + String(mesFecha); }
    if (diaFecha < 10) { diaFecha = '0' + String(diaFecha); }
    const fechaFinal = anioFecha + '_' + mesFecha + '_' + diaFecha;

    // CREAR EL OBJETO BINARIO PARA EXPORTAR EL EXCEL
    const datosExcel = new Blob([objeto], {type : 'application/vnd.ms-excel'});
    const url = window.URL.createObjectURL(datosExcel);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'listado de Comprobantes_' + fechaFinal + '.xlsx');
    document.body.appendChild(a);
    a.click(); // se descarga el archivo
    document.body.removeChild(a);
  }*/