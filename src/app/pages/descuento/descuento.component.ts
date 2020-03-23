import { Component, OnInit } from '@angular/core';
import { DescuentoService } from '../../services/pages/descuento.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrls: ['./descuento.component.css']
})
export class DescuentoComponent implements OnInit {

  constructor(private descuentoService: DescuentoService) { }

  objDescuento = {
    id: '',
    porcentaje: '',
    descripcion: ''
  
  };
  query = '';

  ngOnInit() {
  }

  procesarDescuento(e,obj){
    if(this.objDescuento.id === ''){
      this.nuevoDescuento(e,obj);
    }else{
      this.actualizarDescuento(e,obj);
    }
  }
  
  nuevoDescuento(e, obj) {
    console.log(obj);
    e.preventDefault();
    this.descuentoService.guardarDescuento(obj)
      .subscribe((response: any) => {
        Swal.fire('Nuevo Descuento',
        response.message,
        'success');

        (document.getElementById("formDescuento") as HTMLFormElement).reset();
      });
  }

  actualizarDescuento(e,obj){
    e.preventDefault();

    this.descuentoService.actualizarDescuento(obj)
      .subscribe((response: any) => {
        Swal.fire('Editar Descuento',
        response.message,
        'success');

        (document.getElementById("formDescuento") as HTMLFormElement).reset();
      });
  }

  buscarDescuento(e,texto){
    e.preventDefault();
    if(texto===''){
      return;





      
    }else{
    this.descuentoService.buscarDescuento(texto)
      .subscribe((response: any) => {
        this.objDescuento.id = response.id;
        this.objDescuento.descripcion = response.descripcion;
        this.objDescuento.porcentaje = response.porcentaje
      }
      ,err => console.log(err));
    }
  }
}
