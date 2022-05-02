import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class FacturaDetalladoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {

   }

   private token = this.usuarioService.obtenerToken();

   obtenerReporteFacturasDetallado(obj){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });
    // /factura/comprobantes/total/detallados/
    return this.http.post<string>( baseURL() +'/factura/comprobantes/total/detallados/',obj,{headers, responseType: 'text' as 'json'});
   }
   

  reporteExcel(obj){

    const headersFactura = ["Fecha","Clavenumérica","Número Documento","Cliente","TipoCambio","Moneda","Monto Total","Descuento","Impuesto","Impuesto Servicio","Total"];
    const arr = [];
    const {factura, lineas,totales} = obj;
    const titulo = 'Reporte Facturación Detallado';
    factura.forEach(encabezado => {
      arr.push([
        encabezado.fecha_factura,
        encabezado.clave,
        encabezado.num_documento,
        encabezado.cliente,
        Number(encabezado.tipocambio),
        encabezado.moneda,
        Number(encabezado.montototal),
        Number(encabezado.descuentos),
        Number(encabezado.impuestos),
        Number(encabezado.otrosCargos),
        Number(encabezado.total)
      ])
      arr.push([
        'descripción',
        'cantidad',
        'montototal',
        'descuento',
        'impuesto',
        'impuesto servicio',
        'total + otros cargos'
      ])
      lineas.forEach(linea => {
        
        if(encabezado.idfactura === linea.idfactura){
          console.log(typeof linea.montototal);
          arr.push([
            linea.descripcioDetalle,
            linea.cantidad,
            typeof linea.montototal === 'string'? (linea.montototal * 1).toFixed(2): Number(linea.montototal).toFixed(2),
            Number(linea.montodescuento).toFixed(2),
            Number(linea.impuesto_neto).toFixed(2),
            linea.otrosCargos ? Number(linea.otrosCargos).toFixed(2): Number('0.00'),
            Number(linea.montoitotallinea).toFixed(2)
          ]);
        }
      });
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

    /*

     codigomoneda: 'CRC',
    totaldescuentos: '4885529.40000',
    totalservgravados: '13550629.80381',
    totalservexentos: '56000.00000',
    totalservexonerado: '11836570.19619',
    totalmercanciasgravadas: '7130254.28231',
    totalmercanciasexentas: '565000.00000',
    totalmercanciaexonerada: '5051779.71769',
    totalgravado: '20680884.09612',
    totalexento: '621000.00000',
    totalexonerado: '16888349.90388',
    totalventa: '38190234.00000',
    totalventaneta: '33304704.60000',
    subtotal: '33304717.00000',
    totalimpuesto: '1778985.69000',
    TotalOtrosCargos: '2033202.09000',
    totalcomprobante: '37116892.37000'

    
    */



    let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Reporte Facturas');
        let headerRow = worksheet.addRow(headersFactura);


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

  reporteWeb(obj,filtros){

  }
}
