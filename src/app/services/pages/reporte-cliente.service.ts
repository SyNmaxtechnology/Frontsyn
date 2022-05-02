import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReporteClienteService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService

  ) { }

  token = this.usuarioService.obtenerToken();


  obtenerFacturas(obj) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    })

    return this.http.post<string>(baseURL() + '/factura/clientes/total/aceptados/',obj,{headers, responseType: 'text' as 'json'});
  }

  reporteExcel(obj){
    console.log(obj)
    const header = ["ID","Nombre","Fecha","Subtotal","Total Impuesto","Impuesto Servicio","Total Comprobante"]
    let arr = []
    const titulo = 'Reporte Ventas Por Cliente';
    obj.facturas.forEach(elemento => {

        arr.push([
          elemento.id,
          elemento.nombre,
          elemento.fecha,
          Number(elemento.subtotal),
          Number(elemento.totalimpuesto),
          Number(elemento.otroscargos),
          Number(elemento.total)
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

        arr.forEach(d => {
          let row = worksheet.addRow(d);
        
        });
        worksheet.getColumn(3).width = 30;
        worksheet.getColumn(4).width = 30;
        worksheet.addRow([]);
   
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, `${titulo}.xlsx`);
        })
  }

  reporteWeb(obj,filtros){

    const tipoComprobante = '01';
    const tipoReporte = 'Cliente';
    localStorage.setItem("comprobantes", JSON.stringify(obj));
    localStorage.setItem("tipoReporte", tipoReporte);
    localStorage.setItem("filtros", JSON.stringify(filtros));
    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  6}
}