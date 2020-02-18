import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/pages/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: []
})
export class FacturaComponent implements OnInit {

  constructor(private facturaService: FacturaService) {

    this.obtenerTipoCambio();
    this.fechaHora();
    this.obtenerMonedas();
    this.tipoDocumento = facturaService.tipoDocumento();
    this.medioPago = facturaService.medioPago();
    this.condicionVenta = facturaService.condicionVenta();

  }

  objFactura =  {
    id: '',
    idcliente: '',
    idemisor: '',
    condicion_venta: '',
    medio_pago: '',
    porcentaje_descuento_total: '',
    monto_descuento_total: '',
    subtotal: '',
    totalservgravados: '',
    totalservexentos: '',
    totalservexonerado: '',
    totalmercanciasgravadas: '',
    totalmercanciasexentas: '',
    totalmercanciaexonerada: '',
    totalgravado: '',
    totalexento: '',
    totalexonerado: '',
    totalventa: '',
    totaldescuentos: '',
    totalventaneta: '',
    totalimpuesto: '',
    totalcomprobante: '',
    codigomoneda: '',
    tipoCambio: '',
    tipo_factura: '',
    fecha_factura: '',
    ordenes: []
  };
  
  tipoDocumento: object = [];
  condicionVenta: object = [];
  medioPago: object = [];
  listaMonedas: object = [];
  listaDetalles: object = [];

  ngOnInit() {
  }

  factura(e,obj){
    e.preventDefault();
    console.log(obj);
  }
  
  fechaHora(){
    const d = new Date();
    const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
    const dia = d.getDate();
    const anio = d.getFullYear();
    const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    const minutos = (d.getMinutes() < 10) ?  '0' + d.getMinutes() : d.getMinutes();
  
    this.objFactura.fecha_factura = dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos;
  }

  obtenerTipoCambio() {
    this.facturaService.obtenerTipoCambio()
      .subscribe(tipoCambio => {

      const respuesta = tipoCambio.response;
      let xmlDoc: any;
      const parser = new DOMParser();

      if (window.DOMParser) { // PARSEAR el xml para poder leerlo
        xmlDoc = parser.parseFromString(respuesta, 'text/html');

      } /*else {
        // EN EL CASO QUE SEA INTERNET EXPLORER
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.loadXML(respuesta);
      }*/

      const tipocambio = Number(xmlDoc.getElementsByTagName('NUM_VALOR')[0].innerHTML).toFixed(2);
      this.objFactura.tipoCambio = tipocambio.toString();
    },
     err => {
       if (err.status === 500) {
        this.objFactura.tipoCambio = '1.00';
       }
     });
  }

  obtenerMonedas() {
    this.facturaService.obtenerMonedas()
      .subscribe(monedas => {
       this.listaMonedas = monedas.response;
      },
      err => console.log(err));
  }
}
