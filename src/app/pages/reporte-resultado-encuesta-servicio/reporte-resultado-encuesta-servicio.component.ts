import { ReporteResultadoEncuestaServicioService, ReporteEncuestaServicio } from './../../services/pages/reporte-resultado-encuesta-servicio.service';
import { ReporteVisitasService } from './../../services/pages/reporte-visitas.service';
import { PreguntaEncuestaServicio } from './../../services/pages/encuesta-servicio.service';
import { ResultadoEncuestaServicioService } from './../../services/pages/resultado-encuesta-servicio.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-reporte-resultado-encuesta-servicio',
  templateUrl: './reporte-resultado-encuesta-servicio.component.html',
  styleUrls: ['./reporte-resultado-encuesta-servicio.component.css']
})
export class ReporteResultadoEncuestaServicioComponent implements OnInit {

  constructor(
    private resultadoEncuestaServicioService: ResultadoEncuestaServicioService,
    private reporteVisitasService:ReporteVisitasService,
    private reporteResultadoEncuestaServicioService: ReporteResultadoEncuestaServicioService
  ) { }

  ngOnInit() {

    const btnExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);
    const pregunta = (document.getElementById("pregunta") as HTMLSelectElement);
    const usuario = (document.getElementById("usuario") as HTMLSelectElement);

    const btnExcelClick = fromEvent(btnExcel,'click');
    const btnWebClick = fromEvent(btnWeb,'click');

    const dateFechaInicio = (document.getElementById("fechaInicio") as HTMLInputElement);
    const dateFechaFin = (document.getElementById("fechaFin") as HTMLInputElement);

    this.resultadoEncuestaServicioService.cargarPreguntas()
      .subscribe(response => {
        console.log(response);
        this.listaPreguntas = response;
      }, err => {
        const {error,status} = err
        const { message} = JSON.parse(error);
        Swal.fire('Cargar Preguntas',message? message: 'Error al cargar las preguntas','error');
      })

      this.reporteVisitasService.obtenerUsuarios()
        .subscribe(response => {
          const usuarios = JSON.parse(response);
          this.listaUsuarios = usuarios;
        }, err => {
        const {error,status} = err
        const { message} = JSON.parse(error);
        Swal.fire('Cargar Usuario',message? message: 'Error al cargar los usuarios','error');
      });
      
      //boton de excel
      btnExcelClick.subscribe(e => {

        e.preventDefault();
        //if(usuario.value === '') return alert("El campo de usuario es requerido");
              
        const obj : ReporteEncuestaServicio = {
          idusuario :  Number(usuario.value),
          idpregunta: Number(pregunta.value),
          fechaInicio: String(dateFechaInicio.value),
          fechaFin: String(dateFechaFin.value),
        }        
        
        this.reporteResultadoEncuestaServicioService.obtenerDatosReporte(obj)
          .subscribe(response => {
            this.reporteResultadoEncuestaServicioService.reporteExcel(response);
            usuario.value = '';
            pregunta.value = '';
          }, err => {
            const {error,status} = err
            const { message} = JSON.parse(error);
            Swal.fire('Cargar Reporte',message? message: 'Error al cargar el reporte','error');
          })
      
      })

      //boton de web

      btnWebClick.subscribe(e => {
        e.preventDefault();

        // if(usuario.value === '') return alert("El campo de usuario es requerido");
       // else {
          const obj : ReporteEncuestaServicio = {
            idusuario :  Number(usuario.value),
            idpregunta: Number(pregunta.value),
            fechaInicio: String(dateFechaInicio.value),
            fechaFin: String(dateFechaFin.value),
          }      
          
          this.reporteResultadoEncuestaServicioService.obtenerDatosReporte(obj)
            .subscribe(response => {
              
              this.reporteResultadoEncuestaServicioService.reporteWeb(response,
              pregunta.value === ''? '': pregunta.options[pregunta.options.selectedIndex].innerText,
              usuario.value === ''? '': usuario.options[usuario.options.selectedIndex].innerText);
  
              usuario.value = '';
              pregunta.value = '';
            
            }, err => {
              const {error,status} = err
              const { message} = JSON.parse(error);
              Swal.fire('Cargar Reporte',message? message: 'Error al cargar el reporte','error');
          })
        //}
      })
  }

  listaPreguntas: PreguntaEncuestaServicio[] = [];
  listaUsuarios = [];
}
