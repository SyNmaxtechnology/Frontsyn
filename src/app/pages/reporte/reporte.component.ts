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
  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.rutaActiva.snapshot.params);
  }

  cargarReporte(){
    
  }

}
