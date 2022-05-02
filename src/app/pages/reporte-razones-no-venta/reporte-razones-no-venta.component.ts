import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Razon } from 'src/app/services/pages/razon-no-venta.service';
import { ReporteRazonesNoVentaService,ReporteRazonesNoVenta } from 'src/app/services/pages/reporte-razones-no-venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-razones-no-venta',
  templateUrl: './reporte-razones-no-venta.component.html',
  styleUrls: ['./reporte-razones-no-venta.component.css']
})
export class ReporteRazonesNoVentaComponent implements OnInit {

  constructor(
    private reporteRazonNoVentaService: ReporteRazonesNoVentaService
  ) { }

  objReporte: ReporteRazonesNoVenta = {
    idrazon: '',
    fechaInicio: '',
    fechaFin: ''

  };
  listaRazones: Razon[]= [];
  ngOnInit() {

    const btnExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const btnExcelClick = fromEvent(btnExcel,'click');
    const btnWebClick = fromEvent(btnWeb,'click');

    btnWebClick.subscribe((e:Event) => {

      if(this.objReporte.fechaInicio > this.objReporte.fechaFin) {
        this.objReporte.fechaInicio = '';
        this.objReporte.fechaFin = '';
        return alert("La fecha de inicio no puede ser mayor a la fecha final");
      }

      if(this.objReporte.fechaFin && !this.objReporte.fechaInicio) {
        this.objReporte.fechaInicio = '';
        this.objReporte.fechaFin = '';
        return alert("Si envía el parámetro de fechas, debe enviar ambas fechas");

        
      }
      this.reporteRazonNoVentaService.obtenerReporteRazonesNoVenta(this.objReporte)
        .subscribe(response => {
          const selectIdRazon = (document.getElementById("idrazon") as HTMLSelectElement);
          const textoSeleccionado = selectIdRazon.options[selectIdRazon.selectedIndex].innerText;
          const valorSeleccionado = selectIdRazon.options[selectIdRazon.selectedIndex].value;

          let razon = '';
          if(valorSeleccionado && valorSeleccionado.toString() !== ''){
            razon = textoSeleccionado;
          }
          this.reporteRazonNoVentaService.reporteWeb(response,razon,this.objReporte.fechaInicio,this.objReporte.fechaFin)
      },err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargando Razones...',message?message:'Hubo un error al cargar las razones no venta','error');
      })
    })

    btnExcelClick.subscribe((e:Event) => {
      if(this.objReporte.fechaInicio > this.objReporte.fechaFin) {
        this.objReporte.fechaInicio = '';
        this.objReporte.fechaFin = '';
        return alert("La fecha de inicio no puede ser mayor a la fecha final");
      }

      if(this.objReporte.fechaFin && !this.objReporte.fechaInicio) {
        this.objReporte.fechaInicio = '';
        this.objReporte.fechaFin = '';
        return alert("Si envía el parámetro de fechas, debe enviar ambas fechas");

        
      }

      this.reporteRazonNoVentaService.obtenerReporteRazonesNoVenta(this.objReporte)
        .subscribe(response => {
          const selectIdRazon = (document.getElementById("idrazon") as HTMLSelectElement);
          const textoSeleccionado = selectIdRazon.options[selectIdRazon.selectedIndex].innerText;
          const valorSeleccionado = selectIdRazon.options[selectIdRazon.selectedIndex].value;

          let razon = '';
          if(valorSeleccionado && valorSeleccionado.toString() !== ''){
            razon = textoSeleccionado;
          }
          this.reporteRazonNoVentaService.reporteExcel(response,razon,this.objReporte.fechaInicio,this.objReporte.fechaFin);
      },err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargando Razones...',message?message:'Hubo un error al cargar las razones no venta','error');
      })  
    })

    this.reporteRazonNoVentaService.obtenerRazonesNoVenta()
      .subscribe(response => {
        this.listaRazones = response;
      },err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargando Razones...',message?message:'Hubo un error al cargar las razones no venta','error');
      })
  }

}
