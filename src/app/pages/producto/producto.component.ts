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
    precio_final: '',
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

  obtenerPrecioFinal(precio, idSelect) {

    const selectImpuesto = (document.getElementById(idSelect) as HTMLSelectElement);
    const selectedValue = selectImpuesto.value;
    const idImpuesto = selectedValue.split(':')[0];

    if ( typeof idImpuesto !== 'undefined' && idImpuesto != null && precio !== '') {
      let precioFinal = 0;
      let porcentajeAplicado = 0;
      let valorImpuesto = 0;
      for (const impuesto in this.listaImpuestos) {
        if (this.listaImpuestos[impuesto].id == idImpuesto) {
          if (this.listaImpuestos[impuesto].porcentaje_impuesto > 10) {
            porcentajeAplicado = parseFloat('0.0' + this.listaImpuestos[impuesto].porcentaje_impuesto.toString());
          } else {
            porcentajeAplicado = parseFloat('0.' + this.listaImpuestos[impuesto].porcentaje_impuesto.toString());
          }
          valorImpuesto = precio * porcentajeAplicado;
          precioFinal = precio + valorImpuesto;

          const inputPrecioFinal = (document.getElementById('precio_final') as HTMLInputElement);
          inputPrecioFinal.value = String(precioFinal.toFixed(2));
          this.objProducto.precio_final = inputPrecioFinal.value.toString();
        }
      }
    } else {
      return;
    }
  }
  buscarProducto(e, texto) {
    e.preventDefault();

    console.log(texto);
    if (texto.length === 0) {
       return;
    } else {
    this.productoService.obtenerProducto(texto)
      .subscribe(response =>  {
        console.log(response);

        const nombre = (document.getElementById('descripcion') as HTMLInputElement);
        nombre.value= response.descripcion;
        const codigoBarra = (document.getElementById('codigo_barra') as HTMLInputElement);
        codigoBarra.value = response.codigobarra_producto;
        const precio = (document.getElementById('precio_producto') as HTMLInputElement);
        precio.value = response.precio_producto;
        const costo = (document.getElementById('costo_unitario') as HTMLInputElement);
        costo.value= response.costo_unitario;
        const unidad_medida_comercial = (document.getElementById('unidad_medida_comercial') as HTMLInputElement);
        unidad_medida_comercial.value =  response.unidad_medida_comercial;
        const precio_final = (document.getElementById('precio_final') as HTMLInputElement);
        precio_final.value = response.precio_final;
        const selectUnidadMedida = (document.getElementById('unidad_medida') as HTMLSelectElement);
        const selectDescuento = (document.getElementById('iddescuento') as HTMLSelectElement);
        const selectCategoria = (document.getElementById('idcategoria') as HTMLSelectElement);
        const selectImpuesto = (document.getElementById('tipo_impuesto') as HTMLSelectElement);

        for (const i in this.listaUnidadesMedida) {
          if (this.listaUnidadesMedida[i].simbolo == response.unidad_medida){
            selectUnidadMedida.options[i].selected = true;
          }
        }
        for (const i in this.listaDescuentos) {
          if (this.listaDescuentos[i].id == response.iddescuento){
            selectDescuento.options[i].selected = true;
          }
        }
        for (const i in this.listaCategorias) {
          if (this.listaCategorias[i].id == response.idcategoria){
            selectCategoria.options[i].selected = true;
          }
        }
        for (const i in this.listaImpuestos) {
          console.log(this.listaImpuestos[i].id);
          
          if (this.listaImpuestos[i].id == response.idImpuesto){
            selectImpuesto.options[i].selected = true;
          }
        }
      },
      err => {
        console.error(err)
        if(err.status) {
          Swal.fire('Buscar Producto', 'No hay resultados', 'error' );
        }
      });
    }
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
        const formProducto = (document.getElementById('form_producto')  as HTMLFormElement);
        formProducto.reset();
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
