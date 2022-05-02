import { RecepcionService } from './recepcion.service';
import { UsuarioService } from './usuario.service';
import { ConsultaService } from './consulta.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { baseURL } from '../../config/config';

export interface D151Compras {

  fechaInicio : string,
  fechaFin: string,
  montoCompra: number
}

@Injectable({
  providedIn: 'root'
})
export class D151comprasService {

  constructor(
    private usuarioService: UsuarioService,
    private http:HttpClient,
    private consultaService: ConsultaService,
    private recepcionService: RecepcionService
  ) {
    this.consultaService.tipoDocumento().subscribe((response: any) => {
        
      this.tiposDocumento = response.tipoDocumento;
    })    

    this.consultaService.medioPago().subscribe((response: any) => {
      
      this.medioPago = response.medioPago;
    })  
    
    this.consultaService.condicionVenta().subscribe((response: any) => {
      
      this.condicionVenta = response.condicionVenta;
    })  
    
    this.recepcionService.condicionImpuesto().subscribe((response: any) => {
      this.condicionImpuesto = response.condicionImpuesto
    })
   }


  private token = this.usuarioService.obtenerToken();
  private tiposDocumento = [];
  private medioPago = [];
  private condicionVenta = [];
  private condicionImpuesto = [];
  private arrayFacturasD151detallado = [];
  private arrayTotales = [];

