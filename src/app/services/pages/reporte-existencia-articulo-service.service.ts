import { POSService } from './pos.service';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
UsuarioService
@Injectable({
  providedIn: 'root'
})
export class ReporteExistenciaArticuloServiceService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private posService: POSService
  ) { }

 private token = this.usuarioService.obtenerToken();

  obtenerBodegas(){

    return this.usuarioService.obtenerBodegas();
  }

  obtenerCategorias(){

    return this.posService.obtenerCategorias();
  }

  reporteExistenciaArticulos(obj){
    //
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.post<string>(baseURL() +'/obtener-existencia/bodega-categoria/',obj,{headers, responseType: 'text' as 'json'});

  }

  reporteExcel(obj){
    if(typeof obj.length !== 'undefined' && obj.length > 0){
      
      let titulo = 'Reporte Existencia de Artículos',arr= [];
      const header = ["Artículo","Categoría", "Bodega","Existencia Actual", "Existencia Anterior"];


      obj.forEach(element => {
        
        arr.push([
          element.nombre,
          element.categoria,
          element.descripcion, // bodega
          Number(element.existencia_actual),
          Number(element.existencia_anterior),
        ])
      }); 

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Reporte Existencia');
      let headerRow = worksheet.addRow(header);
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

    } else {
      return;
    }
  }

  reporteWeb(obj,filtros){


    const tipoReporte = 'Existencia'; 
    const tipoComprobante = '10'
    localStorage.setItem("comprobantes", JSON.stringify(obj));
    localStorage.setItem("filtros", JSON.stringify(filtros));
    localStorage.setItem("tipoReporte", tipoReporte);
    
    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
    pestana.focus();
    }
}
