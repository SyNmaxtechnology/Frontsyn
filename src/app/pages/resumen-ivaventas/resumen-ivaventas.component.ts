import { ResumenIVAVentasService,ResumenIvaVentas } from './../../services/pages/resumen-ivaventas.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen-ivaventas',
  templateUrl: './resumen-ivaventas.component.html',
  styleUrls: ['./resumen-ivaventas.component.css']
})

export class ResumenIVAVentasComponent implements OnInit {

  constructor(
    private resumenIVAVentasService: ResumenIVAVentasService
  ) { }

  ngOnInit() {

    //const reporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);
    const reporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnBuscar = (document.getElementById("btnBuscar") as HTMLButtonElement);

    const btnBuscarClick = fromEvent(btnBuscar,'click');
    const reporteExcelClick = fromEvent(reporteExcel,'click');
   // const reporteWebClick = fromEvent(reporteWeb,'click');

    btnBuscarClick.subscribe((e: Event) => {
      console.log(this.objResumenIVA);
      this.resumenIVAVentasService.obtenerInformacionResumen(this.objResumenIVA)
        .subscribe(response => {
          
          const {totales,resumen} = JSON.parse(response);
          this.listaResumenIVA = resumen
          this.totales = totales;
          this.mostrarTotales = true;
        },err => {
          const {error} = err;
          const {message} = JSON.parse(error);
          Swal.fire('Cargando informacion', message,'error');
        })
    })

    reporteExcelClick.subscribe((e: Event) => {
      if(this.listaResumenIVA.length === 0){
        alert("No hay datos cargados para generar el reporte");
      } else {
        this.resumenIVAVentasService.reporteExcel(this.listaResumenIVA,this.totales);
      }
    })

    /*reporteWebClick.subscribe((e: Event) => {
      this.resumenIVAVentasService.reporteWeb(this.listaResumenIVA,this.objResumenIVA);
    })*/

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => { // evento resize angular
      console.log(evt);
      if (screen.width < 638) 
      {
       this.tablaPequena = true;
      }
      else {
        this.tablaPequena = false;
      }
    })
  }

  objResumenIVA : ResumenIvaVentas ={
    fechaInicio: '',
    fechaFin: '',
    moneda : ''
  }

  listaResumenIVA = [];
  totales: any;
  mostrarTotales = false;
  tablaPequena = false;
  resizeSubscription$: Subscription
  resizeObservable$: Observable<Event>
 
}


/*
  Tarifa Impuesto Valor Agregado Código
  Tarifa 0% (Exento)              01
  Tarifa reducida 1%              02
  Tarifa reducida 2%              03
  Tarifa reducida 4%              04 
  Transitorio 0%,                 05 -- no aplica
  Transitorio 4%                  06 -- no aplica 
  Transitorio 8%                  07 -- no aplica
  Tarifa general 13%              08
*/