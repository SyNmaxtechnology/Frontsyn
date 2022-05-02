
import { MovimientosService } from './../../services/pages/movimientos.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})

export class MovimientosComponent implements OnInit {

  constructor(
    private movimientoService: MovimientosService
  ) { }

  ngOnInit() {
    
    const btnAgregarLinea = (document.getElementById("agregarLinea") as HTMLButtonElement);
    const txtDescripcion = (document.getElementById("txtDescripcion") as HTMLInputElement);
    const btnGuardarMovimiento = (document.getElementById("btnGuardarMovimiento") as HTMLButtonElement);
    const fecha = (document.getElementById("date") as HTMLInputElement);
    const date = new Date();
    fecha.valueAsDate = new Date();
    fecha.readOnly = true;

    const btnAgregarLineaClick = fromEvent(btnAgregarLinea, 'click');
    const btnGuardarMovimientoClick = fromEvent(btnGuardarMovimiento, 'click');

    btnAgregarLineaClick.subscribe(() => {
      this.agregarLinea();
    })
    /*
    
      value =date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + 
    '-' + date.getDate().toString();
    fecha.readOnly = true;
    
    */
    btnGuardarMovimientoClick.subscribe(() => {

      const txtDescripcion = (document.getElementById("txtDescripcion") as HTMLInputElement);
      const cantidad = (document.getElementById("txtcantidad") as HTMLInputElement);
      const btnGuardarMovimiento = (document.getElementById("btnGuardarMovimiento") as HTMLButtonElement);
      const bodega = (document.getElementById("selectBodega") as HTMLSelectElement);
      const radio = (document.getElementsByName("age") as any);
      let opcionSeleccionada: any = null;
      for(let i =0; i < radio.length; i++){
        if(radio[i].checked){
          opcionSeleccionada = radio[i].value;
        }
      } 
  
      const obj = {
        tipomovimiento: opcionSeleccionada, 
        descripcionmovimiento: txtDescripcion.value, 
        costoajuste: Number(this.totalAjuste),
        ajustes: this.listaAjustes
      }

      this.movimientoService.nuevoMovimiento(obj)
        .subscribe(response => {
          const datosRespuesta = JSON.parse(response);
          console.log(response);
          this.limpiarCampos();
            Swal.fire('Nuevo Movimiento', JSON.parse(response).message, 'success');
        },
        err => {
          const {status, error} = err; // destructuring de una propiedad dentro de otra propiedad dentro de un objeto
          if(status === 400){
            this.limpiarCampos();
            Swal.fire('Nuevo Movimiento', JSON.parse(error).message, 'error');
          }
        })
    })

    this.movimientoService.obtenerBodegas()
      .subscribe(response => {
        const datosBodegas = JSON.parse(response);
        this.listaBodegas = datosBodegas.bodegas;
      })
  }

  listaBodegas = [];
  listaArticulos = [];
  listaAjustes = [];
  totalAjuste : number = 0;
  descripcionArticulo : string = '';
  mostrar: boolean = false;
  bodegaDestino: boolean = false;

  obtenerArticulos (query){
    
    if(query === ''){
      return;
    } else {
      console.log("Escribe");
      this.movimientoService.obtenerArticulos({
        descripcion: query
      }).subscribe(response => {
        const datosArticulos = JSON.parse(response);
        console.log(datosArticulos)
        this.listaArticulos = datosArticulos.articulos;
        console.log(this.listaArticulos)
      })
    }
  }


