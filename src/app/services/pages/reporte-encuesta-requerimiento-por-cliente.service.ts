import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';
import { VisitaService } from './visita.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export interface ReporteRequerimiento {
  idcliente?: number | string;
  idpregunta?: number | string;
  tipoReporte: string;
  fechaInicio: string;
  fechaFin: string; 
}

export interface ResponseReporteRequerimiento {
  clientes? :{
    cliente: string;
    cantidad: number;
    requerimiento: string;
    pregunta: string;
    observaciones: string;
  }[],
  requerimientos?:{
    total: number 
    requerimientos: {
      pregunta: string;
      cantidadSeleccionado: number;
      coincidencia: number;
      cantidad?: number;
      cantidadPotencial?:number;
    }[]
  },
  preguntas?:{
    idpregunta: number,
    pregunta: string,
    requerimiento: string
  }[]
}
@Injectable({
  providedIn: 'root'
})

export class ReporteEncuestaRequerimientoPorClienteService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private visitaService: VisitaService
  ) { }

  private token = this.usuarioService.obtenerToken();

  cargarClientes() {
    return this.visitaService.obtenerClientes();
  }

  cargarDatosReporte(obj: ReporteRequerimiento){

    const headers = new HttpHeaders({
      'Authorization': `bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<ResponseReporteRequerimiento>( baseURL() + '/reporte-encuesta-requerimiento',obj,{headers});
  }

  reporteExcel({clientes}: ResponseReporteRequerimiento,cliente:string,fechas: {fechaInicio: string, fechaFin: string}){
    if(typeof clientes === 'undefined') return;

    const titulo = 'Reporte Encuesta Requerimiento por cliente';

    const headers = ["Cliente","Requerimiento","Pregunta", "Cantidad","Observacion"];
    let arr = [];

    if(cliente.length > 0){
      arr.push(['','CLIENTE '+cliente]);
    }

    if(fechas.fechaInicio !== '' && fechas.fechaFin !== ''){
      arr.push(['','RANGO DE FECHAS ENTRE '+fechas.fechaInicio+' Y '+fechas.fechaFin]);

    }
    arr.push(headers);

    clientes.forEach(elemento => {
      arr.push([
        elemento.cliente,
        elemento.requerimiento,
        elemento.pregunta,
        elemento.cantidad,
        elemento.observaciones
      ])
    });

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

  reporteWeb({clientes}: ResponseReporteRequerimiento, parametros: {cliente: string, fechaInicio: string, fechaFin: string}){
    const {cliente, fechaInicio, fechaFin} = parametros;
   
    const tipoComprobante = '20';
    const tipoReporte = 'ReporteRequerimientoPorCliente';
    
    localStorage.setItem("comprobantes", JSON.stringify(clientes));
    localStorage.setItem("tipoReporte", tipoReporte);
    localStorage.setItem("filtros", JSON.stringify({cliente, fechaInicio, fechaFin}));

    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  }
}