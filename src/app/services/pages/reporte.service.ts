import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  
  constructor() { }

  obtenerListadoComprobantes() {

    const comprobantes = JSON.parse(localStorage.getItem('comprobantes'));
    let tipoFactura = '';
    let condicionVenta = '';
    let medioPago = '';
    console.log(comprobantes);
    const datos = comprobantes.map(elemento => {

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
        NombreComercial : (typeof elemento.cliente_nombre_comercial !== 'undefined') ? elemento.cliente_nombre_comercial : '',
        CedulaCliente: elemento.cedula_cliente,
        Clavenumerica: elemento.clavenumerica,
        Consecutivo: elemento.consecutivo,
        NumeroInterno: elemento.numero_interno,
        TipoComprobante: tipoFactura,
        Fecha: elemento.fecha_factura,
        Hora: elemento.hora,
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

    return datos;
  }

  
}

