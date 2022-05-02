import { ProveedorService } from './../../services/pages/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent, from } from 'rxjs';
import { FacturaCompraService } from './../../services/pages/factura-compra.service';
import * as xmlConverter from 'xml-js';
import Swal  from 'sweetalert2';
import { ActivatedRoute, Params,Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-factura-compra',
  templateUrl: './factura-compra.component.html',
  styleUrls: ['./factura-compra.component.css']
})


export class FacturaCompraComponent implements OnInit {

  constructor(private facturaCompraService: FacturaCompraService,
        private proveedorService: ProveedorService,
        private router: ActivatedRoute,
        private route: Router
    ) {
      
    this.cargarArticulos();
    this.mediosPago();
    this.condicionesVenta();
    this.obtenerMonedas();
    this.mostrarFechaHora();
    this.obtenerTipoCambio();
    this.obtenerProvincias();
    this.tipoCedulas();
    this.unidadesMedida();
    this.obtenerImpuestos();
    this.obtebnerCategorias();
    this.obtenerDescuentos();
  }

  public ngOnInit(): void {

    let fecha = new Date(); //Fecha actual
    let mes = String(fecha.getMonth()+1); //obteniendo mes
    let dia = String(fecha.getDate()); //obteniendo dia
    let ano = String(fecha.getFullYear()); //obteniendo año
    
    if(Number(dia)<10) dia='0'+dia; //agrega cero si el menor de 10
    if(Number(mes)<10) mes='0'+mes; //agrega cero si el menor de 10
    
    this.objFactura.fecha = ano+"-"+mes+"-"+dia;

    this.facturaCompraService.cargarProveedores()
      .subscribe( response => {
        this.listaProveedores = JSON.parse(response);
        console.log(this.listaProveedores)
      }, err => {
        const {status, error} = err;
        const {message} = JSON.parse(error);

        Swal.fire('Cargar información...', message, 'error');
      })

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

    // crear listener personalizados con rxjs quitarProveedor
    // const btnEnviarEntrada = (document.getElementById("guardarCompra") as HTMLButtonElement);
    const btnActualizarArticulo = (document.getElementById("actualizarArticulo") as HTMLButtonElement);
    const btnGuardarProveedor = (document.getElementById("guardarProveedor") as HTMLButtonElement);
    const btnBuscarActividadProveedor = (document.getElementById("buscarActividad") as HTMLButtonElement);
  //const btnBuscarProveedor = (document.getElementById("buscarProveedor") as HTMLButtonElement);
    const btnCargarProveedor = (document.getElementById("cargarProveedor") as HTMLButtonElement);
    const btnQuitarProveedor = (document.getElementById("quitarProveedor") as HTMLButtonElement);
    const btnGuardarArticulo = (document.getElementById("guardarArticulo") as HTMLButtonElement);
    const btnEnviarCompra = (document.getElementById("enviarCompra") as HTMLButtonElement);
    const BtnCargarArticulo = (document.getElementById("cargarArticulo") as HTMLButtonElement);
    const selectProvincias = (document.getElementById("codigoProvincia") as HTMLSelectElement);
    const selectCantones = (document.getElementById("codigoCanton") as HTMLSelectElement);
    const selectDistritos = (document.getElementById("codigoDistrito") as HTMLSelectElement);
    const tipoCedula = (document.getElementById("tipoCedula") as HTMLSelectElement);
    const textPrecioArticulo = (document.getElementById("precio_articulo") as HTMLInputElement);
    (document.getElementById("txtexistencia") as HTMLInputElement).disabled = true;
    (document.getElementById("txtprecio") as HTMLInputElement).disabled = true;
    //const txtNombreArticulo = (document.getElementById("txtNombreArticulo") as HTMLInputElement);
    //const dataListencodings = (document.getElementById("encodings") as HTMLDataListElement);
    const btnGuardarProveedorClick = fromEvent(btnGuardarProveedor,'click');
    const btnBuscarActividadProveedorClick = fromEvent(btnBuscarActividadProveedor,'click');
    const provinciaChange = fromEvent(selectProvincias,'change');
    const cantonChange = fromEvent(selectCantones,'change');
    const distritoChange = fromEvent(selectDistritos,'change');
    const tipoCedulaChange = fromEvent(tipoCedula, 'change');
  //  const btnBuscarProveedorClick = fromEvent(btnBuscarProveedor, 'click');
    const btnCargarProveedorClick = fromEvent(btnCargarProveedor,'click');
    const btnQuitarProveedorClick = fromEvent(btnQuitarProveedor, 'click');
    const btnGuardarArticuloClick = fromEvent(btnGuardarArticulo,'click');
    const BtnCargarArticuloClick = fromEvent(BtnCargarArticulo, 'click');
    const textPrecioArticuloChange = fromEvent(textPrecioArticulo, 'keyup');
    const btnEnviarCompraClick = fromEvent(btnEnviarCompra,'click');
    const btnActualizarArticuloClick = fromEvent(btnActualizarArticulo,'click');
    provinciaChange.subscribe((e: Event) => {
      this.obtenerCantones(Number(this.codigoProvincia));
    })

    cantonChange.subscribe((e: Event) => {
        this.obtenerDistritos(Number(this.codigoProvincia), String(this.codigoCanton));
    })

    distritoChange.subscribe((e: Event) => {
      this.obtenerBarrios(Number(this.codigoProvincia),String(this.codigoCanton),String(this.codigoDistrito))
    })

  

    tipoCedulaChange.subscribe((e: Event) => {
      if(this.tipoCedula != '01' && this.tipoCedula != '02' ){
        document.getElementById("divIdentificacionExtranjero").style.display = "block"; 
        document.getElementById("divOtrasSenasExtranjero").style.display = "block";
        (document.getElementById("identificacion_extranjero") as HTMLInputElement).value = '';
        (document.getElementById("otras_senas_extranjero") as HTMLInputElement).value = ''; 
      } else {
        document.getElementById("divIdentificacionExtranjero").style.display = "none"; 
        document.getElementById("divOtrasSenasExtranjero").style.display = "none"; 
        (document.getElementById("identificacion_extranjero") as HTMLInputElement).value = '';
        (document.getElementById("otras_senas_extranjero") as HTMLInputElement).value = '';
      }
    })

    btnGuardarProveedorClick.subscribe((e: Event) => {
      
      let numeroProveedor = '';

      if(this.objProveedor.cedula_proveedor.toString().length == 12 ){
          numeroProveedor = this.objProveedor.cedula_proveedor;
      } else if(this.objProveedor.cedula_proveedor.toString().length == 11) {
          numeroProveedor = '0' + String(this.objProveedor.cedula_proveedor);
      } else if(this.objProveedor.cedula_proveedor.toString().length == 10) {
          numeroProveedor = '00' + String(this.objProveedor.cedula_proveedor);
      } else {
          numeroProveedor = '000' + String(this.objProveedor.cedula_proveedor);
      }
      
      this.objProveedor.proveedor_tipo_identificacion = this.tipoCedula;
      this.objProveedor.proveedor_barrio = this.codigoBarrio;
      this.objProveedor.numero_proveedor = numeroProveedor;

      this.facturaCompraService.nuevoProveedor(this.objProveedor)
        .subscribe(response => {
          const datosBusquedaActividad= JSON.parse(response);
          $('#ModalNuevoProveedor').modal('hide');
          (document.getElementById("formNuevoProveedor") as HTMLFormElement).reset();
          Swal.fire('Insertar Proveedor', datosBusquedaActividad.message, 'success');
          this.objResultadoBusquedas = this.objProveedor;
          this.cargarProveedor();
        },
        err => console.log(err));
    })

    /*btnBuscarActividadProveedorClick.subscribe((e: Event) => {
      
      if(typeof this.cedulaProveedorBusqueda === 'undefined') {
        return;
      } else {
        this.facturaCompraService.consultarActividad(Number(this.cedulaProveedorBusqueda))
        .subscribe((response) => {
          console.log(response);
          const datosActividadProveedor = JSON.parse(response);
          //this.objProveedor.codigo_actividad = datosActividadProveedor.response.codigo;
          this.descripcionActividad = datosActividadProveedor.response.descripcion;
        },
        err => console.error("err", err));
      }
    })*/

    /*btnBuscarProveedorClick.subscribe((e: Event) => {
      
    })*/

    btnCargarProveedorClick.subscribe((e: Event) => {
        $('#ModalBuscarProveedor').modal('hide');
        this.cargarProveedor();
    })

    btnQuitarProveedorClick.subscribe((e: Event) => {
        (document.getElementById("nombreProveedor") as HTMLInputElement).value = '';
        (document.getElementById("nombreComercialProveedor") as HTMLInputElement).value = '';
        (document.getElementById("cedulaProveedor") as HTMLInputElement).value = '';
        (document.getElementById("correoProveedor") as HTMLInputElement).value = '';
        (document.getElementById("telefonoProveedor") as HTMLInputElement).value = '';
        this.objFactura.idproveedor = '';
    })

    btnGuardarArticuloClick.subscribe((e: Event) => {
      //insertar los articulos
      const obj = this.objArticulo;
      this.nuevoArticulo(obj);

    })

    textPrecioArticuloChange.subscribe((e: Event) => {
      this.objArticulo.precio_final = this.objArticulo.precio_articulo;
    })

    BtnCargarArticuloClick.subscribe((e: Event) => {

      if(this.listaArticulos.length === 0){
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
        this.calcularTotalesLinea();
      }
    })

    btnEnviarCompraClick.subscribe((e: Event) => {
      this.procesarComprobante();
    })

    btnActualizarArticuloClick.subscribe((e: Event) => {
      this.actualizarArticulo(this.objArticulo);
    })

    //cargar la factura para editarla

    this.router.queryParams.subscribe(params => {

      const {id} = params;
      if(typeof id !== 'undefined'){
        this.movimiento = 'anular';
        this.facturaCompraService.cargarFacturaPorId(id).subscribe(response => {
          const {factura,lineas} = JSON.parse(response);
          console.log(factura);
          this.listaArticulosEntrada = lineas;

          this.objFactura.condicion_venta = factura[0].condicion_venta;
          this.objFactura.medio_pago = factura[0].medio_pago;
          this.objFactura.codigomoneda = factura[0].codigomoneda;
          this.objFactura.num_documento = factura[0].num_documento;
          this.objFactura.notas = factura[0].notas;
          this.objFactura.idfactura = factura[0].idfactura;

          this.subtotalComprobante = factura[0].totalventa;
          this.totalComprobante = factura[0].totalFactura;
          this.descuentoComprobante = factura[0].descuentos;
          this.impuestoComprobante = factura[0].impuestos;
          const otrosCargos = (document.getElementById("impServicio") as HTMLSelectElement);
          otrosCargos.value = Number(factura[0].otrosCargos) > 0 ? 'si' : 'no'; 
          this.claveRef = factura[0].clavenumerica;
          this.fechaRef = factura[0].fecha_factura.substr(0,10).replace(/-/g,'/');

          const {proveedor} = factura[0];
          this.objResultadoBusquedas = proveedor;
          this.objFactura.idproveedor = proveedor.idproveedor;

          (document.getElementById("nombreProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.nombre;
          (document.getElementById("nombreComercialProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.nombrecomercial == null ? '': this.objResultadoBusquedas.nombrecomercial;
          (document.getElementById("cedulaProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.cedula;
          (document.getElementById("correoProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.correo;
          (document.getElementById("telefonoProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.telefono == null ? '': this.objResultadoBusquedas.telefono;
          
        },
        err => {
          const {error:{message}} = err;
          Swal.fire('Cargar factura',message?message:'Hubo un error al cargar la información del comprobante','info');
        })
      } else {
        this.movimiento = 'guardar';
      }
    })

  }
    claveRef: string = '';
    fechaRef: string = '';
    movimiento :string = '';
    listaCategorias = [];
    listaErrores: string[] = [];
    tablaPequena = false;
    objResultadoBusquedas : any;
    queryProveedor: '';
    queryArticulo: '';
    queryCodigoArticulo: '';
    nombreArticuloBusqueda: '';
    codigoArticuloBusqueda: '';
    nombreProveedorBusqueda: '';
    cedulaProveedorBusqueda: '';
    tipoCedula = '';
    listaMediosPago : [];
    listaCondicionVenta : [];
    listaTipoCedulas = [];
    lisaUnidadesMedida = [];
    listaImpuestos =[];
    listaDescuentos = [];
    listaArticulos: any[] = [];
    listaProveedores = [];
    listaArticulosEntrada = [];
    listaArticulosCargados = [];
    codigoProvincia: '';
    codigoCanton: '';
    codigoDistrito: '';
    codigoBarrio: '';
    descripcionActividad: '';
    codigoActividad: '';
    listaMonedas : [];
    fechaActual: String;
    provincias = [];
    cantones = [];
    distritos = [];
    barrios = [];
 
    objProveedor = {
      proveedor_nombre: '',
      proveedor_nombre_comercial: '',
      proveedor_tipo_identificacion: '',
      cedula_proveedor: '',
      numero_proveedor: '',
     // codigo_actividad: '',
      identificacion_extranjero: '',
      proveedor_barrio: '',
      otras_senas: '',
      otras_senas_extranjero: '',
      proveedor_telefono_codigopais: '',
      proveedor_telefono_numtelefono: '',
      proveedor_fax_codigopais: '',
      proveedor_fax_numtelefono: '',
      proveedor_correo: ''
    }

    objArticulo = {
      tipo_impuesto: '',
      idcategoria: '',
      descripcion: '',
      codigobarra_producto: '',
      precio_articulo: '',
      precio_final: '',
      costo_unitario: '',
      unidad_medida: '',
      unidad_medida_comercial: '',
      tipo_servicio: '',
      codigo_servicio: '',
      codigocabys: '',
      id: 0
    }

    objFactura = {
      idproveedor: '',  
      idcliente: '', //emisor del sistema  
      clavenumerica: '',// valor geneado en el backend
      consecutivo: '',// valor geneado en el backend
      numero_interno: '',// valor geneado en el backend
      num_documento: '',// valor geneado en el backend
      consecutivo_receptor: '',// valor geneado en el backend
      fecha_factura: '',// valor geneado en el backend
      tipo_factura: '',// valor geneado en el backend
      condicion_venta: '',
      medio_pago: '',
      plazo_credito: 0,
      condicion_impuesto: '', // valor geneado en el backend
      porcentaje_descuento_total: '',
      monto_descuento_total: '',
      subtotal: '',
      totalservgravados: '',
      totalservexentos: '',
      totalservexonerado: '',
      totalmercanciasgravadas: '',
      totalmercanciasexentas: '',
      totalmercanciaexonerada: '',
      totalgravado: '',
      totalexento: '',
      totalexonerado: '',
      totalventa: '',
      totaldescuentos: '',
      totalventaneta: '',
      totalimpuesto: '',
      totalcomprobante: '',
      totalIVADevuelto: '',
      TotalOtrosCargos: '',
      codigomoneda: '',
      tipocambio: '',
      fecha: '',
      ordenes: [],
      notas: '',
      idfactura: ''
    }

  
    //totales de factura 
    lineaTemporal: object;
    subtotalComprobante : string = '0';
    impuestoComprobante : string = '0';
    descuentoComprobante : string = '0';
    totalComprobante : string = '0';
    porcentajeExoneracion = 0;
    tipoCambio: string;
    existencia: number;
    precio: number;
    numeroLinea : Number = 1;
    cantidadLinea: Number;
    bloquearBotones : boolean = false;

    procesarComprobante() {

      if(this.movimiento === 'guardar'){
        if(typeof this.objFactura.idproveedor ==='undefined' || this.objFactura.idproveedor.length == 0){
          return alert("Debe cargar un proveedor antes de generar la factura de compra");
        } else {
          
          const obj = this.obtenerTotalesFactura(); 
          this.generarFactura(obj);
          this.movimiento = 'guardar';
        } 
      } else {
        //

        if(typeof this.objFactura.idproveedor ==='undefined' || this.objFactura.idproveedor.length == 0){
          return alert("Debe cargar un proveedor antes de generar la factura de compra");
        } else {
          
          const obj = this.obtenerTotalesFactura(); 
          this.reemplazarCompra(obj);
          this.movimiento = 'guardar';
        } 
      }
    }

    tipoCedulas(){
      this.facturaCompraService.tipoCedulas()
        .subscribe(response => {
          const datosTipoCedulas = JSON.parse(response);
          this.listaTipoCedulas = datosTipoCedulas.tipoCedula;
        },
        err => console.error(err));
    }

    obtenerProvincias() {
      this.facturaCompraService.obtenerProvincias()
        .subscribe(response => {
          const datosProvincias = JSON.parse(response);
          this.provincias = datosProvincias.provincias;
        })
    }

    obtenerCantones(idprovincia: Number){
      this.facturaCompraService.obtenerCantones(idprovincia)
        .subscribe(response => {
          const datosCantones = JSON.parse(response);
          this.cantones = datosCantones.cantones;
        })
    }

    obtenerDistritos(idprovincia: Number, idcanton: String){
      
      this.facturaCompraService.obtenerDistritos({idcanton,idprovincia})
        .subscribe(response =>  {
          const datosDistritos = JSON.parse(response);
          this.distritos = datosDistritos.distritos;
        })
    }

    obtenerBarrios(idprovincia: Number, idcanton: String, iddistrito: String) {
      this.facturaCompraService.obtenerBarrios({idprovincia,idcanton,iddistrito})
        .subscribe(response => {
          const datosBarrios = JSON.parse(response);
          this.barrios = datosBarrios.barrios;
        })
    }

    mediosPago () {
      this.facturaCompraService.medioPago()
        .subscribe( response  => {
          const mediosPago = JSON.parse(response);
          this.listaMediosPago = mediosPago.medioPago;
          this.objFactura.medio_pago= '01';
        },
        err => console.error(err))
    }

    condicionesVenta(){
      this.facturaCompraService.condicionVenta()
        .subscribe(response => {
          const condicionesVenta = JSON.parse(response);
          this.listaCondicionVenta = condicionesVenta.condicionVenta;
           this.objFactura.condicion_venta = '01';
        },
        err => console.error(err))
    }

    obtenerMonedas() {
      this.facturaCompraService.obtenerMonedas()
        .subscribe(response => {
          const monedas = JSON.parse(response);
          this.listaMonedas = monedas.monedas;
           this.objFactura.codigomoneda = 'CRC';
        },
        err => console.error(err))
    }

    fechaHora() {
      const d = new Date();
      const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
      const dia =  (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
      const anio = d.getFullYear();
      const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
      const minutos = (d.getMinutes() < 10) ?  '0' + d.getMinutes() : d.getMinutes();
      const segundos = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
      this.fechaActual = dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos + ':' + segundos;
    }
    mostrarFechaHora() {
      this.fechaHora();
      setInterval(() => this.fechaHora(), 1000);
    }

    obtenerTipoCambio() {
      this.facturaCompraService.obtenerTipoCambio()
        .subscribe((responseTipoCambio: any) => {

          let xml : any;
          let valorTipoCambio : String;
          const datosTipoCambio = JSON.parse(responseTipoCambio);
          xml  = xmlConverter.xml2json(datosTipoCambio.response,{compact: true, spaces: 4});
          xml = JSON.parse(xml);
          
          if(typeof xml.DataSet === 'undefined' || xml.DataSet == null ){
            this.tipoCambio  = '1.00';
          } else {
            valorTipoCambio = xml.DataSet['diffgr:diffgram']['Datos_de_INGC011_CAT_INDICADORECONOMIC']['INGC011_CAT_INDICADORECONOMIC']['NUM_VALOR']._text;
            this.tipoCambio = Number(valorTipoCambio).toFixed(2);
          }
      },
      err => {
        this.tipoCambio  = '1.00';
      });
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

    obtenerDescuentos(){
      this.facturaCompraService.obtenerDescuentos()
        .subscribe(response => {
          const datosDescuentos = JSON.parse(response);
          this.listaDescuentos = datosDescuentos.descuentos;
        },  
        err => console.error(err));
    }

    cargarProveedor() {
      (document.getElementById("nombreProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.proveedor_nombre;
      (document.getElementById("nombreComercialProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.proveedor_nombre_comercial == null ? '': this.objResultadoBusquedas.proveedor_nombre_comercial;
      (document.getElementById("cedulaProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.cedula_proveedor;
      (document.getElementById("correoProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.proveedor_correo;
      (document.getElementById("telefonoProveedor") as HTMLInputElement).value = this.objResultadoBusquedas.proveedor_telefono_numtelefono == null ? '': this.objResultadoBusquedas.proveedor_telefono_numtelefono;
    }
    nuevoArticulo(obj) {
      console.log(obj); 
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

      this.facturaCompraService.nuevoArticulo(obj)
        .subscribe(response => {
          const datosNuevoArticulo = JSON.parse(response);
          $('#ModalNuevoArticulo').modal('hide');
          obj.idcategoria= '';
          obj.descripcion= '';
          obj.codigobarra_producto= '';
          obj.precio_articulo= '';
          obj.precio_final= '';
          obj.costo_unitario= '';
          obj.unidad_medida= '';
          obj.unidad_medida_comercial= '';
          obj.tipo_servicio= '';
          obj.codigo_servicio= '';
          obj.tipo_impuesto= '';
          Swal.fire('Nuevo Artículo', datosNuevoArticulo.message,'success');
        },
        err => {
          console.log(err);
        })
      }
      
    }


    actualizarArticulo(obj) {

      console.log()
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

      this.facturaCompraService.actualizarArticulo(obj)
        .subscribe(response => {
          const datosNuevoArticulo = JSON.parse(response);
          
          //obj.idcategoria= '';
          //obj.descripcion= '';
          //obj.codigobarra_producto= '';
          //obj.precio_articulo= '';
          //obj.precio_final= '';
          //obj.costo_unitario= '';
          //obj.unidad_medida= 'Unid';
          //obj.unidad_medida_comercial= '';
          //obj.tipo_servicio= '';
          //obj.codigo_servicio= '';
          $('#ModalActualizarArticulo').modal('hide');
          Swal.fire('Actualizar Línea', datosNuevoArticulo.message,'success');
         // this.cargarArticulos();
          this.actualizarLinea(this.lineaTemporal);
        },
        err => {
          const {message} = JSON.parse(err)
          Swal.fire('Actualizar Línea', message?message:'Hubo un error al actualizar la linea','success');
        })
     }
    }

    cargarArticulos() {
    //   
    this.facturaCompraService.buscarArticulos('')
    .subscribe(response => {
      const datosListaArticulos = JSON.parse(response);
      console.log(datosListaArticulos);
      this.listaArticulosCargados = datosListaArticulos.articulos;
      console.log("Prueba");
    },
    err => console.error(err));   
    }

    buscarProductosPorId(linea){
      return this.facturaCompraService.buscarArticulosPorId(linea.idarticulo)
        .subscribe(response => {

          const datosProducto = JSON.parse(response);
          this.objArticulo.tipo_impuesto= datosProducto.articulo[0].tipo_impuesto,
          this.objArticulo.idcategoria= datosProducto.articulo[0].idcategoria,
          this.objArticulo.descripcion= datosProducto.articulo[0].descripcion,
          this.objArticulo.codigobarra_producto= datosProducto.articulo[0].codigobarra_producto,
          this.objArticulo.precio_articulo= datosProducto.articulo[0].precio_articulo,
          this.objArticulo.precio_final=  this.objArticulo.precio_articulo,
          this.objArticulo.costo_unitario= datosProducto.articulo[0].costo_unitario,
          this.objArticulo.unidad_medida= datosProducto.articulo[0].unidad_medida,
          this.objArticulo.unidad_medida_comercial= datosProducto.articulo[0].unidad_medida_comercial,
          this.objArticulo.tipo_servicio= datosProducto.articulo[0].tipo_servicio,
          this.objArticulo.codigo_servicio= datosProducto.articulo[0].codigo_servicio,
          this.objArticulo.id= datosProducto.articulo[0].idarticulo;
          this.objArticulo.codigocabys= datosProducto.articulo[0].codigoCabys;
          console.log(this.objArticulo);

          this.lineaTemporal = linea;
          
          for(let articulo of this.listaArticulosEntrada){
            if(linea.numerolineadetalle == articulo.numerolineadetalle){
              console.log("igual");
              console.log("numero linea ",linea);
              this.cantidadLinea = articulo.cantidad;
              linea.cantidad = this.cantidadLinea;
            }
          }
        })
    }

    calcularTotalesLinea() {

     // const descripcionArticulo = (document.getElementById("txtNombreArticulo") as HTMLInputElement).value;
      const cantidad = (document.getElementById("cantidadLinea") as HTMLInputElement).value;
      const selectDescuento = (document.getElementById("descuentoLinea") as HTMLInputElement).value;
      let articulo = this.listaArticulos[0];
      let subtotal= 0;
      let montoTotal = 0;
      let montoDescuento = 0;
      let naturalezadescuento= '';
      const descuentos = this.listaDescuentos;
      let porcentajeDescuento= 0;
      let porcentajeImpuesto = (articulo.porcentaje_impuesto) ? articulo.porcentaje_impuesto: 0; 
      let montoImpuesto = 0;
      let baseImponible = 0;
      let impuestoNeto = 0;
      let montototallinea = 0;
      let montoExoneracion = 0;
      let PorcentajeExonerado = 0;
      let factorIVA = 0;
      let impuestoExonerado = 0;
      if(cantidad.length === 0){
        return alert("No se puede cargar una línea con cantidad 0");
      } else {
        for(let i in  descuentos){
          if(descuentos[i].id == selectDescuento){
            porcentajeDescuento = descuentos[i].porcentaje;
            naturalezadescuento = descuentos[i].descripcion;
          }
        }

        let linea = { //identrada y numero linea se asignan en el servidor
          idarticulo: '',precio_linea: '',cantidad: '',descripcioDetalle: '',porcentajedescuento: '',montodescuento: '',
          naturalezadescuento: '',numerolineadetalle: '',subtotal: '',montototal: '',codigo: '',codigo_tarifa: '',
          tipo_servicio: '',tarifa: '',monto: '',impuesto_neto: '',numerodocumento: '',montoitotallinea: '',baseimponible: '',
          MontoExoneracion: '',factorIVA: '',otrosCargos: ''
        };


        /*if(articulo.codigo_impuesto == '01'){ 
          montoExoneracion = 0;
          impuestoExonerado = 0;
        } else {
          
          if(Number(this.porcentajeExoneracion) > Number(articulo.porcentaje_impuesto)){
            impuestoExonerado = Number(Number(articulo.porcentaje_impuesto).toFixed(2));
            montoExoneracion = Number(((subtotal * impuestoExonerado) / 100).toFixed(2));
          } else {
            impuestoExonerado = this.porcentajeExoneracion;
            montoExoneracion = Number(((subtotal * impuestoExonerado) / 100).toFixed(2));
          }
          /*
            impuestoExonerado = this.porcentajeExoneracion;
            montoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
          
          
        }*/

        //obtener los totales de la linea 
        montoTotal = Number(articulo.precio_articulo) * Number(cantidad);
        montoDescuento = (porcentajeDescuento / 100 ) * Number(montoTotal);
        subtotal = montoTotal - montoDescuento;
        montoImpuesto = 0;
        impuestoNeto = 0;
        montototallinea = subtotal - impuestoNeto;
        //baseImponible = subtotal;
        // 30 días con RXJS

        linea.montototal = montoTotal.toFixed(2);
        linea.montodescuento = montoDescuento.toFixed(2);
        linea.naturalezadescuento = naturalezadescuento;
        linea.porcentajedescuento = Number(porcentajeDescuento).toFixed(2);
        linea.cantidad = cantidad;
        linea.codigo = '01';
        linea.codigo_tarifa = '01';
        linea.monto = montoImpuesto.toFixed(2);
        linea.baseimponible = baseImponible.toFixed(2);
        linea.impuesto_neto = impuestoNeto.toFixed(2);
        linea.montoitotallinea = montototallinea.toFixed(2);
        linea.MontoExoneracion = montoExoneracion.toFixed(2);
        linea.tarifa = porcentajeImpuesto;
        linea.precio_linea = Number(articulo.precio_articulo).toFixed(2);
        linea.factorIVA = factorIVA.toFixed(2);
        linea.subtotal = subtotal.toFixed(2);
        linea.numerolineadetalle = (this.listaArticulosEntrada.length + 1).toString();
        linea.descripcioDetalle = articulo.descripcion;
        linea.idarticulo = articulo.idarticulo;
        linea.tipo_servicio = articulo.tipo_servicio;
        linea.otrosCargos = (subtotal * .10).toFixed(2);
        console.log("linea generada ", linea);
        this.listaArticulosEntrada.push(linea);

        let subtotalComprobante= Number(this.subtotalComprobante ),
            impuestoComprobante=Number(this.impuestoComprobante),
            descuentoComprobante=Number(this.descuentoComprobante),
            totalComprobante= Number(this.totalComprobante);
            
            subtotalComprobante+= subtotal;
            impuestoComprobante+=montoImpuesto;
            descuentoComprobante+=montoDescuento;
            totalComprobante+= montototallinea;
        
        this.subtotalComprobante = subtotalComprobante.toFixed(2);
        this.impuestoComprobante = impuestoComprobante.toFixed(2);
        this.descuentoComprobante = descuentoComprobante.toFixed(2); 
        this.totalComprobante = totalComprobante.toFixed(2);
        this.listaArticulos = [];
        articulo = null;

        (document.getElementById("txtNombreArticulo") as HTMLSelectElement).value = '';
        (document.getElementById('txtCodigoArticulo') as HTMLSelectElement).value = '';
        (document.getElementById("txtprecio") as HTMLInputElement).value = '';
        (document.getElementById("cantidadLinea") as HTMLInputElement).value = '';
        (document.getElementById("txtexistencia") as HTMLInputElement).value = '';
        (document.getElementById("descuentoLinea") as HTMLSelectElement).value = '';
      }
    }

    obtenerTotalesFactura() {

      // VARIABLES PARA OBTENER LOS TOTALES DE FACTURA
  
      let porcentaje_descuento_total = ((Number(this.descuentoComprobante) * 100 ) / Number(this.totalComprobante)).toFixed(2);
      let monto_descuento_total = (Number(this.descuentoComprobante));
      const subtotal = Number(this.subtotalComprobante);
      let totalservgravados = 0;
      let totalservexentos = 0;
      let totalservexonerado = 0;
      let totalmercanciasgravadas = 0;
      let totalmercanciasexentas = 0;
      let totalmercanciaexonerada = 0;
      let totalgravado = 0;
      let totalexento = 0;
      let totalexonerado = 0;
      let totalventa = 0;
      const totaldescuentos = monto_descuento_total;
      let totalventaneta = 0;
      let totalimpuesto = 0;
      let totalOtrosCargos = 0;
      let OtrosCargos = 0;
      let totalcomprobante = 0;
      let montototal = 0;
      let impuestoLinea = 0;
      let totalIVADevuelto = 0
      let valorImpuestoExonerado = 0;
      let ordenes = this.listaArticulosEntrada;
      // tslint:disable-next-line: forin
      for (const linea in ordenes) {
        totalOtrosCargos += Number(ordenes[linea].otrosCargos);
        montototal = parseFloat(ordenes[linea].montototal);
        if (ordenes[linea].codigo == '01' || ordenes[linea].codigo == '07') { // codigo del impuesto
          //Obtener el monto de impuesto exonerado
            
          //
            if (ordenes[linea].codigo_tarifa == '01'){ // productos exentos del IVA
              if (ordenes[linea].tipo_servicio == '01') { // servicios
                // servicios
                // tslint:disable-next-line: max-line-length
                totalservexentos += montototal;
              }
    
              if (ordenes[linea].tipo_servicio == '02') { //mercancia
                // mercancías
                // tslint:disable-next-line: max-line-length
                totalmercanciasexentas += montototal; 
                
                // tslint:disable-next-line: max-line-length
              }
    
              impuestoLinea = parseFloat(ordenes[linea].monto);
              totalimpuesto += impuestoLinea;
              totalexento  += montototal;
            } else {
                // Aplica IVA
              if (ordenes[linea].tipo_servicio == '01') {
                // Servicios
                
                valorImpuestoExonerado =  (ordenes[linea].monto * this.porcentajeExoneracion / 100);
                totalservexonerado += valorImpuestoExonerado;
                totalexonerado +=totalservexonerado;
                totalservgravados += montototal;
                totalgravado += montototal;
              }
    
              if (ordenes[linea].tipo_servicio == '02') {
                // Mercancias
            
                valorImpuestoExonerado = (ordenes[linea].monto * this.porcentajeExoneracion / 100);
                totalmercanciaexonerada += valorImpuestoExonerado;
                totalmercanciasgravadas += montototal; 
                totalgravado += montototal;
                totalexonerado +=totalmercanciaexonerada;
                
              }

              impuestoLinea = parseFloat(ordenes[linea].monto);
              totalimpuesto += impuestoLinea;    
          }
        } 
      }

      
      const impServicio = (document.getElementById("impServicio") as HTMLSelectElement).value;
      if( impServicio == 'si'){
        OtrosCargos = totalOtrosCargos;
      } else {
        OtrosCargos = 0;
      }
      
      
      
      totalventa = totalgravado + totalexento + totalexonerado;
      totalventaneta = totalventa - totaldescuentos;
      totalcomprobante = totalventaneta + totalimpuesto + OtrosCargos;
      // CARGAR EL OBJETO PARA GUARDAR LA FACTURA

      
      //this.objFactura.id = '',
      this.objFactura.TotalOtrosCargos = OtrosCargos.toFixed(2);
      this.objFactura.porcentaje_descuento_total = Number(porcentaje_descuento_total).toFixed(2),
      this.objFactura.monto_descuento_total = monto_descuento_total.toFixed(2),
      this.objFactura.subtotal = subtotal.toFixed(2),
      this.objFactura.totalservgravados = totalservgravados.toFixed(2),
      this.objFactura.totalservexentos = totalservexentos.toFixed(2),
      this.objFactura.totalservexonerado = totalservexonerado.toFixed(2),
      this.objFactura.totalmercanciasgravadas = totalmercanciasgravadas.toFixed(2),
      this.objFactura.totalmercanciasexentas = totalmercanciasexentas.toFixed(2),
      this.objFactura.totalmercanciaexonerada = totalmercanciaexonerada.toFixed(2),
      this.objFactura.totalgravado = totalgravado.toFixed(2),
      this.objFactura.totalexento = totalexento.toFixed(2),
      this.objFactura.totalexonerado = totalexonerado.toFixed(2),
      this.objFactura.totalventa = totalventa.toFixed(2),
      this.objFactura.totaldescuentos = Number(totaldescuentos).toFixed(2),
      this.objFactura.totalventaneta = totalventaneta.toFixed(2),
      this.objFactura.totalimpuesto = Number(totalimpuesto).toFixed(2),
      this.objFactura.totalcomprobante = Number(totalcomprobante).toFixed(2);
      this.objFactura.totalIVADevuelto = totalIVADevuelto.toFixed(2);
      
      //this.objFactura.codigomoneda = ,

      if(this.objFactura.condicion_venta != '02'){
        this.objFactura.plazo_credito = 0;
      }
      
      this.objFactura.ordenes = ordenes;
      this.objFactura.tipocambio = this.tipoCambio;
      this.objFactura.ordenes = this.listaArticulosEntrada;
      const obj = {
        factura: this.objFactura
      };
  
      return obj;
    }

    quitarOrden(numeroLinea: Number){
      let indice = 0, total= 0, descuento= 0, subtotal= 0, impuesto = 0;
      for(const i in this.listaArticulosEntrada){
        
        if(this.listaArticulosEntrada[i].numerolineadetalle == numeroLinea){

          this.listaArticulosEntrada.splice(indice, 1);
        
        }
        indice++;
      }


      for(const i in this.listaArticulosEntrada){

          total += Number(this.listaArticulosEntrada[i].montoitotallinea);
          subtotal += Number(this.listaArticulosEntrada[i].subtotal);
          descuento += Number(this.listaArticulosEntrada[i].montodescuento);
          impuesto += Number(this.listaArticulosEntrada[i].monto);
      }

      this.subtotalComprobante = subtotal.toFixed(2);
      this.impuestoComprobante = impuesto.toFixed(2);
      this.descuentoComprobante = descuento.toFixed(2); 
      this.totalComprobante = total.toFixed(2);
    }

    generarFactura(obj: object){
      this.bloquearBotones = true;
      this.facturaCompraService.generarFactura(obj)
        .subscribe(response => {
          const respuestaGenerarFactura = JSON.parse(response);
          Swal.fire('Nuevo Comprobante', respuestaGenerarFactura.message,'success');

          this.queryArticulo = '';
          (document.getElementById("txtNombreArticulo") as HTMLSelectElement).value = '';
          (document.getElementById('txtCodigoArticulo') as HTMLSelectElement).value = '';
          (document.getElementById("txtprecio") as HTMLInputElement).value = '';
          (document.getElementById("cantidadLinea") as HTMLInputElement).value = '';
          (document.getElementById("txtexistencia") as HTMLInputElement).value = '';
          (document.getElementById("descuentoLinea") as HTMLSelectElement).value = '';
          (document.getElementById("nombreProveedor") as HTMLInputElement).value = '';
          (document.getElementById("nombreComercialProveedor") as HTMLInputElement).value = '';
          (document.getElementById("cedulaProveedor") as HTMLInputElement).value = '';
          (document.getElementById("correoProveedor") as HTMLInputElement).value = '';
          (document.getElementById("telefonoProveedor") as HTMLInputElement).value = '';
          
          this.cedulaProveedorBusqueda =""; 
          this.nombreProveedorBusqueda =""; 
          this.queryProveedor="";
          this.objFactura.idproveedor = '';
          this.subtotalComprobante = '0';
          this.impuestoComprobante = '0';
          this.descuentoComprobante = '0';
          this.totalComprobante = '0';
          this.listaArticulosEntrada = [];
          this.bloquearBotones = false;
          this.objFactura.notas = '';
        }
        ,err => {
          this.bloquearBotones = false;
          const {status,error} = err;
          Swal.fire('Nuevo Comprobante', error.message,'error');
        })
    }


    //
    reemplazarCompra(obj: object){
      this.bloquearBotones = true;
      this.facturaCompraService.reemplazarCompra(obj)
        .subscribe(response => {
          const respuestaGenerarFactura = JSON.parse(response);
          Swal.fire('Anulación Comprobante', respuestaGenerarFactura.message,'success');

          this.queryArticulo = '';
          (document.getElementById("txtNombreArticulo") as HTMLSelectElement).value = '';
          (document.getElementById('txtCodigoArticulo') as HTMLSelectElement).value = '';
          (document.getElementById("txtprecio") as HTMLInputElement).value = '';
          (document.getElementById("cantidadLinea") as HTMLInputElement).value = '';
          (document.getElementById("txtexistencia") as HTMLInputElement).value = '';
          (document.getElementById("descuentoLinea") as HTMLSelectElement).value = '';

          (document.getElementById("nombreProveedor") as HTMLInputElement).value = '';
          (document.getElementById("nombreComercialProveedor") as HTMLInputElement).value = '';
          (document.getElementById("cedulaProveedor") as HTMLInputElement).value = '';
          (document.getElementById("correoProveedor") as HTMLInputElement).value = '';
          (document.getElementById("telefonoProveedor") as HTMLInputElement).value = '';
          this.cedulaProveedorBusqueda =""; 
          this.nombreProveedorBusqueda =""; 
          this.queryProveedor="";
          this.objFactura.idproveedor = '';
          
          this.subtotalComprobante = '0';
          this.impuestoComprobante = '0';
          this.descuentoComprobante = '0';
          this.totalComprobante = '0';
          this.listaArticulosEntrada = [];
          this.bloquearBotones = false;
          this.objFactura.notas = '';     

          this.limpiarParametrosURL();
        }
        ,err => {
          this.bloquearBotones = false;
          const {status,error} = err;
          this.limpiarParametrosURL();
          Swal.fire('Anulación Comprobante', error.message,'error');
        })
    }

    limpiarParametrosURL(){
      const qParams: Params = {};
      this.route.navigate([], {
          relativeTo: this.router,
          queryParams: qParams,
          queryParamsHandling: ''
      });
    }
    //
    actualizarLinea(linea) {


      //RESTAR TOTALES ANTERIORES
      let subtotalAnterior = Number(this.subtotalComprobante);
      subtotalAnterior -= Number(linea.subtotal)
      this.subtotalComprobante = subtotalAnterior.toFixed(2);
      let descuentosAnterior = Number(this.descuentoComprobante);
      descuentosAnterior -= Number(linea.montodescuento);
      this.descuentoComprobante = descuentosAnterior.toFixed(2);
      let impuestoAnterior = Number(this.impuestoComprobante);
      impuestoAnterior -= Number(linea.monto);
      this.impuestoComprobante = impuestoAnterior.toFixed(2);
      let totalPagarAnterior = Number(this.totalComprobante);
      totalPagarAnterior -= Number(linea.montoitotallinea);
      this.totalComprobante = totalPagarAnterior.toFixed(2);
  
      //OBTENER NUEVO TOTAL DE LA LINEA
      let montoImpuesto = 0, 
          montoDescuento = 0, 
          montototal = 0,
          subtotal = 0,
          baseImponible = 0,
          porcentajeImpuesto = 0,
          impuestoExonerado= 0,
          impuestoNeto = 0,
          montoExonerado = 0,
          totalLinea = 0,
          montototallinea = 0;
      linea.cantidad = this.cantidadLinea;
      montototal = Number(this.objArticulo.precio_articulo) * Number(linea.cantidad);
      
      if(Number(linea.porcentajedescuento) > 0){
        montoDescuento = (parseFloat(linea.porcentajedescuento) / 100) * montototal;
      }
  
      subtotal = montototal - montoDescuento;
    
      /*for(const i in this.listaImpuestos){
        if(this.objArticulo.tipo_impuesto == this.listaImpuestos[i].id){
          porcentajeImpuesto = Number(this.listaImpuestos[i].porcentaje_impuesto);
  
          if (linea.codigo_impuesto == '01' || linea.codigo_impuesto == '07') {
            if (linea.codigo_impuesto == '07') {
              baseImponible = subtotal;
              montoImpuesto = Number(baseImponible) * Number('.'+porcentajeImpuesto)
            }
        } else {
          
          montoImpuesto = subtotal * Number('.'+porcentajeImpuesto);
          }
  
          impuestoExonerado = 0;
          impuestoNeto = 0;
          montoExonerado = 0;
          linea.codigo_tarifa = '01';
          linea.tarifa = 0;
          linea.monto = 0;
        }
      }*/

      impuestoExonerado = 0;
      impuestoNeto = 0;
      montoExonerado = 0;
      linea.codigo_tarifa = '01';
      linea.tarifa = 0;
      linea.monto = 0;
      
      linea.idproducto = this.objArticulo.id;
      linea.precio_linea = this.objArticulo.precio_articulo.toString();
      linea.descripcioDetalle = this.objArticulo.descripcion;
      linea.montodescuento = montoDescuento.toFixed(2);
      linea.subtotal = subtotal.toFixed(2);
      linea.montototal = montototal.toFixed(2);
      linea.codigobarra_producto = this.objArticulo.codigobarra_producto;
      linea.unidadMedida = this.objArticulo.unidad_medida;
      linea.unidadMedidaComercial = this.objArticulo.unidad_medida_comercial;
      linea.codigo_servicio = this.objArticulo.codigo_servicio;
      linea.tipo_servicio = this.objArticulo.tipo_servicio;
      linea.baseimponible = baseImponible.toString();
      linea.impuesto_neto = impuestoNeto.toFixed(2);
      linea.otrosCargos = (subtotal * .10);
      linea.impuesto = montoImpuesto.toFixed(2);  
  
      if(this.porcentajeExoneracion == 0){
        totalLinea = subtotal + Number(montoImpuesto);
        linea.montoitotallinea = totalLinea.toString();
        montototallinea = totalLinea;
        linea.MontoExoneracion = montoExonerado.toFixed(2);
      } else {
        totalLinea = subtotal + Number(impuestoNeto)
        linea.montoitotallinea = totalLinea.toString();
        montototallinea = totalLinea;
        linea.MontoExoneracion = montoExonerado.toString();
      }
  
  
      //ACTUALIZAR LOS TOTALES DE LA FACTURA
  
      let subtotalNuevo = Number(this.subtotalComprobante);
      subtotalNuevo += Number(subtotal);
      this.subtotalComprobante = subtotalNuevo.toFixed(2);
      let descuentosNuevo = Number(this.descuentoComprobante);
      descuentosNuevo += Number(montoDescuento);
      this.descuentoComprobante = descuentosNuevo.toFixed(2);
      let impuestoNuevo = Number(this.impuestoComprobante);
      impuestoNuevo += Number(montoImpuesto);
      this.impuestoComprobante = impuestoNuevo.toFixed(2);
      let totalPagarNuevo = Number(this.totalComprobante);
      totalPagarNuevo += Number(montototallinea);
      this.totalComprobante = totalPagarNuevo.toFixed(2);
      //(document.getElementById("formActualizarProducto") as HTMLFormElement).reset();
      this.objArticulo.unidad_medida = 'Unid';
      this.objArticulo.idcategoria= '';
      this.objArticulo.descripcion= '';
      this.objArticulo.codigobarra_producto= '';
      this.objArticulo.precio_articulo= '';
      this.objArticulo.precio_final= '';
      this.objArticulo.costo_unitario= '';
      this.objArticulo.unidad_medida_comercial= '';
      this.objArticulo.tipo_servicio= '';
      this.objArticulo.codigo_servicio= '';
    }


    buscarProveedores(query: string){

      if(typeof query === 'undefined' || query == ''){
        return;
      } else {
        
        for(let proveedor of this.listaProveedores){
           if(query == proveedor.proveedor_nombre){
            this.cedulaProveedorBusqueda = proveedor.cedula_proveedor;
            this.nombreProveedorBusqueda = proveedor.proveedor_nombre;
            //queryProveedor
            this.objResultadoBusquedas = proveedor;
            this.objFactura.idproveedor = proveedor.id;
           }
        }
        /*
        this.proveedorService.buscarProveedorCoincidencia(query)
          .subscribe(response => {

            const datosProveedor = JSON.parse(response);
            this.listaProveedores = datosProveedor.proveedores;
            
            if(datosProveedor.proveedores.length > 1 ){
              return;
            } else {
              this.cedulaProveedorBusqueda = this.listaProveedores[0].cedula_proveedor;
              this.nombreProveedorBusqueda = this.listaProveedores[0].proveedor_nombre;
              this.objResultadoBusquedas = this.listaProveedores[0];
              this.objFactura.idproveedor = this.listaProveedores[0].id;
            }
          },
          err => console.error(err));
        */
      }
    }
    
    cargarArticulo(descripcion: string, tipo: string){

      const Articulos =this.listaArticulosCargados;

      if(tipo == '01') { // POR DESCRIPCION

        for(let articulo of Articulos){
          if(articulo.descripcion.trim() == descripcion.trim()){
            this.listaArticulos = [];
            this.listaArticulos.push(articulo);
            this.facturaCompraService.obtenerExistenciaArticulo(Number(articulo.idarticulo))
              .subscribe(response => {{
                const datosExistencia = JSON.parse(response);
                this.existencia = (datosExistencia.existencia.length === 0)? null: Number(datosExistencia.existencia[0].existencia_actual);
                this.precio = Number(articulo.precio_articulo);
            }})
          }
        }
        
      } else {// POR CODIGO
        
        const codigo = descripcion.split(' ')[0];

        for(let articulo of Articulos){
          if(articulo.codigobarra_producto.trim() == codigo.trim()){
            this.listaArticulos = [];
            this.listaArticulos.push(articulo);
            this.facturaCompraService.obtenerExistenciaArticulo(Number(articulo.idarticulo))
              .subscribe(response => {
                const datosExistencia = JSON.parse(response);
                this.existencia = (datosExistencia.existencia.length === 0)? null: Number(datosExistencia.existencia[0].existencia_actual);
                this.precio = Number(articulo.precio_articulo);
            })
          }
        }
      }
    }

    validarValoresDecimales(cantidad){
      const texto = cantidad;
      const expresion = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
    
      if(expresion.test(texto) == false){
        this.cantidadLinea = texto.substr(0, texto.length - 1 );
      }
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

  validarTamanoMaximo (e: any) {

    if(e.target.value.length > 1000){
      this.objFactura.notas = e.target.value.substring(0,499);
    }
  }
} 