import { ReporteRequerimiento } from './../../services/pages/reporte-encuesta-requerimiento-por-cliente.service';
import { PreguntaEncuestaServicio } from './../../services/pages/encuesta-servicio.service';
import { ReporteEncuestaRequerimientoPorRequerimientoService } from './../../services/pages/reporte-encuesta-requerimiento-por-requerimiento.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-encuesta-requerimiento-por-requerimiento',
  templateUrl: './reporte-encuesta-requerimiento-por-requerimiento.component.html',
  styleUrls: ['./reporte-encuesta-requerimiento-por-requerimiento.component.css']
})
export class ReporteEncuestaRequerimientoPorRequerimientoComponent implements OnInit {

  constructor(
    private reporteEncuestaRequerimientoPorRequerimientoService: ReporteEncuestaRequerimientoPorRequerimientoService
  ) { }

  ngOnInit() {

    const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);
    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);

    const reporteExcelClick = fromEvent(reporteExcel,'click');
    const reporteWebClick = fromEvent(reporteWeb,'click');

    reporteExcelClick.subscribe(e => {
      e.preventDefault();
      
      if(this.objReporte.fechaInicio === '' || this.objReporte.fechaFin === '') return alert("El parámetro de fechas es requerido");
      if(this.objReporte.fechaInicio > this.objReporte.fechaFin ) return alert("La fecha de inicio no puede ser mayor a la fecha final");
      else {

        this.reporteEncuestaRequerimientoPorRequerimientoService.cargarDatosReporte(this.objReporte) 
          .subscribe(response => {
            console.log(response);
            const pregunta = (document.getElementById("pregunta")  as HTMLSelectElement);
            let option = pregunta.options[pregunta.selectedIndex];
            let preguntaSeleccionada = '';

            if(option.value.toString() !== ''){
              preguntaSeleccionada = option.innerText;
            }

            this.reporteEncuestaRequerimientoPorRequerimientoService.reporteExcel(
                response,preguntaSeleccionada,{fechaInicio: this.objReporte.
                fechaInicio,fechaFin: this.objReporte.fechaFin});

          },err => {
            const {error,status} = err;
            const { message} = JSON.parse(error);
            Swal.fire('Cargando Reporte',message?message: 'Error al obtener la informacion del reporte','error');
          })

      }
    });

    reporteWebClick.subscribe(e => {
      e.preventDefault();

      if(this.objReporte.fechaInicio === '' || this.objReporte.fechaFin === '') return alert("El parámetro de fechas es requerido");
      if(this.objReporte.fechaInicio > this.objReporte.fechaFin ) return alert("La fecha de inicio no puede ser mayor a la fecha final");
      else {

        this.reporteEncuestaRequerimientoPorRequerimientoService.cargarDatosReporte(this.objReporte) 
          .subscribe(response => {
            
            const pregunta = (document.getElementById("pregunta")  as HTMLSelectElement);
            let option = pregunta.options[pregunta.selectedIndex];
            let preguntaSeleccionada = '';

            if(option.value.toString() !== ''){
              preguntaSeleccionada = option.innerText;
            }

            this.reporteEncuestaRequerimientoPorRequerimientoService.reporteWeb(
                response,{fechaInicio: this.objReporte.
                fechaInicio,fechaFin: this.objReporte.fechaFin, pregunta: preguntaSeleccionada});

          },err => {
            const {error,status} = err;
            const { message} = JSON.parse(error);
            Swal.fire('Cargando Reporte',message?message: 'Error al obtener la informacion del reporte','error');
          })

      }
    });

    this.reporteEncuestaRequerimientoPorRequerimientoService.cargarPreguntas()
      .subscribe(response => this.listaPreguntas = response
      ,err =>{
        const {error,status} = err;
        const { message} = JSON.parse(error);
        Swal.fire('Cargando preguntas...',message?message: 'Error al cargar las preguntas','error');
      })
  }
 
  listaPreguntas : PreguntaEncuestaServicio [] = [];
  objReporte : ReporteRequerimiento = { 
    idpregunta: '',
    fechaFin: '',
    fechaInicio: '',
    tipoReporte: 'requerimiento'
  }
}
