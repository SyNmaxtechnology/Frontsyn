import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { baseURL } from '../../config/config'
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ReporteProductoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  token = this.usuarioService.obtenerToken();

  obtenerFacturas(obj){

    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    })

    return this.http.post<string>( baseURL() +'/factura/productos/total/aceptados/',obj,{headers, responseType: 'text' as 'json'});
  }

  reporteExcel(obj){
    if(obj.length === 0 || typeof obj === 'undefined'){
      return;
    } else  {
      console.log("Entró")
      console.log(obj)
      let titulo = 'Reporte Venta de Productos',
          arr= [];
      const header = ["ID","Producto", "Código", "Cantidad","Categoría", "Subtotal", "Total Impuesto", "Impuesto Servicio", "Total"];
           
        obj.facturas.forEach(elemento => {

          arr.push([
            elemento.id,
            elemento.descripcion,
            elemento.codigobarra_producto,
            Number(elemento.cantidad),
            elemento.categoria, 
            Number(elemento.subtotal),
            Number(elemento.totalimpuesto),
            Number(elemento.otroscargos),
            Number(elemento.totalcomprobante)
          ])
      });

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
      'Mercancías Exoneradas',
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
   
    obj.totales.forEach(element => {
      arr.push([
        element.codigomoneda,
        element.totaldescuentos,
        element.totalservgravados,
        element.totalservexentos,
        element.totalservexonerados,
        element.totalmercgravadas,
        element.totalmercanciasexentas,
        element.totalmercexoneradas,
        element.totalgravado,
        element.totalexento,
        element.totalExonerado,
        element.totalventa,
        element.totalventaneta,
        element.subtotal,
        element.totalimpuesto,
        element.otroscargos,
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
        
    const tipoReporte = 'Producto'; 
    
    localStorage.setItem("comprobantes", JSON.stringify(obj));
    localStorage.setItem("filtros", JSON.stringify(filtros));
    localStorage.setItem("tipoReporte", tipoReporte);
    
    const pestana = window.open('#/reporte/comprobantes/02', '_blank');
    pestana.focus();
  }
}