  obtenerDatosReporte(obj: D151Compras){
    
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() + '/d151-compras',obj,{headers, responseType: 'text' as 'json'});
  }

  reporteExcel(obj){
    if(typeof obj === 'undefined'){
      return;
    } else {

      const {entradas} = JSON.parse(obj);
      const titulo = 'Reporte D151 Compras Detallado';
      const  header = ["Fecha","Clavenumérica","Numero Interno","Proveedor","Cedula","Tipo Factura","Medio Pago","Condición Venta","Condicion Impuesto","Moneda","Descuentos","Servicios Gravados","Servicios Exentos", "Servicios Exonerados","Mercancías Gravadas","Mercancías Exentas", "Mercancías Exoneradas","Total Gravado", "Total Exento","Total Exonerado","Total Venta","Venta Neta","Subtotal","Total Impuesto","Otros Cargos","Total Factura"];
      this.arrayFacturasD151detallado = [];
      let arrayFacturasReporte = [];
      let indice = 0;
      let tipo_entrada = null;
      let codigomoneda = ''; 
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

      this.arrayFacturasD151detallado.push(['Facturas de Proveedores']);
      this.arrayFacturasD151detallado.push(['Facturas de proveedores en colones']);
      arrayFacturasReporte = this.cargarArrayCompras(this.arrayFacturasD151detallado,entradas,indice,'CRC',this.arrayTotales,codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      this.arrayFacturasD151detallado.push([]);
      this.arrayFacturasD151detallado.push(['Facturas de clientes en dolares']);
      this.arrayFacturasD151detallado.push([]);
      arrayFacturasReporte = this.cargarArrayCompras(this.arrayFacturasD151detallado,entradas,indice,'USD',this.arrayTotales,codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      this.arrayFacturasD151detallado.push([]);
      this.arrayFacturasD151detallado.push(['Totales por moneda']);
      this.arrayFacturasD151detallado.push([]);

      this.arrayFacturasD151detallado.push(["Moneda","totaldescuentos","totalservgravados", "totalservexentos", "totalservexonerado", "totalmercanciasgravadas",  "totalmercanciasexentas","totalmercanciaexonerada",  "totalgravado", "totalexento","totalexonerado", "totalventa", "totalventaneta","subtotal", "totalimpuesto" ,"TotalOtrosCargos", "totalcomprobante"]);
        console.log(this.arrayTotales)
        if(this.arrayTotales[0]){
          this.arrayFacturasD151detallado.push([
            this.arrayTotales[0].codigomoneda,this.arrayTotales[0].totaldescuentos,this.arrayTotales[0].totalservgravados, 
            this.arrayTotales[0].totalservexentos, this.arrayTotales[0].totalservexonerado, this.arrayTotales[0].totalmercanciasgravadas,this.arrayTotales[0].totalmercanciasexentas,this.arrayTotales[0].totalmercanciaexonerada,this.arrayTotales[0].totalgravado,this.arrayTotales[0].totalexento,this.arrayTotales[0].totalexonerado,this.arrayTotales[0].totalventa,this.arrayTotales[0].totalventaneta,this.arrayTotales[0].subtotal, this.arrayTotales[0].totalimpuesto ,this.arrayTotales[0].TotalOtrosCargos, this.arrayTotales[0].totalcomprobante
          ])
        }
        if(this.arrayTotales[1].codigomoneda){
          this.arrayFacturasD151detallado.push([
            this.arrayTotales[1].codigomoneda,this.arrayTotales[1].totaldescuentos,this.arrayTotales[1].totalservgravados, 
            this.arrayTotales[1].totalservexentos, this.arrayTotales[1].totalservexonerado, this.arrayTotales[1].totalmercanciasgravadas,this.arrayTotales[1].totalmercanciasexentas,this.arrayTotales[1].totalmercanciaexonerada,this.arrayTotales[1].totalgravado,this.arrayTotales[1].totalexento,this.arrayTotales[1].totalexonerado,this.arrayTotales[1].totalventa,this.arrayTotales[1].totalventaneta,this.arrayTotales[1].subtotal, this.arrayTotales[1].totalimpuesto ,this.arrayTotales[1].TotalOtrosCargos, this.arrayTotales[1].totalcomprobante
          ])
        }

      arrayFacturasReporte = this.arrayFacturasD151detallado;

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Reporte Facturas');
      let headerRow = worksheet.addRow(header);

      arrayFacturasReporte.forEach(d => {
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
  }

  reporteWeb(obj,filtros){
    if(typeof obj === 'undefined'){
      return obj;
    } else {
      console.log(this.arrayFacturasD151detallado);
      const tipoComprobante = '15';
      const tipoReporte = 'D151ComprasDetallado';
      localStorage.setItem("comprobantes", obj);
      localStorage.setItem("tipoReporte", tipoReporte);
      localStorage.setItem("filtros", JSON.stringify(filtros));
      const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
        pestana.focus();
    }
  }

  private cargarArrayCompras(arrGlobal,array,indice, tipo,arrTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos){
    //codigomoneda === 'USD'
    let tipo_entrada = null;
    if(Number(indice) + 1 > array.length){


      arrTotales.push(
        {
          codigomoneda: codigomoneda, 
          subtotal :subtotal,
          totalservgravados: totalservgravados , 
          totalservexentos: totalservexentos,
          totalservexonerado :totalservexonerado,
          totalmercanciasgravadas :totalmercanciasgravadas,
          totalmercanciasexentas: totalmercanciasexentas,
          totalmercanciaexonerada :totalmercanciaexonerada,
          totalgravado: totalgravado,
          totalexento : totalexento,
          totalexonerado : totalexonerado,
          totalventa: totalventa,
          totaldescuentos: totaldescuentos,
          totalventaneta: totalventaneta,
          totalimpuesto: totalimpuesto,
          totalcomprobante: totalcomprobante,
          TotalOtrosCargos: TotalOtrosCargos
        }
      );

      return arrGlobal;
    } else {
      if(array[indice].codigomoneda === tipo){

        let tipo_factura = this.tiposDocumento.filter(tipo => tipo.codigo == array[indice].tipo_factura);
        let medio_pago = this.medioPago.filter(medio => medio.id == array[indice].medio_pago);
        let condicion_venta = this.condicionVenta.filter(condicionV => condicionV.id == array[indice].condicion_venta);
        let condicion_impuesto = this.condicionImpuesto.filter(condicionI => condicionI.codigo == array[indice].codicion_impuesto)
        
        array[indice].tipo_factura = typeof tipo_factura[0] === 'undefined'? '': tipo_factura[0].descripcion;
        array[indice].medio_pago = typeof medio_pago[0] === 'undefined'? '': medio_pago[0].medio;
        array[indice].condicion_venta = typeof condicion_venta[0] === 'undefined'? '': condicion_venta[0].condicion;
        array[indice].codicion_impuesto = typeof condicion_impuesto[0] === 'undefined'? '': condicion_impuesto[0].descripcion;
       
        tipo_entrada = array[indice].numero_interno.charAt(0);
        console.log(array[indice].numero_interno)
        if( tipo_entrada == 'N'){ //entradas anuladas
          arrGlobal.push([
            array[indice].fecha,
            array[indice].clavenumerica,
            array[indice].numero_interno,
            array[indice].proveedor_nombre_comercial == null 
            || array[indice].proveedor_nombre_comercial  == '' ? array[indice].proveedor_nombre: array[indice].proveedor_nombre_comercial,
            array[indice].cedula_proveedor,
            array[indice].tipo_factura,
            array[indice].medio_pago,
            array[indice].condicion_venta,
            array[indice].codicion_impuesto,
            array[indice].codigomoneda,
            - Number(array[indice].totaldescuentos),
            - Number(array[indice].totalservgravados), 
            - Number(array[indice].totalservexentos),
            - Number(array[indice].totalservexonerado), 
            - Number(array[indice].totalmercanciasgravadas), 
            - Number(array[indice].totalmercanciasexentas),
            - Number(array[indice].totalmercanciaexonerada),
            - Number(array[indice].totalgravado), 
            - Number(array[indice].totalexento),
            - Number(array[indice].totalexonerado), 
            - Number(array[indice].totalventa), 
            - Number(array[indice].totalventaneta),
            - Number(array[indice].subtotal), 
            - Number(array[indice].totalimpuesto),
            - Number(array[indice].TotalOtrosCargos), 
            - Number(array[indice].totalcomprobante)
          ]);

          codigomoneda = tipo; 
          subtotal-= Number(array[indice].subtotal);
          totalservgravados  -= Number(array[indice].totalservgravados); 
          totalservexentos-= Number(array[indice].totalservexentos);
          totalservexonerado-= Number(array[indice].totalservexonerado);
          totalmercanciasgravadas-= Number(array[indice].totalmercanciasgravadas);
          totalmercanciasexentas-= Number(array[indice].totalmercanciasexentas);
          totalmercanciaexonerada-= Number(array[indice].totalmercanciaexonerada);
          totalgravado-= Number(array[indice].totalgravado);
          totalexento-= Number(array[indice].totalexento);
          totalexonerado-= Number(array[indice].totalexonerado);
          totalventa-= Number(array[indice].totalventa);
          totaldescuentos-= Number(array[indice].totaldescuentos);
          totalventaneta-= Number(array[indice].totalventaneta);
          totalimpuesto-= Number(array[indice].totalimpuesto);
          totalcomprobante-= Number(array[indice].totalcomprobante);
          TotalOtrosCargos-= Number(array[indice].TotalOtrosCargos);

        } else { //entradas 

          arrGlobal.push([
            array[indice].fecha,
            array[indice].clavenumerica,
            array[indice].numero_interno,
            array[indice].proveedor_nombre_comercial == null 
            || array[indice].proveedor_nombre_comercial  == '' ? array[indice].proveedor_nombre: array[indice].proveedor_nombre_comercial,
            array[indice].cedula_proveedor,
            array[indice].tipo_factura,
            array[indice].medio_pago,
            array[indice].condicion_venta,
            array[indice].codicion_impuesto,
            array[indice].codigomoneda,
            Number(array[indice].totaldescuentos),
            Number(array[indice].totalservgravados), 
            Number(array[indice].totalservexentos),
            Number(array[indice].totalservexonerado), 
            Number(array[indice].totalmercanciasgravadas), 
            Number(array[indice].totalmercanciasexentas),
            Number(array[indice].totalmercanciaexonerada),
            Number(array[indice].totalgravado), 
            Number(array[indice].totalexento),
            Number(array[indice].totalexonerado), 
            Number(array[indice].totalventa), 
            Number(array[indice].totalventaneta),
            Number(array[indice].subtotal), 
            Number(array[indice].totalimpuesto),
            Number(array[indice].TotalOtrosCargos), 
            Number(array[indice].totalcomprobante)
          ]);

          codigomoneda = tipo; 
          subtotal += Number(array[indice].subtotal);
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
        return this.cargarArrayCompras(arrGlobal,array,indice,tipo,arrTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      } else {
        indice++;
        return this.cargarArrayCompras(arrGlobal,array,indice,tipo,arrTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      }
    }
  }
}
