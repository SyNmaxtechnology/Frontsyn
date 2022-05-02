import { Component, OnInit } from '@angular/core';
import { DescuentoService } from '../../services/pages/descuento.service';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';
declare var $:any;

interface Descuento {
  id: number;
  porcentaje: number;
  descripcion: string;
}
@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrls: ['./descuento.component.css']
})
export class DescuentoComponent implements OnInit {

  constructor(private descuentoService: DescuentoService) { 
    this.obtenerDescuentos();

  }

  objDescuento = {
    id: 0,
    porcentaje: 0,
    descripcion: ''
  
  };
  tablaPequena = false;
  config: any;
  collection = { count: 0, data: [] };
  listaDescuentos = [];
  query = '';
  titulo = 'Nuevo Descuento';
  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
    })

    const btnNuevoDescuento = (document.getElementById("nuevoDescuento") as HTMLButtonElement);
    const btnCancelar = (document.getElementById("cancelar") as HTMLButtonElement);
    const btnNuevoDescuentoClick = fromEvent(btnNuevoDescuento,'click');
    const btnCancelarClick = fromEvent(btnCancelar,'click');

    btnNuevoDescuentoClick.subscribe((response : Event) => {
      const obj = this.objDescuento
      if(this.objDescuento.id === 0){
        this.nuevoDescuento(obj);
      } else {
        this.actualizarDescuento(obj);
      }
    })

    btnCancelarClick.subscribe((response : Event) => {
      this.limpiarValores();
    })
  }
  
  nuevoDescuento(obj: Descuento) {
    this.descuentoService.guardarDescuento(obj)
      .subscribe((response: any) => {
        Swal.fire('Nuevo Descuento',
        response.message,
        'success');
        (document.getElementById("formNuevoDescuento") as HTMLFormElement).reset();
        $('#ModalNuevoDescuento').modal('hide');
        this.obtenerDescuentos();
        this.limpiarValores();
      });
  }

  actualizarDescuento(obj: Descuento){
  
    this.descuentoService.actualizarDescuento(obj)
      .subscribe((response: any) => {
        Swal.fire('Editar Descuento',
        response.message,
        'success');
        (document.getElementById("formNuevoDescuento") as HTMLFormElement).reset();
        $('#ModalNuevoDescuento').modal('hide');
        this.obtenerDescuentos();
        this.limpiarValores();
      });
  }

  buscarDescuento(e,texto){
    e.preventDefault();
    if(texto===''){
      return;
    }else{

      if (screen.width < 638) 
      {
       this.tablaPequena = true;

      }
     else {
       this.tablaPequena = false;
     }
    this.descuentoService.buscarDescuento(texto)
      .subscribe((response: any) => {

        this.listaDescuentos = response;
        for(const i in this.listaDescuentos){


          if(this.listaDescuentos[i].estado_descuento == 1){
            this.listaDescuentos[i].estado_descuento = 'SI';
          } else {
            this.listaDescuentos[i].estado_descuento = 'NO';
          }

        }

        this.collection.count = this.listaDescuentos.length;
        this.collection.data = this.listaDescuentos;
      }
      ,err => console.log(err));
    }
  }

  obtenerDescuentos(){
    this.descuentoService.obtenerDescuentos()
      .subscribe((response: any) => {
        this.listaDescuentos = response.descuentos;

        for(const i in this.listaDescuentos){


          if(this.listaDescuentos[i].estado_descuento == 1){
            this.listaDescuentos[i].estado_descuento = 'SI';
          } else {
            this.listaDescuentos[i].estado_descuento = 'NO';
          }

        }

        this.collection.count = this.listaDescuentos.length;
        this.collection.data = this.listaDescuentos;
      },
      err => {
        console.log(err);
      })
  }

  actualizarEstado(descuento) {

    let nuevoEstado: number, descripcion : string;

    if(descuento.estado_descuento == 'NO'){
      descripcion = 'SI';
      nuevoEstado = 1;
    } else  {
      descripcion = 'NO';
      nuevoEstado = 0;
    }

    const obj = {
      estado : nuevoEstado,
      iddescuento: descuento.id
    }

  this.descuentoService.actualizarEstado(obj)
    .subscribe(response =>{
      descuento.estado_descuento = descripcion;
    },
    err => {
      console.log(err);
    })    
  }

  obtenerDescuentoPorId(id: number){
    console.log(id);

    this.descuentoService.obtenerDescuentoPorId(id)
      .subscribe( response => {

        this.titulo = 'Actualizar Descuento'
        const datosDescuento = JSON.parse(response);

        this.objDescuento.id = datosDescuento.descuento[0].id;
        this.objDescuento.descripcion = datosDescuento.descuento[0].descripcion;
        this.objDescuento.porcentaje = datosDescuento.descuento[0].porcentaje;
        
        console.log(this.objDescuento)
      },
      err => {
        console.log(err);
      })
  }

  limpiarValores ( ) {
    this.titulo = 'Nuevo Descuento'
    this.objDescuento.id = 0;
    this.objDescuento.descripcion = '';
    this.objDescuento.porcentaje = 0;
  }
}
