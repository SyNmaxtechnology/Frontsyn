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
    clave: '',
    consecutivo: '',
    descuentoTotal: 0,
    porcentajeDescuentoTotal: 0,
    subtotal: 0,
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
  }

  arrayComprobantes = [];
  tiposDocumento= [];
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
          this.tipoFactura = 'Factura Electrónica';
        } else if (response.factura[0].tipo_factura === '04') {
          this.tipoFactura = 'Tiquete Electrónico';
        } else if (response.factura[0].tipo_factura === '03') {
          this.tipoFactura = 'Nota de Crédito';
        }
        console.log(response);
      },
      err => console.error(err));
  }
}
