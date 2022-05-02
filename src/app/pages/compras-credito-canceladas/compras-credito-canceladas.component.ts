import Swal from 'sweetalert2';
import { AplicacionCreditoEntradasService } from './../../services/pages/aplicacion-credito-entradas.service';
import { ComprasCreditoCanceladasService,EntradasCredito } from './../../services/pages/compras-credito-canceladas.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-compras-credito-canceladas',
  templateUrl: './compras-credito-canceladas.component.html',
  styleUrls: ['./compras-credito-canceladas.component.css']
})
export class ComprasCreditoCanceladasComponent implements OnInit {

  constructor(
    private comprasCreditoCanceladasService: ComprasCreditoCanceladasService,
    private aplicacionCreditoEntradasService: AplicacionCreditoEntradasService
  ) { }

  ngOnInit() {
    const btnExcel = (document.getElementById("btnbuscarFacturas") as HTMLButtonElement);
    const btnLimpiarForm = (document.getElementById("btnLimpiarForm") as HTMLButtonElement);
    const btnExcelClick = fromEvent(btnExcel,'click');
    const btnLimpiarFormClick = fromEvent(btnLimpiarForm,'click');

    this.aplicacionCreditoEntradasService.obtenerProveedores()
      .subscribe(response => {
        //const [...proveedores] = JSON.parse(response); // destructuring de todos los elementos del array
        //const [proveedores] = JSON.parse(response); // destructuring de un elemento del array
        this.listaProveedores = JSON.parse(response);
      },
      err => {
        const {error, status}= err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargando informacion',message,'error');
    });

    btnExcelClick.subscribe((e: Event) => {

      if(this.objEntradasCredito.fechaInicio === '' || this.objEntradasCredito.fechaFin === ''){
        return alert("Los campos de fecha son requeridos");
      }

      else if(this.objEntradasCredito.fechaInicio > this.objEntradasCredito.fechaFin){
        return alert("La fecha de inicio no puede mayor a la fecha final");
      }

      else {
        const obj = this.objEntradasCredito;
        this.comprasCreditoCanceladasService.obtenerEntradas(obj)
          .subscribe(response => { 
          this.comprasCreditoCanceladasService.reporteExcel(JSON.parse(response),this.objEntradasCredito);
          },
          err => {
            const {error, status}= err;
            const {message} = JSON.parse(error);
            Swal.fire('Cargando reporte',message,'error');
        })
      }
    })

    btnLimpiarFormClick.subscribe(() => {
      this.limpiarForm();
    })
  }

  listaProveedores = [];
  proveedorSeleccionado: string = null;
  objEntradasCredito: EntradasCredito = {
    idproveedor: null,
    fechaInicio: '',
    fechaFin : ''
  }

  seleccionarProveedor(texto: string) {
    if(texto.length === 0){
      return;
    } else {
      const cedulaProveedor = texto.split(' ')[0].trim();
      for (const proveedor of this.listaProveedores) {
        if(proveedor.cedula_proveedor.trim() == cedulaProveedor ){
          this.objEntradasCredito.idproveedor = proveedor.id
        }
      }
    }
  }


  limpiarForm (){
    this.objEntradasCredito.idproveedor = null;
    this.proveedorSeleccionado = '';
    this.objEntradasCredito.fechaFin = '';
    this.objEntradasCredito.fechaInicio = '';
     //clienteSeleccionado
   }
}
