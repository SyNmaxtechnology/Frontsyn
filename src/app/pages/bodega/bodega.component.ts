import Swal from 'sweetalert2';
import { BodegaService,Bodega } from './../../services/pages/bodega.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
Swal
BodegaService
@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {

  constructor(
    private bodegaService: BodegaService
  ) { }

  ngOnInit() {

    const btnNuevaBodega = (document.getElementById("btnNuevaBodega")  as HTMLButtonElement);

    const btnNuevaBodegaClick = fromEvent(btnNuevaBodega,'click');

    btnNuevaBodegaClick.subscribe((e: Event) => {

      const obj = this.objBodega;
      this.nuevaBodega(obj);
    })

  }

  objBodega : Bodega = {
    descripcion: '',
    Principal: 0
  }



  nuevaBodega(obj: Bodega){
    this.bodegaService.nuevaBodega(obj)
      .subscribe(response => {
        const datosRespuesta = JSON.parse(response);
        (document.getElementById("descripcion") as HTMLInputElement).value = '';
        Swal.fire('Nueva Bodega',datosRespuesta.message, 'success');
    },
    err => {
      const {status, error} = err;
      const mensaje = JSON.parse(error);
      Swal.fire('Nueva Bodega', mensaje.message, 'error');
    })
  }


}
