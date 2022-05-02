import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import {baseURL} from '../../config/config';

interface ResponseResultadoEncuestaServicio {
  preguntas : {
    usuario: string;
    pregunta: string;
    calificacion: number;
    observaciones: string;
    valor: number;
    cliente: string;
    idusuario: number;
    idcliente: number;
  }[]; // representa que devuelve un array de objetos
  promedios?: {
    idcliente: number;
    idusuario: number;
    usuario: string;
  }[];
}

export interface ReporteEncuestaServicio {
  idpregunta?: number,
  idusuario: number
  fechaInicio ? : string;
  fechaFin?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReporteResultadoEncuestaServicioService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private token = this.usuarioService.obtenerToken();
  private listaPreguntas = [];
  
  obtenerDatosReporte(obj: ReporteEncuestaServicio){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });

    return this.http.post<ResponseResultadoEncuestaServicio>( baseURL() + '/reporte-encuesta-servicio',obj, {headers});
  }

  reporteExcel(obj: ResponseResultadoEncuestaServicio){
    if(typeof obj === 'undefined') return;
    
    let {promedios,preguntas} = obj;
    console.log({promedios,preguntas});
    
    const totalRespuestas = preguntas.length;
    const totalRespuestasArr = preguntas;
    const headers = [];
    let total = 0,totalCalificacion =0;
    const titulo = 'Reporte Encuesta Servicio';
    //let cambio = true;
    let estado : boolean;  
    let arr = [];
    let index = 0;
    this.listaPreguntas = preguntas;
    let sumavalor =0;
    let sumaCalificacion =0;
    let cantidadPromedio = 0, sumatorioPromedios = 0;
    for(let promedio of promedios ){        
      estado = true 
      if(estado){
        arr.push(['USUARIO',promedio.usuario]);
      }
      for(let pregunta of preguntas){
        if(promedio.idcliente === pregunta.idcliente){
          if(estado){
            arr.push(['CLIENTE',pregunta.cliente]);
            arr.push(['PREGUNTA','OBSERVACIONES','CALIFICACION','VALOR']);
          }
          estado = false;
          arr.push([
            pregunta.pregunta,
            pregunta.observaciones,
            pregunta.calificacion,
            pregunta.valor
          ]);

          sumavalor += Number(pregunta.valor);
          sumaCalificacion += Number(pregunta.calificacion);

          console.log({sumavalor});
          console.log({sumaCalificacion});
        }
      }
      estado = true;
      const arrPreguntas = preguntas.filter(elemento => elemento.idusuario === promedio.idusuario);
      arr.push(['PROMEDIO', (Number(sumaCalificacion * 100 / sumavalor).toFixed(2))]);
      sumatorioPromedios += Number((Number(sumaCalificacion * 100 / sumavalor).toFixed(2)));
      cantidadPromedio++;
      arr.push([]);
      arr.push([]);
      sumavalor =0;
      sumaCalificacion =0;
      promedios.filter(elemento => elemento.idusuario !== promedio.idusuario);
    }

    arr.push(['PROMEDIO GLOBAL', Number(sumatorioPromedios/cantidadPromedio).toFixed(2)])

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte Encuesta Servicio');
    let headerRow = worksheet.addRow(headers);


    /*
    
    
      preguntas = preguntas.filter(pregunta => {
          if(promedio.idcliente === pregunta.idcliente){
            
            
            if(estado){
              arr.push(['','Cliente',pregunta.cliente]);
              arr.push(['Pregunta','Observacion','Calificacion','Valor']);
            }
            estado = false;
            arr.push([
              pregunta.pregunta,
              pregunta.observaciones,
              pregunta.calificacion,
              pregunta.valor
            ]);
          }
          return pregunta.idusuario !== promedio.idusuario;
        });


    headerRow.eachCell((cell, number) => {
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

  reporteWeb(obj: ResponseResultadoEncuestaServicio, pregunta: string, usuario: string){
  
    if(typeof obj === 'undefined') return;
    
    let {promedios,preguntas} = obj;
    console.log({promedios,preguntas});
    //let cambio = true;
    let estado : boolean;  
    let cantidadPromedio = 0, sumatorioPromedios = 0;
    let arr = [];

    let objReporte = {
      usuario: '',
      cliente: '',
      preguntas : [],
      promedio: ''
    }

    this.listaPreguntas = preguntas;
    let sumavalor =0;
    let sumaCalificacion =0;
    for(let promedio of promedios ){        
      estado = true 
      if(estado){
        objReporte.usuario = promedio.usuario;
      }
      for(let pregunta of preguntas){
        if(promedio.idcliente === pregunta.idcliente){
          if(estado){
            objReporte.cliente = pregunta.cliente;
          }
          estado = false;
        
          objReporte.preguntas.push({
            pregunta:pregunta.pregunta,
            observacion:pregunta.observaciones,
            calificacion:pregunta.calificacion,
            valor:pregunta.valor
          });
          
          sumavalor += Number(pregunta.valor);
          sumaCalificacion += Number(pregunta.calificacion);
        }
      }
      estado = true;
      objReporte.promedio = (Number(sumaCalificacion * 100 / sumavalor).toFixed(2));
      sumatorioPromedios += Number((Number(sumaCalificacion * 100 / sumavalor).toFixed(2)));
      cantidadPromedio++;
      console.log(objReporte);
      arr.push(objReporte);

      objReporte = {
        usuario: '',
        cliente: '',
        preguntas : [],
        promedio: ''
      }

    }

    const promedioGlobal = Number(sumatorioPromedios/cantidadPromedio).toFixed(2)
   
    const tipoComprobante = '22';
    const tipoReporte = 'ReporteResultadoEncuestaServicio';
    localStorage.setItem("comprobantes", JSON.stringify(arr));
    localStorage.setItem("tipoReporte", tipoReporte);
    localStorage.setItem("filtros", JSON.stringify({pregunta,usuario,promedioGlobal}));
    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  }

  private sumatoriaValorCalificacion(obj= [],index: number,idusuario:number,sumaValor=0, sumaCalificacion = 0,arrPreguntas=[]){
    console.log(index);
    if(arrPreguntas.length + 1 === index){
      console.log(sumaValor);
      console.log(sumaCalificacion);
      
      return Number((sumaCalificacion * 100) / sumaValor).toFixed(2);
    
    } else {
      sumaValor += Number(arrPreguntas[index].valor);
      sumaCalificacion += Number(arrPreguntas[index].calificacion);
      index++;
    }
  }
  
  private recorrerDataRecursivamente(obj: ResponseResultadoEncuestaServicio,index: number,idusuario:number, array= [],cambio: boolean){
    
    let { preguntas } = obj;
    let totalRespuestas = 0;
    let totalCalificaciones = 0;
    let promedio =0;
    
    if(preguntas.length + 1 === index){

      promedio = (totalCalificaciones * 100)/totalRespuestas;
      array.push(['','Promedio ',Number(promedio).toFixed(2)]);
      preguntas.filter(pregunta => pregunta.idusuario !== idusuario);
      console.log(preguntas);
      return {array,preguntas};
    
    } else {  

      console.log(preguntas)
      console.log("idusuario",idusuario);
      console.log(index);

      if(idusuario === preguntas[index].idusuario){

        totalRespuestas += preguntas[index].valor;
        totalCalificaciones += preguntas[index].calificacion;
        
        if(cambio){
          array.push(['']);
          array.push(['','Cliente',preguntas[index].cliente]);
        }
        
        cambio = false;

        array.push([
          preguntas[index].pregunta,
          preguntas[index].observaciones,
          preguntas[index].calificacion,
          preguntas[index].valor
        ]);

      }
    }
  }
}