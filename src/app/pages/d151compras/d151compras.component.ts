import  Swal  from 'sweetalert2';
import { D151comprasService,D151Compras } from './../../services/pages/d151compras.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-d151compras',
  templateUrl: './d151compras.component.html',
  styleUrls: ['./d151compras.component.css']
})
export class D151comprasComponent implements OnInit {

  constructor(
    private d151ComprasService: D151comprasService
  ) { }

  ngOnInit() {

    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);
    
    const reporteExcelClick = fromEvent(reporteExcel,'click');
    const reporteWebClick = fromEvent(reporteWeb,'click');
    
    reporteExcelClick.subscribe((e:Event) => {

      this.d151ComprasService.obtenerDatosReporte(this.objDatos).subscribe(response => {
        this.d151ComprasService.reporteExcel(response);

      },
      err => {
        const {error} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar información',message,'error');
      })
    })

    reporteWebClick.subscribe((e:Event) => {
      this.d151ComprasService.obtenerDatosReporte(this.objDatos).subscribe(response => {
        this.d151ComprasService.reporteWeb(response,this.objDatos);
      },
      err => {
        const {error} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar información',message,'error');
      })
    })
  }

  objDatos : D151Compras = {
    fechaInicio: '',
    fechaFin: '',
    montoCompra: null
  };
}
