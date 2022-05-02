import { ReporteProductoService } from './../../services/pages/reporte-producto.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

interface Producto {
  producto: string;
  fechaInicio : string;
  fechaFin: string;
}

interface Factura {
  id: number;
  codigobarra_prdoducto: string;
  descripcion: string;
  categoria: string;
  subtotal: number;
  totalimpuesto: number;
  otroscargos: number;
  totalcomprobante: number;
}

@Component({
  selector: 'app-reporte-producto',
  templateUrl: './reporte-producto.component.html',
  styleUrls: ['./reporte-producto.component.css']
})
export class ReporteProductoComponent implements OnInit {

  constructor(
    private reporteProductoService: ReporteProductoService
  ) { }

  ngOnInit() {

    const btnReporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const btnReporteExcelClick = fromEvent(btnReporteExcel,'click');
    const btnReporteWebClick = fromEvent(btnReporteWeb,'click');

    btnReporteExcelClick.subscribe((response: Event) => {
      const fechaInicio = this.objBusqueda.fechaInicio;
      const fechaFin = this.objBusqueda.fechaFin;

      if(fechaInicio !== '' && fechaFin !== ''){
        if(fechaInicio > fechaFin){
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
        if(fechaInicio > fechaFin){
          alert("La fecha inicial no puede ser mayor a la fecha final");
          return;
        }
      }

      const obj = this.objBusqueda;
      this.exportarWeb(obj);
    })
  }


  listaComprobantes: Factura[] = [];

  objBusqueda: Producto = {
    producto: '',
    fechaInicio : '',
    fechaFin: ''
  }

  exportarExcel(obj: Producto){
      this.reporteProductoService.obtenerFacturas(obj)
        .subscribe(response => {
          const datosRespuesta = JSON.parse(response);
          const objFacturas = datosRespuesta;

          this.reporteProductoService.reporteExcel(objFacturas);

        },
        err => {
          console.log(err);
      })
  }


  exportarWeb(obj: Producto){
    this.reporteProductoService.obtenerFacturas(obj)
      .subscribe(response => {
        console.log(response);
        const datosRespuesta = JSON.parse(response);
        const objFacturas: Factura[] = datosRespuesta.facturas;

        this.reporteProductoService.reporteWeb(objFacturas,obj);

      },
      err => {
        console.log(err);
    })
}
}
