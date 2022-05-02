import  Swal from 'sweetalert2';
import { D151Ventas } from './../../services/pages/d151ventas.service';
import { D151ventasresumidoService } from './../../services/pages/d151ventasresumido.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-d151ventasresumido',
  templateUrl: './d151ventasresumido.component.html',
  styleUrls: ['./d151ventasresumido.component.css']
})
export class D151ventasresumidoComponent implements OnInit {

  constructor(
    private d151ventasresumidoService: D151ventasresumidoService
  ) { }

  ngOnInit() {

    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const reporteExcelClick = fromEvent(reporteExcel,'click');
    const reporteWebClick = fromEvent(reporteWeb,'click');

    reporteExcelClick.subscribe((e: Event) => {
      if(this.objDatos.fechaInicio > this.objDatos.fechaInicio){
        return alert("La fecha de inicio no puede ser mayor a la fecha fin");
      } else {
        this.d151ventasresumidoService.obtenerDatosReporte(this.objDatos).subscribe(response => {
         this.d151ventasresumidoService.reporteExcel(response);
        },
        err => {
          const {error} = err;
          const {message} = JSON.parse(error);
          Swal.fire('Cargar información',message,'error');
        })
      }
    })

    reporteWebClick.subscribe((e: Event) => {
      if(this.objDatos.fechaInicio > this.objDatos.fechaInicio){
        return alert("La fecha de inicio no puede ser mayor a la fecha fin");
      } else {
        this.d151ventasresumidoService.obtenerDatosReporte(this.objDatos).subscribe(response => {
         this.d151ventasresumidoService.reporteWeb(response,this.objDatos);
        },
        err => {
          const {error} = err;
          const {message} = JSON.parse(error);
          Swal.fire('Cargar información',message,'error');
        })
      }
    })

  }

  objDatos: D151Ventas = {
    fechaInicio: '',
    fechaFin: '',
    montoVenta: null,
  }

}
