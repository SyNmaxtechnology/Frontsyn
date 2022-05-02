import { PreguntaEncuestaServicio } from './../../services/pages/encuesta-servicio.service';
import { ResultadoEncuestaRequerimientoService, ResultadoEncuestaRequerimiento} from './../../services/pages/resultado-encuesta-requerimiento.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { isNumber } from 'util';

@Component({
  selector: 'app-resultado-encuesta-requerimiento',
  templateUrl: './resultado-encuesta-requerimiento.component.html',
  styleUrls: ['./resultado-encuesta-requerimiento.component.css']
})
export class ResultadoEncuestaRequerimientoComponent implements OnInit {

  constructor(
    private resultadoEncuestaRequerimientoService: ResultadoEncuestaRequerimientoService
  ) { }

  listaRespuestas: ResultadoEncuestaRequerimiento[] = [];
  listaPreguntas : PreguntaEncuestaServicio [];
  listaClientes = [];
  fecha: string;
  numeroRespuesta : number = this.listaRespuestas.length;
  disable: boolean = false;
  indice : number = 1;
  tablaPequena: boolean;

  ngOnInit() {
    
    this.fechaHora();

    (document.getElementById("requerimiento") as HTMLInputElement).value = '';
    (document.getElementById("observacion") as HTMLInputElement).value = '';

    window.addEventListener("resize",() => {
      if (screen.width < 700) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }
    })

    this.resultadoEncuestaRequerimientoService.cargarPreguntas()
      .subscribe(response => {
        this.listaPreguntas = response
      }, err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar Preguntas',message?message:'Error al cargar las preguntas');
    })

    this.resultadoEncuestaRequerimientoService.cargarClientes()
      .subscribe(response => {
        console.log(response);
        const { clientes } = JSON.parse(response);
        this.listaClientes = clientes;
      },err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar Clientes',message?message:'Error al cargar los Clientes');
    })
  }

  fechaHora() {
    const d = new Date();
    const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
    const dia =  (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
    const anio = d.getFullYear();
    const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    const minutos = (d.getMinutes() < 10) ?  '0' + d.getMinutes() : d.getMinutes();
    const segundos = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
    this.fecha = anio + '-' + mes + '-' + dia;
  }

  cargarPregunta(){

    let selectPregunta = (document.getElementById("pregunta") as HTMLSelectElement);
    let selectClientes = (document.getElementById("cliente") as HTMLSelectElement);
    let cantidad = (document.getElementById("cantidad") as HTMLInputElement);
    let requerimiento = (document.getElementById("requerimiento") as HTMLSelectElement);
    let observacion = (document.getElementById("observacion") as HTMLSelectElement);
    
    if(selectClientes.value == '') {
      selectPregunta.value = '';
      return alert("Seleccione un cliente");
    }

    else if (selectPregunta.value.toString() === '') return alert("Seleccione una pregunta");
    else if(cantidad.value.toString() === '' || Number(cantidad.value) === 0) return alert("La cantidad es requerida y debe ser mayor a 0");
    else if(requerimiento.value.toString() === '') return alert("El requerimiento es requerido");

    else {
      for(const pregunta of this.listaPreguntas){
        if(Number(selectPregunta.value)  === pregunta.id){
          this.listaRespuestas.push({
            idpregunta: pregunta.id,
            pregunta: pregunta.pregunta,
            observacion: observacion.value,
            cantidad: cantidad.value,
            requerimiento: requerimiento.value,
            indice: this.indice,
            idcliente : Number(selectClientes.value)
          })
        }
      }

      this.indice++;
      selectPregunta.value = '';
      //selectClientes.value = '';
      cantidad.value = '';
      requerimiento.value = '';
      observacion.value = '';
    }
  }

  agregarPreguntas(obj: ResultadoEncuestaRequerimiento[]){
   // let selectPregunta = (document.getElementById("pregunta") as HTMLSelectElement);
   const arr = this.listaRespuestas.filter(el => el.requerimiento === '' || el.cantidad === '');
   if(arr.length > 0) return alert("Todas las respuestas deben llevar la cantidad y el requerimiento");
   
   const arrCliente = this.listaRespuestas.filter(el => el.idcliente === null);
   if(arrCliente.length > 0) return alert("Debe Seleccionar un cliente");
   
   if(this.listaRespuestas.length === 0) return alert("No hay respuestas cargadas");

   this.resultadoEncuestaRequerimientoService.agregarRespuesta(obj)
     .subscribe(response => {
       const {message} = JSON.parse(response)
       this.limpiarCampos();
       Swal.fire('Agregar respuesta',message,'success' );
     }, err => {
       const {error,status} = err;
       const {message} = JSON.parse(error);
       Swal.fire('Agregar respuesta',message?message:'Error al agregar la respuesta');
     })
  }

  validarExpresion(pregunta: string){
    const expresion = /^[0-9A-Za-zÁÉÍÓÚáéíóúñÑ.,; ]+$/g;
    if(expresion.test(pregunta)){
      this.disable = false;
    } else {
      this.disable = true;
    }
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

  eliminarRespuesta(id:number){
    this.listaRespuestas = this.listaRespuestas.filter(linea => linea.indice !== id * 1);
  }

  cargarCliente(id: number){
    this.listaRespuestas = [];
  }

  seleccionarPregunta() {
    let selectClientes = (document.getElementById("cliente") as HTMLSelectElement);
    let selectPregunta: {value} = (document.getElementById("pregunta") as HTMLSelectElement);
    if(selectClientes.value === '') {
      selectPregunta.value = '';
      return alert("Seleccione un cliente");
    }
  }

  limpiarCampos(){

    let selectPregunta = (document.getElementById("pregunta") as HTMLSelectElement);
    let selectClientes = (document.getElementById("cliente") as HTMLSelectElement);

    selectClientes.value = '';
    selectPregunta.value = '';

    this.listaRespuestas = [];
  }
}
