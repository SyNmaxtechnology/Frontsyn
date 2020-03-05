import { ReporteService } from './../../services/pages/reporte.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  reporte: {
    fecha1: string,
    fecha2: string,
    tipoFactura: string
  }

  arrayComprobantes = [];
  numeroComprobantes: Number;

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
    }catch(err){
      console.error(err);
    }
  }

}
