import Swal  from 'sweetalert2';
import { FacturaCompraService } from './../../services/pages/factura-compra.service';
import { ArticuloService } from './../../services/pages/articulo.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { isNumber } from 'util';
declare var $:any;
@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  constructor(
    private articuloService: ArticuloService,
    private facturaCompraService: FacturaCompraService
  ) { 
      this.obtenerArticulos();
      this.unidadesMedida();
      this.obtenerImpuestos();
      this.obtebnerCategorias();
  }

  listaArticulos = [];
  query: ''
  config: any;
  collection = { count: 0, data: [] };
  listaImpuestos = [];
  listaCategorias = [];
  lisaUnidadesMedida =[];
  listaErrores: string[] = [];
  objArticulo = {
    tipo_impuesto: '',
    idcategoria: '',
    descripcion: '',
    codigobarra_producto: '',
    precio_articulo: '',
    precio_final: '',
    costo_unitario: '',
    unidad_medida: 'Unid',
    unidad_medida_comercial: '',
    tipo_servicio: '',
    codigo_servicio: '',
    codigocabys: '',
    id: 0
  }

  tablaPequena = false;
  disable: boolean = false;
  ngOnInit() {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
    })
    //buscarArticulo

    const btnBuscarArticulo = (document.getElementById("btnBuscarArticulo") as HTMLButtonElement);
    const txtPrecioArticulo = (document.getElementById("precio_articulo") as HTMLInputElement);
    const txtPrecioArticuloActualizar = (document.getElementById("precio_articuloActualizar") as HTMLInputElement);
    const btnGuardarArticulo = (document.getElementById("guardarArticulo") as HTMLButtonElement);
    const btnActualizarArticulo = (document.getElementById("actualizarArticulo") as HTMLButtonElement);
    const btnBuscarArticuloClick = fromEvent(btnBuscarArticulo, 'click');
    const txtPrecioArticuloChange = fromEvent(txtPrecioArticulo, 'keyup');
    const txtPrecioArticuloActualizarChange = fromEvent(txtPrecioArticuloActualizar, 'keyup');
    const btnGuardarArticuloClick = fromEvent(btnGuardarArticulo,'click');
    const btnActualizarArticuloClick = fromEvent(btnActualizarArticulo,'click');  
    btnBuscarArticuloClick.subscribe((response : Event) => {
      if(this.query === ''){
        return ;
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
        const query = this.query;
        this.articuloService.buscarArticulo(query)
          .subscribe(response => {
            const datosArticulos = JSON.parse(response);
            this.listaArticulos = datosArticulos.articulo;
            let precio : string;
            for(const i in this.listaArticulos){
              precio = Number(this.listaArticulos[i].precio_articulo).toFixed(2);
              if(this.listaArticulos[i].estado_articulo == 1){
                this.listaArticulos[i].estado_articulo ='SI';
              } else {
                this.listaArticulos[i].estado_articulo = 'NO';
              } 

              this.listaArticulos[i].precio_articulo = precio;
            }

            this.collection.count = this.listaArticulos.length;
            this.collection.data =  this.listaArticulos;
          },
          err => {
            console.log(err)
          })
      }
    })

    txtPrecioArticuloChange.subscribe((response: Event) => {
      this.objArticulo.precio_final = this.objArticulo.precio_articulo;
    })

    txtPrecioArticuloActualizarChange.subscribe((response: Event) => {
      this.objArticulo.precio_final = this.objArticulo.precio_articulo;
    })

    btnGuardarArticuloClick.subscribe((response : Event ) => {
      const Articulo = this.objArticulo;

      this.nuevoArticulo(Articulo);
    })

    btnActualizarArticuloClick.subscribe((response: Event) => {
      const Articulo = this.objArticulo;

      this.actualizarArticulo(Articulo);
    })
  }

  obtenerArticulos(){
    this.articuloService.obtenerArticulos()
      .subscribe(response =>  {
        const datosArticulos = JSON.parse(response);
        this.listaArticulos = datosArticulos.articulos;
        let precio : string;
        for(const i in this.listaArticulos){
          precio = Number(this.listaArticulos[i].precio_articulo).toFixed(2);
          if(this.listaArticulos[i].estado_articulo == 1){
            this.listaArticulos[i].estado_articulo ='SI';
          } else {
            this.listaArticulos[i].estado_articulo = 'NO';
          } 

          this.listaArticulos[i].precio_articulo = precio;
        }

        this.collection.count = this.listaArticulos.length;
        this.collection.data =  this.listaArticulos;

      })
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  actualizarEstado(articulo){

    let nuevoEstado : number, descripcion: string;

    if(articulo.estado_articulo == 'SI'){
      nuevoEstado = 0;
      descripcion = 'NO';
    } else {
      nuevoEstado = 1;
      descripcion = 'SI';
    }

    this.articuloService.actualizarEstado({
        id: articulo.idarticulo, 
        estado :nuevoEstado   
      }).subscribe(response => {
        const datos = JSON.parse(response);
        articulo.estado_articulo = descripcion;

      }, err => {
        console.log(err);
      })
  }

  nuevoArticulo(obj) {

    if(this.validarCampos() === false){
      let codigoServicio: String = '', tipoServicio: String ='';
      if(this.facturaCompraService.UnidadesMedidaServicios().includes(this.objArticulo.unidad_medida)){ // si es un servicio
        codigoServicio = 'Servicio';
        tipoServicio = '01';
      } else { // si es una mercancia
        codigoServicio = 'Mercancía';
        tipoServicio = '02';
      }

      obj.codigo_servicio = codigoServicio;
      obj.tipo_servicio = tipoServicio;

      this.articuloService.nuevoArticulo(obj)
        .subscribe(response => {
          const datosNuevoArticulo = JSON.parse(response);
          $('#ModalNuevoArticulo').modal('hide');
          obj.idcategoria= '';
          obj.descripcion= '';
          obj.codigobarra_producto= '';
          obj.precio_articulo= '';
          obj.precio_final= '';
          obj.costo_unitario= '';
          obj.unidad_medida= 'Unid';
          obj.unidad_medida_comercial= '';
          obj.tipo_servicio= '';
          obj.codigo_servicio= '';
          obj.tipo_impuesto = '';
          obj.codigocabys = '';

          this.obtenerArticulos();
          Swal.fire('Nuevo Artículo', datosNuevoArticulo.message,'success');
          
        },
        err => {
          const {message} = JSON.parse(err);
          Swal.fire('Nuevo Artículo', message?message: 'Hubo un error al agregar el artículo','error');
        })
      }
  }


  actualizarArticulo(obj) {
    
    if(this.validarCampos() === false){
      let codigoServicio: String = '', tipoServicio: String ='';
      if(this.facturaCompraService.UnidadesMedidaServicios().includes(this.objArticulo.unidad_medida)){ // si es un servicio
        codigoServicio = 'Servicio';
        tipoServicio = '01';
      } else { // si es una mercancia
        codigoServicio = 'Mercancía';
        tipoServicio = '02';
      }

      obj.codigo_servicio = codigoServicio;
      obj.tipo_servicio = tipoServicio;

      this.articuloService.actualizarArticulo(obj)
        .subscribe(response => {
          const datosNuevoArticulo = JSON.parse(response);
          
          
          $('#ModalActualizarArticulo').modal('hide');
          obj.idcategoria= '';
          obj.descripcion= '';
          obj.codigobarra_producto= '';
          obj.precio_articulo= '';
          obj.precio_final= '';
          obj.costo_unitario= '';
          obj.unidad_medida= 'Unid';
          obj.unidad_medida_comercial= '';
          obj.tipo_servicio= '';
          obj.codigo_servicio= '';
          obj.tipo_impuesto = '';
          obj.codigocabys = '';
          this.obtenerArticulos();
          Swal.fire('Actualizar Artículo', datosNuevoArticulo.message,'success');
        },
        err => {
          const {message} = JSON.parse(err);
          Swal.fire('Actualizar Artículo', message?message: 'Hubo un error al actualizar el artículo','error');

        })
    }
  }

  buscarArticuloPorId(id: number){
    this.articuloService.buscarArticuloPorId(id)
      .subscribe(response => {
        const datosArticulo = JSON.parse(response);
        this.objArticulo.tipo_impuesto= datosArticulo.articulo[0].tipo_impuesto,
        this.objArticulo.idcategoria= datosArticulo.articulo[0].idcategoria,
        this.objArticulo.descripcion= datosArticulo.articulo[0].descripcion,
        this.objArticulo.codigobarra_producto= datosArticulo.articulo[0].codigobarra_producto,
        this.objArticulo.precio_articulo= datosArticulo.articulo[0].precio_articulo,
        this.objArticulo.precio_final=  datosArticulo.articulo[0].precio_final,
        this.objArticulo.costo_unitario= datosArticulo.articulo[0].costo_unitario,
        this.objArticulo.unidad_medida= datosArticulo.articulo[0].unidad_medida,
        this.objArticulo.unidad_medida_comercial= datosArticulo.articulo[0].unidad_medida_comercial,
        this.objArticulo.tipo_servicio= datosArticulo.articulo[0].tipo_servicio,
        this.objArticulo.codigo_servicio= datosArticulo.articulo[0].codigo_servicio,
        this.objArticulo.codigocabys= datosArticulo.articulo[0].codigoCabys,
        this.objArticulo.id= datosArticulo.articulo[0].idarticulo;
        console.log(this.objArticulo);
      })
  }
  unidadesMedida(){
    this.facturaCompraService.unidadesMedida()
      .subscribe(response => {
        const datosUnidadesMedida = JSON.parse(response);
        this.lisaUnidadesMedida = datosUnidadesMedida.unidades;
       
      },
      err => console.error(err));
  }

  obtenerImpuestos(){
    this.facturaCompraService.obtenerImpuestos()
      .subscribe(response => {
        const datosImpuestos = JSON.parse(response);
        this.listaImpuestos = datosImpuestos.impuestos;
      },
      err => console.error(err))
  }

  obtebnerCategorias(){
    this.facturaCompraService.obtenerCategorias()
      .subscribe(response => {
        const datosCategorias = JSON.parse(response);
        this.listaCategorias = datosCategorias.categorias;
      },
      err => console.error(err))
  }

  limpiarValores(){
        this.objArticulo.idcategoria= '';
        this.objArticulo.descripcion= '';
        this.objArticulo.codigobarra_producto= '';
        this.objArticulo.precio_articulo= '';
        this.objArticulo.precio_final= '';
        this.objArticulo.costo_unitario= '';
        this.objArticulo.unidad_medida= 'Unid';
        this.objArticulo.unidad_medida_comercial= '';
        this.objArticulo.tipo_servicio= '';
        this.objArticulo.codigo_servicio= '';
        this.objArticulo.tipo_impuesto = '';
        this.objArticulo.codigocabys = '';
  }

  validarCampos(){

    this.listaErrores = [];
    const expresion = /^-{0,1}\d*\.{0,1}\d+$/;
    const patron=new RegExp('^[0-9]{13}$');
    let disable = false;

    if(this.objArticulo.descripcion === ''){
      this.listaErrores.push('La descripción del artículo es requerida');
    }

    if(this.objArticulo.codigobarra_producto === ''){

    }

    if(!expresion.test(this.objArticulo.precio_articulo)){
      this.listaErrores.push('El precio del artículo no es válido');
    }

    if(!expresion.test(this.objArticulo.precio_final)){
      this.listaErrores.push('El precio final del artículo no es válido');
    }

    if(this.objArticulo.unidad_medida === ''){
      this.listaErrores.push('La unidad de medida es requerida');
    }

    if(this.objArticulo.idcategoria.length === 0 || Number(this.objArticulo.idcategoria) === 1 ){
      this.listaErrores.push('La categoría es requerida');
    }

    if(this.objArticulo.tipo_impuesto === '') {
      this.listaErrores.push('El impuesto es necesario');
    }
    if(this.objArticulo.costo_unitario.toString() === ''){
      this.objArticulo.costo_unitario = '1';
    }
    
    if(this.objArticulo.codigocabys && this.objArticulo.codigocabys !== ''){
      if(!patron.test(this.objArticulo.codigocabys)){
        this.listaErrores.push('El código cabys es inválido');
      }
    }

    if(this.listaErrores.length > 0){
      disable= true;
    } else {
      disable= false;
    }

    return disable;
  }
}
