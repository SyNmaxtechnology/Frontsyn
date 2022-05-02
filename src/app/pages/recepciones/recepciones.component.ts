import Swal from 'sweetalert2';
import { RecepcionesService } from './../../services/pages/recepciones.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-recepciones',
  templateUrl: './recepciones.component.html',
  styleUrls: ['./recepciones.component.css']
})
export class RecepcionesComponent implements OnInit {

  constructor(
    private recepcionesServices:RecepcionesService
  ) { }

  ngOnInit() {

    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.collection.count
    };

   /* window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }
    })*/
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => { // evento resize angular
      if (screen.width < 638) 
      {
       this.tablaPequena = true;
      }
      else {
        this.tablaPequena = false;
      }
    })
    
    this.cargarFacturas();
    this.recepcionesServices.estadoAceptacion().subscribe(response => {
      const estado = JSON.parse(response);
      this.estadoAceptacion = estado.estadoAceptacion;
      this.ngSelect = this.estadoAceptacion[0];
      console.log(this.ngSelect);
    },err => {
      Swal.fire('Estado Aceptación', 'Error al carga los datos de aceptación','error');
    })

    this.recepcionesServices.condicionImpuesto().subscribe(response => {
      const condicion = JSON.parse(response);
      this.condicionImpuesto = condicion.condicionImpuesto;
    },err => {
      Swal.fire('Condición Impuesto', 'Error al cargar los datos de condición impuesto','error');
    })

    const btnProcesar = (document.getElementById("btnProcesar") as HTMLButtonElement);
    const btnProcesarClick = fromEvent(btnProcesar,'click');

    btnProcesarClick.subscribe((e: Event) => {
      e.preventDefault();

      this.procesarFacturas();
    })
  }
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription
  config: any;
  collection = { count: 0, data: [] };
  listaFacturasProcesar = [];
  listaFacturas = [];
  listaProveedores = [];

  condicionImpuesto = [];
  estadoAceptacion = [];
  ngSelect = [];
  tablaPequena : boolean = false;
  mostrar : boolean = false;
  bloqueoProcesar: boolean = false;
  proveedorSeleccionado: string = '';
  fechaSeleccionada: string = '';
  objFacturaResultado = {
    id: '',
    nombre: '',
    clave: '',
    consecutivo: '',
    descuentoTotal: 0,
    porcentajeDescuentoTotal: 0,
    subtotal: 0,
    medioPago: '',
    condicionVenta: '',
    totalservgravados: 0,
    totalservexentos: 0,
    totalservexonerado: 0,
    totalmercanciasgravadas: 0,
    totalmercanciasexentas: 0,
    totalmercanciaexonerada: 0,
    totalgravado: 0,
    totalexento: 0,
    totalexonerado: 0,
    totalventa: 0,
    totaldescuentos: 0,
    totalventaneta: 0,
    totalimpuesto: 0,
    totalcomprobante: 0,
    codigomoneda: '',
    tipocambio: '',
    fechaFactura: '',
    tipoFactura: '',
    totalotroscargos: 0
  };

  arrayOrdenes =[];

  // {id,estadoAceptacion, condicionImpuesto}

  agregarFactura(factura){

    if(factura.marcado){
      factura.estadoDoc='1';
      factura.condicionDoc='1';
      console.log("factura.estadoDoc", factura.estadoDoc);
      console.log("factura.condicionDoc",factura.condicionDoc);
      if(factura.estadoDoc.length === 0 || factura.condicionDoc.length === 0 ){
        factura.marcado = false;
        alert("Los campo de condición impuesto y estado aceptación son requeridos")
      } else {
        this.listaFacturasProcesar.push(factura);
      }
    } else {
      this.listaFacturasProcesar = this.listaFacturasProcesar.filter(el => el.id !== factura.id);
    }

    console.log("facturas ", this.listaFacturasProcesar);
  }

  procesarFacturas(){
    
    if(this.listaFacturasProcesar.length === 0){
      alert("Debe marcar al menos un comprobante")
    } else {
      this.mostrar = true;
      this.bloqueoProcesar = true;
      this.recepcionesServices.procesarFacturas(this.listaFacturasProcesar)
        .subscribe(response => {
          this.bloqueoProcesar = false;
          this.mostrar = false;
          const datosRespuesta = JSON.parse(response);  
          //this.cargarFacturas();
          this.listaFacturasProcesar = [];
          Swal.fire('Procesar facturas', datosRespuesta.message,'success');
          const host = window.location.origin;
          const url = host +'/#/recepciones';
          window.location.href = url;
          window.location.reload();
      },
      err => {
        this.bloqueoProcesar = false;
        //this.cargarFacturas();
        this.listaFacturasProcesar = [];
        this.mostrar = false;
        const {status,error}= err;
        const messageError = JSON.parse(error);
        Swal.fire('Procesar facturas', messageError.message,'error');
      })
    }
  }

  cargarFacturas () {
    this.recepcionesServices.cargarFacturasProveedor().subscribe(response => {
      const dataFacturas = JSON.parse(response);
      this.collection.data = [];
      for(let factura of dataFacturas.facturas){
        this.collection.data.push({
          id: factura.id,
          proveedor: factura.proveedor,
          tipo: factura.tipoDoc,
          total: Number(factura.totalcomprobante).toFixed(2),
          fecha: factura.fecha.substr(0,10),
          clavenumerica: factura.clavenumerica,
          marcado: false,
          estadoDoc: '',
          condicionDoc: ''
        })
        
        this.collection.count = this.collection.data.length;
        this.listaFacturas = this.collection.data;
        const data  = new Set(this.collection.data.map(item => item.proveedor)).values();
        this.listaProveedores = [...data];
      }
    },err => {
      Swal.fire('Cargar Facturas', 'Error al cargar los comprobantes','error');
    })
  }

  visualizarFactura(id: number) {

    this.recepcionesServices.visualizarRecepcion(id)
      .subscribe(response => {
        const {
          factura:{
            tipo,
            encabezado,
            lineas,
            resumen,
            id
          }
        } = JSON.parse(response);
        console.log(encabezado);
        console.log(resumen);
        console.log(lineas);
        this.objFacturaResultado.id= id;
        this.objFacturaResultado.nombre=!encabezado.emisor.nombrecomercial || encabezado.emisor.nombrecomercial == ''? encabezado.emisor.nombre: encabezado.emisor.nombrecomercial;
        this.objFacturaResultado.clave=encabezado.clavenumerica;
        this.objFacturaResultado.consecutivo=encabezado.consecutivo;
        this.objFacturaResultado.descuentoTotal=resumen.monto_descuento_total;
        this.objFacturaResultado.porcentajeDescuentoTotal=resumen.porcentaje_descuento_total;
        this.objFacturaResultado.subtotal=resumen.subtotal;
        this.objFacturaResultado.medioPago=encabezado.medioPago;
        this.objFacturaResultado.condicionVenta=encabezado.condicionVenta;
        this.objFacturaResultado.totalservgravados=resumen.totalservgravados;
        this.objFacturaResultado.totalservexentos=resumen.totalservexentos;
        this.objFacturaResultado.totalservexonerado=resumen.totalservexonerado;
        this.objFacturaResultado.totalmercanciasgravadas=resumen.totalmercanciasgravadas;
        this.objFacturaResultado.totalmercanciasexentas=resumen.totalmercanciasexentas;
        this.objFacturaResultado.totalmercanciaexonerada=resumen.totalmercanciaexonerada;
        this.objFacturaResultado.totalgravado=resumen.totalgravado;
        this.objFacturaResultado.totalexento=resumen.totalexento;
        this.objFacturaResultado.totalexonerado=resumen.totalexonerado;
        this.objFacturaResultado.totalventa=resumen.totalventa;
        this.objFacturaResultado.totaldescuentos=resumen.totaldescuentos;
        this.objFacturaResultado.totalventaneta=resumen.totalventaneta;
        this.objFacturaResultado.totalimpuesto=resumen.totalimpuesto;
        this.objFacturaResultado.totalcomprobante=resumen.totalcomprobante;
        this.objFacturaResultado.codigomoneda=resumen.codigomoneda;
        this.objFacturaResultado.tipocambio=resumen.tipocambio;
        this.objFacturaResultado.fechaFactura=encabezado.fecha.substr(0,10);
        this.objFacturaResultado.tipoFactura=tipo;
        this.objFacturaResultado.totalotroscargos=resumen.TotalOtrosCargos;
        this.arrayOrdenes = lineas;

      },err => {
        console.log(err);
        Swal.fire('Cargar Facturas', 'Error al cargar los comprobantes','error');
      })
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  aplicarFiltroProveedor(proveedorSeleccionado: string) {
  
    if(proveedorSeleccionado === '' ){
      this.listaFacturasProcesar = [];
      this.collection.data = this.listaFacturas;
      this.collection.count = this.collection.data.length;
    } else {
      this.listaFacturasProcesar = [];
      this.collection.data = this.listaFacturas.filter(factura => factura.proveedor === proveedorSeleccionado);
      this.collection.count = this.collection.data.length;
    }
  }

  aplicarFiltroFecha(fecha: string) {
    if(fecha === '') {
      this.listaFacturasProcesar = [];
      this.collection.data = this.listaFacturas;
      this.collection.count = this.collection.data.length;
    } else {
      this.listaFacturasProcesar = [];
      this.collection.data = this.listaFacturas.filter(factura => factura.fecha === fecha);
      this.collection.count = this.collection.data.length;
    }
  }

}
