import { ReporteArticuloService } from './../../services/pages/reporte-articulo.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';


interface Articulo {
    articulo: string;
    fechaInicio: string;
    fechaFin: string;
}


interface Factura {
  fecha: string;
  codigobarra_producto : string;
  nombre: string;
  categoria: string;
  subtotal: number;
  totalimpuesto: number;
  otroscargos: number;
  total: number
}

@Component({
  selector: 'app-reporte-articulo',
  templateUrl: './reporte-articulo.component.html',
  styleUrls: ['./reporte-articulo.component.css']
})
export class ReporteArticuloComponent implements OnInit {

  constructor(
    private reporteArticuloService : ReporteArticuloService
  ) { }

  ngOnInit() {

    const btnReporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const btnReporteExcelClick = fromEvent(btnReporteExcel, 'click');
    const btnReporteWebClick = fromEvent(btnReporteWeb, 'click');


    btnReporteExcelClick.subscribe((response: Event) => {
      const fechaInicio = this.objBusqueda.fechaInicio;
      const fechaFin = this.objBusqueda.fechaFin;

      if(fechaInicio !== '' && fechaFin !== ''){
        if(fechaInicio > fechaFin ){
          alert("La fecha inicial no puede ser mayor a la fecha final");
          return;
        }
      }

      const obj = this.objBusqueda;
      this.exportarExcel(obj);
    })

    btnReporteWebClick.subscribe((response: Event) => {
      const fechaInicio = this.objBusqueda.fechaInicio;
      const fechaFin = this.objBusqueda.fechaFin;

      if(fechaInicio !== '' && fechaFin !== ''){
        if(fechaInicio > fechaFin ){
          alert("La fecha inicial no puede ser mayor a la fecha final");
          return;
        }
      }
      const obj = this.objBusqueda; 
      this.exportarWeb(obj);
    })
  }


  objBusqueda : Articulo = {
    articulo: '',
    fechaInicio: '',
    fechaFin: ''
  }


  exportarExcel(obj: Articulo) {
    this.reporteArticuloService.obtenerFacturas(obj)
      .subscribe(response => {
        const datosFactura = JSON.parse(response);
        const obj : Factura[] = datosFactura.facturas;
        this.reporteArticuloService.reporteExcel(obj);
      },
      err => {
        console.log(err);
      })
  }


  exportarWeb(obj: Articulo){
    this.reporteArticuloService.obtenerFacturas(obj)
    .subscribe(response => {
      const datosFactura = JSON.parse(response);
      const objFacturas : Factura[] = datosFactura.facturas;
      this.reporteArticuloService.reporteWeb(objFacturas,obj);
    },
    err => {
      console.log(err);
    })
  }

}