  agregarLinea () {
  
    const radio = (document.getElementsByName("age") as any);
    let opcionSeleccionada: any = null, bodegaSeleccionada : any = null,bodegaDestinoseleccionada : any = null;
    const cantidad = (document.getElementById("txtcantidad") as HTMLInputElement).value;
    const bodega = (document.getElementById("selectBodega") as HTMLSelectElement);
    const bodegaDestinoValue = (document.getElementById("selectBodegaDestino") as HTMLSelectElement);
    let linea = {
      codigo: '',
      costoarticulo: 0,
      cantidad : 0,
      tipo: '',
      descripcion: '',
      costolinea : '',
      bodega: '',
      bodegadestino: '',
      idbodega: 0,
      idbodorigen: 0,
      idboddestino: 0,
      idarticulo: 0,
      codigoTipo: '',
      indice: 0
    }

    console.log(this.listaArticulos);

    if(this.listaArticulos.length >= 2 || this.listaArticulos.length === 0){
      return alert("Debe seleccionar un artículo");
    }

    for(let i =0; i < radio.length; i++){
      if(radio[i].checked){
        opcionSeleccionada = radio[i];
      }
    } 

    if(opcionSeleccionada === null){
      return alert("Debe seleccionar un tipo de movimiento");
    } else {

      if(cantidad === ''){
        return alert("La cantidad debe ser al menos 1");
      }

      for(let i = 0; i < bodega.options.length; i++){

        if(bodega.options[i].selected && bodega.options[i].value !== '' ){
          console.log("seleccionado")
          console.log(bodega.options[i].value)
          bodegaSeleccionada = bodega.options[i];
        }
      }

      if(bodegaSeleccionada === null){
        return alert("Debe seleccionar una bodega");
      }

      let descripcionTipoMovimiento = '';

      switch(opcionSeleccionada.value){

        case '01':
          descripcionTipoMovimiento = 'Entrada';
          break;

        case '02':
          descripcionTipoMovimiento = 'Salida';
          break;

        case '03':
          descripcionTipoMovimiento = 'Traslado';
          break;
      }

      
      if(this.bodegaDestino == true){

        for(let i = 0; i < bodegaDestinoValue.options.length; i++){

          if(bodegaDestinoValue.options[i].selected && bodegaDestinoValue.options[i].value !== '' ){
            console.log("seleccionado")
            console.log(bodegaDestinoValue.options[i].value)
            bodegaDestinoseleccionada = bodegaDestinoValue.options[i];
          }
        }
  
        if(bodegaDestinoseleccionada === null){
          return alert("Debe seleccionar una bodega de destino");
        } else {
          linea.idbodorigen = bodegaSeleccionada.value;
          linea.idboddestino = bodegaDestinoseleccionada.value;
          linea.bodegadestino = bodegaDestinoseleccionada.text;
        }
      }

      linea.codigoTipo = opcionSeleccionada.value;
      linea.tipo = descripcionTipoMovimiento;
      linea.cantidad = Number(cantidad);
      linea.costolinea = (Number(this.listaArticulos[0].precio_articulo) *  Number(cantidad)).toFixed(2);
      linea.bodega = bodegaSeleccionada.text;
      linea.idbodega = bodegaSeleccionada.value;
      linea.idarticulo = this.listaArticulos[0].idarticulo;
      linea.codigo = this.listaArticulos[0].codigo;
      linea.costoarticulo = this.listaArticulos[0].precio_articulo;
      linea.descripcion =  this.listaArticulos[0].descripcion;
      linea.indice = this.listaAjustes.length + 1;
            
      this.listaAjustes.push(linea);
      let total = 0;
      for(const ajuste of this.listaAjustes){
        total += Number(ajuste.costolinea);
        this.totalAjuste = total;
      }
    }
  }

  quitarAjuste(ajuste){

    let total = 0;

    this.listaAjustes = this.listaAjustes.filter(elemento => {
      return ajuste.indice !== elemento.indice
    })

    if(this.listaAjustes.length === 0){
      this.totalAjuste = 0;
    } else {
      this.listaAjustes.forEach(elemento => {
        total += Number(elemento.costolinea);
        this.totalAjuste = total;  
      })  
    }   
  }


  limpiarCampos(){
    const txtDescripcion = (document.getElementById("txtDescripcion") as HTMLInputElement);
    const cantidad = (document.getElementById("txtcantidad") as HTMLInputElement);
    const bodega = (document.getElementById("selectBodega") as HTMLSelectElement);
    const bodegaDestinoValue = (document.getElementById("selectBodegaDestino") as HTMLSelectElement);
    const txtArticulo = document.getElementById("txtArticulo") as HTMLInputElement;
    console.log(txtArticulo);
    this.listaAjustes = [];
    this.totalAjuste = 0;
    txtDescripcion.value = '';
    cantidad.value='';
    bodega.selectedIndex = null;
    txtArticulo.value = '';
    if(bodegaDestinoValue){
      bodegaDestinoValue.selectedIndex = null;
      this.bodegaDestino = false;
    }
  }
}
