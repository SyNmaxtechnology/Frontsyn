import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/pages/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) {

    this.obtenerImpuestos();
    this.obtenerUnidadesMedida();
    this.obtenerCategorias();
    this.obtenerDescuentos();
  }

  objProducto = {
    descripcion: '',
    precio_producto: '',
    costo_unitario: '',
    unidad_medida: '',
    unidad_medida_comercial: '',
    tipo_servicio: '',
    codigo_servicio: '',
    tipo_impuesto: '',
    idcategoria: '',
    iddescuento: ''
  };

  listaDescuentos: object = [];
  listaCategorias: object = [];
  listaImpuestos: object = [];
  listaUnidadesMedida: object = [];

  ngOnInit() {
  }


  obtenerImpuestos() {
    this.productoService.obtenerImpuestos()
      .subscribe(response => {
        this.listaImpuestos = response.impuestos;
      },
      err =>{
        console.log(err)
      });
  }

  obtenerCategorias() {
    this.productoService.obtenerCategorias()
      .subscribe(response => {
        this.listaCategorias = response.categorias;
      }, err => console.log(err));
  }

  obtenerDescuentos(){
    this.productoService.obtenerDescuentos()
    .subscribe(response => {
      this.listaDescuentos = response.descuentos;
    },
    err => console.error(err));
  }
  
  obtenerUnidadesMedida(){
    this.productoService.obtenerUnidadesMedida()
      .subscribe(response => {
        this.listaUnidadesMedida = response.unidades;
      },
      err => console.log(err));
  }
}
