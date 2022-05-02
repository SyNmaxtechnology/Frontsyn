import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { FacturaService } from 'src/app/services/pages/factura.service';
import { ResumenIVAComprasService,ResumenIVACompras } from 'src/app/services/pages/resumen-ivacompras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen-ivacompras',
  templateUrl: './resumen-ivacompras.component.html',
  styleUrls: ['./resumen-ivacompras.component.css']
})
export class ResumenIVAComprasComponent implements OnInit {

  constructor(
    private resumenIVAComprasService: ResumenIVAComprasService,
    private facturaService: FacturaService
  ) { }

  ngOnInit() {

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => { // evento resize angular
      if (screen.width < 638) 
      {
       this.tablaPequena = true;
      }
      else {
        this.tablaPequena = false;
      }
    })
    
    const btnBuscar = (document.getElementById('btnBuscar') as HTMLButtonElement);
    const reporteExcel = (document.getElementById('reporteExcel') as HTMLButtonElement);
    const btnBuscarClick = fromEvent(btnBuscar,'click');
    const reporteExcelClick = fromEvent(reporteExcel,'click');

    btnBuscarClick.subscribe((e: Event) => {
      if(this.objResumenIVAEntrada.fechaInicio > this.objResumenIVAEntrada.fechaFin){
        return alert("La fecha de inicio no puede ser mayor a la fecha final");
      }

      if(this.objResumenIVAEntrada.fechaInicio !== '' && this.objResumenIVAEntrada.fechaFin === '' 
      || this.objResumenIVAEntrada.fechaInicio === '' && this.objResumenIVAEntrada.fechaFin !== ''){
        return alert("Si envia el parámetro de fechas, ambos campos de fechas deben tener una fecha cargada")
      }

      this.resumenIVAComprasService.obtenerDatosReporte(this.objResumenIVAEntrada)
        .subscribe(response =>{

          const {resumen,totales,encabezado} = JSON.parse(response);
          this.listaResumenIVA = resumen;
          this.mostrarTotales = true;
          this.totales = totales;
          this.encabezado = encabezado;
      },
      err =>{
        const {error} = err;
        const {message}= error;
        Swal.fire('Cargando informacion...', message,'error');
      })
    })

    reporteExcelClick.subscribe((e: Event) => {
      this.resumenIVAComprasService.reporteExcel(this.listaResumenIVA,this.totales,this.encabezado);
    })

    this.facturaService.obtenerMonedas().subscribe((response: any) => {
      const {monedas} = response;
      this.listaMonedas = monedas;
    },
    err =>{
      const {error} = err;
      const {message}= error;
      Swal.fire('Cargando Monedas...', message,'error');
    })
  }

  objResumenIVAEntrada : ResumenIVACompras ={
    fechaInicio: '',
    fechaFin: '',
    moneda: ''
  }
  listaMonedas=[];
  listaResumenIVA = [];
  totales: any;
  mostrarTotales = false;
  tablaPequena = false;
  encabezado = {};
  resizeSubscription$: Subscription
  resizeObservable$: Observable<Event>
}
