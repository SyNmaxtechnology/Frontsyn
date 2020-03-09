import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {baseURL} from '../../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService {

  constructor(private http: HttpClient, private router: Router) { }

  tipoDocumento() {
    return this.http.get(baseURL() + '/tipoDocumento');
  }

  condicionVenta() {
    return this.http.get(baseURL() + '/condicionVenta');
  }

  medioPago() {
    return this.http.get(baseURL() + '/medioPago');
  }

  buscarFacturas(obj: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(baseURL() + '/facturas/buscar/', obj, {headers});
  }

  reporteFactura(id: number) {
    return this.http.get(baseURL() + '/reportes/facturas/?idfactura=' + id);
  }

  descargarPDF(obj: any) {
    const url = baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo;
    const a = document.createElement('a');
    a.href = url;
    a.click();
    // return this.http.get(baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo);
  }

  enviarCorreo(obj: any) { // TIPO 02 ENVIA EL CORREO

    /*const url = baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo;
    const a = document.createElement('a');
    a.href = url;
    a.click();
    a.remove();*/
    
    return this.http.get(baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo + '&listaCorreos=' + obj.listaCorreos);
  }

  reporteExcel(obj: any) {
    if (typeof obj === 'undefined' || obj == null) {
      alert('No hay datos para exportar');
      return;
    } else {
        // tslint:disable-next-line: one-variable-per-declaration
        let tipoFactura = '',
            condicionVenta = '',
            medioPago = '';
        const datos = obj.map(elemento => {

          switch (elemento.tipo_factura) {
            case '01':
              tipoFactura = 'Factura Electrónica';
              break;
            case '04':
              tipoFactura = 'Tiquete Electrónico';
              break;
            case '03':
              tipoFactura = 'Nota Crédito';
              break;
            default:
              throw new Error('El valor para el tipo de factura no esta dentro de los parametros permitidos');
          }

          switch (elemento.medio_pago) {
            case '01':
              medioPago = 'Efectivo';
              break;
            case '02':
              medioPago = 'Tarjeta';
              break;
            case '03':
              medioPago = 'Cheque';
              break;
            case '04':
              medioPago = 'Depósito bancario';
              break;
            case '05':
              medioPago = 'Recaudado por terceros';
              break;
            case '99':
              medioPago = 'Otros';
              break;
          }

          switch (elemento.condicion_venta) {
            case '01':
              condicionVenta = 'Contado';
              break;
            case '02':
              condicionVenta = 'Crédito';
              break;
          }

          return {
            Cliente: (typeof elemento.cliente_nombre === 'undefined') ? '' : elemento.cliente_nombre,
            Clavenumerica: elemento.clavenumerica,
            Consecutivo: elemento.consecutivo,
            NumeroInterno: elemento.numero_interno,
            TipoComprobante: tipoFactura,
            Fecha: elemento.fecha_factura,
            CondicionVenta: condicionVenta,
            MedioPago: medioPago,
            CodigoMoneda: elemento.codigomoneda,
            TipoCambio: elemento.tipocambio,
            PlazoCredito: elemento.plazo_credito,
            PorcentajeDescuento: elemento.porcentaje_descuento_total,
            MontoDescuento: elemento.monto_descuento_total,
            Subtotal: elemento.subtotal,
            ServiciosGravados: elemento.totalservgravados,
            ServiciosExentos: elemento.totalservexentos,
            ServiciosExonerados: elemento.totalservexonerado,
            MercanciasGravadas: elemento.totalmercanciasgravadas,
            MercanciasExentas: elemento.totalmercanciasexentas,
            MercanciasExoneradas: elemento.totalmercanciaexonerada,
            TotalGravado: elemento.totalgravado,
            TotalExento: elemento.totalexento,
            TotalExonerado: elemento.totalexonerado,
            TotalVenta: elemento.totalventa,
            TotalDescuentos: elemento.totaldescuentos,
            TotalVentaNeta: elemento.totalventaneta,
            TotalImpuestos: elemento.totalimpuesto,
            TotalFactura: elemento.totalcomprobante,
            TotalIVADevuelto: elemento.totalIVADevuelto,
            TotalOtrosCargos: (elemento.TotalOtrosCargos == null) ? '0' : elemento.TotalOtrosCargos,
            Estado: (elemento.status_factura == null) ? '' : elemento.status_factura
          };
        });

        const objetoExcel = this.objetoADatosExcel(datos);
        this.descargarExcel(objetoExcel);
    }
  }

  objetoADatosExcel(objeto){
    const excelFilas = [];
    const cabeceras = Object.keys(objeto[0]);
    excelFilas.push(cabeceras.join(','));
    for (const fila of objeto) {
      const valor = cabeceras.map(cabecera => {
        const filaEscapada = fila[cabecera].replace(/"/g, '\\"');
        return `"${filaEscapada}"`;
      });
      excelFilas.push(valor);
    }
    return excelFilas.join('\n');
  }

  descargarExcel(objeto){
    // obtener la fecha para agregarla al nombre del archivo a exportar
    // tslint:disable-next-line: one-variable-per-declaration
    let mesFecha, anioFecha, diaFecha;
    const fechaBusqueda = new Date();
    mesFecha = Number(fechaBusqueda.getMonth()) + 1;
    diaFecha = Number(fechaBusqueda.getDate()) + 1;
    anioFecha = fechaBusqueda.getFullYear();

    if (mesFecha < 10) { mesFecha = '0' + String(mesFecha); }
    if (diaFecha < 10) { diaFecha = '0' + String(diaFecha); }
    const fechaFinal = anioFecha + '_' + mesFecha + '_' + diaFecha;

    // CREAR EL OBJETO BINARIO PARA EXPORTAR EL EXCEL
    const datosExcel = new Blob([objeto], {type : 'text/csv'});
    const url = window.URL.createObjectURL(datosExcel);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'listado de Comprobantes+' + fechaFinal + '.csv');
    document.body.appendChild(a);
    a.click(); // se descarga el archivo
    document.body.removeChild(a);
  }

  cargarVistaFacturas(obj: any){
    // HAY QUE PASAR LOS TIPOS DE FILTROS, NUMERO DE RESULTADOS 
    if(obj.length === 0){
      return;
    } else {

      /*
          this.router.navigate(['/reporte'], {queryParams: {
            fecha1: '20-20-2020',
            fecha2: '20-20-2020',
            tipoFactura: '01'
          }});
      */

      const pestana = window.open('#/reporte/comprobantes/01', '_blank');
      pestana.focus();

    }

  }

  anularComprobante(id: number) {
    return this.http.get(baseURL() + '/notacredito-anular/ ' + id);
  }
}
