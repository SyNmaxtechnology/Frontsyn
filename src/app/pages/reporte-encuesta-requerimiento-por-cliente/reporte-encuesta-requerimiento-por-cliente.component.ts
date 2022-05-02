import { ReporteEncuestaRequerimientoPorClienteService, ReporteRequerimiento } from './../../services/pages/reporte-encuesta-requerimiento-por-cliente.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-reporte-encuesta-requerimiento-por-cliente',
  templateUrl: './reporte-encuesta-requerimiento-por-cliente.component.html',
  styleUrls: ['./reporte-encuesta-requerimiento-por-cliente.component.css']
})
export class ReporteEncuestaRequerimientoPorClienteComponent implements OnInit {

  constructor(
    private reporteEncuestaRequerimientoPorClienteService:ReporteEncuestaRequerimientoPorClienteService
  ) { }

  ngOnInit() {

    const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);
    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);

    const reporteExcelClick = fromEvent(reporteExcel,'click');
    const reporteWebClick = fromEvent(reporteWeb,'click');

    reporteExcelClick.subscribe(() => {
      
      if(this.objReporteRequerimiento.fechaInicio === '' || this.objReporteRequerimiento.fechaFin === ''){
        return alert("Los campos de fecha son requeridos")
      } else {

        if(this.objReporteRequerimiento.fechaInicio > this.objReporteRequerimiento.fechaFin) return alert("La fecha inicial no puede ser mayor a la fecha final");
        this.reporteEncuestaRequerimientoPorClienteService.cargarDatosReporte(this.objReporteRequerimiento)
          .subscribe(response => {
            const selectClientes = (document.getElementById("cliente") as HTMLSelectElement);
            const option = selectClientes.options[selectClientes.selectedIndex];
            let cliente = '';
          if(option.value !== ''){
            cliente = option.innerText;
          } 
            this.reporteEncuestaRequerimientoPorClienteService.reporteExcel(response,cliente,this.objReporteRequerimiento)
          },
          err => {
            const {error,status} = err;
            const {message} = JSON.parse(error);
            Swal.fire('Cargando Clientes',message?message:'Error al cargar los datos del reporte','error');
          })
      }

    })

    reporteWebClick.subscribe(() => {
      
      if(this.objReporteRequerimiento.fechaInicio > this.objReporteRequerimiento.fechaFin) return alert("La fecha inicial no puede ser mayor a la fecha final");
      this.reporteEncuestaRequerimientoPorClienteService.cargarDatosReporte(this.objReporteRequerimiento)
        .subscribe(response => {
          const selectClientes = (document.getElementById("cliente") as HTMLSelectElement);
          const option = selectClientes.options[selectClientes.selectedIndex];
          let cliente = '';
          if(option.value !== ''){
            cliente = option.innerText;
          } 

          this.reporteEncuestaRequerimientoPorClienteService.reporteWeb(response,{
            fechaFin: this.objReporteRequerimiento.fechaFin,
            fechaInicio: this.objReporteRequerimiento.fechaInicio,
            cliente
          })
        },
        err => {
          const {error,status} = err;
          const {message} = JSON.parse(error);
          Swal.fire('Cargando Clientes',message?message:'Error al cargar los datos del reporte','error');
        })

    })

    this.reporteEncuestaRequerimientoPorClienteService.cargarClientes()
      .subscribe(response => {
        const { clientes } = JSON.parse(response);
        this.listaClientes = clientes;
      }, err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargando Clientes',message?message:'Error al cargar los clientes','error');
    })
  }

  listaClientes = [];
  objReporteRequerimiento : ReporteRequerimiento = { 
    fechaFin: '',
    fechaInicio: '',
    idcliente: '',
    tipoReporte: 'cliente'
  };

}
