import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { baseURL } from '../../config/config';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ClienteService } from './cliente.service';

export interface Visitas {
  fechaInicio: string;
  fechaFin: string;
  idcliente : string;
  idusuario : string;
  visita?: string;
  zona?: string;
  distancia?: number;
  ubicacionCliente? : string;
  ubicacionSalida?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ReporteVisitasService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private clienteService:ClienteService

  ) { }

  private token = this.usuarioService.obtenerToken();

  obtenerVisitas(obj: Visitas){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token,
      'Content-Type': 'application/json'
    });

    return this.http.post<string>( baseURL() +'/obtener-visitas',obj,{headers, responseType: 'text' as 'json'});
  }


  reporteExcel(obj,parametros:{cliente: string, fechaInicio: string, fechaFin: string, tipoVisita: string},totales) {
    if(typeof obj === 'undefined'){
      return;
    } else {

      let ventaSi = 0,ventaNo = 0,numeroVisita=0,numeroVisitaTotal =0,proformadoTotalGeneral =0,facturadoTotalGeneral=0,ventasSiGeneral =0, ventasNoGeneral=0;

      const {cliente, fechaInicio, fechaFin, tipoVisita} = parametros;
      const titulo = 'Reporte Visitas';
      const headers = ["Usuario","Cliente","Fecha","Zona","Ubicación Cliente","Tipo Movimiento","Visita","Venta","Razon","Distancia","Ubicación Salida"];
      let arr = [];
      let distancia: number | string = null;

      let index = 0,index2=0,estado = 0;
      let porcentaje =0,total=0,proforma=0,porcentajeProforma: string | number =0,porcentajeTotal: string | number =0,
      porcentajeProformaGeneral=0,porcentajeTotalGeneral=0,totalFacturado;
      /*
        console.log(visita["X(GEOMFROMTEXT(astext(v.localizacion)))"])
          console.log(visita["Y(GEOMFROMTEXT(astext(v.localizacion)))"])
      */
 
      if(fechaInicio && fechaFin) {
        arr.push(['RANGO DE FECHAS ENTRE ',fechaInicio+' y '+fechaFin]);
        arr.push(['']);

      }

      arr.push(['LA DISTANCIA MOSTRADA ES EN METROS']);
      arr.push(['']);

      if(cliente) {
        arr.push(['CLIENTE ',cliente]);
        arr.push(['']);
      }

      if(tipoVisita) {
        arr.push(['TIPO VISITA',tipoVisita]);
        arr.push(['']);
      }
      console.log({totales})

      for (const elemento of obj) {
          const usuario = elemento.idusuario;
          const obj2 = obj.filter(el => el.idusuario == usuario);
          const objTotales = totales.filter(el=> el.idusuario == usuario)
          let campos = []
         for (const linea of obj2) {
            estado=1;
            if(linea.tipo_movimiento =='ENTRADA') {
              arr.push([
                linea.usuario,
                linea.cliente,
                linea.fecha,
                linea.d_zona,
                '',
                linea.tipo_movimiento,
                '',
                '',
                ''
              ]);
            } else {
              numeroVisita+=1;
              
              if(linea.distancia == -1 || !linea.distancia) {
                distancia = 'NO SE PUDO CALCULAR LA DISTANCIA';
              } else {
                distancia = linea.distancia;
              }
              arr.push([
                linea.usuario,
                linea.cliente,
                linea.fecha,
                linea.d_zona,
                linea.ubicacionCliente,
                linea.tipo_movimiento,
                linea.visita,
                linea.venta,
                linea.razon,
                distancia,
                linea.ubicacionSalida,
              ]);

              if(linea.venta == 'SI'){
                ventaSi+=1;
                ventasSiGeneral+=1;
              } else {
                ventaNo+=1;
                ventasNoGeneral+=1;
              }
            }
            
            index++;
            if(index === obj2.length ){
              arr.push(['']);
              arr.push(['TOTALES']);
              arr.push(['Visitas','Total Proformado','Total Facturado','% Vendido','% No vendido']);
              if(objTotales[0].proforma == 'SI' ){
                proformadoTotalGeneral+= Number(objTotales[0].Total);
                proforma += Number(objTotales[0].Total); 
                //facturadoTotalGeneral+= 0;
              } else if(objTotales[1].proforma == 'SI') {
                proformadoTotalGeneral+= Number(objTotales[1].Total);
                proforma += Number(objTotales[1].Total); 
                //proformadoTotalGeneral+= Number(0);
                //facturadoTotalGeneral+= Number(objTotales[1].Total);
              } 
              
              if (objTotales[0].proforma == null) {
                facturadoTotalGeneral+= Number(objTotales[0].Total);
                total += Number(objTotales[0].Total); 
              } else if(objTotales[1].proforma == null) {
                facturadoTotalGeneral+= Number(objTotales[1].Total);
                total += Number(objTotales[1].Total == null); 
              }
              const totalRegistro = Number(proforma) + Number(total);

              if(proforma > total) {
                porcentaje = (Number(proforma / totalRegistro) *100);
                porcentajeProforma = Number(porcentaje.toFixed(2));
                console.log(porcentajeProforma)
                porcentajeTotal = (100 - Number(porcentajeProforma)).toFixed(2);
              } else {
                porcentaje = Number(total / totalRegistro) *100;
                porcentajeTotal = Number(porcentaje.toFixed(2));
                porcentajeProforma = (100 - Number(porcentajeTotal)).toFixed(2);
              }
              campos = [numeroVisita,proforma,total,porcentajeTotal,porcentajeProforma];
              arr.push(campos)

              
              
              arr.push(['']);
              numeroVisitaTotal+=Number(numeroVisita);
              ventasSiGeneral+=Number(ventaSi);
              ventasNoGeneral+=Number(ventaNo);
            }
          }

         ventaNo=0;
         ventaSi=0;
         index=0;
         proforma =0;
         total =0;
         numeroVisita=0;
        obj= obj.filter(el => el.idusuario != usuario);
        //index2++;
        
      };

      let porcentajeGlobal = 0; 
      let sumaTOtal = Number(proformadoTotalGeneral) + Number(facturadoTotalGeneral);
      if(proformadoTotalGeneral > facturadoTotalGeneral) {
        porcentajeGlobal = (Number(proformadoTotalGeneral / sumaTOtal) *100);
        porcentajeProforma = Number(porcentajeGlobal.toFixed(2));
        porcentajeTotal = (100 - Number(porcentajeProforma)).toFixed(2);
      } else {
        porcentajeGlobal = Number(facturadoTotalGeneral / sumaTOtal) *100;
        porcentajeTotal = Number(porcentajeGlobal.toFixed(2));
        porcentajeProforma = (100 - Number(porcentajeTotal)).toFixed(2);
      }

      arr.push([""]);
      arr.push(["TOTALES GENERALES"]);
      arr.push(["NÜmero Visitas","Total Proformado","Total Facturado","% Vendido","% No vendido"]);
      arr.push([numeroVisitaTotal,proformadoTotalGeneral,facturadoTotalGeneral,porcentajeTotal,porcentajeProforma]);

      



      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Reporte Facturas');
      let headerRow = worksheet.addRow(headers);

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
  }

  reporteWeb(obj,parametros:{cliente: string, fechaInicio: string, fechaFin: string, tipoVisita: string}){

    const tipoComprobante = '12';
    const tipoReporte = 'Visitas';
    localStorage.setItem("comprobantes", JSON.stringify(obj));
    localStorage.setItem("tipoReporte", tipoReporte);
    localStorage.setItem("filtros", JSON.stringify(parametros));
    const pestana = window.open('#/reporte/comprobantes/'+tipoComprobante, '_blank');
      pestana.focus();
  }

  obtenerUsuarios(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/visita/obtener-usuarios/',{headers,responseType: 'text' as 'json'});
  }

  obtenerClientes(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/visita/obtener-clientes-emisor/',{headers,responseType: 'text' as 'json'});
  }

  cargarZonas(){
    // /cliente/listas/zonas

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/cliente/listas/zonas',{headers,responseType: 'text' as 'json'});
  }
}
