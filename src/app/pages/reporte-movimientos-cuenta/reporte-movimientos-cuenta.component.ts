import { ReporteMovimientosCuentaService,MovimientosCuenta } from './../../services/pages/reporte-movimientos-cuenta.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-reporte-movimientos-cuenta',
  templateUrl: './reporte-movimientos-cuenta.component.html',
  styleUrls: ['./reporte-movimientos-cuenta.component.css']
})
export class ReporteMovimientosCuentaComponent implements OnInit {

  constructor(
    private reporteMovimientosCuentasService: ReporteMovimientosCuentaService
  ) { }

  ngOnInit() {
    this.reporteMovimientosCuentasService.cargarCuentas()
      .subscribe(response => {
        this.listaCuentas = JSON.parse(response);
        console.log(this.listaCuentas)
      },err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);

        Swal.fire('Cargando cuentas', message ? message : 'Hubo un error al cargar las cuentas');
      })

      const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
      const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

      const reporteExcelClick = fromEvent(reporteExcel,'click');
      const reporteWebClick = fromEvent(reporteWeb,'click');

      reporteExcelClick.subscribe((e: Event) => {
        if(this.objMovimientosCuenta.fechaInicio == '' || this.objMovimientosCuenta.fechaFin == ''){
          return alert("El rango de fechas es un campo obligatorio");
        } else {
          if(this.objMovimientosCuenta.fechaInicio > this.objMovimientosCuenta.fechaFin){
            return alert("La fecha de inicio no puede ser mayor a la fecha final")
          } else {
            this.reporteMovimientosCuentasService.obtenerDatosMovimientos(this.objMovimientosCuenta)
              .subscribe(response => {
                this.reporteMovimientosCuentasService.reporteExcel(JSON.parse(response),this.objMovimientosCuenta);
              },err => {
                const {error,status} = err;
                const {message} = JSON.parse(error);
                Swal.fire('Generar reporte', message ? message : 'Hubo un error al generar el reporte','error');
            })
          }
        }
      })

      reporteWebClick.subscribe((e: Event) => {
        if(this.objMovimientosCuenta.fechaInicio == '' || this.objMovimientosCuenta.fechaFin == ''){
          return alert("El rango de fechas es un campo obligatorio");
        } else {
          if(this.objMovimientosCuenta.fechaInicio > this.objMovimientosCuenta.fechaFin){
            return alert("La fecha de inicio no puede ser mayor a la fecha final")
          } else {
            this.reporteMovimientosCuentasService.obtenerDatosMovimientos(this.objMovimientosCuenta)
              .subscribe(response => {
                this.reporteMovimientosCuentasService.reporteWeb(JSON.parse(response),this.objMovimientosCuenta);
              },err => {
                const {error,status} = err;
                const {message} = JSON.parse(error);
                Swal.fire('Generar reporte', message ? message : 'Hubo un error al generar el reporte','error');
            })
          }
        }
      })
  }

  listaCuentas = [];
  objMovimientosCuenta: MovimientosCuenta = {
    idcuenta: '',
    fechaInicio: '',
    fechaFin: ''
  }
}
