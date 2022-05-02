import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Injectable } from '@angular/core';

export interface EntradasCredito {
  idproveedor: number;
  fechaInicio: string;
  fechaFin: string
}

@Injectable({
  providedIn: 'root'
})
export class ComprasCreditoCanceladasService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private token = this.usuarioService.obtenerToken();

  obtenerEntradas(obj: EntradasCredito){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(baseURL() +'/movcxp/reporte-canceladas/',obj,{headers,responseType: 'text' as 'json'})
  }

  reporteExcel(obj,filtros){
    if(typeof obj === 'undefined'){
      return;
    } else {
      const {fechaInicio,fechaFin} = filtros;
      let titulo = 'Reporte de Compras Credito',
            arr= [], subtotal = 0, totalFacturas = 0, facturas = [];
            const header = ["Numero Documento","Fecha","Afectada", "Proveedor","Moneda","Monto","Saldo", "Recibos","Tipo"];
            
        obj.forEach(element => {
            if(element.tipo == 1){
              facturas.push(element.identrada);
            }
        });

        console.log(facturas.length)        
        obj.forEach((elemento) => {

         facturas.forEach(factura => {
          const numero = elemento.numero_interno;
          if(elemento.identrada == factura && elemento.tipo  == 1 ){

            
            
            arr.push([
              elemento.numero_interno,
              elemento.fecha,
              elemento.numero_interno,
              elemento.proveedor_nombre,
              elemento.codigomoneda,
              Number(elemento.montototal),
              Number(elemento.saldoactual),
              '',
              "Factura"
            ]);
            
            obj.forEach(element => {
              if(element.numero_interno == elemento.numero_interno && element.tipo == 0){
                arr.push([
                  element.idrecibo,
                  elemento.fecha,
                  '',
                  '',
                  '',
                  '',
                  '',
                  Number(element.montototal),
                  "Recibo"

                ]);
              }
            });
          } 
         })
        });

        const title = 'Estado de Cuenta';
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Reporte Compras Credito');
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
}
