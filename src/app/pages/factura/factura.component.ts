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
  }
  
  objFactura =  {
    tipoCambio: ''
  }


  ngOnInit() {
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
}
