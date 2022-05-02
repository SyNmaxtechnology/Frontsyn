import { ReporteDepositosService,Depositos } from './../../services/pages/reporte-depositos.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-depositos',
  templateUrl: './reporte-depositos.component.html',
  styleUrls: ['./reporte-depositos.component.css']
})
export class ReporteDepositosComponent implements OnInit {

  constructor(
    private reporteDepositoService: ReporteDepositosService
  ) { }

  ngOnInit() {

    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const reporteWebClick = fromEvent(reporteWeb,'click');
    const reporteExcelClick = fromEvent(reporteExcel,'click');

    reporteWebClick.subscribe((e:Event) => {
      e.preventDefault();

      if(this.objDeposito.fechaInicio == ''|| this.objDeposito.fechaFin == '') {
        return alert("El rango de fechas es obligatorio");
      } else {
        if(this.objDeposito.fechaInicio > this.objDeposito.fechaFin){
          return alert("La fecha de inicio no puede ser mayor a la fecha de fin");
        }else {
          this.reporteDepositoService.obtenerDatosReporteDepositos(this.objDeposito)
          .subscribe(response => {
            this.reporteDepositoService.reporteWeb(JSON.parse(response),this.objDeposito);
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

      if(this.objDeposito.fechaInicio == ''|| this.objDeposito.fechaFin == '') {
        return alert("El rango de fechas es obligatorio");
      } else {
        if(this.objDeposito.fechaInicio > this.objDeposito.fechaFin){
          return alert("La fecha de inicio no puede ser mayor a la fecha de fin");
        }else {
          this.reporteDepositoService.obtenerDatosReporteDepositos(this.objDeposito)
          .subscribe(response => {
            this.reporteDepositoService.reporteExcel(JSON.parse(response),this.objDeposito);
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

  objDeposito : Depositos = {
    fechaInicio: '',
    fechaFin: ''
  }


  limpiarCampos() {
    this.objDeposito.fechaInicio = '';
    this.objDeposito.fechaFin = '';
  }
}
