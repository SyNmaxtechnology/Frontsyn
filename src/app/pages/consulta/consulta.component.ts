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

  idfactura = '';
  objBusquedaFacturas = {
    fechaInicio: '',
    fechaFin: '',
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
  };

  arrayOrdenes = [];
  arrayComprobantes = [];
  tiposDocumento = [];
  mediosPago = [];
  condicionesVenta = [];
  ngOnInit() {
  }
  buscarFacturas(obj: any) {

    const objetoFactura: any = {};
    objetoFactura.tipoFactura = obj.tipoFactura;
    
    if(obj.fechaInicio != '' && obj.fin != ''){
     
      // Obtener los valores de las fechas
      const fecha1: Date = new Date(obj.fechaInicio);
      const fecha2: Date = new Date(obj.fechaFin);
      // tslint:disable-next-line: one-variable-per-declaration
      let mes1: string, dia1: string, anio1: string;
      // tslint:disable-next-line: one-variable-per-declaration
      let mes2: string, dia2: string, anio2: string;
      let fechaInicio: string;
      let fechaFin: string;

      anio1 = fecha1.getFullYear().toString();
      mes1 = (fecha1.getMonth() < 10) ? String('0'+ Number(fecha1.getMonth() + 1)) : String(Number(fecha1.getMonth() + 1));
      dia1 = (fecha1.getDate()< 10)? String('0'+ Number(fecha1.getDate() + 1)) : String(Number(fecha1.getDate() + 1));

      anio2 = fecha2.getFullYear().toString();
      mes2 = (fecha2.getMonth() < 10) ? String('0'+ Number(fecha2.getMonth() + 1)) : String(Number(fecha2.getMonth() + 1));
      dia2 = (fecha2.getDate()< 10)? String('0'+ Number(fecha2.getDate() + 1)) : String(Number(fecha2.getDate() + 1));

      if(Number(dia1) > Number(dia2) && mes1 == mes2 && anio1 == anio2 ){
        alert('La fecha de inicio no se ser mayor a la fecha de fin');
      }
      if(dia1 == dia2 && Number(mes1) > Number(mes2) && anio1 == anio2){
        alert('La fecha de inicio no se ser mayor a la fecha de fin');
      }
      if(Number(dia1) > Number(dia2) && Number(mes1) > Number(mes2) && Number(anio1) > Number(anio2)) {
        alert('La fecha de inicio no se ser mayor a la fecha de fin');
      }

      if(Number(anio1) > Number(anio2)) {
        alert('La fecha de inicio no se ser mayor a la fecha de fin');
      }

      fechaInicio = anio1 + '-' + mes1 + '-' + dia1;
      fechaFin = anio2 + '-' + mes2 + '-' + dia2;
      objetoFactura.fechaInicio = fechaInicio;
      objetoFactura.fechaFin = fechaFin;
    }
    
    if(obj.numeroInterno != ''){
      objetoFactura.numeroInterno = obj.numeroInterno;
    }
  
    if(obj.claveNumerica != ''){
      objetoFactura.claveNumerica = obj.claveNumerica;
    }

    if(obj.consecutivo != ''){
      objetoFactura.consecutivo = obj.consecutivo;
    }

    if(obj.nombreCliente != ''){
      objetoFactura.nombreCliente = obj.nombreCliente;
    }

    this.consultaService.buscarFacturas(objetoFactura)
      .subscribe((response: any) =>  {
        console.log(response.data);
        this.arrayComprobantes =response.data;
        localStorage.setItem('comprobantes', JSON.stringify(response.data));
        localStorage.setItem('filtros', JSON.stringify(objetoFactura));
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
      .subscribe((response: any) => {
        console.log(response);
        this.condicionesVenta = response.condicionVenta;
      },
      err => console.error(err));
  }

  descargarPDF(id, tipo) {
    try {
      this.consultaService.descargarPDF({id , tipo});
    } catch (err) {
      console.error(err);
    }
  }

  enviarCorreo() {
    /*try {

      const tipo = '02';
      const id = this.idfactura;
      const listaCorreos = [];
      const correo1 = (document.getElementById('correo1') as HTMLInputElement).value;
      const correo2 = (document.getElementById('correo2') as HTMLInputElement).value;
      const correo3 = (document.getElementById('correo3') as HTMLInputElement).value;
      listaCorreos.push(correo1);
      listaCorreos.push(correo2);
      listaCorreos.push(correo3);

      this.consultaService.enviarCorreo({id, tipo, listaCorreos});
    } catch (err) {
       console.error(err);
    }*/

    const tipo = '02';
    const id = this.idfactura;
    const listaCorreos = [];
    const correo1 = (document.getElementById('correo1') as HTMLInputElement).value;
    const correo2 = (document.getElementById('correo2') as HTMLInputElement).value;
    const correo3 = (document.getElementById('correo3') as HTMLInputElement).value;

    if (correo1.length > 0) {
      listaCorreos.push(correo1);
    }
    if (correo2.length >  0) {
      listaCorreos.push(correo2);
    }
    if (correo3.length > 0) {
      listaCorreos.push(correo3);
    }
    $('#ModalCorreos').modal('hide');

    this.consultaService.enviarCorreo({id, tipo, listaCorreos})
      .subscribe(response => {
        console.log(response);
      },
      err => console.log(err));
  }

  cargarFactura(id) {
    this.idfactura = id;
  }

  descargarReporteExcel(obj) {
    console.log(obj); 
    try{
      if(this.arrayComprobantes.length === 0){
        return;
      } else {
        this.consultaService.reporteExcel(this.arrayComprobantes);
      } 
    } catch (err){
      console.error(err);
    }
  }

  cargarVistaFacturas(obj) {
    try {  
      this.consultaService.cargarVistaFacturas(obj);
    } catch(err){
      console.error(err);
    }
  }

  anularComprobante(id) {
    this.consultaService.anularComprobante(id)
      .subscribe(response => {
        console.log(response);
      }, err => console.error(err));
  }
}
