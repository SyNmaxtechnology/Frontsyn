import Swal from 'sweetalert2';
import { D151ventasService,D151Ventas } from './../../services/pages/d151ventas.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-d151ventas',
  templateUrl: './d151ventas.component.html',
  styleUrls: ['./d151ventas.component.css']
})
export class D151ventasComponent implements OnInit {

  constructor(
    private d151Ventas: D151ventasService
  ) { }

  ngOnInit() {

    const btnExcel = (document.getElementById("reporteExcel") as HTMLButtonElement); 
    const btnWeb = (document.getElementById("reporteWeb") as HTMLButtonElement);


    const btnExcelClick = fromEvent(btnExcel,'click');
    const btnWebClick = fromEvent(btnWeb,'click');


    btnExcelClick.subscribe((e:Event) => {
      this.d151Ventas.obtenerDatosReporte(this.objDatos)
        .subscribe(response => {
          this.d151Ventas.reporteExcel(JSON.parse(response));
      },
      err => {
        const {error} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar información',message,'error');
      })
    })

    btnWebClick.subscribe((e:Event) => {
      this.d151Ventas.obtenerDatosReporte(this.objDatos)
        .subscribe(response => {
          this.d151Ventas.reporteWeb(JSON.parse(response),this.objDatos);
      },err => {
        const {error} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar información',message,'error');
      })
    })
  }  

  objDatos: D151Ventas = {
    fechaInicio: '',
    fechaFin: '',
    montoVenta: null
  }
}
