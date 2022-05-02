import { ReporteTransferenciaService } from './../../services/pages/reporte-transferencia.service';
import { Depositos } from './../../services/pages/reporte-depositos.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-transferencia',
  templateUrl: './reporte-transferencia.component.html',
  styleUrls: ['./reporte-transferencia.component.css']
})
export class ReporteTransferenciaComponent implements OnInit {

  constructor(
    private reporteTransferenciaService: ReporteTransferenciaService
  ) { }

  ngOnInit() {

    const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);
    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);


    const reporteWebClick = fromEvent(reporteWeb,'click');
    const reporteExcelClick = fromEvent(reporteExcel,'click');

    reporteWebClick.subscribe((e:Event) => {
      e.preventDefault();

      if(this.objTransferencia.fechaInicio == ''|| this.objTransferencia.fechaFin == '') {
        return alert("El rango de fechas es obligatorio");
      } else {
        if(this.objTransferencia.fechaInicio > this.objTransferencia.fechaFin){
          return alert("La fecha de inicio no puede ser mayor a la fecha de fin");
        }else {
          this.reporteTransferenciaService.obtenerDatosTransferencias(this.objTransferencia)
          .subscribe(response => {
            this.reporteTransferenciaService.reporteWeb(JSON.parse(response),this.objTransferencia);
            this.limpiarCampos();
          },err => {
            const {error,status} = err;
            const {message} = error;
            Swal.fire('Generar Reporte',message? message: 'Hubo un error al buscar la información del reporte','error');
          })
        }
      }
    })

    reporteExcelClick.subscribe((e:Event) => {
      e.preventDefault();

      if(this.objTransferencia.fechaInicio == ''|| this.objTransferencia.fechaFin == '') {
        return alert("El rango de fechas es obligatorio");
      } else {
        if(this.objTransferencia.fechaInicio > this.objTransferencia.fechaFin){
          return alert("La fecha de inicio no puede ser mayor a la fecha de fin");
        }else {
          this.reporteTransferenciaService.obtenerDatosTransferencias(this.objTransferencia)
          .subscribe(response => {
            console.log(response);
            this.reporteTransferenciaService.reporteExcel(JSON.parse(response),this.objTransferencia);
            this.limpiarCampos();
          },err => {
            const {error,status} = err;
            const {message} = error;
            Swal.fire('Generar Reporte',message? message: 'Hubo un error al buscar la información del reporte','error');
          })
        }
      }
    })

  }

  objTransferencia : Depositos = {
    fechaInicio: '',
    fechaFin: ''
  }

  limpiarCampos() {
    this.objTransferencia.fechaInicio = '';
    this.objTransferencia.fechaFin = '';
  }
}
