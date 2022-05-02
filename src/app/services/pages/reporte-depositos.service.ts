import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export interface Depositos {
  fechaInicio: string;
  fechaFin: string;
} 

@Injectable({
  providedIn: 'root'
})

export class ReporteDepositosService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private token = this.usuarioService.obtenerToken();

  obtenerDatosReporteDepositos(obj: Depositos){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });//reporte-despositos

    return this.http.post<string>( baseURL() +'/reporte-despositos',obj,{headers, responseType: 'text' as 'json'});
  }

  reporteExcel(obj: any,filtros: Depositos){
    if(typeof obj === 'undefined'){
      return;
    } else {
      const {depositos, emisor} = obj;
      const { fechaInicio,fechaFin } = filtros;

      //const headers = ['Número Cuenta','Fecha','Tipo Movimiento','Descripción', 'Monto'];
      const titulo = 'Reporte Depósitos';
      let arr = [];
      arr.push([`Emisor: ${emisor}`])
      arr.push([''])
      arr.push([''])
      arr.push([`Rango de fechas entre ${fechaInicio} y ${fechaFin}`])
      arr.push([''])
      arr.push([''])
      arr.push(['Número Cuenta','Fecha','Tipo Movimiento','Descripción', 'Monto']);
      depositos.forEach(linea => {
        arr.push([
          linea.numctabanco,
          linea.fecha,
          linea.tipomovimiento,
          linea.descripcion,
          Number(linea.monto)
        ])
      });

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Reporte Depósitos');
      //let headerRow = worksheet.addRow(headers);
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

      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, `${titulo}.xlsx`);
      })
    }
  }

  reporteWeb(obj: any,filtros: Depositos){
    if(typeof obj  === 'undefined'){
      return;
    } else {

      const tipoComprobante = '17';
      const tipoReporte = 'Depositos';
      const {depositos} = obj;
      localStorage.setItem("comprobantes",JSON.stringify(depositos));
      localStorage.setItem("tipoReporte", tipoReporte);
      localStorage.setItem("filtros", JSON.stringify(filtros));
      const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
        pestana.focus();
    }
  }
}


