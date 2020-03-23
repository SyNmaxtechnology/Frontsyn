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
    
  }

  objProducto = {
    id: '',
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
    
  };

  query = '';


  listaCategorias: any = [];
  listaImpuestos: any = [];
  listaUnidadesMedida: any = [];

  ngOnInit() {
  }

  obtenerPrecioFinal(idPrecio, idSelect) {

    try {
      const selectImpuesto = (document.getElementById(idSelect) as HTMLSelectElement);
      const selectedValue = selectImpuesto.value;
      const idImpuesto = selectedValue.split(': ')[1];
      const precio = (document.getElementById(idPrecio) as HTMLInputElement).value;
      
      if ( typeof idImpuesto !== 'undefined' && idImpuesto != null && precio !== '') {
        let precioFinal = 0;
        let porcentajeAplicado = 0;
        let valorImpuesto = 0;
        for (const impuesto in this.listaImpuestos) {
          if (this.listaImpuestos[impuesto].id == idImpuesto) {
            if (this.listaImpuestos[impuesto].porcentaje_impuesto < 10) {
              porcentajeAplicado = parseFloat('0.0' + this.listaImpuestos[impuesto].porcentaje_impuesto.toString());
            } else {
              porcentajeAplicado = parseFloat('0.' + this.listaImpuestos[impuesto].porcentaje_impuesto.toString());
            }
            valorImpuesto = parseFloat(precio) * porcentajeAplicado;
            precioFinal = parseFloat(precio) + valorImpuesto;

            const inputPrecioFinal = (document.getElementById('precio_final') as HTMLInputElement);
            inputPrecioFinal.value = String(precioFinal.toFixed(2));
            this.objProducto.precio_final = inputPrecioFinal.value.toString();
            
          }
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  buscarProducto(e, texto) {
    e.preventDefault();
    if (texto.length === 0) {
       return;
    } else {
      const type = 'equal';
      this.productoService.obtenerProducto(texto,type)
      .subscribe((response: any) =>  {

                console.log(response);

                (document.getElementById('query') as HTMLInputElement).value = '';
                this.objProducto.id = response.idproducto;
                this.objProducto.descripcion = response.descripcion;
                this.objProducto.codigo_barra = response.codigobarra_producto;
                this.objProducto.precio_producto = response.precio_producto;
                this.objProducto.costo_unitario = response.costo_unitario;
                this.objProducto.unidad_medida_comercial = response.unidad_medida_comercial;
                this.objProducto.precio_final = response.precio_final;
                this.objProducto.idcategoria = response.idcategoria; 
                this.objProducto.tipo_impuesto = response.tipo_impuesto;
                this.objProducto.unidad_medida = response.unidad_medida;

                this.obtenerImpuestos();
                this.obtenerUnidadesMedida();
                this.obtenerCategorias();

      },
      err => {
        console.error(err);
        if (err.status) {
            Swal.fire('Buscar Producto', 'No hay resultados', 'error' );
        }
      });
    }
  }
  
  procesarDatosProducto(e, obj){
    if (this.objProducto.id === ''){
      this.nuevoProducto(e,obj);
    } else {
      this.actualizarProducto(e,obj);
    }
  }

  nuevoProducto(e, obj) {
    e.preventDefault();

    let tipoServicio = '';
    let codigo = '';
    if (this.productoService.UnidadesMedidaServicios().includes(obj.unidad_medida)) {
      codigo = 'Servicio';
      tipoServicio = '02';
    } else {
      codigo = 'Mercancía';
      tipoServicio = '01';
    }

    obj.tipo_servicio = tipoServicio;
    obj.codigo_servicio = codigo;
  


    this.productoService.nuevoProducto(obj)
      .subscribe((response: any) =>  {

        Swal.fire('Nuevo Producto', response.message, 'success');
        (document.getElementById('form_producto')  as HTMLFormElement).reset();
      },
      err => console.error(err));
  }

  actualizarProducto(e, obj){
    e.preventDefault();

    console.log(obj);
    const nombre = (document.getElementById('descripcion') as HTMLInputElement);
    const codigoBarra = (document.getElementById('codigo_barra') as HTMLInputElement);
    const precio = (document.getElementById('precio_producto') as HTMLInputElement);
    const costo = (document.getElementById('costo_unitario') as HTMLInputElement);
    const unidad_medida_comercial = (document.getElementById('unidad_medida_comercial') as HTMLInputElement);
    const precio_final = (document.getElementById('precio_final') as HTMLInputElement);
    const selectUnidadMedida = (document.getElementById('unidad_medida') as HTMLSelectElement);
    const selectCategoria = (document.getElementById('idcategoria') as HTMLSelectElement);
    const selectImpuesto = (document.getElementById('tipo_impuesto') as HTMLSelectElement);

    let tipoServicio = '';
    let codigo = '';
    if (this.productoService.UnidadesMedidaServicios().includes(obj.unidad_medida)) {
      codigo = 'Servicio';
      tipoServicio = '01';
    } else {
      codigo = 'Mercancía';
      tipoServicio = '02';
    }

    for(let i in this.listaUnidadesMedida){
      if(selectUnidadMedida.selectedIndex.toString() == i){
        obj.unidad_medida = this.listaUnidadesMedida[i].simbolo;
      }
    }
    obj.descripcion = nombre.value;
    obj.codigo_barra = codigoBarra.value;
    obj.costo_unitario = costo.value;
    obj.precio_producto = precio.value;
    obj.unidad_medida_comercial = unidad_medida_comercial.value;
    //obj.unidad_medida = selectUnidadMedida.value;
    obj.tipo_servicio = tipoServicio;
    obj.codigo_servicio = codigo;
    obj.tipo_impuesto= selectImpuesto.value.split(': ')[1];
    obj.idcategoria= selectCategoria.value.split(': ')[1];
    obj.precio_final = precio_final.value;
    console.log(obj);
    this.productoService.actualizarProducto(obj)
      .subscribe((response: any) =>  {

        this.objProducto.id = '';
        Swal.fire('Actualizar Producto', response.message, 'success');
        (document.getElementById('form_producto')  as HTMLFormElement).reset();
      },
      err => {
        (document.getElementById('form_producto')  as HTMLFormElement).reset();
      });
  }

  obtenerImpuestos() {
    this.productoService.obtenerImpuestos()
      .subscribe((response: any) => {
        console.log(response);
        this.listaImpuestos = response.impuestos;
      },
      err =>{
        console.log(err)
      });
  }

  obtenerCategorias() {
    this.productoService.obtenerCategorias()
      .subscribe((response: any) => {
        this.listaCategorias = response.categorias;
      }, err => console.log(err));
  }

  obtenerUnidadesMedida(){
    this.productoService.obtenerUnidadesMedida()
      .subscribe((response: any) => {
        this.listaUnidadesMedida = response.unidades;
      },
      err => console.log(err));
  }
}
