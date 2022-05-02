import  Swal  from 'sweetalert2';
import { ExistenciaService, Existencia } from './../../services/pages/existencia.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-existencia',
  templateUrl: './existencia.component.html',
  styleUrls: ['./existencia.component.css']
})
export class ExistenciaComponent implements OnInit {

  constructor(

    private existenciaService: ExistenciaService
  ) { 

    this.obtenerBodegas();
  }

  ngOnInit() {
  }

  objExistencia: Existencia = {
    descripcion: ''
  }

  listaBodegas = [];
  listaArticulos = [];
  mostrar: boolean = false;
  obtenerBodegas () {
    
    this.existenciaService.obtenerBodegas() 
      .subscribe(response => {
          const datosBodegas = JSON.parse(response);
          this.listaBodegas = datosBodegas.bodegas;
      })
  }

  obtenerArticulos (obj: Existencia) {
    if(obj.descripcion === ''){
      this.listaArticulos  = [];
    } else {
      this.existenciaService.obtenerExistencia(obj)
    .subscribe(response => {
      
      const datosRespuesta = JSON.parse(response);
      this.listaArticulos = datosRespuesta.existencia;

      if(this.listaArticulos.length > 0){
        this.mostrar = true;
      } else {
        this.mostrar = false;
      }
    },err => {
      const {status, error} = err;
      const objError = JSON.parse(error);
      if(status == 404) {
        //Swal.fire('Buscar Existencia',objError.message,'error');
      } else {
        Swal.fire('Buscar Existencia','Ha ocurrido un error en el servidor','error');
      }
    })
    }
  }

}
