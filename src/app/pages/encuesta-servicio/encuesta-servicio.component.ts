import { EncuestaServicioService,PreguntaEncuestaServicio } from './../../services/pages/encuesta-servicio.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { isNumber } from 'util';
declare var $;

@Component({
  selector: 'app-encuesta-servicio',
  templateUrl: './encuesta-servicio.component.html',
  styleUrls: ['./encuesta-servicio.component.css']
})
export class EncuestaServicioComponent implements OnInit {

  constructor(
    private encuestaServicioService: EncuestaServicioService
  ) { }

  ngOnInit() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
    this.cargarPreguntas();
  }

  collection = { count: 0, data: [] };
  config: any;
  listaPreguntas : PreguntaEncuestaServicio[] = [];
  query : string = '';
  tablaPequena : boolean = false;
  objPregunta : PreguntaEncuestaServicio = {
    id: null,
    pregunta : '',
    auditoria: null,
    valor: null
  };
  disable: boolean = false;

  cargarPreguntas(){
    this.encuestaServicioService.obtenerPreguntas().subscribe(response => {
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

  pageChanged(event){
    this.config.currentPage = event;
  }

  obtenerPreguntaPorId(id:number){
    this.encuestaServicioService.obtenerPreguntaPorId(id)
    .subscribe(response =>{
      console.log(response);
      this.objPregunta.id = response[0].id;
      this.objPregunta.auditoria = response[0].auditoria;
      this.objPregunta.pregunta = response[0].pregunta;
      this.objPregunta.valor = response[0].valor;
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
    this.objPregunta.valor = null;
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

    const {valor,pregunta} = obj;
    if(valor === null || valor.toString().length === 0 || pregunta.length === 0) return alert("Todos los campos son requeridos");
    
    this.encuestaServicioService.agregarPregunta(obj)
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
    
    const {valor,pregunta} = obj;
    if( valor === null || valor.toString().length === 0 || pregunta.length === 0) return alert("Todos los campos son requeridos");
    
    this.encuestaServicioService.actualizarPregunta(obj)
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

  eliminarLinea(id:string){

    this.encuestaServicioService.eliminarPregunta(Number(id))
      .subscribe(() => {
        this.collection.data = this.collection.data.filter(linea => Number(linea.id) !== Number(id));
        this.collection.count = this.collection.data.length;
      },err => {
        const {error, status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Eliminar Pregunta', message?message:'Error al eliminar la línea','error');
      })
  }

  validarValoresDecimales(numero: string){
    
    const expresion = /^-{0,1}\d*\.{0,1}\d+$/;

    if(!expresion.test(numero)){
      this.disable = true;
    } else {
      if(isNumber(numero)){
        this.disable = true;
      } else {
        this.disable = false;
      }
    }
  }
}
