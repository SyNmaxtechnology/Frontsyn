import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RazonNoVentaService } from './razon-no-venta.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { baseURL } from '../../config/config';

export interface ReporteRazonesNoVenta {
  idrazon: number|string,
  fechaInicio?: string,
  fechaFin?: string
}

interface ResponseReporteRazonesNoVenta {
  razon: string,
  vecesRazon: number,
  porcentajeParticipacion?: number
}


@Injectable({
  providedIn: 'root'
})
export class ReporteRazonesNoVentaService {

  constructor(

    private usuarioService: UsuarioService,
    private http: HttpClient,
    private razonNoVenta: RazonNoVentaService
  ) { 
  }

  private token = this.usuarioService.obtenerToken();

  obtenerRazonesNoVenta() {
    return this.razonNoVenta.obtenerRazones();
  }

  obtenerReporteRazonesNoVenta(obj: ReporteRazonesNoVenta) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+this.token
    });
    return this.http.post<ResponseReporteRazonesNoVenta[]>( baseURL() +'/visitas/reporte/razones-no-venta',obj,{headers});
  }

  reporteExcel(obj: ResponseReporteRazonesNoVenta[],razon:string, fecha1?:string, fecha2?:string) {

    console.log(fecha1,fecha2); 
    let titulo = 'Reporte razones no venta',arr= [];
    const header = ["Razón","Veces Seleccionadas","Porcentaje de participación"];

    if(razon.length > 0) {
      arr.push(["Razón ",razon]);
    }

    if(fecha1 !== '' && fecha2 !== ''){
      arr.push([`Fechas entre ${fecha1} y ${fecha2}`]);
    }

    arr.push([""]);
    arr.push([""]);

    let totalSeleccionadas =0,porcentajeTotal =0;
    obj.forEach(elemento => {
      totalSeleccionadas+= elemento.vecesRazon;
    })
    arr.push(['Numero total de veces seleccionadas ',totalSeleccionadas]);
    arr.push([""]);
    obj.forEach(elemento => {
      elemento.porcentajeParticipacion = Number(((elemento.vecesRazon /totalSeleccionadas) * 100).toFixed(2));
      porcentajeTotal+=elemento.porcentajeParticipacion;
      arr.push([elemento.razon,elemento.vecesRazon,elemento.porcentajeParticipacion])
    });

    arr.push(['','% Total',porcentajeTotal])

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

  reporteWeb(obj: ResponseReporteRazonesNoVenta[],razon:string, fecha1?:string, fecha2?:string) {

    const tipoReporte = 'ReporteRazonesNoventa'; 
      const tipoComprobante = '23'

      let arr= [];
   
    let totalSeleccionadas =0,porcentajeTotal =0;
    obj.forEach(elemento => {
      totalSeleccionadas+= elemento.vecesRazon;
    })
    obj.forEach(elemento => {
      elemento.porcentajeParticipacion = Number(((elemento.vecesRazon /totalSeleccionadas) * 100).toFixed(2));
      porcentajeTotal+=elemento.porcentajeParticipacion;
      arr.push({razon:elemento.razon,vecesRazon: elemento.vecesRazon,porcentajeParticipacion: elemento.porcentajeParticipacion})
    });

      localStorage.setItem("comprobantes", JSON.stringify(arr));
      localStorage.setItem("filtros", JSON.stringify( {
        razon,
        fecha1,
        fecha2,
        totalSeleccionadas,
        porcentajeTotal
      }));
      localStorage.setItem("tipoReporte", tipoReporte);
      
      const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  }

}
