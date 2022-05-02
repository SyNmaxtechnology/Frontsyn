import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ReporteExistenciaArticuloServiceService } from './../../services/pages/reporte-existencia-articulo-service.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-reporte-existencia-articulo',
  templateUrl: './reporte-existencia-articulo.component.html',
  styleUrls: ['./reporte-existencia-articulo.component.css']
})
export class ReporteExistenciaArticuloComponent implements OnInit {

  constructor(
    private reporteExistenciaArticuloService: ReporteExistenciaArticuloServiceService
  ) { }

  listaBodegas = [];
  listaCategorias = [];

  ngOnInit() {

    this.reporteExistenciaArticuloService.obtenerBodegas()
      .subscribe(response => {
        const datosBodegas = JSON.parse(response);
        this.listaBodegas = datosBodegas.bodegas
      },
      err => {
        console.log(err);
      });
    
    this.reporteExistenciaArticuloService.obtenerCategorias()
      .subscribe(response => {
        const datosCategorias =  JSON.parse(response);
        this.listaCategorias = datosCategorias.categorias;
      },
      err => {
        console.log(err);
      })

      const btnReporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
      const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);
      const selectBodega = (document.getElementById("selectBodega") as HTMLSelectElement);
      const selectCategoria = (document.getElementById("selectCategoria") as HTMLSelectElement);
      const txtArticulo = (document.getElementById("txtArticulo") as HTMLInputElement);

      const btnReporteExcelClick = fromEvent(btnReporteExcel,'click');
      const btnReporteWebClicl = fromEvent(btnReporteWeb, 'click');

      btnReporteExcelClick.subscribe((e: Event) => {

        const idbodega = selectBodega.options[selectBodega.options.selectedIndex];
        const idcategoria = selectCategoria.options[selectCategoria.options.selectedIndex];

          this.reporteExistenciaArticuloService.reporteExistenciaArticulos({
            idbodega: idbodega.value,
            idcategoria: idcategoria.value,
            articulo: txtArticulo.value
          }).subscribe(response => {
            const obj = JSON.parse(response)
            this.reporteExcel(obj.existencia);
          },
          err => {
            const {status, error} = err;
            const {message} = JSON.parse(error);
            if(status === 404 ){
              Swal.fire('Reporte Existencia', message,'error');
            } else {
              Swal.fire('Reporte Existencia', message,'error');
            }
          })
      })  

      btnReporteWebClicl.subscribe((e: Event) => {
        const idbodega = selectBodega.options[selectBodega.options.selectedIndex];
        const idcategoria = selectCategoria.options[selectCategoria.options.selectedIndex];

          this.reporteExistenciaArticuloService.reporteExistenciaArticulos({
            idbodega: idbodega.value,
            idcategoria: idcategoria.value,
            articulo: txtArticulo.value
          }).subscribe(response => {

            const obj = JSON.parse(response);
            const filtros = {
              categoria : idcategoria.text,
              bodega: idbodega.text,
              articulo: txtArticulo.value
            }
            this.reporteWeb(obj.existencia, filtros);

          },
          err => {
            const {status, error} = err;
            const {message} = JSON.parse(error);

            if(status === 404 ){
              Swal.fire('Reporte Existencia', message,'error');
            } else {
              Swal.fire('Reporte Existencia', message,'error');
            }
          })
        
      })
  }

  reporteExcel(obj){
    this.reporteExistenciaArticuloService.reporteExcel(obj);
  }

  reporteWeb(obj,filtros){
    this.reporteExistenciaArticuloService.reporteWeb(obj,filtros);
  }
}
