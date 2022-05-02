import { EncuestaRequerimientoService } from './../../services/pages/encuesta-requerimiento.service';
import { Component, OnInit } from '@angular/core';
import { PreguntaEncuestaServicio } from 'src/app/services/pages/encuesta-servicio.service';
import Swal from 'sweetalert2';
declare var $;
@Component({
  selector: 'app-encuesta-requerimiento',
  templateUrl: './encuesta-requerimiento.component.html',
  styleUrls: ['./encuesta-requerimiento.component.css']
})

export class EncuestaRequerimientoComponent implements OnInit {

  constructor(
    private encuestaRequerimientoService:EncuestaRequerimientoService
  ) { }

  ngOnInit() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    this.cargarPreguntas();
  }

  listaPreguntas : PreguntaEncuestaServicio [] = [];
  collection = { count: 0, data: [] };
  config: any;
  query : string = '';
  tablaPequena : boolean = false;
  objPregunta : PreguntaEncuestaServicio = {
    id: null,
    pregunta : '',
    auditoria: null
  };
  disable: boolean = false;
  
  pageChanged(event){
    this.config.currentPage = event;
  }

  obtenerPreguntaPorId(id:number){
    this.encuestaRequerimientoService.obtenerPreguntaPorId(id)
    .subscribe(response =>{
      console.log(response);
      this.objPregunta.id = response[0].id;
      this.objPregunta.auditoria = response[0].auditoria;
      this.objPregunta.pregunta = response[0].pregunta;
    }, err => {
      console.log(err)
      const {error,status} = err;
      const { message } = JSON.parse(error);
      Swal.fire('Obtener Pregunta', message,'error');
    })
  }

  limpiarCampos(){
    this.objPregunta.auditoria = '';
    this.objPregunta.pregunta = '';
    this.objPregunta.id = null;
  }

  validarExpresion(pregunta: string){
    const expresion = /^[0-9A-Za-zÁÉÍÓÚáéíóúñÑ.,; ]+$/g;
    if(expresion.test(pregunta)){
      this.disable = false;
    } else {
      this.disable = true;
    }
  }

  buscarRazon(query: string){
    for (const pregunta of this.listaPreguntas) {
      if(query.trim() === pregunta.pregunta.trim()){
        this.collection.data = [];
        this.collection.data.push(pregunta);
      }
    }
  }

  recargarRazones(query: string){
    if(query.length === 0){
      this.collection.data = this.listaPreguntas;
    }
  }

  agregarPregunta(obj: PreguntaEncuestaServicio){
    this.encuestaRequerimientoService.agregarPregunta(obj)
    .subscribe(response => {
      const {message} = JSON.parse(response);
      (document.getElementById("formNuevaPregunta") as HTMLFormElement).reset();
        $('#ModalNuevaPregunta').modal('hide');
      this.limpiarCampos();
      this.cargarPreguntas();
      Swal.fire('Agregar Pregunta', message,'success');
    },err => {
      const {error,status} = err;
      const { message } = JSON.parse(error);
      Swal.fire('Agregar Pregunta', message,'error');
    })
  }

  actualizaPregunta(obj: PreguntaEncuestaServicio){
    this.encuestaRequerimientoService.actualizarPregunta(obj)
    .subscribe(response => {
      const {message} = JSON.parse(response);
      (document.getElementById("formActualizarPregunta") as HTMLFormElement).reset();
        $('#ModalActualizarPregunta').modal('hide');
      this.limpiarCampos();
      this.cargarPreguntas();
      Swal.fire('Actualizar Pregunta', message,'success');
    },err => {
      const {error,status} = err;
      const { message } = JSON.parse(error);
      Swal.fire('Actualizar Pregunta', message,'error');
    })
  }

  cargarPreguntas(){
    this.encuestaRequerimientoService.obtenerPreguntas().subscribe(response => {
      console.log(response);
      this.listaPreguntas = response;
      this.collection.data = this.listaPreguntas;
      this.collection.count = this.collection.data.length;
    }, err => {
      const {error,status} = err;
      const { message } = JSON.parse(error);
      Swal.fire('Cargando Preguntas', message? message: 'Error al cargar las preguntas','error');
    })
  }

  eliminarLinea(id: string){
    this.encuestaRequerimientoService.eliminarLinea(Number(id))
      .subscribe(() => {
        this.collection.data = this.collection.data.filter(linea => Number(linea.id) !== Number(id));
        this.collection.count = this.collection.data.length;
      },err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Eliminar Pregunta',message?message: 'Error al eliminar la línea');
    })
  }
}


