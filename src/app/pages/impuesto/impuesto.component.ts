import { Component, OnInit } from '@angular/core';
import { ImpuestoService } from '../../services/pages/impuesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent implements OnInit {

  constructor(private impuestoService: ImpuestoService ) { }

  objImpuesto = {
    id: '',
    descripcion: '',
    porcentaje: '',
    codigo: ''
  };
  
  query = '';
  ngOnInit() {
  }
  
  procesarImpuesto(e,obj){
    if(this.objImpuesto.id === ''){
      this.nuevoImpuesto(e,obj);
    } else {
      this.actualizarImpuesto(e,obj);
    }
  }

  nuevoImpuesto(e, obj) {
    e.preventDefault();

    this.impuestoService.nuevoImpuesto(obj)
      .subscribe((response: any) => {
        console.log(response);
        Swal.fire('Nuevo Impuesto', response.message,'success');
        (document.getElementById('formImpuesto') as HTMLFormElement).reset();
      },
      err => {
        console.log(err);
      });
  }

  actualizarImpuesto(e,obj){
    e.preventDefault();

    this.impuestoService.actualizarImpuesto(obj)
      .subscribe((response:any) =>  {
        Swal.fire('Editar Impuesto', response.message,'success');
        (document.getElementById('formImpuesto') as HTMLFormElement).reset();
      },
      err => console.log(err));
  }
  
  buscarImpuesto(e,texto){
    e.preventDefault();
    
    if (texto === '') {
      return;
    } else {
      this.impuestoService.buscarImpuesto(texto)
        .subscribe((response: any) =>  {
          console.log((response));
          this.objImpuesto.id = response.id;
          this.objImpuesto.descripcion = response.descripcion;
          this.objImpuesto.codigo = response.codigo_impuesto;
          this.objImpuesto.porcentaje = response.porcentaje_impuesto;
          (document.getElementById('formBuscarImpuesto') as HTMLFormElement).reset();
        },
        err => console.log(err)
        );
    }
  }

}
