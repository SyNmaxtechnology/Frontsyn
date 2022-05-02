import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseURL} from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReporteFormaPagoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  token = this.usuarioService.obtenerToken(); 

  obtenerFacturas(obj){
    
    const headers = new HttpHeaders().set('Authorization','bearer '+this.token);
    return this.http.post<string>( baseURL() +'/factura/clientes/total/medio-Pago/',obj, {headers,responseType: 'text' as 'json'})
  }

  obtenerMediosPago(){
    const headers = new HttpHeaders().set('Authorization','bearer '+this.token);
    return this.http.get<string>( baseURL() +'/medioPago', {headers,responseType: 'text' as 'json'})
  }

  reporteExcel(obj){
    if(obj.length === 0 || typeof obj === 'undefined'){
      return;
    } else  {

      console.log(obj);
 
      let titulo = 'Reporte Venta por Forma de Pago',
          arr= [];
      const header = ["Cliente","Razón Social", "Clavenumérica", "Fecha", "Medio Pago", "Numero Documento",
                      "Subtotal", "Total Impuesto", "Impuesto Servicio", "Total"];
      
      const totales = obj.totales;
        
      for(const linea of obj.facturas){
        arr.push([
          linea.cliente_nombre,
          (linea.cliente_nombre_comercial == null )? '': linea.cliente_nombre_comercial,
          linea.clavenumerica,
          linea.fecha, 
          linea.medioPago,
          Number(linea.num_documento),
          Number(linea.subtotal),
          Number(linea.totalimpuesto),
          Number(linea.TotalOtrosCargos),
          Number(linea.totalcomprobante)
        ])
      }  
      arr.push(['']);
      arr.push(['']);
      arr.push(['TOTALES POR MONEDA']);
      arr.push([
        'Moneda',
        'Total Descuentos',
        'Servicios Gravados',
        'Servicios Exentos',
        'Servicios Exonerados',
        'Mercancías Gravadas',
        'Mercancías Exentas',
        'Total Gravado',
        'Total Exento',
        'Total Exonerado',
        'Total Venta',
        'Total Venta Neta',
        'Subtotal',
        'Total Impuesto',
        'TotalOtrosCargos',
        'totalcomprobante'
      ]);
  
      totales.forEach(element => {
        arr.push([
          element.codigomoneda,
          element.totaldescuentos,
          element.totalservgravados,
          element.totalservexentos,
          element.totalservexonerado,
          element.totalmercanciasgravadas,
          element.totalmercanciasexentas,
          element.totalmercanciaexonerada,
          element.totalgravado,
          element.totalexento,
          element.totalexonerado,
          element.totalventa,
          element.totalventaneta,
          element.subtotal,
          element.totalimpuesto,
          element.TotalOtrosCargos,
          element.totalcomprobante
        ]);
      });
      
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
          fs.saveAs(blob, `${titulo}.xlsx`);
        })
      }
  }

  reporteWeb(obj,filtros){
      
    const tipoReporte = 'FormaPago'; 
    
    localStorage.setItem("comprobantes", JSON.stringify(obj));
    localStorage.setItem("filtros", JSON.stringify(filtros));
    localStorage.setItem("tipoReporte", tipoReporte);
    
    const pestana = window.open('#/reporte/comprobantes/09', '_blank');
    pestana.focus();
  }
}
