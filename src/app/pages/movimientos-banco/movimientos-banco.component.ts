import { MovimientosBancoService,movimientoBanco } from './../../services/pages/movimientos-banco.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-movimientos-banco',
  templateUrl: './movimientos-banco.component.html',
  styleUrls: ['./movimientos-banco.component.css']
})
export class MovimientosBancoComponent implements OnInit {

  constructor(
    private movimientosBancosService: MovimientosBancoService
  ) { }

  ngOnInit() {

    this.movimientosBancosService.cargarTiposMovimiento()
      .subscribe(response => {
        this.listaTiposMovimientos = JSON.parse(response);
      }, err => {
        const {error,status} = err;
        const {message} = error;
        Swal.fire('Cargando información',message,'error');
      })

      this.movimientosBancosService.cargarCuentas()
      .subscribe(response => {
        this.listaCuentas = JSON.parse(response);
      }, err => {
        const {error,status} = err;
        const {message} = error;
        Swal.fire('Cargando información',message,'error');
      })

      const btnAgregarMovimiento = (document.getElementById("btnAgregarMovimiento") as HTMLButtonElement);
      const btnLimpiarForm = (document.getElementById("btnLimpiarForm") as HTMLButtonElement);
      const monto = (document.getElementById("monto") as HTMLButtonElement);
      //monto

      const btnAgregarMovimientoClick = fromEvent(btnAgregarMovimiento,'click');
      const btnLimpiarFormClick = fromEvent(btnLimpiarForm,'click');
      const montoKeyUp = fromEvent(monto,'keyup');

      btnAgregarMovimientoClick.subscribe((e:Event) => {
        if(this.objMovimiento.fecha == ''){
          return alert("La fecha es un campo obligatorio")
        }
        
        else if(this.objMovimiento.idcuenta == '' || this.objMovimiento.idcuenta == null){
          return alert("La cuenta es un campo obligatorio")
        }
        
        else if(this.objMovimiento.tipomovimiento == '' || this.objMovimiento.tipomovimiento == null){
          return alert("El tipo de movimiento es un campo obligatorio")
        }

        else if(this.objMovimiento.monto == null || this.objMovimiento.monto.toString().length === 0){
          return alert("El monto es un campo obligatorio")
        }

        else if(this.objMovimiento.descripcion == '' || this.objMovimiento.descripcion == null){
          return alert("La descripción es un campo obligatorio")
        } 
        else {
          this.movimientosBancosService.agregarMovimiento(this.objMovimiento)
            .subscribe(response => {
              const {message} = JSON.parse(response);
              this.limpiarForm();
              Swal.fire('Agregar Movimiento',message,'success');

            },err =>{
              const {error,status} = err;
              const {message} = error;
              Swal.fire('Agregar Movimiento',message,'error');
          })
        }
      })

      btnLimpiarFormClick.subscribe((e:Event) => {
        this.limpiarForm();
      })

      montoKeyUp.subscribe((e: Event) => {
        this.validarNumerosDecimales(monto.value,this.objMovimiento.monto);
      })
  }

  listaTiposMovimientos = [];
  listaCuentas = [];
  objMovimiento: movimientoBanco = {
    idcuenta: '',
    monto: null,
    tipomovimiento: '',
    descripcion: '',
    fecha: ''
  }

  limpiarForm(){
    this.objMovimiento.idcuenta = '';
    this.objMovimiento.monto = null;
    this.objMovimiento.tipomovimiento = '';
    this.objMovimiento.descripcion = '';
    this.objMovimiento.fecha = '';
  }

  validarNumerosDecimales(texto: string,campo: number | string){
    const btnAgregarMovimiento = (document.getElementById("btnAgregarMovimiento") as HTMLButtonElement);
    const expresion = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
    
    if(expresion.test(texto) == false){
      campo = texto.substr(0, texto.length - 1 );
      btnAgregarMovimiento.disabled = true;
    } else {
      btnAgregarMovimiento.disabled = false;
      campo = Number(texto);
    }
  }
}
