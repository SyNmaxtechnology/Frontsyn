import { ReporteComprasService } from './../../services/pages/reporte-compras.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';


interface Facturas {
  clavenumerica: string;
  fecha: string;
  proveedor_nombre: string;
  subtotal: number; 
  totalimpuesto: number;
  TotalOtrosCargos: number;
  totalcomprobante: number;
}

interface Factura {
  fechaInicio: string;
    fechaFin: string;
    clave: string;
    consecutivo: string
}

@Component({
  selector: 'app-reporte-compras',
  templateUrl: './reporte-compras.component.html',
  styleUrls: ['./reporte-compras.component.css']
})
export class ReporteComprasComponent implements OnInit {

  constructor(
    private reporteCompraService: ReporteComprasService
  ) { }

  ngOnInit() {

    const btnReporteExecel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);


    const btnReporteExecelClick = fromEvent(btnReporteExecel, 'click');
    const btnReporteWebClick = fromEvent(btnReporteWeb,'click');

    btnReporteExecelClick.subscribe((response: Event) => {

      const fechaInicio = this.objBusqueda.fechaInicio;
      const fechaFin = this.objBusqueda.fechaFin;

      if(fechaInicio !== '' && fechaFin !== ''){
        if(fechaInicio > fechaFin){
          return alert("La fecha inicial no puede ser mayor a la fecha final");
        }
      } 
      const  obj: Factura = this.objBusqueda;
      this.exportarExcel(obj);
    })

    btnReporteWebClick.subscribe((response: Event) => {

      const fechaInicio = this.objBusqueda.fechaInicio;
      const fechaFin = this.objBusqueda.fechaFin;

      if(fechaInicio !== '' && fechaFin !== ''){
        if(fechaInicio > fechaFin){
          return alert("La fecha inicial no puede ser mayor a la fecha final");
        }
      } 
      const  obj: Factura = this.objBusqueda;
      this.exportarWeb(obj);
    })

  }

  objBusqueda : Factura = {
    fechaInicio : '',
    fechaFin: '',
    clave: '',
    consecutivo: ''
  };

  exportarExcel(obj: Factura){
    this.reporteCompraService.obtenerFacturas(obj)
      .subscribe(response => {
        const datosFacturas = JSON.parse(response);
        const obj: Facturas[] = datosFacturas.facturas;

        this.reporteCompraService.reporteExcel(obj);
      },
      err => console.log(err));
  }

 exportarWeb(obj: Factura){
    this.reporteCompraService.obtenerFacturas(obj)
    .subscribe(response => {
      
      const datosFacturas = JSON.parse(response);
      const obj = datosFacturas.facturas;
      const filtros: Factura = this.objBusqueda;

      this.reporteCompraService.reporteWeb(obj,filtros);
    },
    err => console.log(err));
  } 
}
