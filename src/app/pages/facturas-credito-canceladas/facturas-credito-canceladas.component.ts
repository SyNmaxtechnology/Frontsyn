import { AplicacionRecibosCreditoService } from './../../services/pages/aplicacion-recibos-credito.service';
import { FacturasCreditoCanceladasService, FacturasCredito } from './../../services/pages/facturas-credito-canceladas.service';
import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-facturas-credito-canceladas',
  templateUrl: './facturas-credito-canceladas.component.html',
  styleUrls: ['./facturas-credito-canceladas.component.css']
})
export class FacturasCreditoCanceladasComponent implements OnInit {

  constructor(
    private facturasCreditoCanceladasService: FacturasCreditoCanceladasService,
    private aplicacionRecibosCreditoService: AplicacionRecibosCreditoService
  ) {
    this.cargarClientes();
  }


  objFacturasCredito : FacturasCredito= {
    idcliente: '',
    fechaInicio: '',
    fechaFin: ''
  }

  clienteSeleccionado : string = '';

  listaClientes = [];

  ngOnInit() {

    const btnBuscarFacturas = (document.getElementById("btnbuscarFacturas") as HTMLButtonElement);
    const btnLimpiar = (document.getElementById("btnLimpiarForm") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const btnbuscarFacturasClick = fromEvent(btnBuscarFacturas,'click');
    const btnReporteWebClicl = fromEvent(btnReporteWeb, 'click');  //agregado por SyN
    const btnLimpiarClick = fromEvent(btnLimpiar,'click');
   
    //limpiarForm
    btnbuscarFacturasClick.subscribe((e: Event) => {
      e.preventDefault();
  
      if(this.clienteSeleccionado !== ''){
        this.clienteSeleccionado = this.clienteSeleccionado.split(' ')[0];
        for(let cliente of this.listaClientes){
          if(cliente.cedula_cliente == this.clienteSeleccionado){
            this.objFacturasCredito.idcliente = cliente.id;
          }
        }
      }

      if(this.objFacturasCredito.fechaInicio == '' || this.objFacturasCredito.fechaFin == ''){
          return alert("Debe escoger un rango de fechas");
      } else {
        if(this.objFacturasCredito.fechaInicio > this.objFacturasCredito.fechaFin){
          return alert("La fecha de inicio no puede ser mayor a la fecha final");
        }
      }

      this.facturasCreditoCanceladasService.obtenerFacturasPagadas(this.objFacturasCredito)
      .subscribe(response => {

        const datosFacturas = JSON.parse(response);
        if(datosFacturas.length === 0){
          Swal.fire('Reporte Facturas Crédito','No hay resultados','warning');
        } else {
          this.reporteExcel(datosFacturas,this.objFacturasCredito.fechaInicio,this.objFacturasCredito.fechaFin);
        }

      })
    })

//Agregado por SyN
    btnReporteWebClicl.subscribe((e: Event) => {
      e.preventDefault();
  
      if(this.clienteSeleccionado !== ''){
        this.clienteSeleccionado = this.clienteSeleccionado.split(' ')[0];
        for(let cliente of this.listaClientes){
          if(cliente.cedula_cliente == this.clienteSeleccionado){
            this.objFacturasCredito.idcliente = cliente.id;
          }
        }
      }

      if(this.objFacturasCredito.fechaInicio == '' || this.objFacturasCredito.fechaFin == ''){
          return alert("Debe escoger un rango de fechas");
      } else {
        if(this.objFacturasCredito.fechaInicio > this.objFacturasCredito.fechaFin){
          return alert("La fecha de inicio no puede ser mayor a la fecha final");
        }
      }

      this.facturasCreditoCanceladasService.obtenerFacturasPagadas(this.objFacturasCredito)
      .subscribe(response => {

        const datosFacturas = JSON.parse(response);
        if(datosFacturas.length === 0){
          Swal.fire('Reporte Facturas Crédito','No hay resultados','warning');
        } else {
          this.reporteWeb(datosFacturas,this.objFacturasCredito.fechaInicio,this.objFacturasCredito.fechaFin,this.clienteSeleccionado);
        }

      })
    })
//Fin Agregado por SyN

    btnLimpiarClick.subscribe(() => {
      this.limpiarForm();
    })
  }


  reporteExcel(obj,fecha1,fecha2){
    this.facturasCreditoCanceladasService.reporteExcel(obj,fecha1,fecha2);
  }

//Agregado por SyN
  reporteWeb(obj,fecha1,fecha2,cliente){
      this.facturasCreditoCanceladasService.reporteWeb(obj,fecha1,fecha2,cliente);
    }
//Fin de agragado SyN

  cargarClientes(){
    this.aplicacionRecibosCreditoService.obtenerClientes()
      .subscribe(response => {
        const datosClientes = JSON.parse(response);
        this.listaClientes = datosClientes.clientes;
        console.log(response);
      },
      err => {
        Swal.fire('Clientes','No se pudo cargar los clientes','error');
      })
  }

  limpiarForm (){
   this.clienteSeleccionado = '';
   this.objFacturasCredito.fechaFin = '';
   this.objFacturasCredito.fechaInicio = '';
    //clienteSeleccionado
  }

}
//