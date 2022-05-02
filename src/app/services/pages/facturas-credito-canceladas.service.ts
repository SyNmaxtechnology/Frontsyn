import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
export interface FacturasCredito {
  idcliente: string,
  fechaInicio : string,
  fechaFin: string
}

@Injectable({
  providedIn: 'root'
})

export class FacturasCreditoCanceladasService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) { }

  private token = this.usuarioService.obtenerToken();

  obtenerFacturasPagadas(obj: FacturasCredito){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() + '/cliente/facturas-credito/canceladas',obj,{headers,responseType: 'text' as 'json'});
  }

  reporteExcel(obj,fechaInicio,fechaFin){
    if(obj.length === 0){
      alert("No hay resultados");
    }else{
      let titulo = 'Reporte de Facturas Credito',
            arr= [], subtotal = 0, totalFacturas = 0, facturas = [];
            const header = ["Factura","Fecha","Afectada", "Cliente","Moneda","Monto","Saldo","Recibo", "Tipo"];
            
        obj.forEach(element => {
            if(element.tipo == 1){
              facturas.push(element.idfactura);
            }
        });

        console.log(facturas.length)        
        obj.forEach((elemento) => {

         facturas.forEach(factura => {
          const numero = elemento.numero_interno;
          if(elemento.idfactura == factura && elemento.tipo  == 1 ){

            
            
            arr.push([
              elemento.numero_interno,
              elemento.fecha,
              elemento.numero_interno,
              elemento.cliente_nombre,
              elemento.codigomoneda,
              Number(elemento.montototal),
              Number(elemento.saldoactual),
              '',
              'Factura'
            ]);
            
            obj.forEach(element => {
              if(element.numero_interno == elemento.numero_interno && element.tipo == 0){
                arr.push([
                  element.idrecibo,
                  element.fecha,
                  '',
                  '',
                  '',
                  '',
                  '',
                  Number(element.montototal),
                  'Recibo'
                ]);
              }
            });
          } 
         })
        });

        const title = 'Estado de Cuenta';
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Reporte Facturas Credito');
        worksheet.addRow([]);
        let titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Calibri', family: 4, size: 16, underline: 'double', bold: true };
        worksheet.addRow([]);
        worksheet.addRow(['Rango de Fechas']);
        worksheet.addRow(['Entre '+fechaInicio+' y '+fechaFin]);
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
  }

  //agregado por SYN
  reporteWeb(obj,fechaInicio,fechaFin,cliente){
    
    //let arr= {}
    var arr =  [];  
   

    if(obj.length === 0){
      alert("No hay resultados");
    }else{
     // arrwebfc= {fechaInicio, fechaFin,cliente}

      obj.forEach(elemento => {
        
        if( elemento.tipo  == 1 ){
          
          arr.push({
              
              'idfactura': elemento.idfactura,
              'fecha_factura': elemento.fecha_factura,
              'fecha': elemento.fecha,
              'numero_interno': elemento.numero_interno,
              'cliente_nombre': elemento.cliente_nombre,
              'codigomoneda': elemento.codigomoneda,
              'montototal': Number(elemento.montototal),
              'saldoactual': Number(elemento.saldoactual),
              'idrecibo': elemento.idrecibo,
              'tipo':'Factura'
            });  
        }
        else{
          
          arr.push({
              'idfactura': elemento.idfactura,
              'fecha_factura': elemento.fecha_factura,
              'fecha': elemento.fecha,
              'numero_interno': elemento.numero_interno,
              'cliente_nombre': elemento.cliente_nombre,
              'codigomoneda': elemento.codigomoneda,
              'montototal': Number(elemento.montototal)*-1,
              'saldoactual': Number(elemento.saldoactual),
              'idrecibo': elemento.idrecibo,
              'tipo':'Recibo'
            });  
        };
              
      });
    };   

    arr.sort(function (a, b) {
      if (a.tipo > b.tipo) {
        return 1;
      }
      if (a.tipo < b.tipo) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    //let arrweb = arr.join(",");
    let data = {
      'fechaInicio':fechaInicio,'fechaFin':fechaFin,'cliente':cliente
    };
      const tipoReporte = 'Estadocuenta'; 
      const tipoComprobante = '10'
      localStorage.setItem("comprobantes", JSON.stringify(arr));
      localStorage.setItem("comprobantesfc", JSON.stringify(obj));
      localStorage.setItem("filtros", JSON.stringify(data));
      localStorage.setItem("tipoReporte", tipoReporte);
      console.log(arr);
      const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  }
}
