import { ResultadoEncuestaRequerimientoService } from './resultado-encuesta-requerimiento.service';
import { 
          ReporteRequerimiento,
          ResponseReporteRequerimiento,
          ReporteEncuestaRequerimientoPorClienteService 
} from './reporte-encuesta-requerimiento-por-cliente.service';
import { Injectable } from '@angular/core';
//import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class ReporteEncuestaRequerimientoPorRequerimientoService {

  constructor(
    private reporteEncuestaRequerimientoPorClienteService: ReporteEncuestaRequerimientoPorClienteService,
    private resultadoEncuestaRequerimientoService: ResultadoEncuestaRequerimientoService
  ) { }

  cargarPreguntas(){
    return this.resultadoEncuestaRequerimientoService.cargarPreguntas();
  }

  cargarDatosReporte(obj: ReporteRequerimiento){
    return this.reporteEncuestaRequerimientoPorClienteService.cargarDatosReporte(obj);
  }

  reporteExcel(obj: ResponseReporteRequerimiento, pregunta: string, fechas: {fechaInicio: string, fechaFin: string}){

    if(typeof obj === 'undefined') return;

    const {preguntas,requerimientos:{total,requerimientos}}= obj;
    const titulo = 'Reporte Encuesta Requerimiento por requerimiento';
    const headers = ["Requerimiento","Cantidad Seleccionado","% Coincidencia", "Cantidad Potencial"];
    let arr = [];
    let preguntasArr = requerimientos;
    if(pregunta.length > 0){
      arr.push(['','REQUERIMIENTO : '+pregunta]);
    }

    if(fechas.fechaInicio !== '' && fechas.fechaFin !== ''){
      arr.push(['','RANGO DE FECHAS ENTRE : '+fechas.fechaInicio+' Y '+fechas.fechaFin]);
    }

    arr.push(['',`TOTAL RESPUESTAS : ${total}`]);
    arr.push([]);
    console.log({requerimientos})
    preguntasArr.forEach(({pregunta,cantidadSeleccionado,coincidencia,cantidadPotencial}) => {
      arr.push(['PREGUNTA',pregunta]);
      arr.push(headers);
      preguntas.forEach(elemento => {
        
        if(pregunta === elemento.requerimiento){
          arr.push([
            pregunta,
            cantidadSeleccionado,
            coincidencia,
            cantidadPotencial
          ])
        }
      });
      arr.push([]);
      arr.push([]);
      preguntasArr = preguntasArr.filter(linea => linea.pregunta !== pregunta)
    })

    console.log(arr);

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte Encuesta Requerimiento');
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

  reporteWeb(obj: ResponseReporteRequerimiento, filtros: {pregunta: string, fechaInicio: string, fechaFin: string}) {
    
    if(typeof obj === 'undefined') return;

    const tipoComprobante = '21';
    const tipoReporte = 'ReporteRequerimientoPorRequerimiento';
    const {requerimientos: {total,requerimientos}} = obj; 
    const {pregunta, fechaInicio, fechaFin} = filtros;

    localStorage.setItem("comprobantes", JSON.stringify(requerimientos));
    localStorage.setItem("tipoReporte", tipoReporte);
    localStorage.setItem("filtros", JSON.stringify({pregunta, fechaInicio, fechaFin, total}));

    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
    pestana.focus();
  }

}
