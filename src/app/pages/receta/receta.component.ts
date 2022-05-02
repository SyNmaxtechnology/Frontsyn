import  Swal  from 'sweetalert2';
import { RecetaService } from './../../services/pages/receta.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent, from } from 'rxjs';

declare var $: any;
export interface Receta {
  idarticulo: number;
  idproducto: number;
  costo: number;
  cantidad: number;
}

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  constructor(
    private recetaService: RecetaService
  ) { }

  query : string = '';
  descripcionArticulo: string = '';
  idproducto : number;
  Recetas: Receta[] = [];
  totalCosto: number = 0;
  listaLineasReceta = [];
  listaArticulos = [];
  articuloSeleccionado : object;
  actualizarReceta : boolean = false;

  ngOnInit() {
    
    const btnGuardarReceta = (document.getElementById("btnGuardarReceta") as HTMLButtonElement);
    const btnAgregarLinea = (document.getElementById("btnAgregarLinea") as HTMLButtonElement);
    const btnBuscarProducto = (document.getElementById("btnBuscarProducto") as HTMLButtonElement);
    const txtCantidadArticulo = (document.getElementById("txtCantidadArticulo") as HTMLInputElement);
    const txtPrecioArticulo = (document.getElementById("txtPrecioArticulo") as HTMLInputElement);

    const btnGuardarRecetaClick = fromEvent(btnGuardarReceta,'click');
    const btnAgregarLineaClick = fromEvent(btnAgregarLinea,'click');
    const txtPrecioArticuloKeyUp = fromEvent(txtPrecioArticulo,'keyup');
    const txtCantidadArticuloKeyUp = fromEvent(txtCantidadArticulo,'keyup');
    const btnBuscarProductoClick = fromEvent(btnBuscarProducto, 'click');
    

    btnGuardarRecetaClick.subscribe((e: Event) => {
      
      let obj = {
        idarticulo: 0,
        idproducto: 0,
        costo: 0,
        cantidad: 0
      };


      if(this.listaLineasReceta.length === 0){
        return;
      }

      /*
      for(let elemento in this.listaLineasReceta){

        obj.cantidad = this.listaLineasReceta[elemento].cantidad;
        obj.idproducto = this.listaLineasReceta[elemento].idproducto;
        obj.idarticulo = this.listaLineasReceta[elemento].idarticulo;
        obj.costo = this.listaLineasReceta[elemento].costo;
        console.log(obj);
       
        
      } */
      console.log(this.actualizarReceta);
      if(this.actualizarReceta == false){
        this.guardarReceta(this.listaLineasReceta);
      } else {
        this.modificarReceta(this.listaLineasReceta)
      }      
    })

    btnAgregarLineaClick.subscribe((e: Event) => {
      this.cargarLineaReceta();
    })

    txtPrecioArticuloKeyUp.subscribe((e: Event) => {
      this.obtenerCosto(txtCantidadArticulo.value,txtPrecioArticulo.value);
    })

    txtCantidadArticuloKeyUp.subscribe((e: Event) => {
      this.obtenerCosto(txtCantidadArticulo.value,txtPrecioArticulo.value);
    })

    btnBuscarProductoClick.subscribe((e: Event) => {
      e.preventDefault();
      const query = this.query;
      this.recetaService.obtenerProductos({query})
        .subscribe(response => {
         
          const datosProductos = JSON.parse(response);
          const {producto, receta} = datosProductos.receta;

          if(typeof producto[0] === 'undefined'){
          Swal.fire('Búsqueda','No hay resultados', 'error');

          } else {
            $("#ModalBuscarProducto").modal('hide');

            if(receta.length > 0){
              this.actualizarReceta = true;
            } else {
              this.actualizarReceta = false;
            }
            this.idproducto = producto[0].idproducto;
            (document.getElementById("txtCodigoPorducto") as HTMLInputElement).value= producto[0].codigobarra_producto;
            (document.getElementById("txtDescripcionProducto") as HTMLInputElement).value= producto[0].nombre;

            console.log(receta);

            //this.listaLineasReceta = receta;
            let i = 0;
            let obj = {
              idproducto: '', 
              idarticulo: '',
              costo: '',
              cantidad: '',
              indice: 0,
              descripcion: '',
              codigo: ''
            }
            this.totalCosto = 0;
            for(let linea of receta){
              this.totalCosto += Number(linea.costo);
              linea.indice = i;
              i+=1;
            }

            this.listaLineasReceta = receta;

            console.log(this.listaLineasReceta)
          }
          
        },
        err => {
          const { status, error } = err;
          console.log(error);
            const msgErr = JSON.parse(error);
            Swal.fire('Búsqueda', msgErr.message,'error')
          
        })
    })
  }

  obtenerCosto(cantidad: string, precio: string){
    
    let costo = (document.getElementById("txtCosto") as HTMLInputElement);
    
    if((cantidad === '' || Number(cantidad) === 0) || (precio === '' || Number(precio) === 0)){
      
      costo.value = '';
      return ; 
    }  else  {
        costo.value = (Number(cantidad) * Number(precio)).toFixed(2);
      }
    }
  

  obtenerArticulos(texto: string){
    if(texto === ''){
      return ;
    }
    this.recetaService.obtenerArticulos({texto})
      .subscribe(response => {

        const datosArticulos = JSON.parse(response);
        this.listaArticulos = datosArticulos.articulos;
        
        if(this.listaArticulos.length === 0 || this.listaArticulos.length > 1){
          return;
        } else {
          (document.getElementById("txtPrecioArticulo") as HTMLInputElement).value = this.listaArticulos[0].precio_articulo;
          (document.getElementById("txtCodigorticulo") as HTMLInputElement).value = this.listaArticulos[0].codigobarra_producto;
          this.totalCosto = 0;
        }

      },
      err => {
        console.log(err);
      })
  }

  cargarLineaReceta(){

    let lineaReceta = {
      idarticulo: '', 
      idproducto: '', 
      costo: '', 
      cantidad: '',
      codigo: '',
      descripcion : '',
      indice: 0
    }

    if(this.listaArticulos.length === 0  || this.listaArticulos.length > 1){
      return;
    } else {
      
      const costo = (document.getElementById("txtCosto") as HTMLInputElement);
      const cantidad = (document.getElementById("txtCantidadArticulo") as HTMLInputElement);
      const descripcion = (document.getElementById("txtDescripcionrticulo") as HTMLInputElement);
      const codigo = (document.getElementById("txtCodigorticulo") as HTMLInputElement);
      const precio = (document.getElementById("txtPrecioArticulo") as HTMLInputElement);
      lineaReceta.idarticulo = this.listaArticulos[0].idarticulo;
      lineaReceta.codigo = this.listaArticulos[0].codigobarra_producto;
      lineaReceta.cantidad = cantidad.value;
      lineaReceta.idproducto = this.idproducto.toString();
      lineaReceta.costo = costo.value;
      lineaReceta.descripcion= this.listaArticulos[0].nombre;
      lineaReceta.indice = this.listaLineasReceta.length;
      this.totalCosto = 0;
      this.listaLineasReceta.push(lineaReceta);
      this.listaArticulos = [];
      this.listaLineasReceta.forEach(elemento => {
        this.totalCosto += Number(elemento.costo);
      })
      costo.value = '';
      cantidad.value = '';
      descripcion.value = '';
      codigo.value = '';
      precio.value = '';
    }
  }
  quitarLineaReceta(linea){

    this.totalCosto = 0;
    this.listaLineasReceta = this.listaLineasReceta.filter(elemento => elemento.indice !== linea.indice);
    this.listaLineasReceta.forEach(elemento => this.totalCosto += Number(elemento.costo));
    this.Recetas = [];
  }

  guardarReceta(obj){
    this.recetaService.guardarReceta(obj)
      .subscribe(response => {

        const datosNuevaReceta = JSON.parse(response);
        Swal.fire('Nueva Receta', datosNuevaReceta.message,'success');
        this.Recetas = [];
        this.listaLineasReceta = [];
        this.totalCosto = 0;
        
    },
    
    err => Swal.fire('Nueva Receta','No se pudo insertar la receta','error'));
  }


  modificarReceta(obj){
    this.recetaService.actualizarReceta(obj)
      .subscribe(response => {

        const datosNuevaReceta = JSON.parse(response);
        Swal.fire('Actualizar Receta', datosNuevaReceta.message,'success');
        this.Recetas = [];
        this.listaLineasReceta = [];
        this.totalCosto = 0;
        
    },
    
    err => {
      console.log(err);
      Swal.fire('Actualizar Receta','No se pudo insertar la receta','error')
    });
  }
}
