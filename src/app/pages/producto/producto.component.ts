import { CategoriaService } from './../../services/pages/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ProductoService, URL_SERVER } from '../../services/pages/producto.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService) {

    this.obtenerImpuestos();
    this.obtenerUnidadesMedida();
    this.obtenerCategorias();
    this.obtenerProductos();
    

    if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
  }


  config: any;
  collection = { count: 0, data: [] };
  listaCodigosCabys = [];
  objProducto = {
    id: '',
    descripcion: '',
    codigo_barra: '',
    precio_producto: '',
    precio_final: '',
    costo_unitario: '',
    unidad_medida: 'Unid',
    unidad_medida_comercial: '',
    tipo_servicio: '',
    codigo_servicio: '',
    tipo_impuesto: '',
    idcategoria: '',
    imagen: '',
    codigocabys: '',
    DescuArt: '',
    SinDescu: ''
  };

  query = '';
  tablaPequena = false;
  mostrarImagen : boolean = false;
  listaCategorias: any = [];
  listaImpuestos: any = [];
  listaUnidadesMedida: any = [];
  listaProductos = [];
  Productos = [];
  url: string;
  codigocabys: string = '';
//codigocabys
  ngOnInit() {
    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.collection.count
    };

    window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }
    })
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
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
      const type = 'equal';
      this.productoService.obtenerProducto(texto,type)
      .subscribe((response: any) =>  {

        this.listaProductos = response;
        let precio = '';
        for(const i in this.listaProductos){
          precio = this.listaProductos[i].precio_producto;
          this.listaProductos[i].precio_producto = Number(precio).toFixed(2);
          if(this.listaProductos[i].estado_producto == 1){
            this.listaProductos[i].estado_producto = 'SI';
          } else {
            this.listaProductos[i].estado_producto = 'NO';
          }
        }

        this.collection.data = this.listaProductos;
        this.collection.count = response.length;
        (document.getElementById('query') as HTMLInputElement).value = '';
          

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
      this.nuevoProducto(obj);
    } else {
      this.actualizarProducto(obj);
    }
  }

  nuevoProducto(obj) {
    
    
    let producto : any;
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
    
    const imagen = (document.getElementById("imagen") as HTMLInputElement);
  
    if (imagen.value.length > 0){ // la imagen se ha cargado
      const mimeType = imagen.files[0].type;
      if(!(mimeType === 'image/jpeg' || mimeType === 'image/png')){
        alert('El tipo de archivo que intenta subir no está permitido');
       // obj.imagen = null;
        return;
      } else {

        /*
          id: '',
          descripcion: '',
          codigo_barra: '',
          precio_producto: '',
          precio_final: '',
          costo_unitario: '',
          unidad_medida: 'Unid',
          unidad_medida_comercial: '',
          tipo_servicio: '',
          codigo_servicio: '',
          tipo_impuesto: '',
          idcategoria: '',
          imagen: null
        */
       
        const form = new FormData();
        form.append('descripcion',obj.descripcion);
        form.append('codigo_barra',obj.codigo_barra);
        form.append('precio_producto',obj.precio_producto);
        form.append('precio_final',obj.precio_final);
        form.append('costo_unitario',obj.costo_unitario);
        form.append('unidad_medida',obj.unidad_medida);
        form.append('unidad_medida_comercial',obj.unidad_medida_comercial);
        form.append('tipo_servicio',obj.tipo_servicio);
        form.append('codigo_servicio',obj.codigo_servicio);
        form.append('idcategoria',obj.idcategoria);
        form.append('tipo_impuesto',obj.tipo_impuesto);
        form.append('imagen',imagen.files[0]);
        producto = form;
      }
    } else {
      producto = obj;
    }

    this.productoService.nuevoProducto(producto)
      .subscribe((response: any) =>  {

        Swal.fire('Nuevo Producto', response.message, 'success');
        (document.getElementById('formNuevoProducto')  as HTMLFormElement).reset();
        $('#ModalNuevoProducto').modal('hide');
        this.objProducto.unidad_medida = 'Unid';
        this.obtenerProductos();
      },
      err => console.error(err));
  }

  actualizarProducto(obj){

    let producto : any;
    const form = new FormData();
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
    obj.imagen = null;
    const imagen = (document.getElementById("imagenActualizar") as HTMLInputElement);
  
    if (imagen.value.length > 0){ // la imagen se ha cargado
      const mimeType = imagen.files[0].type;
      if(!(mimeType === 'image/jpeg' || mimeType === 'image/png')){
        alert('El tipo de archivo que intenta subir no está permitido');
       // obj.imagen = null;
        return;
      } else {

        /*
          id: '',
          descripcion: '',
          codigo_barra: '',
          precio_producto: '',
          precio_final: '',
          costo_unitario: '',
          unidad_medida: 'Unid',
          unidad_medida_comercial: '',
          tipo_servicio: '',
          codigo_servicio: '',
          tipo_impuesto: '',
          idcategoria: '',
          imagen: null
        */
       
        form.append("id",this.objProducto.id);
        form.append('descripcion',obj.descripcion);
        form.append('codigo_barra',obj.codigo_barra);
        form.append('precio_producto',obj.precio_producto);
        form.append('precio_final',obj.precio_final);
        form.append('costo_unitario',obj.costo_unitario);
        form.append('unidad_medida',obj.unidad_medida);
        form.append('unidad_medida_comercial',obj.unidad_medida_comercial);
        form.append('tipo_servicio',obj.tipo_servicio);
        form.append('codigo_servicio',obj.codigo_servicio);
        form.append('idcategoria',obj.idcategoria);
        form.append('tipo_impuesto',obj.tipo_impuesto);
        form.append('imagen',imagen.files[0]);
        form.append('codigocabys',obj.codigocabys);
        
      }
    } else {
        form.append("id",this.objProducto.id);
        form.append('descripcion',obj.descripcion);
        form.append('codigo_barra',obj.codigo_barra);
        form.append('precio_producto',obj.precio_producto);
        form.append('precio_final',obj.precio_final);
        form.append('costo_unitario',obj.costo_unitario);
        form.append('unidad_medida',obj.unidad_medida);
        form.append('unidad_medida_comercial',obj.unidad_medida_comercial);
        form.append('tipo_servicio',obj.tipo_servicio);
        form.append('codigo_servicio',obj.codigo_servicio);
        form.append('idcategoria',obj.idcategoria);
        form.append('tipo_impuesto',obj.tipo_impuesto);
        form.append('codigocabys',obj.codigocabys);
    }
    producto = form;
    this.productoService.actualizarProducto(producto)
      .subscribe((response: any) =>  {

        this.objProducto.id = '';
        Swal.fire('Actualizar Producto', response.message, 'success');
        (document.getElementById('formActualizarProducto')  as HTMLFormElement).reset();
        $('#ModalActualizarProducto').modal('hide');
        this.objProducto.unidad_medida = 'Unid';
        this.mostrarImagen = false;
        this.codigocabys = '';
        this.obtenerProductos();
      },
      err => {
        console.error(err);
        Swal.fire('Actualizar Producto', 'NO se pudo actualizar el producto', 'error');
        //(document.getElementById('form_producto')  as HTMLFormElement).reset();
      });
  }

  obtenerProductos() {
    this.productoService.obtenerProductos()
      .subscribe((response: any) => {
        this.listaProductos = response.productos;
        this.Productos = response.productos;
        let precio = '';
        for(const i in this.listaProductos){
          precio = this.listaProductos[i].precio_producto;
          this.listaProductos[i].precio_producto = Number(precio).toFixed(2);
          if(this.listaProductos[i].estado_producto == 1){
            this.listaProductos[i].estado_producto = 'SI';
          } else {
            this.listaProductos[i].estado_producto = 'NO';
          }
        }

        this.collection.data = this.listaProductos;
        this.collection.count = response.productos.length;
      },
      err =>{
        console.log(err)
      })
  }

  pageChanged(event){
    this.config.currentPage = event;
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

  actualizarEstado(producto){

    let descripcion = '', nuevoEstado= 0;

    if(producto.estado_producto == 'SI'){
      descripcion ='NO';
      nuevoEstado = 0;
    } else {
      descripcion ='SI';
      nuevoEstado = 1;
    }

    const obj = {
      idproducto: producto.idproducto,
      estado: nuevoEstado
    } 
    this.productoService.actualizarEstado(obj)
      .subscribe((response: any) => {
        console.log(response)
        producto.estado_producto = descripcion;
      },
      err => console.log(err));
  }

  obtenerProductoPorId(idproducto){
    this.productoService.obtenerProductoPorId(idproducto)
      .subscribe((response: any) => {
          console.log(response.producto)
          console.log(response);
          this.objProducto.id = response.producto.idproducto;
          this.objProducto.descripcion = response.producto.descripcion;
          this.objProducto.codigo_barra = response.producto.codigobarra_producto;
          this.objProducto.precio_producto = response.producto.precio_producto;
          this.objProducto.costo_unitario = response.producto.costo_unitario;
          this.objProducto.unidad_medida_comercial = response.producto.unidad_medida_comercial;
          this.objProducto.precio_final = response.producto.precio_final;
          this.objProducto.idcategoria = response.producto.idcategoria; 
          this.objProducto.tipo_impuesto = response.producto.tipo_impuesto;
          this.objProducto.unidad_medida = response.producto.unidad_medida;
          this.objProducto.codigocabys = response.producto.codigoCabys;
          this.objProducto.DescuArt = response.producto.DescuArt;
          this.objProducto.SinDescu = response.producto.SinDescu;
          
          if(response.producto.imagen != '' && response.producto.imagen != null){
            this.mostrarImagen = true;
            //const url = URL_SERVER + '/'+response.producto.imagen;
            const url = response.producto.imagen;
            this.url = url;
            /*const imagen = (document.getElementById("imagenProducto") as HTMLImageElement);
            imagen.src = url;*/
          }

          
      },
      err => {
        console.log(err);
      })
  }

  listarProductos(query){
    if(query === ''){
      this.collection.count = this.Productos.length;
      this.collection.data = this.Productos;
    }
  }
}
