import { RecepcionService } from './recepcion.service';
import { ConsultaService } from './consulta.service';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReporteComprasService {

  constructor(//cambio
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private consultaService: ConsultaService,
    private recepcionService: RecepcionService
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

      this.recepcionService.condicionImpuesto().subscribe((response: any) => {
        this.condicionImpuesto = response.condicionImpuesto
      })
    }
    tiposDocumento = [];
    medioPago = [];
    condicionVenta = [];
    condicionImpuesto = [];
    token = this.usuarioService.obtenerToken();


    obtenerFacturas(obj){
      const headers = new HttpHeaders({
        'Authorization': 'bearer '+this.token,
        'Content-Type': 'application/json'
      });

      return this.http.post<string>(baseURL() +'/entradas/', obj,{headers, responseType: 'text' as 'json'});
    }


  reporteExcel(obj){
      if(obj.length === 0 || typeof obj === 'undefined'){
        return;
      }  else  {

        let titulo = 'Reporte de Compras',
            arr= [], subtotal = 0, totalcomprobante = 0, totalimpuesto = 0, totalDescuento = 0, TotalOtrosCargos = 0,
            tipoFactura = '', tipoComprobante = null, medioPago = null, condicionVenta = null, condicionImpuesto= null;
            const {encabezados, totales} = obj;
            const header = ["Clavenumérica","Fecha", "Proveedor","Número Interno","Tipo Factura","Medio Pago","Condición Impuesto","Condición Venta","Moneda","Tipo Cambio","Descuentos","Servicios Gravados","Servicios Exentos", "Servicios Exonerados","Mercancías Gravadas","Mercancías Exentas", "Mercancías Exoneradas","Total Gravado", "Total Exento","Total Exonerado",
            "Total Venta","Venta Neta","Subtotal","Total Impuesto","Otros Cargos","Total Factura"];
            let workbook = new Workbook();
            let worksheet = workbook.addWorksheet('Reporte Facturas');
            let headerRow = worksheet.addRow(header);
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
            tipoFactura = elemento.clavenumerica.substring(29, 31);
            
            if(elemento.codigomoneda == 'CRC'){
              
              if(tipoFactura === '03'){
   
                arr.push([
                  elemento.clavenumerica,
                  elemento.fecha,
                  elemento.proveedor_nombre,
                  elemento.numero_interno,
                  typeof tipoComprobante[0] === 'undefined'? '' :tipoComprobante[0].descripcion,
                  typeof  medioPago[0] === 'undefined' ? '' : medioPago[0].medio,
                  typeof condicionImpuesto[0] === 'undefined' ? '': condicionImpuesto[0].descripcion,
                  typeof condicionVenta[0] === 'undefined'? '' : condicionVenta[0].condicion,
                  elemento.codigomoneda,
                  Number(elemento.tipocambio),
                  - Number(elemento.totaldescuentos),
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
                  - Number(elemento.totalventaneta),
                  - Number(elemento.subtotal),
                  - Number(elemento.totalimpuesto),
                  elemento.TotalOtrosCargos == null ? 0 : - Number.parseInt(elemento.TotalOtrosCargos),
                  - Number(elemento.totalcomprobante)
                ])
              } else {
   
                arr.push([
                   elemento.clavenumerica,
                  elemento.fecha,
                  elemento.proveedor_nombre,
                  elemento.numero_interno,
                  typeof tipoComprobante[0] === 'undefined'? '' :tipoComprobante[0].descripcion,
                  typeof  medioPago[0] === 'undefined' ? '' : medioPago[0].medio,
                  typeof condicionImpuesto[0] === 'undefined' ? '': condicionImpuesto[0].descripcion,
                  typeof condicionVenta[0] === 'undefined'? '' : condicionVenta[0].condicion,
                  elemento.codigomoneda,
                  Number(elemento.tipocambio),
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
                  elemento.TotalOtrosCargos == null ? 0 : Number(elemento.TotalOtrosCargos),
                  Number(elemento.totalcomprobante)
                ])
              }
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
          condicionVenta = this.medioPago.filter(condicionV => condicionV.id == elemento.medio_pago);
          condicionImpuesto = this.medioPago.filter(condicionI => condicionI.id == elemento.medio_pago);

          tipoFactura = elemento.clavenumerica.substring(29, 31);
          
          if(elemento.codigomoneda == 'USD'){
            console.log("otros cargos ",typeof elemento.TotalOtrosCargos);
                console.log("Number ", Number(elemento.TotalOtrosCargos));
              if(tipoFactura === '03'){
              arr.push([
                elemento.clavenumerica,
                elemento.fecha,
                elemento.proveedor_nombre,
                elemento.numero_interno,
                typeof tipoComprobante[0] === 'undefined'? '' :tipoComprobante[0].descripcion,
                  typeof  medioPago[0] === 'undefined' ? '' : medioPago[0].medio,
                  typeof condicionImpuesto[0] === 'undefined' ? '': condicionImpuesto[0].descripcion,
                  typeof condicionVenta[0] === 'undefined'? '' : condicionVenta[0].condicion,
                elemento.codigomoneda,
                Number(elemento.tipocambio),
                - Number(elemento.totaldescuentos),
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
                - Number(elemento.totalventaneta),
                - Number(elemento.subtotal),
                - Number(elemento.totalimpuesto),
                elemento.TotalOtrosCargos == null ? 0 : - Number.parseInt(elemento.TotalOtrosCargos),
                - Number(elemento.totalcomprobante)
              ])
            } else {
 
              arr.push([
                 elemento.clavenumerica,
                elemento.fecha,
                elemento.proveedor_nombre,
                elemento.numero_interno,
                typeof tipoComprobante[0] === 'undefined'? '' :tipoComprobante[0].descripcion,
                  typeof  medioPago[0] === 'undefined' ? '' : medioPago[0].medio,
                  typeof condicionImpuesto[0] === 'undefined' ? '': condicionImpuesto[0].descripcion,
                  typeof condicionVenta[0] === 'undefined'? '' : condicionVenta[0].condicion,
                elemento.codigomoneda,
                Number(elemento.tipocambio),
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
                elemento.TotalOtrosCargos == null? 0 : Number(elemento.TotalOtrosCargos),
                Number(elemento.totalcomprobante)
              ])
            }
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
            fs.saveAs(blob, `${titulo}.xlsx`);
          })
        }
    }


    reporteWeb(obj,filtros){
      const tipoReporte = 'Compras'; 
      const tipoComprobante = '05'
      localStorage.setItem("comprobantes", JSON.stringify(obj));
      localStorage.setItem("filtros", JSON.stringify(filtros));
      localStorage.setItem("tipoReporte", tipoReporte);
      
      const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
    }
}
