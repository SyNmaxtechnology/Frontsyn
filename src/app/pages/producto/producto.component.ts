import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/pages/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
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
    codigo_barra: '',
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

  query = '';

  listaDescuentos: object = [];
  listaCategorias: object = [];
  listaImpuestos: object = [];
  listaUnidadesMedida: object = [];

  ngOnInit() {
  }

  buscarProducto(e, texto){
    e.preventDefault();

    console.log(texto);
  }

  nuevoProducto(e, obj) {
    e.preventDefault();

    let tipoServicio = '';
    let codigo = '';
    if (this.productoService.UnidadesMedidaServicios().includes(obj.unidad_medida)) {
      codigo = 'Servicio';
      tipoServicio = '01';
    } else {
      codigo = 'Mercancía';
      tipoServicio = '02';
    }

    obj.tipo_servicio = tipoServicio;
    obj.codigo_servicio = codigo;

    this.productoService.nuevoProducto(obj)
      .subscribe(response =>  {

        Swal.fire('Nuevo Producto', response.message, 'success');
      },
      err => console.error(err));
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
