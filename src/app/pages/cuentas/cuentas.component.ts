import { CuentasService, Cuenta } from './../../services/pages/cuentas.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';
import { timeStamp } from 'console';
import { IfStmt } from '@angular/compiler';
declare var $:any

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  constructor(
    private cuentasService: CuentasService
  ) { }

  ngOnInit() {

    /*
        filas: HTMLCollectionOf<Element>
        ngAfterViewInit(): void {
        this.filas = document.getElementsByClassName("nombreClase");
        Array.prototype.forEach.call(this.filas, function (el) {
        el.onclick = function () {
        console.log(el);
        }
        });
        }
    
    */
    
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
    })
    
    const nuevaCuenta = (document.getElementById("nuevaCuenta") as HTMLButtonElement);

    const nuevaCuentaClick = fromEvent(nuevaCuenta,'click');

    nuevaCuentaClick.subscribe(() => {
      
    });

    this.cargarCuentas();
   
  }

  query: string = '';
  listaCuentas = [];
  listaCuentasReset = [];
  tablaPequena: boolean = false;
  config: any;
  collection = { count: 0, data: [] };

  objCuenta : Cuenta = {
    id: null,
    saldoact: null,
    saldoant: null,
    numctabanco: '',
    decripcion: ''
  };


  pageChanged(event){
    this.config.currentPage = event;
  }

  cargarCuentas(){
    this.cuentasService.listarCuentas()
    .subscribe(cuentas => {
      this.listaCuentas = JSON.parse(cuentas);
      this.listaCuentasReset = JSON.parse(cuentas);
      this.collection.data = JSON.parse(cuentas);
    },
    err => {
      const {error,status} = err;
      const {message}= JSON.parse(error);
      Swal.fire('Agregar cuenta', message,'error');
    })
  }

  agregarCuenta(obj: Cuenta) {

    obj.numctabanco = obj.numctabanco.trim();
    this.cuentasService.agregarCuenta(obj)
      .subscribe(response => {
        const {message} = JSON.parse(response);
        this.cargarCuentas();
        this.limpiarCampos();
        $('#ModalNuevaCuenta').modal('hide');
        Swal.fire("Agregar cuenta",message,'success');
      },
      err => {
        const {error,status} = err;
        const {message}= JSON.parse(error);
        Swal.fire('Agregar cuenta', message,'error');
    })
  }

  actualizarCuenta(obj: Cuenta){
    obj.numctabanco = obj.numctabanco.trim();
    this.cuentasService.actualizarCuenta(obj)
      .subscribe(response => {
        const {message} = JSON.parse(response);
        this.cargarCuentas();
        this.limpiarCampos();
        $('#ModalActualizarCuenta').modal('hide');
        Swal.fire("Actualizar cuenta",message,'success');
      },err => {
        const {error,status} = err;
        const {message}= JSON.parse(error);
        Swal.fire('Actualizar cuenta', message,'error');
    })
  }

  actualizarEstado(estado: string, factura:any){  
    let activo : number = null;
    let estadoDescripcion
    if(estado == 'SI'){
      estadoDescripcion = 'NO';
      activo = 0;
    } else {
      estadoDescripcion = 'SI';
      activo = 1;
    }

    this.cuentasService.actualizarEstadoCuenta(Number(factura.id),Boolean(activo))
      .subscribe(response => {
        factura.estado = estadoDescripcion;
      },
      err => {
        const {error,status} = err;
        const { message } = JSON.parse(error);
        Swal.fire("Actualizar estado",message,"error");
      })
  }

  obtenerCuenta(id:number){
    this.cuentasService.buscarCuenta(id)
      .subscribe(response => {
        const cuenta = JSON.parse(response);
        this.objCuenta.id = cuenta[0].id
        this.objCuenta.decripcion = cuenta[0].decripcion
        this.objCuenta.saldoant = cuenta[0].saldoant
        this.objCuenta.saldoact = cuenta[0].saldoact
        this.objCuenta.numctabanco = cuenta[0].numctabanco
      },
      err => {
        const {error,status} = err;
        const { message } = JSON.parse(error);
        Swal.fire("Obtener cuenta",message,"error");
      })
  }

  limpiarCampos(){
    this.objCuenta.id = null
    this.objCuenta.decripcion = ''
    this.objCuenta.saldoant = null
    this.objCuenta.saldoact = null
    this.objCuenta.numctabanco = ''
  }

  cuentaSeleccionada (cuenta: string){
    for (const el of this.collection.data) {
      if(cuenta == el.numctabanco){
        this.listaCuentas = [];
        this.collection.data = [];
        this.listaCuentas.push(el);
        this.collection.data = this.listaCuentas;
      }   
    }
  }

  recargarCuentas(texto: string){
    if(texto.length === 0){
      this.collection.data = [];
      for (const cuenta of this.listaCuentasReset) {
        this.collection.data.push(cuenta);
      }
    }
  }

  validarNumerosDecimales(texto: string,campo: number | string){
    const btnActualizar = (document.getElementById("actualizarCuenta") as HTMLButtonElement);
    const expresion = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
    
    if(expresion.test(texto) == false){
      campo = texto.substr(0, texto.length - 1 );
      btnActualizar.disabled = true;
    } else {
      btnActualizar.disabled = false;
      campo = Number(texto);
    }
  }

  validarNumerosDeCuenta(numero: string,tipo: string){
    const regexIBAN = /([A-Z]{2})\s*\t*(\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d)\s*\t*(\d\d\d\d\d\d\d\d\d\d)/g
    const regexnumeroCuenta = /^[\d.]{13,19}$/g
    const btnAgregar = (document.getElementById("agregarCuenta") as HTMLButtonElement);
    if(numero.length > 25){
      this.objCuenta.numctabanco = numero.substr(0, numero.length - 1 );
    }

    if(tipo == 'G'){
      if(regexnumeroCuenta.test(numero) == false && regexIBAN.test(numero)== false){
        btnAgregar.disabled = true;
      } else {
        btnAgregar.disabled = false;
      }
    } else {
      const btnActualizar = (document.getElementById("actualizarCuenta") as HTMLButtonElement);
      if(regexnumeroCuenta.test(numero) == false && regexIBAN.test(numero)== false){
        btnActualizar.disabled = true;
      } else {
        btnActualizar.disabled = false;
      }
    }
  }
}
