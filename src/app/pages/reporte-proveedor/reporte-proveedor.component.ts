import { ReporteProveedorService } from './../../services/pages/reporte-proveedor.service';
import { Component, OnInit } from '@angular/core';
import { ReporteProductoService } from './../../services/pages/reporte-producto.service';
import { fromEvent } from 'rxjs';

interface Proveedor {
  proveedor: string;
  fechaInicio: string;
  fechaFin: string;
}

interface Factura {

  proveedor: string;
  subtotal: number;
  totalimpuesto: number;
  otroscargos: number;
  total: number;
}


@Component({
  selector: 'app-reporte-proveedor',
  templateUrl: './reporte-proveedor.component.html',
  styleUrls: ['./reporte-proveedor.component.css']
})
export class ReporteProveedorComponent implements OnInit {

  constructor(
    private reporteProveedorService: ReporteProveedorService
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

  objBusqueda : Proveedor = {
    proveedor: '',
    fechaInicio: '',
    fechaFin: ''
  }
  exportarExcel(obj: Proveedor){
    this.reporteProveedorService.obtenerFacturas(obj)
      .subscribe(response => {
        const datosFacturas = JSON.parse(response);
        const obj : Factura[] = datosFacturas.facturas;
        this.reporteProveedorService.reporteExcel(obj);

      },
      err => {
        console.log(err);
      })
  }

  exportarWeb(obj: Proveedor){
    this.reporteProveedorService.obtenerFacturas(obj)
      .subscribe(response => {
        const datosFacturas = JSON.parse(response);
        const objFacturas : Factura[] = datosFacturas.facturas;
        this.reporteProveedorService.reporteWeb(objFacturas,obj);

      },
      err => {
        console.log(err);
      })
  }
}
