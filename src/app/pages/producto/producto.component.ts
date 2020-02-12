import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  constructor() { }

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

  ngOnInit() {
  }

}
