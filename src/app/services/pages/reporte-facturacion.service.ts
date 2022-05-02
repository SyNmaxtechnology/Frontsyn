import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { ConsultaService } from './consulta.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReporteFacturacionService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private consultaService:ConsultaService
  ) { 

    this.consultaService.tipoDocumento().subscribe((response: any) => {
        
      this.tiposDocumento = response.tipoDocumento;
    })    

    this.consultaService.medioPago().subscribe((response: any) => {
      
      this.medioPago = response.medioPago;
    })  
    
    this.consultaService.condicionVenta().subscribe((response: any) => {
      
      this.condicionVenta = response.condicionVenta;
    })
  }

  token = this.usuarioService.obtenerToken();
  tiposDocumento = [];
  medioPago = [];
  condicionVenta = [];

  obtenerTiposDocumento(){
    const headers = new HttpHeaders().set('Authorization', 'bearer ' +this.token);
    return this.http.get<string>(baseURL() + '/tipoDocumento', {headers, responseType: 'text' as 'json'});
  }

  obtenerComprobantesAceptados(obj){

    const headers = new HttpHeaders({
      'Authorization': 'bearer ' +this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(baseURL() + '/factura/comprobantes/aceptados/',obj,{headers, responseType: 'text' as 'json'});
  }


  reporteExcel(obj, tipoComprobante){

    if(obj.length === 0 || typeof obj === 'undefined'){
      return;
    } else  {
      let tipoFactura = '',
          arr= [],
          header = null,
          cliente = '',
          tipoComprobante = null, medioPago = null, condicionVenta = null, condicionImpuesto= null;
     
      
        header = ["Fecha","Clavenumérica","Número Documento","Cliente","Moneda","TipoCambio","Tipo Factura","Medio Pago","Condición Venta","Descuentos","Servicios Gravados","Servicios Exentos", "Servicios Exonerados","Mercancías Gravadas","Mercancías Exentas", "Mercancías Exoneradas","Total Gravado", "Total Exento","Total Exonerado","Total Venta","Venta Neta","Subtotal","Total Impuesto","Otros Cargos","Total Factura"];
        tipoFactura = 'Facturacion';  
        
      let {encabezados,totales} = obj;
      console.log(obj);
        arr.push(['']);
        arr.push(['']);
        arr.push(['FACTURAS EN COLONES']);
        arr.push(['']);
        arr.push(['']);
        encabezados.forEach(elemento => {

        tipoComprobante = this.tiposDocumento.filter(tipo => tipo.codigo == elemento.tipo_factura);
        medioPago = this.medioPago.filter(medio => medio.id == elemento.medio_pago);
        condicionVenta = this.medioPago.filter(condicionV => condicionV.id == elemento.condicion_venta);
        condicionImpuesto = this.medioPago.filter(condicionI => condicionI.id == elemento.codicion_impuesto);
        if(elemento.cliente_nombre_comercial.length == 0 || elemento.cliente_nombre_comercial == ''
        &&  elemento.cliente_nombre != null || elemento.cliente_nombre != '' ){
          cliente =  elemento.cliente_nombre;
      } else if (elemento.cliente_nombre != null || elemento.cliente_nombre != ''
      &&  elemento.cliente_nombre_comercial != null ||elemento.cliente_nombre_comercial != ''){
        cliente =  elemento.cliente_nombre_comercial;
      }
       
        if(elemento.codigomoneda == 'CRC'){
          
          arr.push([
            elemento.fecha,
            elemento.clavenumerica,
            elemento.num_documento,
            cliente,
            elemento.codigomoneda,
            Number(elemento.tipocambio),
            tipoComprobante[0].descripcion,
            medioPago[0].medio,
            condicionVenta[0].condicion,
            Number(elemento.totaldescuentos),
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
            Number(elemento.totalventaneta),
            Number(elemento.subtotal),
            Number(elemento.totalimpuesto),
            Number(elemento.TotalOtrosCargos),
            Number(elemento.totalcomprobante)
          ])
        } 
    });


    arr.push(['']);
    arr.push(['']);
    arr.push(['FACTURAS EN DÓLARES']);
    arr.push(['']);
    arr.push(['']);
    encabezados.forEach(elemento => {

      tipoComprobante = this.tiposDocumento.filter(tipo => tipo.codigo == elemento.tipo_factura);
      medioPago = this.medioPago.filter(medio => medio.id == elemento.medio_pago);
      condicionVenta = this.medioPago.filter(condicionV => condicionV.id == elemento.condicion_venta);
      condicionImpuesto = this.medioPago.filter(condicionI => condicionI.id == elemento.codicion_impuesto);
      if(elemento.cliente_nombre_comercial.length == 0 || elemento.cliente_nombre_comercial == ''
      &&  elemento.cliente_nombre != null || elemento.cliente_nombre != '' ){
        cliente =  elemento.cliente_nombre;
    } else if (elemento.cliente_nombre != null || elemento.cliente_nombre != ''
    &&  elemento.cliente_nombre_comercial != null ||elemento.cliente_nombre_comercial != ''){
      cliente =  elemento.cliente_nombre_comercial;
    }      
      if(elemento.codigomoneda == 'USD'){
        
        arr.push([
          elemento.fecha,
          elemento.clavenumerica,
          elemento.num_documento,
          cliente,
          elemento.codigomoneda,
          Number(elemento.tipocambio),
          tipoComprobante[0].descripcion,
          medioPago[0].medio,
          condicionVenta[0].condicion,
          Number(elemento.totaldescuentos),
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
          Number(elemento.totalventaneta),
          Number(elemento.subtotal),
          Number(elemento.totalimpuesto),
          Number(elemento.TotalOtrosCargos),
          Number(elemento.totalcomprobante)
        ])
      } 
  });

  arr.push(['TOTALES POR MONEDA ']);
  arr.push(['']);
  arr.push(['']);
  arr.push(["Moneda","Descuentos","Servicios Gravados","Servicios Exentos", "Servicios Exonerados","Mercancías Gravadas","Mercancías Exentas", "Mercancías Exoneradas","Total Gravado", "Total Exento","Total Exonerado",
  "Total Venta","Venta Neta","Subtotal","Total Impuesto","Otros Cargos","Total Factura"])
  totales.forEach(elemento => {
    arr.push([
      elemento.codigomoneda,
      Number(elemento.totaldescuentos),
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
      Number(elemento.totalventaneta),
      Number(elemento.subtotal),
      Number(elemento.totalimpuesto),
      Number(elemento.TotalOtrosCargos),
      Number(elemento.totalcomprobante)
    ])
  });


       /* obj.forEach(elemento => {

            if(elemento.cliente_nombre_comercial == null || typeof elemento.cliente_nombre_comercial === 'undefined'
              &&  elemento.cliente_nombre != null || typeof elemento.cliente_nombre !== 'undefined' ){
                cliente =  elemento.cliente_nombre;
            } else if (elemento.cliente_nombre == null || typeof elemento.cliente_nombre === 'undefined'
            &&  elemento.cliente_nombre_comercial != null || typeof elemento.cliente_nombre_comercial !== 'undefined'){
              cliente =  elemento.cliente_nombre_comercial;
            }

            arr.push([
              elemento.fecha,
              elemento.clavenumerica,
              elemento.num_documento.toString().trim(),
              cliente,
              Number(elemento.tipocambio),
              elemento.codigomoneda,
              Number(elemento.subtotal),
              Number(elemento.totaldescuentos), // no viene el codigo
              Number(elemento.totalimpuesto),
              Number(elemento.TotalOtrosCargos),
              Number(elemento.totalcomprobante)
            ])
        });*/

     

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
          //let ventaneta = row.getCell(25);
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

  reporteWeb(obj, tipoComprobante, filtros){

    console.log("tipocomprovante", tipoComprobante);
    let tipoFactura = '',
          cliente = '';
    let {encabezados} = obj;
      if(tipoComprobante == '01'){
        console.log("01")
       encabezados.forEach(elemento => {

          tipoFactura = 'Factura Electrónica';

          if(elemento.cliente_nombre_comercial.length == 0 || elemento.cliente_nombre_comercial == ''
            &&  elemento.cliente_nombre != null || elemento.cliente_nombre != '' ){
              cliente =  elemento.cliente_nombre;
          } else if (elemento.cliente_nombre != null || elemento.cliente_nombre != ''
          &&  elemento.cliente_nombre_comercial != null ||elemento.cliente_nombre_comercial != ''){
            cliente =  elemento.cliente_nombre_comercial;
          } 
        });

      } else if (tipoComprobante == '04'){
        console.log("04")
        tipoFactura = 'Tiquete Electrónico';
      
       encabezados.forEach(elemento => {

          if(elemento.cliente_nombre_comercial.length == 0 || elemento.cliente_nombre_comercial == ''
            &&  elemento.cliente_nombre != null || elemento.cliente_nombre != '' ){
              cliente =  elemento.cliente_nombre;
          } else if (elemento.cliente_nombre != null || elemento.cliente_nombre != ''
          &&  elemento.cliente_nombre_comercial != null ||elemento.cliente_nombre_comercial != ''){
            cliente =  elemento.cliente_nombre_comercial;
          } 

      });
    } else {
      console.log("vacío");
       encabezados.forEach(elemento => {
          if(elemento.cliente_nombre_comercial == null || typeof elemento.cliente_nombre_comercial === 'undefined'
            &&  elemento.cliente_nombre != null || typeof elemento.cliente_nombre !== 'undefined' ){
              cliente =  elemento.cliente_nombre;
          } else if (elemento.cliente_nombre == null || typeof elemento.cliente_nombre === 'undefined'
          &&  elemento.cliente_nombre_comercial != null || typeof elemento.cliente_nombre_comercial !== 'undefined'){
            cliente =  elemento.cliente_nombre_comercial;
          } else {
            cliente = '';
          }

          tipoComprobante = '01';
          
      });
      filtros.tipoDocumento = '00';
    }

    const tipoReporte = 'Facturacion';
    
    localStorage.setItem("comprobantes", JSON.stringify(obj));
    localStorage.setItem("tipoReporte", tipoReporte);
    localStorage.setItem("filtros", JSON.stringify(filtros));
    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  }
}