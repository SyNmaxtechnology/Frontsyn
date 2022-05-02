import { MovimientosBancoService } from './movimientos-banco.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Injectable } from '@angular/core';


export interface MovimientosCuenta {
  idcuenta: number | string;
  fechaInicio: string;
  fechaFin: string; 
}

@Injectable({
  providedIn: 'root'
})
export class ReporteMovimientosCuentaService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private movimientoBancoService: MovimientosBancoService
  ) { }

  private token = this.usuarioService.obtenerToken();
  
  obtenerDatosMovimientos(obj: MovimientosCuenta){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    })

    return this.http.post<string>( baseURL() +'/reporte-movimientos-cuenta',obj,{headers,responseType: 'text' as 'json'})
  }

  cargarCuentas(){
    return this.movimientoBancoService.cargarCuentas();
  }

  reporteExcel(obj: any, filtros: MovimientosCuenta ){
    if(typeof obj === 'undefined'){
      return;
    } else {
      const {movimientos, emisor} = obj;
      const { fechaInicio,fechaFin } = filtros;
      let totalDepositos = 0,totalPagos= 0;
      //const headers = ['Número Cuenta','Fecha','Tipo Movimiento','Descripción', 'Monto'];
      const titulo = 'Reporte Movimientos Cuenta';
      let arr = [];
      arr.push([`Emisor: ${emisor}`])
      arr.push([''])
      arr.push([''])
      arr.push([`Rango de fechas entre ${fechaInicio} y ${fechaFin}`])
      arr.push([''])
      arr.push([''])
      arr.push(['Número Cuenta','Fecha','Tipo Movimiento','Descripción', 'DÉBITOS', 'CRÉDITOS']);
      movimientos.forEach(linea => {
        if(linea.tipomovimiento == 'Depósito'){
          arr.push([
            linea.numctabanco,
            linea.fecha,
            linea.tipomovimiento,
            linea.descripcion,
            Number(linea.monto),
            ''
          ])
          totalDepositos += Number(linea.monto);
        } else {
          arr.push([
            linea.numctabanco,
            linea.fecha,
            linea.tipomovimiento,
            linea.descripcion,
            '',
            Number(linea.monto),
          ])
          totalPagos += Number(linea.monto);
        }
      });
      arr.push(['']);
      arr.push(['','','','Total Movimientos','',''])
      arr.push(['','','','', 'DÉBITOS', 'CRÉDITOS']);
      arr.push(['','','','', totalDepositos, totalPagos]);

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Reporte Movimientos Cuenta');
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

  reporteWeb(obj: any, filtros: MovimientosCuenta){
    if(typeof obj  === 'undefined'){
      return;
    } else {

      const tipoComprobante = '19';
      const tipoReporte = 'MovimientosCuenta';
      const {movimientos} = obj;
      localStorage.setItem("comprobantes",JSON.stringify(movimientos));
      localStorage.setItem("tipoReporte", tipoReporte);
      localStorage.setItem("filtros", JSON.stringify(filtros));
      const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
    }
  }
}
