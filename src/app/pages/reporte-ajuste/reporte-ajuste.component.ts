import Swal from 'sweetalert2';
import { ReporteAjusteService } from './../../services/pages/reporte-ajuste.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-reporte-ajuste',
  templateUrl: './reporte-ajuste.component.html',
  styleUrls: ['./reporte-ajuste.component.css']
})
export class ReporteAjusteComponent implements OnInit {

  constructor(
    private reporteAusteService: ReporteAjusteService
  ) { }

  

  ngOnInit() {

    const fechaInicio = (document.getElementById("fechaInicio") as HTMLInputElement); 
    const fechaFin = (document.getElementById("fechaFin") as HTMLInputElement); 
    const txtArticulo = (document.getElementById("txtArticulo") as  HTMLInputElement);
    const selectCategoria = (document.getElementById("selectCategoria") as  HTMLSelectElement);
    const selectBodega = (document.getElementById("selectBodega") as  HTMLSelectElement);
    const selectTipoAjuste = (document.getElementById("selectTipoAjuste") as  HTMLSelectElement);
    const btnReporteExcel = (document.getElementById("reporteExcel") as HTMLButtonElement);
    const btnReporteWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);

    this.reporteAusteService.obtenerBodegas().subscribe(response => {
      
      const datosBodega = JSON.parse(response);
      this.listaBodegas = datosBodega.bodegas;

    },
    err => {
      console.log(err);
    })

    this.reporteAusteService.obtenerCategorias().subscribe(response => {
      const datosCategorias = JSON.parse(response);
      this.listaCategorias = datosCategorias.categorias;
    },
    err => {
      console.log(err);
    })

    this.reporteAusteService.obtenerTiposAJuste().subscribe(response => {
      const datosTipoAjuste = JSON.parse(response);
      this.listaTiposAJuste = datosTipoAjuste.tipoAJuste;
    },
    err => {
      console.log(err);
    })


    const btnReporteExcelClick = fromEvent(btnReporteExcel,'click');
    const btnReporteWebClick = fromEvent(btnReporteWeb,'click');

    btnReporteExcelClick.subscribe((e: Event) => {
      let fecha1= '', fecha2 = '';
      if(fechaInicio.value != '' && fechaFin.value != ''){
        if(fechaInicio.value > fechaFin.value){
          return alert("La fecha de inicio no puede ser mayor a la fecha final");
        } else {
          fecha1 = fechaInicio.value;
          fecha2 = fechaFin.value;
        }
      } 
      const objAjustes = {
        tipomovimiento: selectTipoAjuste.options[selectTipoAjuste.options.selectedIndex].value,
        idcategoria: selectCategoria.options[selectCategoria.options.selectedIndex].value,
        idbodega: selectBodega.options[selectBodega.options.selectedIndex].value,
        fechaInicio: fecha1,
        fechaFin: fecha2,
        articulo:txtArticulo.value
      }

      this.reporteAusteService.obtenerAJustes(objAjustes).subscribe(response => {
        
        const datosAjustes = JSON.parse(response);
        let tipo = '';
        const obj = datosAjustes.ajustes;

        if(selectCategoria.value.length > 0 || selectBodega.value.length > 0 || txtArticulo.value.length > 0){
          tipo = '01'; // este tipo es el queaplica group by
        } else {
          tipo = '02'; 
        }
        this.reporteExcel(obj,tipo);
      },
      err => {
        const {status,error} = err;
        const msdDataError = JSON.parse(error);

        if(status === 404){
          Swal.fire('Reporte Ajuste', msdDataError.message,'error');
        } else {
          Swal.fire('Reporte Ajuste', msdDataError.message,'error');
        }
      })
    })

    btnReporteWebClick.subscribe((e: Event) => {
      let fecha1= '', fecha2 = '';
      if(fechaInicio.value != '' && fechaFin.value != ''){
        if(fechaInicio.value > fechaFin.value){
          return alert("La fecha de inicio no puede ser mayor a la fecha final");
        } else {
          fecha1 = fechaInicio.value;
          fecha2 = fechaFin.value;
        }
      } 
      const objAJustes = {
        tipomovimiento: selectTipoAjuste.options[selectTipoAjuste.options.selectedIndex].value,
        idcategoria: selectCategoria.options[selectCategoria.options.selectedIndex].value,
        idbodega: selectBodega.options[selectBodega.options.selectedIndex].value,
        fechaInicio: fecha1,
        fechaFin: fecha2,
        articulo:txtArticulo.value
      }
      this.reporteAusteService.obtenerAJustes(objAJustes).subscribe(response => {

        const datosAjustes = JSON.parse(response);
        let tipo = '';
        const obj = datosAjustes.ajustes; 
        let filtros = {
          tipomovimiento:'',
          articulo: '',
          bodega: '',
          categoria: '',
          fechaInicio: fecha1,
          fechaFin: fecha2
        }

        if(selectTipoAjuste.options[selectTipoAjuste.options.selectedIndex].value.length > 0){
          filtros.tipomovimiento = selectTipoAjuste.options[selectTipoAjuste.options.selectedIndex].text;
        } 

        if(txtArticulo.value.length > 0){
          filtros.articulo = txtArticulo.value;
        } 

        if(selectBodega.options[selectBodega.options.selectedIndex].value.length > 0){
          filtros.bodega= selectBodega.options[selectBodega.options.selectedIndex].text;
        }

        if(selectCategoria.options[selectCategoria.options.selectedIndex].value.length > 0){
          filtros.categoria =selectCategoria.options[selectCategoria.options.selectedIndex].text;
        }
        
        
        if(selectCategoria.value.length > 0 || selectBodega.value.length > 0 || txtArticulo.value.length > 0){
          tipo = '01'; // este tipo es el queaplica group by
        } else {
          tipo = '02'; 
        }


        this.reporteWeb(obj,filtros,tipo);
      },
      err => {
        const {status,error} = err;
        const msdDataError = JSON.parse(error);

        if(status === 404){
          Swal.fire('Reporte Ajuste', msdDataError.message,'error');
        } else {
          Swal.fire('Reporte Ajuste', msdDataError.message,'error');
        }
      })
    })
  }

  listaTiposAJuste = [];
  listaCategorias = [];
  listaBodegas = [];

  reporteExcel(obj,tipo){

    this.reporteAusteService.reporteExcel(obj,tipo);

  }

  reporteWeb(obj,filtros,tipo){
    this.reporteAusteService.reporteWeb(obj,filtros,tipo);
  }

}
