import  Swal  from 'sweetalert2';
import { ReporteFormaPagoService } from './../../services/pages/reporte-forma-pago.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

interface Factura {
  fechaInicio: string;
    fechaFin: string;
    medio_pago: string;
}

@Component({
  selector: 'app-reporte-forma-pago',
  templateUrl: './reporte-forma-pago.component.html',
  styleUrls: ['./reporte-forma-pago.component.css']
})
export class ReporteFormaPagoComponent implements OnInit {

  constructor(
    private reporteFormaPagoService: ReporteFormaPagoService
  ) { 
    this.obtenerMediosPago();
  }

  ngOnInit() {

    const btnReporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement); 
    const selectMedioPago = ( document.getElementById("medio_pago") as HTMLSelectElement); 

    const btnReporteExcelClick = fromEvent(btnReporteExcel,'click');
    const btnReporteWebClick = fromEvent(btnReporteWeb,'click');


    btnReporteExcelClick.subscribe((e: Event) => {
      
      const fechaInicio = this.objBusqueda.fechaInicio;
      const fechaFin = this.objBusqueda.fechaFin;
      if(fechaInicio > fechaFin){
        return alert("La fecha de inicio no se puede mayor a la fecha final");
      } else {
        let obj = this.objBusqueda;

        
        this.reporteExcel(obj);
      }
    })


    btnReporteWebClick.subscribe((e: Event) => {
      const fechaInicio = this.objBusqueda.fechaInicio;
      const fechaFin = this.objBusqueda.fechaFin;
      if(fechaInicio > fechaFin){
        return alert("La fecha de inicio no se puede mayor a la fecha final");
      } else {
        let obj = this.objBusqueda;
       this.reporteWeb(obj);
      }
    })
  }

  objBusqueda: Factura = {
    fechaInicio: '',
    fechaFin: '',
    medio_pago: ''
  }

  mediosPago = [];

  reporteExcel(obj: Factura){
    this.reporteFormaPagoService.obtenerFacturas(obj)
      .subscribe(response => {
        //totalcomprobante
    
        const datosFacturas = JSON.parse(response);
        if(datosFacturas.facturas.length > 0){
          const obj = datosFacturas;
          this.reporteFormaPagoService.reporteExcel(obj);
        } else {
          console.log("No")
          Swal.fire('Búsqueda', 'No hay resultados', 'error');
        }
      },
      err => console.log(err));
  }

  reporteWeb(obj: Factura){
    this.reporteFormaPagoService.obtenerFacturas(obj)
      .subscribe(response => {
        console.log(response)
        const datosFacturas = JSON.parse(response);
        const objFacturas = datosFacturas.facturas;
        const filtros = obj;
        this.reporteFormaPagoService.reporteWeb(objFacturas,filtros);

      },
      err => console.log(err));
  }

  obtenerMediosPago(){
    this.reporteFormaPagoService.obtenerMediosPago()
      .subscribe(response => {
        console.log(response);
        const datosMediosPago = JSON.parse(response);
        this.mediosPago = datosMediosPago.medioPago;
        //obtenerMediosPago
    },
    err => {
      console.log(err);
    })
  }
}
