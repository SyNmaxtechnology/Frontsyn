import { Component, OnInit } from '@angular/core';
import { ImpuestoService } from '../../services/pages/impuesto.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent implements OnInit {

  constructor(private impuestoService: ImpuestoService ) { 
    this.obtenerImpuestos();
  }

  objImpuesto  = {
    id: '',
    descripcion: '',
    porcentaje: '',
    codigo: ''
  };
  tablaPequena = false;
  titulo = 'Nuevo Impuesto';

  config: any;
  collection = { count: 0, data: [] };
  listaImpuestos = [];
  query = '';
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
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
  
  procesarImpuesto(obj){
    if(this.objImpuesto.id === ''){
      this.nuevoImpuesto(obj);
    } else {
      this.actualizarImpuesto(obj);
    }
  }

  nuevoImpuesto( obj) {
    

    this.impuestoService.nuevoImpuesto(obj)
      .subscribe((response: any) => {
        console.log(response);
        Swal.fire('Nuevo Impuesto', response.message,'success');
        (document.getElementById('formNuevoImpuesto') as HTMLFormElement).reset();
        $('#ModalNuevoImpuesto').modal('hide');
        this.obtenerImpuestos();
        this.limpiarValores();
      },
      err => {
        console.log(err);
      });
  }

  actualizarImpuesto(obj){
    

    this.impuestoService.actualizarImpuesto(obj)
      .subscribe((response:any) =>  {
        Swal.fire('Editar Impuesto', response.message,'success');
        (document.getElementById('formNuevoImpuesto') as HTMLFormElement).reset();
        $('#ModalNuevoImpuesto').modal('hide');
        this.obtenerImpuestos();
        this.limpiarValores();
      },
      err => console.log(err));
  }
  
  buscarImpuesto(e,texto){
    e.preventDefault();
    
    if (texto === '') {
      return;
    } else {

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      this.impuestoService.obtenerImpuestoPorQuery(texto)
        .subscribe(response =>  {
          
          const datosImpuesto = JSON.parse(response);
          this.listaImpuestos = datosImpuesto.impuesto;

          for (const i in this.listaImpuestos) {
           if(this.listaImpuestos[i].estado_impuesto == 1){
            this.listaImpuestos[i].estado_impuesto = 'SI';
           } else {
            this.listaImpuestos[i].estado_impuesto = 'NO';
           }
          }
  
          this.collection.count = this.listaImpuestos.length;
          this.collection.data = this.listaImpuestos;
          (document.getElementById('form_buscar_impuesto') as HTMLFormElement).reset();
        },
        err => console.log(err)
        );
    }
  }

  obtenerImpuestos () {
    this.impuestoService.listarImpuestos()
      .subscribe(response => {
        
        const datosImpuestos = JSON.parse(response);
        this.listaImpuestos = datosImpuestos.impuestos;

        for (const i in this.listaImpuestos) {
         if(this.listaImpuestos[i].estado_impuesto == 1){
          this.listaImpuestos[i].estado_impuesto = 'SI';
         } else {
          this.listaImpuestos[i].estado_impuesto = 'NO';
         }
        }

        this.collection.count = this.listaImpuestos.length;
        this.collection.data = this.listaImpuestos;
    })
  }

  actualizarEstado(impuesto){
    let nuevoEstado : number, descripcion : string;
    console.log(impuesto)
    if(impuesto.estado_impuesto === 'SI'){
      nuevoEstado = 0;
      descripcion = 'NO';
    } else {
      nuevoEstado = 1;
      descripcion = 'SI';
    }

    const obj = {
      idimpuesto : impuesto.id,
      estado: nuevoEstado
    }

    this.impuestoService.actualizarEstado(obj)
      .subscribe(response => {
        console.log(response);
        impuesto.estado_impuesto = descripcion;
      },
      err => {
        console.log(err);
      })
  }

  obtenerImpuestoPorId(id){
    this.impuestoService.obtenerImpuestoPorId(id)
      .subscribe(response => {
        this.titulo = 'Actualizar Impuesto';
        const datosImpuesto = JSON.parse(response);

        this.objImpuesto.id = datosImpuesto.impuesto[0].id;
        this.objImpuesto.descripcion = datosImpuesto.impuesto[0].descripcion;
        this.objImpuesto.codigo = datosImpuesto.impuesto[0].codigo_impuesto;
        this.objImpuesto.porcentaje = datosImpuesto.impuesto[0].porcentaje_impuesto;
      },
      err => {
        console.log(err);
      })
  }

  limpiarValores(){
    this.titulo = 'Nuevo Impuesto';
    this.objImpuesto.id = '';
    this.objImpuesto.descripcion = '';
    this.objImpuesto.codigo = '';
    this.objImpuesto.porcentaje = '';
  }
}
