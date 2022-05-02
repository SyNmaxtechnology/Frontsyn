import { isNumber } from 'util';
import { VisitaService } from './../../services/pages/visita.service';
import { Calificacion, PreguntaEncuestaServicio } from './../../services/pages/encuesta-servicio.service';
import { ResultadoEncuestaServicioService,RespuestaEncuestaServicio } from './../../services/pages/resultado-encuesta-servicio.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultado-encuesta-servicio',
  templateUrl: './resultado-encuesta-servicio.component.html',
  styleUrls: ['./resultado-encuesta-servicio.component.css']
})

export class ResultadoEncuestaServicioComponent implements OnInit {

  constructor(
    private resultadoEncuestaServicio: ResultadoEncuestaServicioService,
    private visitaService: VisitaService
  ) { }

  ngOnInit() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
    
    this.cargarPreguntas();

    window.addEventListener("resize",() => {
      if (screen.width < 700) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }
    })

    this.fechaHora();

    this.visitaService.obtenerClientes().subscribe(response => {
      const {clientes} = JSON.parse(response);
      this.listaClientes = clientes;
    }, err => {
      const {error,status} = err
      const { message} = JSON.parse(error);
      Swal.fire('Cargar Clientes',message? message: 'Error al cargar los Clientes','error');
    })

    
    /*this.resultadoEncuestaServicio.cargarCalificaciones()
      .subscribe(response => {
        this.listaCalificaciones = response;
      }, err => {
        const {error,status} = err
        const { message} = JSON.parse(error);
        Swal.fire('Cargar Calificaciones',message? message: 'Error al cargar las calificaciones','error');
      })*/
  }
  
  fecha: string;
  collection = { count: 0, data: [] };
  config: any;
  listaPreguntas: RespuestaEncuestaServicio [] = [];
  listaCalificaciones : Calificacion [] = [];
  listaClientes = [];
  disable : boolean = false;
  tablaPequena : boolean = false;
  porcentaje: number = 0;
  usuario: string = '';


  pageChanged(event){
    this.config.currentPage = event;
  }

  asignarCliente(id: number){
    if(!id || id.toString().length === 0){
      this.usuario = '';
      return;
    } else {
      for(let pregunta of this.listaPreguntas){
        pregunta.idcliente = id;
        pregunta.observacion = '';
        pregunta.calificacion = null;
      }

      this.obtenerAgente(String(id))
    }
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

  agregarEncuesta(obj: RespuestaEncuestaServicio[]){



    const cliente = (document.getElementById("cliente") as HTMLSelectElement);
    if(cliente.value == '') return alert("Debe seleccionar un cliente para poder guardar las respuestas de la encuesta");
    let novalido : boolean = false;
    for(let pregunta of this.collection.data ){
      if(!pregunta.calificacion  || (pregunta.calificacion && pregunta.calificacion.toString().length === 0)){
        novalido = true;
      }
    }

    if(novalido) return alert("Todas las preguntas de la encuesta deben tener una calificacion");
    console.log(obj);
    this.resultadoEncuestaServicio.agregarRespuesta(obj)
      .subscribe(response => {
        const {message} = JSON.parse(response);
        for(let pregunta of this.listaPreguntas){
          pregunta.idcliente = null,
          pregunta.observacion = '';
          pregunta.idpregunta = null;
          pregunta.calificacion = null;
        }

        this.collection.data = this.listaPreguntas;
        this.collection.count = this.collection.data.length;
        cliente.value = '';

        this.porcentaje = 0;
        Swal.fire('Agregar Respuesta',message,'success');
        
      }, err => {
        const {error,status} = err
        const { message} = JSON.parse(error);
        Swal.fire('Agregar Respuesta',message? message: 'Error al agregar la respuesta','error');
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
    
    const expresion = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
    
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

  validarValorCalificacion(pregunta: RespuestaEncuestaServicio) {
     
    if(isNaN(pregunta.calificacion)) { 
      pregunta.calificacion = null;
      return alert("Ingrese valores numericos");
    }

    if(Number(pregunta.calificacion) > Number(pregunta.valor)){
      alert("La calificacion no puede ser mayor a el valor de la pregunta");
      pregunta.calificacion = null;
    } else {
      let total = 0;
      let totalCalificacion = 0;
      for(const pregunta of this.collection.data){
        total += pregunta.valor * 1;
        if(pregunta.calificacion){
          totalCalificacion += Number(pregunta.calificacion);
        }
      }

      this.porcentaje = Number(((totalCalificacion * 100) / total).toFixed(2));

    }
  }

  cargarPreguntas(){
    this.resultadoEncuestaServicio.cargarPreguntas()
      .subscribe(response => {
        console.log(response)
        for(const el of response) {
          this.listaPreguntas.push({
            idpregunta: el.id,
            pregunta: el.pregunta,
            calificacion: null,
            observacion: '',
            valor: el.valor
          })
        }

        this.collection.data = this.listaPreguntas;
        this.collection.count = this.collection.data.length;
      }, err => {
        const {error,status} = err
        const { message} = JSON.parse(error);
        Swal.fire('Cargar Preguntas',message? message: 'Error al cargar las preguntas','error');
    })
  }
  
  obtenerAgente(idcliente: string){
    this.resultadoEncuestaServicio.obtenerAgente(Number(idcliente))
      .subscribe(response => {
        const data = JSON.parse(response)[0];
        if(data){
          const {usuario} = data;
          this.usuario = usuario;
        }

      },err => {
        const {error,status} = err
        const { message} = JSON.parse(error);
        Swal.fire('Cargar Usuario',message? message: 'Error al cargar la información del usuario','error');
    })
  }
}
