import { UsuarioService } from './usuario.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export interface ResumenIVACompras {
  fechaInicio: string,
  fechaFin: string,
  moneda?:string 
}

@Injectable({
  providedIn: 'root'
})
export class ResumenIVAComprasService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { 
  }

  private token = this.usuarioService.obtenerToken();

  obtenerDatosReporte(obj: ResumenIVACompras){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() + '/entradas/resumen-iva/obtener-listado/',obj,{headers, responseType: 'text' as 'json'});
  }

  reporteExcel(obj,totales,encabezado){
    if(typeof obj === 'undefined' || typeof totales === 'undefined'){
      return;
    }

    console.log(encabezado);
    
    let arr = [];

    arr.push(['EMISOR: ',encabezado.nombre]);
    arr.push(['']);
    
    if(encabezado.fechaInicio != ''  && encabezado.fechaFin != ''){
      arr.push([`Rango de fechas entre ${encabezado.fechaInicio} y ${encabezado.fechaFin}`]);
    }

    arr.push(["Tarifa", "Subtotal","Subtotal Mercancías","Subtotal Servicios","Impuesto Mercancías","Impuesto Servicios"]);
    const titulo = 'Reporte IVA resumido Compras';
     
    

     obj.forEach(elemento => {
      arr.push([
        elemento.descripcion,
        elemento.subtotal,
        elemento.subMercancias,
        elemento.subServicios,
        elemento.impMercancias,
        elemento.impServicios,
      ])
     });

      arr.push(['Compras Totales',totales.subtotal,totales.subMercancias,totales.subServicios,totales.impMercancias,totales.impServicios]);

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Reporte Facturas');
      //let headerRow = worksheet.addRow(headers);

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
}
