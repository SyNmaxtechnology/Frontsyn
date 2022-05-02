import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { baseURL } from '../../config/config';
import { D151Compras } from './d151compras.service';


@Injectable({
  providedIn: 'root'
})
export class D151comprasresumidoService {

  constructor(
    private usuarioService: UsuarioService,
    private http : HttpClient
  ) {}

  private token = this.usuarioService.obtenerToken();
  private arrayFacturas = [];
  private arrTotales = [];

  obtenerDatosReporte(obj: D151Compras){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() + '/d151-compras-resumido',obj,{headers, responseType: 'text' as 'json'});
  }

  reporteExcel(obj){
    if(typeof obj === 'undefined') return;
    
    const {entradas,notasCredito,totales} = JSON.parse(obj);
    let proveedor_nombre = '';
    let proveedor_nombre_comercial = '';
    let cedula_proveedor = '';
    let subtotal = 0;
    let totalservgravados  = 0; 
    let totalservexentos = 0;
    let totalservexonerado = 0;
    let totalmercanciasgravadas = 0;
    let totalmercanciasexentas = 0;
    let totalmercanciaexonerada = 0;
    let totalgravado = 0;
    let totalexento = 0;
    let totalexonerado = 0;
    let totalventa = 0;
    let totaldescuentos = 0;
    let totalventaneta = 0;
    let totalimpuesto = 0;
    let totalcomprobante = 0;
    let TotalOtrosCargos = 0;
    let codigomoneda = '';
    let indice = 0;
    //entradas 
    for(let entrada of entradas){
      this.cargarArrayFacturas(this.arrayFacturas,entradas,indice,entrada.idproveedor,proveedor_nombre,cedula_proveedor,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos,'Entrada');    
    }

    for(let nota of notasCredito){
      this.cargarArrayFacturas(this.arrayFacturas,entradas,indice,nota.idproveedor,proveedor_nombre,cedula_proveedor,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos,'NotaCredito');    
    }

    console.log(this.arrayFacturas);

    //notas de credito de entradas
    this.arrTotales = [];
    indice = 0;

    
    const header = ["Proveedor","Cédula","Tipo Factura","Subtotal","Servicios Gravados","Servicios Exentos", "Servicios Exonerados","Mercancías Gravadas","Mercancías Exentas", "Mercancías Exoneradas","Total Gravado", "Total Exento","Total Exonerado","Total Venta","Descuentos","Venta Neta","Total Impuesto","Otros Cargos","Total Factura"]
    
    

    //crear el EXCEL de totales 

    this.arrTotales.push(['']);
    this.arrTotales.push(['']);

    for(let comprobante of this.arrayFacturas){
      const idproveedor = comprobante.idproveedor;
      this.cargarTotales(this.arrayFacturas,this.arrTotales,idproveedor,indice);
    }

    this.arrTotales.push(['']);
    this.arrTotales.push(['']);
    this.arrTotales.push(["Moneda","totaldescuentos","totalservgravados", "totalservexentos", "totalservexonerado", "totalmercanciasgravadas",  "totalmercanciasexentas","totalmercanciaexonerada",  "totalgravado", "totalexento","totalexonerado", "totalventa", "totalventaneta","subtotal", "totalimpuesto" ,"TotalOtrosCargos", "totalcomprobante"]);

    subtotal = 0;
    totalservgravados  = 0; 
    totalservexentos = 0;
    totalservexonerado = 0;
    totalmercanciasgravadas = 0;
    totalmercanciasexentas = 0;
    totalmercanciaexonerada = 0;
    totalgravado = 0;
    totalexento = 0;
    totalexonerado = 0;
    totalventa = 0;
    totaldescuentos = 0;
    totalventaneta = 0;
    totalimpuesto = 0;
    totalcomprobante = 0;
    TotalOtrosCargos = 0;
    codigomoneda = '';
    
    for (const factura of this.arrayFacturas) {
      console.log(factura);
      if(factura.tipo_factura == 'Entrada'){
     
        codigomoneda = 'CRC';
        subtotal += Number(factura.subtotal),
        totalservgravados += Number(factura.totalservgravados) , 
        totalservexentos += Number(factura.totalservexentos),
        totalservexonerado  += Number(factura.totalservexonerado),
        totalmercanciasgravadas  +=Number(factura.totalmercanciasgravadas),
        totalmercanciasexentas += Number(factura.totalmercanciasexentas),
        totalmercanciaexonerada  +=Number(factura.totalmercanciaexonerada),
        totalgravado += Number(factura.totalgravado),
        totalexento  += Number(factura.totalexento),
        totalexonerado  += Number(factura.totalexonerado),
        totalventa += Number(factura.totalventa),
        totaldescuentos += Number(factura.totaldescuentos),
        totalventaneta += Number(factura.totalventaneta),
        totalimpuesto += Number(factura.totalimpuesto),
        totalcomprobante += Number(factura.totalcomprobante),
        TotalOtrosCargos += Number(factura.TotalOtrosCargos)
      }
    }

    this.arrTotales.push([          
      codigomoneda,Number(totaldescuentos).toFixed(2),Number(totalservgravados).toFixed(2), 
      Number(totalservexentos).toFixed(2), Number(totalservexonerado).toFixed(2), Number(totalmercanciasgravadas).toFixed(2),Number(totalmercanciasexentas).toFixed(2),Number(totalmercanciaexonerada).toFixed(2),Number(totalgravado).toFixed(2),Number(totalexento).toFixed(2),Number(totalexonerado).toFixed(2),Number(totalventa).toFixed(2),Number(totalventaneta).toFixed(2),Number(subtotal).toFixed(2), Number(totalimpuesto).toFixed(2) ,Number(TotalOtrosCargos).toFixed(2), Number(totalcomprobante).toFixed(2)
    ])

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte Facturas');
    let headerRow = worksheet.addRow(header);
    let titulo = 'Reporte d151 Compras Resumido'
    this.arrTotales.forEach(d => {
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

  reporteWeb(obj,filtros){
    
    if(typeof obj === 'undefined'){
      return;
    } else {
      let proveedor_nombre = '';
      let proveedor_nombre_comercial = '';
      let cedula_proveedor = '';
      let subtotal = 0;
      let totalservgravados  = 0; 
      let totalservexentos = 0;
      let totalservexonerado = 0;
      let totalmercanciasgravadas = 0;
      let totalmercanciasexentas = 0;
      let totalmercanciaexonerada = 0;
      let totalgravado = 0;
      let totalexento = 0;
      let totalexonerado = 0;
      let totalventa = 0;
      let totaldescuentos = 0;
      let totalventaneta = 0;
      let totalimpuesto = 0;
      let totalcomprobante = 0;
      let TotalOtrosCargos = 0;

      let indice = 0;
      this.arrTotales = [];
      this.arrayFacturas = [];
      
      const {entradas,notasCredito} = JSON.parse(obj);
    
      for(let entrada of entradas){
        this.cargarArrayFacturas(this.arrayFacturas,entradas,indice,entrada.idproveedor,proveedor_nombre,cedula_proveedor,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos,'Entrada');    
      }
  
      for(let nota of notasCredito){
        this.cargarArrayFacturas(this.arrayFacturas,notasCredito,indice,nota.idproveedor,proveedor_nombre,cedula_proveedor,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos,'NotaCredito');    
      }
  
      console.log(this.arrayFacturas);
  
      //notas de credito de entradas
      this.arrTotales = [];
      indice = 0;

      for(let comprobante of this.arrayFacturas){
        const idproveedor = comprobante.idproveedor;
        this.cargarTotalesWeb(this.arrayFacturas,this.arrTotales,idproveedor,indice);
      }


      const tipoReporte = 'D151ComprasResumido'; 
      const tipoComprobante = '16'
      localStorage.setItem("comprobantes", JSON.stringify(this.arrTotales));
      localStorage.setItem("filtros", JSON.stringify(filtros));
      localStorage.setItem("tipoReporte", tipoReporte);
      
      const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus(); 
    }
  }


  private cargarArrayFacturas(arrGlobal,array,indice, idproveedor, proveedor_nombre,cedula_proveedor,  subtotal, totalservgravados ,totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos,tipo_factura){
    //codigomoneda === 'USD'
    if(Number(indice) + 1 > array.length){
      arrGlobal.push({
        idproveedor,
        proveedor_nombre: proveedor_nombre,
        cedula_proveedor: cedula_proveedor,
        //codigomoneda: codigomoneda, 
        tipo_factura,
        subtotal : Number(subtotal),
        totalservgravados: Number(totalservgravados) , 
        totalservexentos: Number(totalservexentos),
        totalservexonerado : Number(totalservexonerado),
        totalmercanciasgravadas :Number(totalmercanciasgravadas),
        totalmercanciasexentas: Number(totalmercanciasexentas),
        totalmercanciaexonerada :Number(totalmercanciaexonerada),
        totalgravado: Number(totalgravado),
        totalexento : Number(totalexento),
        totalexonerado : Number(totalexonerado),
        totalventa: Number(totalventa),
        totaldescuentos: Number(totaldescuentos),
        totalventaneta: Number(totalventaneta),
        totalimpuesto: Number(totalimpuesto),
        totalcomprobante: Number(totalcomprobante),
        TotalOtrosCargos: Number(TotalOtrosCargos)
      });

      proveedor_nombre = '';
      cedula_proveedor = '';
      subtotal = 0;
      totalservgravados  = 0; 
      totalservexentos = 0;
      totalservexonerado = 0;
      totalmercanciasgravadas = 0;
      totalmercanciasexentas = 0;
      totalmercanciaexonerada = 0;
      totalgravado = 0;
      totalexento = 0;
      totalexonerado = 0;
      totalventa = 0;
      totaldescuentos = 0;
      totalventaneta = 0;
      totalimpuesto = 0;
      totalcomprobante = 0;
      TotalOtrosCargos = 0;

      return arrGlobal;
    } else {

      if(array[indice].idproveedor == idproveedor){
     
        proveedor_nombre = array[indice].proveedor_nombre;
        cedula_proveedor = array[indice].cedula_proveedor;
        subtotal += Number(array[indice].subtotal);
        totalservgravados += Number(array[indice].totalservgravados); 
        totalservexentos += Number(array[indice].totalservexentos);
        totalservexonerado += Number(array[indice].totalservexonerado);
        totalmercanciasgravadas += Number(array[indice].totalmercanciasgravadas);
        totalmercanciasexentas += Number(array[indice].totalmercanciasexentas);
        totalmercanciaexonerada += Number(array[indice].totalmercanciaexonerada);
        totalgravado += Number(array[indice].totalgravado);
        totalexento += Number(array[indice].totalexento);
        totalexonerado += Number(array[indice].totalexonerado);
        totalventa += Number(array[indice].totalventa);
        totaldescuentos += Number(array[indice].totaldescuentos);
        totalventaneta += Number(array[indice].totalventaneta);
        totalimpuesto += Number(array[indice].totalimpuesto);
        totalcomprobante += Number(array[indice].totalcomprobante);
        TotalOtrosCargos += Number(array[indice].TotalOtrosCargos);
      
      }

      indice++;      
      
      return this.cargarArrayFacturas(arrGlobal,array,indice,idproveedor,proveedor_nombre,cedula_proveedor,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos,tipo_factura);
    }
  }

  private cargarTotales(arrGlobal,arrayTotales,idproveedor,indice){
    
    if(Number(indice) + 1 > arrGlobal.length){
      return arrayTotales;
    } else {
      if(arrGlobal[indice].idproveedor == idproveedor){
        if(arrGlobal[indice].tipo_factura == 'Entrada'){
            arrayTotales.push([
              arrGlobal[indice].proveedor_nombre,
              arrGlobal[indice].cedula_proveedor,
              arrGlobal[indice].tipo_factura,
              Number(arrGlobal[indice].subtotal),
              Number(arrGlobal[indice].totalservgravados),
              Number(arrGlobal[indice].totalservexentos),
              Number(arrGlobal[indice].totalservexonerado),
              Number(arrGlobal[indice].totalmercanciasgravadas),
              Number(arrGlobal[indice].totalmercanciasexentas),
              Number(arrGlobal[indice].totalmercanciaexonerada),
              Number(arrGlobal[indice].totalgravado),
              Number(arrGlobal[indice].totalexento),
              Number(arrGlobal[indice].totalexonerado),
              Number(arrGlobal[indice].totalventa),
              Number(arrGlobal[indice].totaldescuentos),
              Number(arrGlobal[indice].totalventaneta),
              Number(arrGlobal[indice].totalimpuesto),
              Number(arrGlobal[indice].TotalOtrosCargos),
              Number(arrGlobal[indice].totalcomprobante)
              
            ]);
         } else {
            arrayTotales.push([
              arrGlobal[indice].proveedor_nombre,
              arrGlobal[indice].cedula_proveedor,
              arrGlobal[indice].tipo_factura,
              - Number(arrGlobal[indice].subtotal),
              - Number(arrGlobal[indice].totalservgravados),
              - Number(arrGlobal[indice].totalservexentos),
              - Number(arrGlobal[indice].totalservexonerado),
              - Number(arrGlobal[indice].totalmercanciasgravadas),
              - Number(arrGlobal[indice].totalmercanciasexentas),
              - Number(arrGlobal[indice].totalmercanciaexonerada),
              - Number(arrGlobal[indice].totalgravado),
              - Number(arrGlobal[indice].totalexento),
              - Number(arrGlobal[indice].totalexonerado),
              - Number(arrGlobal[indice].totalventa),
              - Number(arrGlobal[indice].totaldescuentos),
              - Number(arrGlobal[indice].totalventaneta),
              - Number(arrGlobal[indice].totalimpuesto),
              - Number(arrGlobal[indice].TotalOtrosCargos),
              - Number(arrGlobal[indice].totalcomprobante)    
          ]);
        }
      }
      indice++;
    return this.cargarTotales(arrGlobal,arrayTotales,idproveedor,indice);
    }
  }

  //totales web 

  private cargarTotalesWeb(arrGlobal,arrayTotales,idproveedor,indice){
    
    if(Number(indice) + 1 > arrGlobal.length){
      return arrayTotales;
    } else {
      if(arrGlobal[indice].idproveedor == idproveedor){
        if(arrGlobal[indice].tipo_factura == 'Entrada'){

            //console.log("entrada",arrGlobal[indice])
            arrayTotales.push({
              proveedor_nombre :arrGlobal[indice].proveedor_nombre,
              cedula_proveedor :arrGlobal[indice].cedula_proveedor,
              tipo_factura :arrGlobal[indice].tipo_factura,
              subtotal:Number(arrGlobal[indice].subtotal),
              totalservgravados:Number(arrGlobal[indice].totalservgravados),
              totalservexentos :Number(arrGlobal[indice].totalservexentos),
              totalservexonerado :Number(arrGlobal[indice].totalservexonerado),
              totalmercanciasgravadas :Number(arrGlobal[indice].totalmercanciasgravadas),
              totalmercanciasexentas :Number(arrGlobal[indice].totalmercanciasexentas),
              totalmercanciaexonerada :Number(arrGlobal[indice].totalmercanciaexonerada),
              totalgravado :Number(arrGlobal[indice].totalgravado),
              totalexento :Number(arrGlobal[indice].totalexento),
              totalexonerado :Number(arrGlobal[indice].totalexonerado),
              totalventa :Number(arrGlobal[indice].totalventa),
              totaldescuentos :Number(arrGlobal[indice].totaldescuentos),
              totalventaneta :Number(arrGlobal[indice].totalventaneta),
              totalimpuesto :Number(arrGlobal[indice].totalimpuesto),
              TotalOtrosCargos :Number(arrGlobal[indice].TotalOtrosCargos),
              totalcomprobante :Number(arrGlobal[indice].totalcomprobante)
            })
         } else {

            arrayTotales.push({
              proveedor_nombre :arrGlobal[indice].proveedor_nombre,
              cedula_proveedor :arrGlobal[indice].cedula_proveedor,
              tipo_factura :arrGlobal[indice].tipo_factura,
              subtotal:Number(arrGlobal[indice].subtotal),
              totalservgravados:Number(arrGlobal[indice].totalservgravados),
              totalservexentos :Number(arrGlobal[indice].totalservexentos),
              totalservexonerado :Number(arrGlobal[indice].totalservexonerado),
              totalmercanciasgravadas :Number(arrGlobal[indice].totalmercanciasgravadas),
              totalmercanciasexentas :Number(arrGlobal[indice].totalmercanciasexentas),
              totalmercanciaexonerada :Number(arrGlobal[indice].totalmercanciaexonerada),
              totalgravado :Number(arrGlobal[indice].totalgravado),
              totalexento :Number(arrGlobal[indice].totalexento),
              totalexonerado :Number(arrGlobal[indice].totalexonerado),
              totalventa :Number(arrGlobal[indice].totalventa),
              totaldescuentos :Number(arrGlobal[indice].totaldescuentos),
              totalventaneta :Number(arrGlobal[indice].totalventaneta),
              totalimpuesto :Number(arrGlobal[indice].totalimpuesto),
              TotalOtrosCargos :Number(arrGlobal[indice].TotalOtrosCargos),
              totalcomprobante :Number(arrGlobal[indice].totalcomprobante)
          })
        }
      }
      indice++;
    return this.cargarTotalesWeb(arrGlobal,arrayTotales,idproveedor,indice);
    }
  }
}
