import { ReporteService } from './../../services/pages/reporte.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  filtros = '';
  arrayComprobantes = [];
  numeroComprobantes: number;

  constructor(private rutaActiva: ActivatedRoute, private reporteService: ReporteService) { 
    this.cargarReporte();
  }

  ngOnInit() {

  }

  cargarReporte(){
    try{
      this.arrayComprobantes = this.reporteService.obtenerListadoComprobantes();
      console.log(this.arrayComprobantes);
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.cargarMensajeFiltro();
    } catch(err){
      console.error(err);
    }
  }

  cargarMensajeFiltro(){

    const objetoFiltros = JSON.parse(localStorage.getItem('filtros'));
    console.log(objetoFiltros);
    const {tipoFactura,fechaInicio,fechaFin,numeroInterno,claveNumerica,consecutivo,nombreCliente} = objetoFiltros;
    let descripcionDoc = ''; 

    switch(tipoFactura){
      case '01':
        descripcionDoc = 'Factura Electrónica';
        break;
      case '04':
        descripcionDoc = 'Tiquete Electrónico';
        break;
      case '03':
        descripcionDoc = 'Nota Crédito';
        break;
    }

    if(typeof fechaInicio === 'undefined' && typeof fechaFin === 'undefined'
    && typeof numeroInterno === 'undefined' && typeof claveNumerica === 'undefined'
    && typeof consecutivo === 'undefined' && typeof nombreCliente === 'undefined'){
      this.filtros = 'Tipo de documento '+descripcionDoc;
    }

    if(typeof fechaInicio !== 'undefined' && typeof numeroInterno === 'undefined' && typeof claveNumerica === 'undefined'
    && typeof consecutivo === 'undefined' && typeof nombreCliente === 'undefined'){
      this.filtros = 'Fecha entre ' + fechaInicio +' y ' + fechaFin +', '+descripcionDoc;
    }

    /*if(typeof fechaInicio !== 'undefined' && (typeof numeroInterno !== 'undefined' || typeof claveNumerica !== 'undefined'
    || typeof consecutivo !== 'undefined' || typeof nombreCliente !== 'undefined')){
      this.filtros = 'Fecha entre ' + fechaInicio +' y ' + fechaFin +', '+descripcionDoc;
    }*/
  }
}
