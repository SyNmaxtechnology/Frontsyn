import { POSService } from './pos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReporteAjusteService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private posService: POSService,

  ) { }

  private token = this.usuarioService.obtenerToken();


  obtenerTiposAJuste(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/tipoMovimiento',{headers,responseType: 'text' as 'json'});
  }

  obtenerCategorias(){

    return this.posService.obtenerCategorias();
  }

  obtenerBodegas(){

    return this.usuarioService.obtenerBodegas();
  }

  obtenerAJustes(obj){
    // movimiento/obtener-ajustes

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.post<string>( baseURL() +'/movimiento/obtener-ajustes',obj,{headers,responseType: 'text' as 'json'});
  }


  reporteExcel(obj,tipo){

    let headers = null, arr = [];
    const titulo = 'Reporte de Ajustes';
    if(tipo == '01'){ // aplica group by
      //SUM(a.costoajuste) as total, a.tipomovimiento, 
      //c.descripcion as categoria, b.descripcion as bodega, ar.descripcion as articulo

      headers = ['Fecha','Articulo','Categoría','Bodega','Tipo Ajuste','Descripción','Total'];

      obj.forEach(linea => {
        arr.push([
          
          linea.fecha,
          linea.articulo,
          linea.categoria,
          linea.bodega,
          linea.tipoajuste,
          linea.descripcion,
          Number(linea.total)
        ])
      });

    } else { // es un select simple
      //costoajuste, fecha, descripcion, tipoajuste
      headers = ['ID','Fecha','Descripcion','Tipo Ajuste', 'Total'];
      obj.forEach(linea => {
        arr.push([
          linea.idajuste,
          linea.fecha,
          linea.descripcion,
          linea.tipoajuste,
          Number(linea.total)
        ])
      });
    }

    let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Reporte Existencia');
      let headerRow = worksheet.addRow(headers);
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
 //hacer DECLARACION DE HACIENDA 
  reporteWeb(obj,filtros,tipo){

    const tipoComprobante = '11';
    const tipoReporte = 'Ajustes';
    localStorage.setItem("comprobantes", JSON.stringify({
      comprobantes : obj,
      tipo
    }));
    
    localStorage.setItem("tipoReporte", tipoReporte);
    localStorage.setItem("filtros", JSON.stringify(filtros));
    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  }
}
