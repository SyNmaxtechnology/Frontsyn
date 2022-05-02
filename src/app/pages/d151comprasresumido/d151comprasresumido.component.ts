import Swal from 'sweetalert2';
import { D151Compras } from './../../services/pages/d151compras.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { D151comprasresumidoService } from 'src/app/services/pages/d151comprasresumido.service';

@Component({
  selector: 'app-d151comprasresumido',
  templateUrl: './d151comprasresumido.component.html',
  styleUrls: ['./d151comprasresumido.component.css']
})
export class D151comprasresumidoComponent implements OnInit {

  constructor(
    private d151ComprasResumidoService: D151comprasresumidoService
  ) { }

  ngOnInit() {

    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const reporteExcelClick = fromEvent(reporteExcel,'click');
    const reporteWebClick = fromEvent(reporteWeb,'click');

    reporteExcelClick.subscribe((e:Event) => {
      this.d151ComprasResumidoService.obtenerDatosReporte(this.objDatos)
        .subscribe(response => {
          this.d151ComprasResumidoService.reporteExcel(response);
        },err => {
          const {error} = err;
          const {message} = JSON.parse(error);
          Swal.fire('Cargando información...',message,'error');
        })
    })

    reporteWebClick.subscribe((e:Event) => {
      this.d151ComprasResumidoService.obtenerDatosReporte(this.objDatos)
        .subscribe(response => {
          this.d151ComprasResumidoService.reporteWeb(response, this.objDatos);
        },err =>{
          const {error} = err;
          const{ message} = JSON.parse(error);
          Swal.fire('Cargando información...',message,'error');
      })
    })
  }

  objDatos : D151Compras = {
    fechaInicio: '',
    fechaFin: '',
    montoCompra: null
  }
}
