import { FacturaDetalladoService } from './../../services/pages/factura-detallado.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-factura-detallado',
  templateUrl: './factura-detallado.component.html',
  styleUrls: ['./factura-detallado.component.css']
})
export class FacturaDetalladoComponent implements OnInit {

  constructor(
    private facturaDetalladoService: FacturaDetalladoService
  ) { }

  ngOnInit() {

    const btnExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnExcelClick = fromEvent(btnExcel,'click');

    btnExcelClick.subscribe((e: Event) => {

      const fecha1 = this.fechaInicio;
      const fecha2 = this.fechaFin;
      if(fecha1 > fecha2){
        return alert("La fecha de inicio no puede ser mayor a la fecha final");
      } else {
        //reporte excel
        this.facturaDetalladoService.obtenerReporteFacturasDetallado({
          fechaInicio : fecha1,
          fechaFin: fecha2
        }).subscribe(response => {

          const datosReporte = JSON.parse(response);
          this.facturaDetalladoService.reporteExcel(datosReporte);
        },
        err => {
          const {status, error} = err;
          const msgError = JSON.parse(error);

          Swal.fire('Reporte Factura Detallado', msgError.message, 'error');

        })
      }
    })
  }

  fechaInicio : string;
  fechaFin : string;

}
