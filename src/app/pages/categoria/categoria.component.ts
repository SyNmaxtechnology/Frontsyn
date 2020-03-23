import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/pages/categoria.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) { }

  objCategoria = {
    id: '',
    descripcion: '',
    codigo: ''
  };

  query = '';

  ngOnInit() {
  }

  procesarCategoria(e, obj){
    if(this.objCategoria.id === ''){
      this.nuevaCategoria(e,obj);
    }else{
      this.actualizarCategoria(e,obj);
    }
  }

  nuevaCategoria(e, obj) {
    e.preventDefault();
    console.log(obj);

    this.categoriaService.guardarCategoria(obj)
      .subscribe((response: any) => {
         Swal.fire('Nueva Categoría', response.message, 'success');
         (document.getElementById("formCategoria") as HTMLFormElement).reset();
      },
      err => console.log(err));
  }

  actualizarCategoria(e,obj){
    e.preventDefault();

    this.categoriaService.actualizarCategoria(obj)
      .subscribe((response: any) => {
        Swal.fire('Editar Categoría', response.message, 'success');
        (document.getElementById("formCategoria") as HTMLFormElement).reset();
      }, 
      err => console.log(err))

  }

  buscarCategoria(e,texto){
    e.preventDefault();
    if(texto === ''){
      return;
    }else {
      this.categoriaService.obtenerCategoria(texto)
        .subscribe((response: any) =>{
          console.log(response);
          (document.getElementById("form_buscar_categoria") as HTMLFormElement).reset();
           
          this.objCategoria.id = response.id;
          this.objCategoria.descripcion = response.descripcion;
          this.objCategoria.codigo = response.codigo;
        },
        err => console.error(err));
    }
  }
}
