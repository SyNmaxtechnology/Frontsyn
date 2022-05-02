import { ReporteClienteService } from './../../services/pages/reporte-cliente.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';


interface Cliente {
  fechaInicio : string;
  fechaFin: string;
  cliente: string;
}

interface Factura {
  id: number;
  nombre: string;
  fecha: string;
  subtotal: number;
  totalimpuesto: number;
  otroscargos: number;
  total: number;
}

@Component({
  selector: 'app-reporte-cliente',
  templateUrl: './reporte-cliente.component.html',
  styleUrls: ['./reporte-cliente.component.css']
})
export class ReporteClienteComponent implements OnInit {

  constructor(
    private reporteClienteService : ReporteClienteService
  ) { }

  ngOnInit() {

    const btnReporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const btnReporteExcelClick = fromEvent(btnReporteExcel,'click');
    const btnReporteWebClick = fromEvent(btnReporteWeb, 'click');

    btnReporteExcelClick.subscribe((response: Event) => {
      const obj = this.objBusqueda;
      this.exportarExcel(obj);
    })

    btnReporteWebClick.subscribe((response: Event) => {
      const obj = this.objBusqueda;
      this.exportarWeb(obj);
    })
  }


  objBusqueda = {
    fechaInicio: '',
    fechaFin: '',
    cliente: ''
  }


  exportarExcel(obj: Cliente){
    this.reporteClienteService.obtenerFacturas(obj)
      .subscribe(response => {
        const datosFacturas = JSON.parse(response);
        const obj = datosFacturas;

        this.reporteClienteService.reporteExcel(obj);
      },
      err => console.log(err));
  }


  exportarWeb(obj: Cliente){
    this.reporteClienteService.obtenerFacturas(obj)
      .subscribe(response => {
        const datosFacturas = JSON.parse(response);
        const objFactura: Factura[] = datosFacturas.facturas;

        this.reporteClienteService.reporteWeb(objFactura,obj);
      },
      err => console.log(err));
  }
}
