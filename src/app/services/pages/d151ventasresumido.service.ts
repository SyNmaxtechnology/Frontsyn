import { D151Ventas } from './d151ventas.service';
import { UsuarioService } from './usuario.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../config/config';
import { Injectable } from '@angular/core';
import { ConsultaService } from './consulta.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class D151ventasresumidoService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private consultaService: ConsultaService
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
 
   }

  private token = this.usuarioService.obtenerToken();
  private tiposDocumento = [];
  private medioPago = [];
  private condicionVenta = [];
  private arrayFacturasD151resumido = [];
  obtenerDatosReporte(obj: D151Ventas){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post( baseURL() + '/d151-ventas-resumido',obj,{headers,responseType: 'text' as 'json'});
  }

  reporteExcel(obj){
    if(typeof obj === 'undefined'){
      return;
    } else {
      const {facturas,totales} = JSON.parse(obj);

          
      const titulo = 'Reporte D151 Ventas Resumido';
      const  header = ["Cliente","Cédula","Moneda","Descuentos","Servicios Gravados","Servicios Exentos", "Servicios Exonerados","Mercancías Gravadas","Mercancías Exentas", "Mercancías Exoneradas","Total Gravado", "Total Exento","Total Exonerado","Total Venta","Venta Neta","Subtotal","Total Impuesto","Otros Cargos","Total Factura"];
      this.arrayFacturasD151resumido = [];
      let arrayFacturasReporte = [];
      let indice = 0;
      this.arrayFacturasD151resumido.push(['Facturas de Clientes']);
      this.arrayFacturasD151resumido.push(['Facturas de clientes en colones']);
      arrayFacturasReporte = this.cargarArrayFacturas(this.arrayFacturasD151resumido,facturas,indice,'CRC');
      this.arrayFacturasD151resumido.push([]);
      this.arrayFacturasD151resumido.push(['Facturas de Clientes']);
      this.arrayFacturasD151resumido.push(['Facturas de clientes en dolares']);
      this.arrayFacturasD151resumido.push([]);
      arrayFacturasReporte = this.cargarArrayFacturas(this.arrayFacturasD151resumido,facturas,indice,'USD');
      this.arrayFacturasD151resumido.push([]);
      this.arrayFacturasD151resumido.push(['Totales por moneda']);
      this.arrayFacturasD151resumido.push([]);

      this.arrayFacturasD151resumido.push(["Moneda","totaldescuentos","totalservgravados", "totalservexentos", "totalservexonerado", "totalmercanciasgravadas",  "totalmercanciasexentas","totalmercanciaexonerada",  "totalgravado", "totalexento","totalexonerado", "totalventa", "totalventaneta","subtotal", "totalimpuesto" ,"TotalOtrosCargos", "totalcomprobante"]);
        
        if(totales[0]){
          this.arrayFacturasD151resumido.push([
            totales[0].codigomoneda,Number(totales[0].totaldescuentos).toFixed(2),Number(totales[0].totalservgravados).toFixed(2), 
            Number(totales[0].totalservexentos).toFixed(2), Number(totales[0].totalservexonerado).toFixed(2), Number(totales[0].totalmercanciasgravadas).toFixed(2),Number(totales[0].totalmercanciasexentas).toFixed(2),Number(totales[0].totalmercanciaexonerada).toFixed(2),Number(totales[0].totalgravado).toFixed(2),Number(totales[0].totalexento).toFixed(2),Number(totales[0].totalexonerado).toFixed(2),Number(totales[0].totalventa).toFixed(2),Number(totales[0].totalventaneta).toFixed(2),Number(totales[0].subtotal).toFixed(2), Number(totales[0].totalimpuesto).toFixed(2) ,Number(totales[0].TotalOtrosCargos).toFixed(2), Number(totales[0].totalcomprobante).toFixed(2)
          ])
        }
        if(totales[1]){
          this.arrayFacturasD151resumido.push([
            totales[1].codigomoneda,Number(totales[1].totaldescuentos).toFixed(2),Number(totales[1].totalservgravados).toFixed(2), 
            Number(totales[1].totalservexentos).toFixed(2), Number(totales[1].totalservexonerado).toFixed(2), Number(totales[1].totalmercanciasgravadas).toFixed(2),Number(totales[1].totalmercanciasexentas).toFixed(2),Number(totales[1].totalmercanciaexonerada).toFixed(2),Number(totales[1].totalgravado).toFixed(2),Number(totales[1].totalexento).toFixed(2),Number(totales[1].totalexonerado).toFixed(2),Number(totales[1].totalventa).toFixed(2),Number(totales[1].totalventaneta).toFixed(2),Number(totales[1].subtotal).toFixed(2), Number(totales[1].totalimpuesto).toFixed(2) ,Number(totales[1].TotalOtrosCargos).toFixed(2), Number(totales[1].totalcomprobante).toFixed(2)
          ])
        }

      arrayFacturasReporte = this.arrayFacturasD151resumido;

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

  }


  private cargarArrayFacturas(arrGlobal,array,indice, tipo){
    //codigomoneda === 'USD'
    if(Number(indice) + 1 > array.length){
      return arrGlobal;
    } else {
      if(array[indice].codigomoneda === tipo){

        let tipo_factura = this.tiposDocumento.filter(tipo => tipo.codigo == array[indice].tipo_factura);
        let medio_pago = this.medioPago.filter(medio => medio.id == array[indice].medio_pago);
        let condicion_venta = this.condicionVenta.filter(condicionV => condicionV.id == array[indice].condicion_venta);
        //let condicion_impuesto = this.condicionImpuesto.filter(condicionI => condicionI.codigo == array[indice].codicion_impuesto)

        array[indice].tipo_factura = typeof tipo_factura[0] === 'undefined'? '': tipo_factura[0].descripcion;
        array[indice].medio_pago = typeof medio_pago[0] === 'undefined'? '': medio_pago[0].medio;
        array[indice].condicion_venta = typeof condicion_venta[0] === 'undefined'? '': condicion_venta[0].condicion;
      
        arrGlobal.push([
          array[indice].cliente_nombre,
          array[indice].cedula_cliente,
          /*array[indice].tipo_factura,
          array[indice].medio_pago,
          array[indice].condicion_venta,*/
          array[indice].codigomoneda,
          Number(array[indice].totaldescuentos).toFixed(2),
          Number(array[indice].totalservgravados).toFixed(2), 
          Number(array[indice].totalservexentos).toFixed(2),
          Number(array[indice].totalservexonerado).toFixed(2), 
          Number(array[indice].totalmercanciasgravadas).toFixed(2), 
          Number(array[indice].totalmercanciasexentas).toFixed(2),
          Number(array[indice].totalmercanciaexonerada).toFixed(2),
          Number(array[indice].totalgravado).toFixed(2), 
          Number(array[indice].totalexento).toFixed(2),
          Number(array[indice].totalexonerado).toFixed(2), 
          Number(array[indice].totalventa).toFixed(2), 
          Number(array[indice].totalventaneta).toFixed(2),
          Number(array[indice].subtotal).toFixed(2), 
          Number(array[indice].totalimpuesto).toFixed(2),
          Number(array[indice].TotalOtrosCargos).toFixed(2), 
          Number(array[indice].totalcomprobante).toFixed(2)
        ]);
        indice++;
        return this.cargarArrayFacturas(arrGlobal,array,indice,tipo);
      } else {
        indice++;
        return this.cargarArrayFacturas(arrGlobal,array,indice,tipo);
      }
    }
  }
}
