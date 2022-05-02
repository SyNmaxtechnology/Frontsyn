import { fromEvent } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ReporteFacturacionService } from './../../services/pages/reporte-facturacion.service';

interface TipoDocumento {
  descripcion: string;
  codigo: string;
}

interface Factura {
  fechaInicio: string;
    fechaFin: string;
    numDocumento: string;
    numConsecutivo: string
    tipoDocumento: string;
}

@Component({
  selector: 'app-reporte-facturacion',
  templateUrl: './reporte-facturacion.component.html',
  styleUrls: ['./reporte-facturacion.component.css']
})

export class ReporteFacturacionComponent implements OnInit {

  
  constructor(
    private reporteFacturaService: ReporteFacturacionService
  ) { 
    this.obtenerTiposDocumento();
  }

  ngOnInit() {
    
    const btnReporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    const btnReporteExcelClick = fromEvent(btnReporteExcel,'click');
    const btnReporteWebClick = fromEvent(btnReporteWeb,'click');

    btnReporteExcelClick.subscribe((response: Event) => {

      const fechaInicio: string = this.objBusqueda.fechaInicio;
      const fechaFIn: string = this.objBusqueda.fechaFin;

      if(fechaInicio !== '' && fechaFIn !== ''){
          if(fechaInicio > fechaFIn ){
            alert("La fecha inicial no puede ser mayor a la fecha final");
            return;
          }
      }

      if(this.objBusqueda.numConsecutivo == null){
        this.objBusqueda.numConsecutivo = undefined;
      }

      if(this.objBusqueda.numDocumento == null){
        this.objBusqueda.numDocumento = undefined;
      }

      const obj: Factura = this.objBusqueda;
      this.exportarExcel(obj)

    })

    btnReporteWebClick.subscribe((response: Event) => {

      const fechaInicio: string = this.objBusqueda.fechaInicio;
      const fechaFIn: string = this.objBusqueda.fechaFin;

      if(fechaInicio !== '' && fechaFIn !== ''){
          if(fechaInicio > fechaFIn ){
            alert("La fecha inicial no puede ser mayor a la fecha final");
            return;
          }
      }

      if(this.objBusqueda.numConsecutivo == null){
        this.objBusqueda.numConsecutivo = undefined;
      }

      if(this.objBusqueda.numDocumento == null){
        this.objBusqueda.numDocumento = undefined;
      }

      const obj: Factura = this.objBusqueda;
      this.exportarWeb(obj,this.objBusqueda.tipoDocumento )
    })

  }

  listaTiposDocumento: TipoDocumento[] = [];

  objBusqueda : Factura = {
    fechaInicio : '',
    fechaFin: '',
    numDocumento: '',
    numConsecutivo: '',
    tipoDocumento: ''
  };


  obtenerTiposDocumento(){
    this.reporteFacturaService.obtenerTiposDocumento()
      .subscribe(response => {
        let datos = JSON.parse(response);
        console.log(datos);
        for(const i in datos.tipoDocumento){
          if(datos.tipoDocumento[i].codigo == '01' || datos.tipoDocumento[i].codigo == '04'){
              this.listaTiposDocumento.push(datos.tipoDocumento[i]);
          }
        }
    },
    err => {
      console.log(err);
    })
  }

  exportarExcel(obj: Factura){
    this.reporteFacturaService.obtenerComprobantesAceptados(obj)
      .subscribe(response => {
        const objFacturas = JSON.parse(response);
        const obj = objFacturas.facturas;
        const tipo = this.objBusqueda.tipoDocumento;
        this.reporteFacturaService.reporteExcel(obj,tipo);

      },
      err => console.log(err));
  }

  exportarWeb(obj: Factura, tipoDocumento: string){
    this.reporteFacturaService.obtenerComprobantesAceptados(obj)
      .subscribe(response => {
        const objFacturas = JSON.parse(response);
        const obj = objFacturas.facturas;
        this.reporteFacturaService.reporteWeb(obj,tipoDocumento, this.objBusqueda);
      },
      err => console.log(err));
  }
}
