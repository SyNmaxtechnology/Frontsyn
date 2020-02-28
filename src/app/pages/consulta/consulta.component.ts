import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/pages/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(private consultaService: ConsultaService) { 

    this.tipoDocumento();
    this.medioPago();
    this.condicionVenta();
  }

  objBusquedaFacturas = {
    fechaInicio: '',
    fechaFin: '',
    tipoDocumento: '',
    numeroInterno: '',
    nombreCliente: '',
    claveNumerica: '',
    consecutivo: '',
    tipoFactura: ''
  };

  objFacturaResultado = {
    id: '',
    clave: '',
    consecutivo: '',
    descuentoTotal: 0,
    porcentajeDescuentoTotal: 0,
    subtotal: 0,
    medioPago: '',
    condicionVenta: '',
    totalservgravados: 0,
    totalservexentos: 0,
    totalservexonerado: 0,
    totalmercanciasgravadas: 0,
    totalmercanciasexentas: 0,
    totalmercanciaexonerada: 0,
    totalgravado: 0,
    totalexento: 0,
    totalexonerado: 0,
    totalventa: 0,
    totaldescuentos: 0,
    totalventaneta: 0,
    totalimpuesto: 0,
    totalcomprobante: 0,
    codigomoneda: '',
    tipocambio: '',
    fechaFactura: '',
    tipoFactura: ''
  }
  
  arrayOrdenes = [];
  arrayComprobantes = [];
  tiposDocumento= [];
  mediosPago = [];
  condicionesVenta = [];
  ngOnInit() {
  }
  ejecutarBusqueda(obj: any) {
    console.log(obj);
    this.buscarFacturaPorTipoOFechas(obj);
  }
  buscarFacturaPorTipoOFechas(obj: any) {
    this.consultaService.buscarFacturaPorFechaOtipo(obj)
      .subscribe(response =>  {
        console.log(response.data[0]);
        this.arrayComprobantes = response.data;
      },
      err => console.error(err));
  }

  tipoDocumento() {
    this.consultaService.tipoDocumento()
      .subscribe(response => {
        this.tiposDocumento = response.tipoDocumento;
      },
      err => console.error(err));
  }

  reporteFactura(id: number) {
    console.log(id);
    this.consultaService.reporteFactura(id)
      .subscribe(response => {
        if (response.factura[0].tipo_factura === '01') {
          this.objFacturaResultado.tipoFactura = 'Factura Electrónica';
        } else if (response.factura[0].tipo_factura === '04') {
          this.objFacturaResultado.tipoFactura = 'Tiquete Electrónico';
        } else if (response.factura[0].tipo_factura === '03') {
          this.objFacturaResultado.tipoFactura = 'Nota de Crédito';
        }
        console.log(response);

        // cargar datos totales y encabezado de factura

        this.objFacturaResultado.clave = response.factura[0].clavenumerica;
        this.objFacturaResultado.consecutivo = response.factura[0].consecutivo;
        this.objFacturaResultado.medioPago = response.factura[0].medio_pago;
        this.objFacturaResultado.condicionVenta = response.factura[0].condicion_venta;
        this.objFacturaResultado.fechaFactura = response.factura[0].fecha_factura;
        this.objFacturaResultado.porcentajeDescuentoTotal = response.factura[0].porcentaje_descuento_total;
        this.objFacturaResultado.descuentoTotal = response.factura[0].monto_descuento_total;
        this.objFacturaResultado.subtotal = response.factura[0].subtotal;
        this.objFacturaResultado.totalservgravados = response.factura[0].totalservgravados;
        this.objFacturaResultado.totalservexentos = response.factura[0].totalservexentos;
        this.objFacturaResultado.totalservexonerado = response.factura[0].totalservexonerado;
        this.objFacturaResultado.totalmercanciasgravadas = response.factura[0].totalmercanciasgravadas;
        this.objFacturaResultado.totalmercanciasexentas = response.factura[0].totalmercanciasexentas;
        this.objFacturaResultado.totalmercanciaexonerada = response.factura[0].totalmercanciaexonerada;
        this.objFacturaResultado.totalgravado = response.factura[0].totalgravado;
        this.objFacturaResultado.totalexento = response.factura[0].totalexento;
        this.objFacturaResultado.totalexonerado = response.factura[0].totalexonerado;
        this.objFacturaResultado.totalventa = response.factura[0].totalventa;
        this.objFacturaResultado.totaldescuentos = response.factura[0].totaldescuentos;
        this.objFacturaResultado.totalventaneta = response.factura[0].totalventaneta;
        this.objFacturaResultado.totalimpuesto = response.factura[0].totalimpuesto;
        this.objFacturaResultado.totalcomprobante = response.factura[0].totalcomprobante;
        this.objFacturaResultado.tipocambio = response.factura[0].tipocambio;
        this.objFacturaResultado.id = response.factura[0].id;
        this.arrayOrdenes = response.ordenes;

        console.log(this.arrayOrdenes);
      },
      err => console.error(err));
  }

  medioPago() {
    this.consultaService.medioPago()
      .subscribe(response =>  {
      console.log(response);
      this.mediosPago = response.medioPago;
      }, err => console.error(err));
  }

  condicionVenta() {
    this.consultaService.condicionVenta()
      .subscribe(response => {
        console.log(response);
        this.condicionesVenta = response.condicionVenta;
      },
      err => console.error(err));
  }

  reportesYCorreos(id,tipo){
  
    this.consultaService.reportesYCorreos({id,tipo})
      .subscribe(response => {
       console.log(response);
      },
      err => console.error(err));
  }
}
