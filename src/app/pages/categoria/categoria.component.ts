import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/pages/categoria.service';
 

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) { }

  objCategoria = {
    descripcion: ''
  };

  ngOnInit() {
  }

  nuevaCategoria(e, obj) {
    e.preventDefault();
    console.log(obj);

    this.categoriaService.guardarCategoria(obj)
      .subscribe(response => {
         console.log(response);
      },
      err => console.log(err));
  }
}
