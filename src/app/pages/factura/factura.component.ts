import { EmisorService } from './../../services/pages/emisor.service';
import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/pages/factura.service';
import { ClienteService } from '../../services/pages/cliente.service';
import { DescuentoService } from '../../services/pages/descuento.service';
import { ProductoService } from '../../services/pages/producto.service';
import { POSService } from 'src/app/services/pages/pos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { round1 } from './funciones';
import { nanoid } from 'nanoid';
import { fromEvent } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
//import { ConsoleReporter } from 'jasmine';

declare var $: any;
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(private facturaService: FacturaService, private clienteService: ClienteService,
              private descuentoService: DescuentoService, private productoService: ProductoService,
              private router: ActivatedRoute, private emisorService: EmisorService,
              private posService: POSService, private sanitizer : DomSanitizer) {
    
   
  }
  mostrarCheckBox: boolean = false;
  filtrarExistencia: boolean = true;
  pdfURL:string = null;
  mostrarBodegas: boolean = false;
  idebodegaSeleccionada : number = null;
  bodegas  = [];
  fechaActual = '';
  objDataCliente = {
    nombre: '',
    cedula: '',
    query: '',
    id: '',
    correo: '',
    telefono: '',
    nombreComercial: '',
    descuento : '',
    plazo_credito: '',
    limi_credit: '',
    saldo: '',
    fact_debit: '',
    pag_credit: '',
    enplazo: '',
    d15: '',
    d30: '',
    d45: '',
    d60: '',
    d90m: '',
    numero_cliente: ''
  };

  errorCorreo: boolean = null;
 lineaTemporal: object;
  tipoCambio: string =  '';
  tablaPequena = false;
  objFactura =  {
    id: '',
    idbodega: '',
    idcliente: '1',
    nombreCliente: '',
    condicion_venta: '',
    medio_pago: '',
    plazo_credito: 0,
    porcentaje_descuento_total: '',
    monto_descuento_total: '',
    num_documento: '',
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
    codigomoneda: '',
    tipocambio: '',
    tipo_factura: '',
    prefactura: '',
    otrosCargos : '',
    ordenes: [],
    objOrdenes: {},
    tipoProforma: '',
    autorizado: null,
    notas: ''
  };

  objCliente = {
    cliente_nombre: '',
    cliente_nombre_comercial: '',
    cliente_tipo_identificacion: '',
    cedula_cliente: '',
    numero_cliente: '',
    identificacion_extranjero: '',
    provincia: '',
    canton: '',
    distrito: '',
    cliente_barrio: '',
    otras_senas: '',
    otras_senas_extranjero: '',
    cliente_telefono_codigopais: '',
    cliente_telefono_numtelefono: '',
    cliente_fax_codigopais: '',
    cliente_fax_numtelefono: '',
    cliente_correo: '',
    descuento: '0',
    plazo_credito: '0',
    ubicacion: ''
  };

  objBusquedaProducto =  {
    id: '',
    descripcion: '',
    codigo: '',
    query: ''
  };

  lineaDetalle = {
    idfactura: '',
    idproducto: '',
    precio_linea: '',
    cantidad: '',
    descripcioDetalle: '',
    porcentajedescuento: '',
    montodescuento: '',
    naturalezadescuento: '',
    numerolineadetalle: '',
    subtotal: '',
    montototal: '',
    codigobarra_producto: '',
    codigo: '',
    codigo_tarifa: '',
    codigo_servicio: '',
    tipo_servicio: '',
    tarifa: '',
    unidadMedida: '',
    unidadMedidaComercial: '',
    monto: '',
    baseimponible: '',
    impuesto: '',
    impuesto_neto: '',
    SinDescu: 0,
    numerodocumento: '',
    montoitotallinea: '',
    MontoExoneracion: '',
    otrosCargos: 0
  };

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
    iddescuento: '',
    codigocabys: '',
    DescuArt: '',
    SinDescu: ''
  };

  saldoDisponible: string;
  saldoDisponibleNumber : number;
  tipoDocumento: object = [];
  condicionVenta: object = [];
  medioPago: object = [];
  listaMonedas: object = [];
  listaClientes : any = [];
  arrayDetalles = [];
  tipoIdentificacion: object = [];
  provincia: object = [];
  canton: object = [];
  distrito: object = [];
  barrio: object = [];
  descuentos: object = [];
  unidadesMedida: object = [];
  tipoImpuesto: object = [];
  listaServicios: object = [];
  listaCategorias: object = [];
  listaProductos: any[] = [];
  listaProductosCargados: any[] = [];
  totalPagar = '0';
  totalImpuesto = '0';
  totalImpuestoNeto = '0';
  totalDescuento = '0';
  SubtotalComprobante = '0';
  porcentajeExoneracion = 0;
  mostrar : boolean = false;
  tipoProforma : string = 'profGuadar';
  tipoEnvio : string = 'nuevaFactura';
  permisoBoton : string = this.facturaService.obtenerRole();
  descuentoCliente: Number =0;
  plazo_credito: Number = 0;
  existencia : Number;
  precio: Number; 
  cantidadProducto : Number;
  numeroLinea : number = 1;
  descripcionProducto : string; 
  codigoProducto : string; 
  nombreClientePendientes : string ;
  mensajeError: string = '';
  mensajeErrorDatosToken: string = '';
  nombrecomercial= '';
  ngOnInit() {
   // this.cargarProductos();
    this.obtenerTipoCambio();
    this.mostrarFechaHora();
    this.obtenerMonedas();
    this.obtenerDescuentos();
    this.obtenerUnidadesMedida();
    this.obtenerImpuesto();
    this.obtenerProvincias();
    this.obtenerCategorias();
    this.TipoDocumento();
    this.MedioPago();
    this.CondicionVenta();
    this.cargarMensajeArchivoP12();
    this.validacionDatosTOkenHacienda();
    this.obtenerBodegas();
    
    //this.listarOrdenes();
   
    //location.reload();

  /* this.tipoDocumento = facturaService.tipoDocumento();
    this.medioPago = facturaService.medioPago();
    this.condicionVenta = facturaService.condicionVenta(); */
    this.tipoIdentificacion = this.clienteService.tipoIdentificacion();

    this.facturaService.cargarClientes().subscribe(response => {
      this.listaClientes = JSON.parse(response);

      this.router.queryParams.subscribe(params => {

        const {id} = params;
  
        if(typeof id !== 'undefined'){
          this.objFactura.id = id;
          console.log("idfactura",this.objFactura.id)
          const obj = {
            idfactura: Number(this.objFactura.id)
          }
          this.facturaService.obtenerProforma(obj).subscribe(response => {
            const datosProforma = JSON.parse(response);
            const {factura, lineas} = datosProforma;
            
            this.arrayDetalles = lineas;
            this.objFactura.condicion_venta = factura.condicion_venta;
            this.objFactura.medio_pago = factura.medio_pago;
            this.objFactura.codigomoneda = factura.codigomoneda;
            this.objFactura.num_documento = factura.num_documento;
            this.objFactura.notas = factura.notas;
            this.tipoProforma = 'profActualizar';
            this.tipoEnvio = 'proformaFactura';
            if(Number(factura.otrosCargos) > 0){
              const impServicio = (document.getElementById("impServicio") as HTMLSelectElement);
              impServicio.selectedIndex = 0;
            }
            this.recalcularlineas();
            
            if(factura.cliente){
              
              this.porcentajeExoneracion = (factura.cliente.porcentajeExoneracion) ? factura.cliente.porcentajeExoneracion: 0;
              this.objDataCliente.nombre = factura.cliente.nombre;
              this.objDataCliente.nombreComercial = (factura.cliente.nombrecomercial) ? factura.cliente.nombrecomercial: '';
              this.objDataCliente.id = factura.cliente.idcliente;
              this.objDataCliente.cedula = factura.cliente.cedula;
              this.objDataCliente.telefono = factura.cliente.telefono;
              this.objDataCliente.correo = factura.cliente.correo;
              this.objDataCliente.numero_cliente = factura.cliente.numero_cliente;
              this.descuentoCliente = Number(factura.cliente.descuento);
              if(factura.plazo_credito > 0){
                this.plazo_credito = Number(factura.plazo_credito);
                this.objFactura.plazo_credito = Number(factura.plazo_credito);
              } else {
                this.plazo_credito = 0;
                this.objFactura.plazo_credito = 0;
              }
  
  
              /*this.objDataCliente.limi_credit = factura.cliente.limi_credi ? factura.cliente.limi_credi : 0; 
              this.objDataCliente.saldo = factura.cliente.saldo ? factura.cliente.saldo : 0; 
              this.objDataCliente.d15 = factura.cliente.vence1 ? factura.cliente.vence1 : 0; 
              this.objDataCliente.d30 = factura.cliente.vence2 ? factura.cliente.vence2 : 0; 
              this.objDataCliente.d45 = factura.cliente.vence3 ? factura.cliente.vence3 : 0; 
              this.objDataCliente.d60 = factura.cliente.vence4 ? factura.cliente.vence4 : 0; 
              this.objDataCliente.d90m = factura.cliente.vence5 ? factura.cliente.vence5 : 0;
  
              this.objDataCliente.enplazo = (Number(this.objDataCliente.saldo) - (Number(this.objDataCliente.d15) + Number(this.objDataCliente.d30) + Number(this.objDataCliente.d45) + Number(this.objDataCliente.d60) + Number(this.objDataCliente.d90m))).toFixed(2);
              this.saldoDisponible = Number(this.objDataCliente.limi_credit) - Number(this.objDataCliente.saldo);*/
  
              this.objDataCliente.limi_credit = factura.cliente.limi_credi ? factura.cliente.limi_credi : 0; 
              this.objDataCliente.saldo = factura.cliente.saldo ? factura.cliente.saldo : 0; 
              this.objDataCliente.d15 = factura.cliente.vence1 ? factura.cliente.vence1 : 0; 
              this.objDataCliente.d30 = factura.cliente.vence2 ? factura.cliente.vence2 : 0; 
              this.objDataCliente.d45 = factura.cliente.vence3 ? factura.cliente.vence3 : 0; 
              this.objDataCliente.d60 = factura.cliente.vence4 ? factura.cliente.vence4 : 0;
              this.objDataCliente.d90m = factura.cliente.vence5 ? factura.cliente.vence5 : 0;
              this.objDataCliente.enplazo = (Number(this.objDataCliente.saldo) - (Number(this.objDataCliente.d15) + Number(this.objDataCliente.d30) + Number(this.objDataCliente.d45) + Number(this.objDataCliente.d60) + Number(this.objDataCliente.d90m))).toFixed(2);
              this.saldoDisponible = (Number(this.objDataCliente.limi_credit) - Number(this.objDataCliente.saldo)).toFixed(2);
            
              // valores FORMATEADOS
              this.objDataCliente.limi_credit = factura.cliente.limi_credi ? this.formatNumber(factura.cliente.limi_credi) : '0,00'; 
              this.objDataCliente.saldo = factura.cliente.saldo ? this.formatNumber(factura.cliente.saldo) : '0,00'; 
              this.objDataCliente.d15 = factura.cliente.vence1 ? this.formatNumber(factura.cliente.vence1) : '0,00'; 
              this.objDataCliente.d30 = factura.cliente.vence2 ? this.formatNumber(factura.cliente.vence2) : '0,00'; 
              this.objDataCliente.d45 = factura.cliente.vence3 ? this.formatNumber(factura.cliente.vence3) : '0,00'; 
              this.objDataCliente.d60 = factura.cliente.vence4 ? this.formatNumber(factura.cliente.vence4) : '0,00';
              this.objDataCliente.d90m = factura.cliente.vence5 ? this.formatNumber(factura.cliente.vence5) : '0,00';
              this.objDataCliente.enplazo = this.formatNumber(Number(Number(this.objDataCliente.enplazo).toFixed(2)));
              this.saldoDisponible = this.formatNumber(Number(Number(this.saldoDisponible).toFixed(2)));
              this.saldoDisponibleNumber = Number(this.objDataCliente.limi_credit) - Number(this.objDataCliente.saldo);
              this.nombreClientePendientes = factura.cliente.cliente_nombre && factura.cliente.cliente_nombre.length > 0 ? factura.cliente.cliente_nombre: factura.cliente.cliente_nombre_comercial;
              
  
  
              this.nombreClientePendientes = factura.cliente.cliente_nombre && factura.cliente.cliente_nombre.length > 0 ? factura.cliente.cliente_nombre: factura.cliente.cliente_nombre_comercial;
            
  
              // (Number(factura.plazo_credito) > 0) ? factura.cliente.plazo_credito: 0;
              //this.objDataCliente.plazo_credito = response.cliente[0].plazo_credito;
              this.objFactura.idcliente = this.objDataCliente.id;
              //
              this.objFactura.tipo_factura = '01';
              (document.getElementById('nombreCliente') as HTMLInputElement).value = this.objDataCliente.nombre;
              (document.getElementById('nombreComercialCliente') as HTMLInputElement).value = this.objDataCliente.nombreComercial;
              (document.getElementById('cedulaCliente') as HTMLInputElement).value = this.objDataCliente.cedula;
              (document.getElementById('correoCliente') as HTMLInputElement).value = this.objDataCliente.correo;
              (document.getElementById('telefonoCliente') as HTMLInputElement).value = this.objDataCliente.telefono;
              
              //this.condicionVenta = 
              /*this.objDataCliente = {
                nombre: '',
                cedula: '',
                query: '',
                id: '',
                correo: '',
                telefono: '',
                nombreComercial: ''
              };*/
            }
            
          },
          err => {
  
            const {status, error} = err;
            const {message} = JSON.parse(error);
  
            Swal.fire('Obtener Proforma', message, 'error');
          })
        } else {
          this.facturaService.cargarLineasTemporales()
          .subscribe(response => {
           
            this.arrayDetalles = JSON.parse(response)
            if(this.arrayDetalles[0] && this.arrayDetalles[0].idcliente){
              const {idcliente} = this.arrayDetalles[0];
              
              this.objFactura.idcliente = idcliente
              console.log("this.objFactura.idcliente",this.objFactura.idcliente);
              this.buscarCliente(idcliente);
              if(idcliente == 1){
                this.objFactura.tipo_factura = '04';
              } else {
                this.objFactura.tipo_factura = '01';
              }
              (document.getElementById('nombreCliente') as HTMLInputElement).value = this.objDataCliente.nombre;
              (document.getElementById('nombreComercialCliente') as HTMLInputElement).value = this.objDataCliente.nombreComercial;
              (document.getElementById('cedulaCliente') as HTMLInputElement).value = this.objDataCliente.cedula;
              (document.getElementById('correoCliente') as HTMLInputElement).value = this.objDataCliente.correo;
              (document.getElementById('telefonoCliente') as HTMLInputElement).value = this.objDataCliente.telefono;
            }

            this.recalcularlineas();
          },
          err => {
            const {status, error} = err;
            const {message} = JSON.parse(error);
            Swal.fire('Cargar lineas', message?message:'Error al cargar las lineas', 'error');
          })
        }
      })
    } , err => {
      const {status, error} = err;
      const {message} = JSON.parse(error);
      Swal.fire('Cargar información...', message, 'error');
    })

    this.cargarDatosDefault();

    (document.getElementById("existencia") as HTMLInputElement).disabled = true;
    (document.getElementById("txt_precioproducto") as HTMLInputElement).disabled = true;
    const selectProductos = (document.getElementById("selectProducto") as HTMLSelectElement);
    const btnPendientes = (document.getElementById("btnPendientes") as HTMLButtonElement); 
    //const selectCodigo = (document.getElementById("selectCodigo") as HTMLSelectElement);
//selectCodigo
    const selectProductosChange = fromEvent(selectProductos,'change');
    //const btnPendientesClick = fromEvent(btnPendientes,'click');
    //const selectCodigoChange = fromEvent(selectCodigo,'change');
    window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }
    })

    selectProductosChange.subscribe((e: any) => {
      
      const idproducto = e.target.value;
      for(let producto of this.listaProductosCargados){
        
        if(idproducto == producto.idproducto  ){
          this.listaProductos =[];
          this.listaProductos.push(producto) ;
          this.precio = Number(Number(this.listaProductos[0].precio_producto).toFixed(2));
          this.facturaService.obtenerExistencia(idproducto,this.idebodegaSeleccionada).subscribe(response => {
            const respuesta = JSON.parse(response);  
            console.log(respuesta);
            this.existencia = (respuesta.existencia.length == 0)? null: respuesta.existencia[0].existencia_actual;
        })
        }  
      }
    })

    /*selectCodigoChange.subscribe((e: any) => {
      const idproducto = e.target.value;
      for(let producto of this.listaProductosCargados){

        if(idproducto  == producto.idproducto  ){
          this.listaProductos =[];
          this.listaProductos.push(producto) ;
          this.precio = Number(Number(this.listaProductos[0].precio_producto).toFixed(2));

          this.facturaService.obtenerExistencia(idproducto).subscribe(response => {
            const respuesta = JSON.parse(response);  
            console.log(respuesta);
            this.existencia = (respuesta.existencia.length == 0)? null: respuesta.existencia[0].existencia_actual;
              
          })
        }  
      }
    })*/
    
  }

  eliminarLineas() {
    if(this.arrayDetalles.length > 0){
      this.facturaService.eliminarLineas().subscribe(response => {
        this.limpiarLinasYtotales();
      },err => {
        console.log(err);
        const {error} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Eliminar líneas', message, 'error');
      })
    }
  }

  cargarProductosPorIdBodega(idbodega: number,click: boolean,select: boolean) {

    let existencia = null;
    if(click && !select){
      existencia = !this.filtrarExistencia;
    } 

    if(!click && select) {
      console.log("aqui")
      this.filtrarExistencia = false;
      existencia = this.filtrarExistencia; 
    }

    if(!click && !select) {
      existencia = this.filtrarExistencia;
    }
    this.facturaService.obtenerProductosPorIdBodega(idbodega,Number(existencia))
      .subscribe(response => {
        this.listaProductosCargados = JSON.parse(response);
        console.log(this.listaProductosCargados)
      },err => {
        const {error} = err;
       Swal.fire('Cargas Productos', error.message, 'error');
       
      })

  }
  validarTamanoMaximo (e: any) {

    if(e.target.value.length > 1000){
      this.objFactura.notas = e.target.value.substring(0,999);
    }
  }

  obtenerBodegas(){
    this.facturaService.obtenerBodegas()
      .subscribe(response => {
        const {bodegas,bodegaUsuario,idemisor} = JSON.parse(response);
        this.bodegas = bodegas;

        if(Number(idemisor) !== 41) {
          this.idebodegaSeleccionada = bodegaUsuario;
          this.cargarProductosPorIdBodega(Number(this.idebodegaSeleccionada),false,false);
        } else {
          this.mostrarCheckBox = true;
          
          if(this.bodegas.length > 1) {
            
            this.mostrarBodegas = true;
            this.idebodegaSeleccionada = bodegaUsuario;
            this.cargarProductosPorIdBodega(Number(this.idebodegaSeleccionada),false,false);
          } else {
            this.idebodegaSeleccionada = bodegaUsuario;
            this.cargarProductosPorIdBodega(Number(this.idebodegaSeleccionada),false,false);
          }
        }
      },
      err => {
        const {error} = err;
       Swal.fire('Cargas Bodegas', error.message, 'error'); 
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
        for (const impuesto in this.tipoImpuesto) {
          if (this.tipoImpuesto[impuesto].id == idImpuesto) {
            if (this.tipoImpuesto[impuesto].porcentaje_impuesto < 10) {
              porcentajeAplicado = parseFloat('0.0' + this.tipoImpuesto[impuesto].porcentaje_impuesto.toString());
            } else {
              porcentajeAplicado = parseFloat('0.' + this.tipoImpuesto[impuesto].porcentaje_impuesto.toString());
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

  obtenerCategorias() {
    this.productoService.obtenerCategorias()
      .subscribe((response: any) => {
        this.listaCategorias = response.categorias;
      },
      err => console.log(err));
  }

  obtenerImpuesto() {
    this.productoService.obtenerImpuestos()
      .subscribe((response: any) => {
        console.log(response);
        this.tipoImpuesto = response.impuestos;
        console.log(this.tipoImpuesto);
      },
      err => console.error(err));
  }

  obtenerUnidadesMedida() {
    this.productoService.obtenerUnidadesMedida()
      .subscribe((response: any) => {
        this.unidadesMedida = response.unidades;
      },
      err => console.log(err));
  }
  obtenerDescuentos() {
    this.nombrecomercial = localStorage.getItem("nombrecomercial") && localStorage.getItem("nombrecomercial").length > 0 ?localStorage.getItem("nombrecomercial").toUpperCase(): '';
    //console.log(this.nombrecomercial)
   // if (this.nombrecomercial !='RELLACSA'){
      this.descuentoService.obtenerDescuentos()
      .subscribe((response: any) => {
        this.descuentos = response.descuentos;
        console.log(this.descuentos)
      },
      err => console.error(err));
    //}
    
  }

  obtenerProvincias() {
    this.clienteService.obtenerProvincias()
      .subscribe((response: any) => {
        this.provincia = response.provincias;
      },
      err => console.error(err));
  }

  obtenerCantones(idProvincia) {
    this.clienteService.obtenerCantones(idProvincia)
      .subscribe((response: any) => {
        this.canton = response.cantones;
      },
      err => console.error(err));
  }

  obtenerDistritos(idcanton, idprovincia) {
    const obj = {
      idcanton,
      idprovincia
    };

    this.clienteService.obtenerDistritos(obj)
      .subscribe((response: any) => {
        this.distrito = response.distritos;
      },
      err => console.error(err));
  }

  obtenerBarrios(idcanton, idprovincia, iddistrito) {

    const obj = {
      idcanton, idprovincia, iddistrito
    };

    this.clienteService.obtenerBarrios(obj)
      .subscribe((response: any) => {
        this.barrio = response.barrios;
      },
      err => console.error(err));
  }

  cargarProductos() {
    
    const type = 'like';    
    this.productoService.obtenerProducto('', type)
      .subscribe((response: any) => {
        console.log(response);
        this.listaProductosCargados = response;
        // console.log("productos ",this.listaProductosCargados);
        // this.cargarDatosLinea();
      },
    err => console.log(err));
    
  }

  limpiarDescripcion() {
    const codigoProducto = (document.getElementById("txt_codigoProducto") as HTMLInputElement);
    const nombreProducto = (document.getElementById('txt_nombreProducto') as HTMLInputElement);
    if(codigoProducto.value == '') nombreProducto.value = '';
  }

  cargarDatosLinea() {

    try {
      const codigoProducto = (document.getElementById("selectCodigo") as HTMLInputElement).value;
      const nombreProducto = (document.getElementById('selectProducto') as HTMLInputElement).value;
      const campoCantidad = (document.getElementById('cantidadLinea') as HTMLInputElement).value;
      let campoDescuento = (document.getElementById('descuentoLinea') as HTMLSelectElement).value;
      let comboDescuento = (document.getElementById('descuentoLinea') as HTMLSelectElement).value;
      if(campoCantidad.length === 0 || Number(campoCantidad) < 1) return alert("No se puede agregar una línea si la cantidad está vacía o en 0")
      let cantidadTotal = 0;
      let descuentoTotal = 0;
      let impuestoNeto = 0;
      let SinDescuento=0;
      if (campoDescuento== ''){
        campoDescuento=this.listaProductos[0].DescuArt;
        SinDescuento = this.listaProductos[0].SinDescu;
      }
      console.log(campoDescuento);
      //if(this.objDataCliente.id == '' || this.objDataCliente.id == null) return alert("Seleccione un cliente");

      let lineaDetalle = {
        idcliente: this.objDataCliente.id == '' || this.objDataCliente.id == null ? '1': this.objDataCliente.id,
        idfactura: '',
        idproducto: '',
        precio_linea: '',
        cantidad: '',
        descripcioDetalle: '',
        porcentajedescuento: '',
        montodescuento: '',
        naturalezadescuento: '',
        numerolineadetalle: '',
        subtotal: '',
        montototal: '',
        codigobarra_producto: '',
        codigo: '',
        codigo_tarifa: '',
        codigo_servicio: '',
        tipo_servicio: '',
        tarifa: '',
        unidadMedida: '',
        unidadMedidaComercial: '',
        monto: '',
        baseimponible: '',
        impuesto: '',
        impuesto_neto: '',
        numerodocumento: '',
        montoitotallinea: '',
        MontoExoneracion: '',
        PorcentajeExonerado: '',
        SinDescu: 0,
        otrosCargos: 0,
        idlinea: nanoid()
      };

      let MontoExoneracion = '';
      
      if (campoCantidad.length > 0) {
        cantidadTotal = Number(campoCantidad);
      }

      if(Number(this.descuentoCliente) > Number(campoDescuento) && SinDescuento == 0 ) { // valida q el descuento al cluente sea mayor al del articulo SYN
          descuentoTotal = Number(this.descuentoCliente);
          lineaDetalle.naturalezadescuento = 'Descuento Cliente';
          //lineaDetalle.porcentajedescuento = this.descuentoCliente.toFixed(0);
          lineaDetalle.porcentajedescuento = String(this.descuentoCliente); //modificado x SYN
          lineaDetalle.SinDescu = SinDescuento;
      } else {

        if (Number(campoDescuento) > 0) {
          if (comboDescuento== ''){
            if (SinDescuento==1){
              lineaDetalle.naturalezadescuento = 'DESCUENTO CLIENTE';
              lineaDetalle.porcentajedescuento = '0';
              descuentoTotal = 0;
              lineaDetalle.SinDescu = SinDescuento;
            }else{
              lineaDetalle.naturalezadescuento = 'DESCUENTO CLIENTE';
              lineaDetalle.porcentajedescuento = campoDescuento;
              descuentoTotal = Number(campoDescuento);
              lineaDetalle.SinDescu = SinDescuento;
            }
          }else{
            for (const des in this.descuentos) {
              if (campoDescuento == this.descuentos[des].descripcion) {
                descuentoTotal = Number(this.descuentos[des].porcentaje);
                lineaDetalle.naturalezadescuento = campoDescuento;
                lineaDetalle.porcentajedescuento = this.descuentos[des].porcentaje;
                lineaDetalle.SinDescu = SinDescuento;
              }
            }
          }
        } else {
          lineaDetalle.naturalezadescuento = '';
          lineaDetalle.porcentajedescuento = '0';
          lineaDetalle.SinDescu = SinDescuento;
        }
      }

      console.log(lineaDetalle);

      if (nombreProducto != '' || codigoProducto != '') {
    
        console.log("igual ",nombreProducto);
            // tslint:disable-next-line: max-line-length
            const montototal = parseFloat(this.listaProductos[0].precio_producto) * cantidadTotal;
            const descuentoAplicado = (descuentoTotal / 100 ) * Number(montototal);
            const subtotal = montototal - descuentoAplicado;
            //const subtotal = montototal; //CAMBIO X SYN
            let monto = 0;
            let baseImponible = 0;
            let impuestoTotal = null;
           
            let impuestoExonerado = 0;
            // const totalLinea = subtotal - (descuentoAplicado) + Number(impuestoTotal);
            /*if (this.listaProductos[0].codigo_impuesto == '01' || this.listaProductos[0].codigo_impuesto == '07') {
                if (this.listaProductos[0].codigo_impuesto == '07') {
                  baseImponible = this.listaProductos[0].precio_producto;
                  monto = baseImponible * Number(this.listaProductos[0].porcentaje_impuesto);
                }
            } else {
              monto = subtotal * Number(this.listaProductos[0].porcentaje_impuesto);
            }*/

            //baseImponible = this.listaProductos[0].precio_producto;

            /*if(this.listaProductos[0].codigo_impuesto == '01'){ // PRODUCTO EXENTO DE IMPUESTO
              impuestoExonerado = (parseFloat(this.listaProductos[0].porcentaje_impuesto) * 0) /100;
              MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
            } else {
              impuestoExonerado = (parseFloat(this.listaProductos[0].porcentaje_impuesto) * this.porcentajeExoneracion) / 100;
              MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
            }*/

            if(this.listaProductos[0].codigo_impuesto == '01'){ 
              MontoExoneracion = '0';
              impuestoExonerado = 0;
              impuestoTotal = subtotal * (parseFloat(this.listaProductos[0].porcentaje_impuesto) / 100);
              monto = impuestoTotal;
              impuestoNeto = impuestoTotal - Number(MontoExoneracion);
            } else {

              if( Number(this.porcentajeExoneracion) === 0) {

                impuestoExonerado = 0;
                MontoExoneracion = '0.00';
                impuestoTotal = subtotal * (parseFloat(this.listaProductos[0].porcentaje_impuesto) / 100);
                monto = impuestoTotal;
                impuestoNeto = impuestoTotal - Number(MontoExoneracion);
              }
              
              else if(Number(this.porcentajeExoneracion) > Number(this.listaProductos[0].porcentaje_impuesto)){
                impuestoTotal = subtotal * (parseFloat(this.listaProductos[0].porcentaje_impuesto) / 100);
                monto = impuestoTotal;
                impuestoExonerado = this.listaProductos[0].porcentaje_impuesto;
                MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
                impuestoNeto = impuestoTotal - Number(MontoExoneracion);

              } else {
                impuestoTotal = subtotal * (parseFloat(this.listaProductos[0].porcentaje_impuesto) / 100);
                monto = impuestoTotal;
                impuestoExonerado = this.porcentajeExoneracion;
                MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
                impuestoNeto = impuestoTotal - Number(MontoExoneracion);
              }
              /*
                impuestoExonerado = this.porcentajeExoneracion;
                MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
                dfsdfd
              */
            }

            console.log("producto ", this.listaProductos);


            
            
            console.log("length",this.arrayDetalles.length);
            let totalLinea = subtotal + Number(impuestoNeto); //CAMBIO SYN -descuentoAplicado
            if (Number(lineaDetalle.porcentajedescuento) > 0) {
              lineaDetalle.montodescuento = descuentoAplicado.toFixed(2)
            }else {
              lineaDetalle.montodescuento = '0'
            }
            lineaDetalle.idproducto = this.listaProductos[0].idproducto,
            lineaDetalle.precio_linea = String(parseFloat(this.listaProductos[0].precio_producto).toFixed(2)),
            lineaDetalle.cantidad = cantidadTotal.toString(),
            lineaDetalle.descripcioDetalle = this.listaProductos[0].descripcion,
            // lineaDetalle.porcentajedescuento = '0',
            
           // lineaDetalle.naturalezadescuento = '',
            lineaDetalle.numerolineadetalle = String(this.arrayDetalles.length  + 1),
            lineaDetalle.subtotal = subtotal.toFixed(2),
            lineaDetalle.montototal = montototal.toFixed(2),
            lineaDetalle.codigo = '01', // codigo del impuesto, siempre se envia el 01 o 07
            lineaDetalle.codigo_tarifa = this.listaProductos[0].codigo_impuesto, // codigo de la tarifa para base imponible
            lineaDetalle.tarifa = this.listaProductos[0].porcentaje_impuesto, // porcentaje aplicado para el impuesto
            lineaDetalle.monto = impuestoTotal.toFixed(2),
            lineaDetalle.baseimponible = baseImponible.toFixed(2), // baseImponible.toFixed(2),
            // tslint:disable-next-line: max-line-length
            lineaDetalle.impuesto = impuestoTotal.toFixed(2),
            lineaDetalle.impuesto_neto = impuestoNeto.toFixed(2),
            lineaDetalle.numerodocumento = '0',
            lineaDetalle.unidadMedida = this.listaProductos[0].unidad_medida;
            lineaDetalle.unidadMedidaComercial = this.listaProductos[0].unidad_medida_comercial;
            lineaDetalle.tipo_servicio = this.listaProductos[0].tipo_servicio;
            lineaDetalle.codigo_servicio = this.listaProductos[0].codigo_servicio;
            lineaDetalle.otrosCargos = subtotal * .10;
            lineaDetalle.PorcentajeExonerado = Number(impuestoExonerado).toFixed(2);
            // tslint:disable-next-line: max-line-length
            
            lineaDetalle.montoitotallinea = totalLinea.toFixed(2);
            lineaDetalle.MontoExoneracion = MontoExoneracion;
            lineaDetalle.codigobarra_producto = this.listaProductos[0].codigobarra_producto;
            lineaDetalle.numerolineadetalle = (this.arrayDetalles.length +1).toString();
            // this.0Factura.ordenes.push(this.lineaDetalle);
          
            //SE DEBE APLICAR LA EXONERACION POR CADA ORDEN DE LA FACTURA
            //limpiar valores 

            this.facturaService.agregarLineaTemporal(lineaDetalle)
              .subscribe(() => {
                this.arrayDetalles.push(lineaDetalle);
                console.log('array detallles',this.arrayDetalles);
                this.numeroLinea += 1;
                this.listaProductos = [];
                this.cargarProducto();

                (document.getElementById("selectProducto") as HTMLSelectElement).value = '';
                (document.getElementById('selectCodigo') as HTMLSelectElement).value = '';
                (document.getElementById("txt_precioproducto") as HTMLInputElement).value = '';
                (document.getElementById("cantidadLinea") as HTMLInputElement).value = '';
                (document.getElementById("existencia") as HTMLInputElement).value = '';
                (document.getElementById("descuentoLinea") as HTMLSelectElement).value = '';
               
              },err=>{
                const {error,status} = err;
                const {message} = JSON.parse(error);
                Swal.fire('Agregar Linea',message?message: 'Error al agregar la linea');
              })
      } 
    } catch (err) {
      console.log(err);
    }
  }


  obtenerTotalesFactura() {

    // VARIABLES PARA OBTENER LOS TOTALES DE FACTURA

    
    let monto_descuento_total = Number(this.totalDescuento);
    let porcentaje_descuento_total = (Number(monto_descuento_total) * 100 ) / Number(this.totalPagar);
    const subtotal = Number(this.SubtotalComprobante);
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
    const totaldescuentos = parseFloat(this.totalDescuento);;
    let totalventaneta = 0;
    let totalimpuesto = 0;
    let OtrosCargos = 0;
    let totalOtrosCargos = 0;
    let totalcomprobante = 0;
    let montototal = 0;
    let impuestoLinea = 0;
    let valorImpuestoExonerado = 0;
    let ordenes = this.arrayDetalles;
    let totGravado=0;
    // tslint:disable-next-line: forin
    
    for (const linea in ordenes) {
  //    console.log("linea ",ordenes[linea]);
      OtrosCargos += ordenes[linea].otrosCargos;
      montototal = parseFloat(ordenes[linea].montototal);
      const tarifa = ordenes[linea].tarifa;
      let tarifaAplicada = 0;
    
      if (ordenes[linea].codigo == '01' || ordenes[linea].codigo == '07') { // codigo del impuesto
        //Obtener el monto de impuesto exonerado      
        //
          if (ordenes[linea].codigo_tarifa == '01'){ // productos exentos del IVA
            if (ordenes[linea].tipo_servicio == '01') {
              console.log("Producto exento")
              // servicios
              // tslint:disable-next-line: max-line-length
              totalservexentos += montototal;
              totalexento  += montototal;
              // tslint:disable-next-line: max-line-length
            }
  
            if (ordenes[linea].tipo_servicio == '02') { //Mercancía
              // mercancías
              // tslint:disable-next-line: max-line-length
              totalmercanciasexentas += montototal; 
              totalexento  += montototal;
              // tslint:disable-next-line: max-line-length
            }
  
            impuestoLinea = parseFloat(ordenes[linea].impuesto_neto);
            totalimpuesto += impuestoLinea;
          } else {
              // Aplica IVA
            if (ordenes[linea].tipo_servicio == '01') {
              console.log("Producto servicio")
              // servicios
              /*totalservexonerado +=   (( this.porcentajeExoneracion *100/13) /(13*100/13));
              totalexonerado +=totalservexonerado * montototal;*/
             /* totalservgravados = (1-(this.porcentajeExoneracion *100/tarifa) /(tarifa*100/tarifa));
              console.log("totalservgravados" ,totalservgravados)
             // let indiceDecimal = totalservexentos.toString().indexOf('.');
              //let decimales = totalservgravados.toString().substr(indiceDecimal + 1, 5); //round5
             // console.log(round5(Number(totalservgravados))); 
              totalservgravados=  totalservgravados * montototal;
              //totalservgravados = round5(Number(totalservgravados)); 
              totalgravado += totalservgravados;
              totalservexonerado +=  montototal  - totalservgravados;
              totalexonerado +=totalservexonerado;*/
              //totalservgravados += round1(((Number(this.porcentajeExoneracion) * 100 /100)/ parseFloat(tarifa))) * montototal;
              // console.log("antes",((Number(this.porcentajeExoneracion) * 100 /100)/ parseFloat(tarifa)))
             // totalservgravados = round1(totalservgravados);

              
              if(this.porcentajeExoneracion > tarifa){
                tarifaAplicada = tarifa;
              } else {
                tarifaAplicada = this.porcentajeExoneracion
              }
              const tarifaLinea = tarifa == 0? 0 :(((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
              //const tarifaLinea = (((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
              const tarifaExoneradas = tarifaLinea; //Math.round(tarifaLinea * 100000) / 100000;
              const valorRedondeadoExonerado = tarifaExoneradas * montototal;
              console.log("tarifa exonerada ",tarifaExoneradas);
              console.log("exonerado ",valorRedondeadoExonerado);
              let tarifaLineaGravados = tarifa == 0 ? 0 : (1- ((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
              //const tarifaLineaGravados = (1- ((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
              const tarifaGravados = tarifaLineaGravados;//Math.round(tarifaLineaGravados * 100000) / 100000;
              const valorRedondeadoGravado = tarifaGravados * montototal;

              totalservexonerado += Math.round(valorRedondeadoExonerado * 100000) / 100000;
              totalservgravados += Math.round(valorRedondeadoGravado * 100000) / 100000;
          
              //totalgravado += totalservgravados;
              //totalexonerado += totalservexonerado;
              // totalservexentos +=  totalservgravados * montototal; 
              // console.log("despues",totalservgravados)

            }
  
            if (ordenes[linea].tipo_servicio == '02') {
              console.log("Producto mercancia")          
              // mercancías
          //round(0.92307, 5);
              
              //totalmercanciaexonerada += (this.porcentajeExoneracion * 100 /13) / (13 * 100 / 13);
             // totalmercanciasgravadas = (1-(this.porcentajeExoneracion *100/tarifa) /(tarifa*100/tarifa));
              //totalmercanciasgravadas = totalmercanciasgravadas * montototal;
              //totalgravado += totalmercanciasgravadas;
              //totalmercanciaexonerada += montototal - totalmercanciasgravadas;
              //totalexonerado +=totalmercanciaexonerada;

              if(this.porcentajeExoneracion > tarifa){
                tarifaAplicada = tarifa;
              } else {
                tarifaAplicada = this.porcentajeExoneracion
              }

              const tarifaLinea = tarifa== 0? 0 : (((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
             //const tarifaLinea = (((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
             const tarifaExoneradas = tarifaLinea; //Math.round(tarifaLinea * 100000) / 100000;
             const valorRedondeadoExonerado = tarifaExoneradas * montototal;
              console.log("tarifa exonerada ",tarifaExoneradas);
              console.log("exonerado ",valorRedondeadoExonerado);
              let tarifaLineaGravados = tarifa == 0 ? 0: (1- ((Number(tarifaAplicada) * 100 /100)/ Number(tarifa)));
             //const tarifaLineaGravados = (1- ((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
             const tarifaGravados = tarifaLineaGravados;//Math.round(tarifaLineaGravados * 100000) / 100000;
             const valorRedondeadoGravado = tarifaGravados * montototal;

             totalmercanciaexonerada += Math.round(valorRedondeadoExonerado * 100000) / 100000;
             totalmercanciasgravadas += Math.round(valorRedondeadoGravado * 100000) / 100000;
              
            }
            impuestoLinea = parseFloat(ordenes[linea].impuesto_neto);
            totalimpuesto += impuestoLinea;

          }

          totalexonerado = totalservexonerado + totalmercanciaexonerada;
          totalgravado = totalservgravados + totalmercanciasgravadas;
          
      } 
    }
    const impServicio = (document.getElementById("impServicio") as HTMLSelectElement).value;
    if(impServicio == 'si'){
      totalOtrosCargos = OtrosCargos;
    } else {
      totalOtrosCargos = 0;
    }

    console.log("idlciente",this.objFactura.idcliente);
    totalventa = totalgravado + totalexento + totalexonerado;
    totalventaneta = totalventa - totaldescuentos;
    totalcomprobante = totalventaneta + totalimpuesto + totalOtrosCargos;
    // CARGAR EL OBJETO PARA GUARDAR LA FACTURA
    //this.objFactura.id = '',
    this.objFactura.porcentaje_descuento_total = porcentaje_descuento_total.toFixed(2),
    this.objFactura.monto_descuento_total = monto_descuento_total.toFixed(5),
    this.objFactura.subtotal = subtotal.toFixed(5),
    this.objFactura.totalservgravados = totalservgravados.toFixed(5),
    this.objFactura.totalservexentos = totalservexentos.toFixed(5),
    this.objFactura.totalservexonerado = totalservexonerado.toFixed(5),
    this.objFactura.totalmercanciasgravadas = totalmercanciasgravadas.toFixed(5),
    this.objFactura.totalmercanciasexentas = totalmercanciasexentas.toFixed(5),
    this.objFactura.totalmercanciaexonerada = totalmercanciaexonerada.toFixed(5),
    this.objFactura.totalgravado = totalgravado.toFixed(5),
    this.objFactura.totalexento = totalexento.toFixed(5),
    this.objFactura.totalexonerado = totalexonerado.toFixed(5),
    this.objFactura.totalventa = totalventa.toFixed(5),
    this.objFactura.totaldescuentos = Number(totaldescuentos).toFixed(5),
    this.objFactura.totalventaneta = totalventaneta.toFixed(5),
    this.objFactura.totalimpuesto = Number(totalimpuesto).toFixed(5),
    this.objFactura.totalcomprobante = Number(totalcomprobante).toFixed(5),
    this.objFactura.otrosCargos = totalOtrosCargos.toFixed(5);
    //this.objFactura.codigomoneda = ,
    this.objFactura.objOrdenes = this.generarJsonDetalles();
    this.objFactura.ordenes = ordenes;
    this.objFactura.tipocambio =this.tipoCambio;

    if(this.objFactura.condicion_venta != '02'){
      this.objFactura.plazo_credito  = 0; 
    }
    //this.objFactura.tipocambio = '1.00';
    const obj = {
      ordenes: this.objFactura.ordenes,
      factura: this.objFactura,
      objOrdenes: this.objFactura.objOrdenes,
      tipo : this.tipoEnvio
    };

    return obj;
  }

  

  generarFactura() {
        
    let obj = this.obtenerTotalesFactura();
    obj.factura.idbodega = this.idebodegaSeleccionada.toString();
    if(this.arrayDetalles.length === 0) return alert("Debe cargar al menos una línea para poder generar la factura");

    this.facturaService.nuevoComprobante(obj)
      .subscribe((response: any) => {
        //'/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo + '&listaCorreos=' + obj.listaCorreos + '&tipoFactura=' + obj.tipo_factura+'&token='+this.token);
        console.log(response.idfactura)
        const idfactura = response.idfactura;
          //enviar el correode la factura 


          //--------------------------------------------------------------------
          //aqui se procesa la factura
          const correoCliente = this.objDataCliente.correo+',';
          this.tipoProforma = 'profGuadar';
          this.mostrar = false;
          this.arrayDetalles = [];
          this.totalPagar = '0';
          this.totalImpuesto = '0';
          this.totalDescuento = '0';
          this.SubtotalComprobante = '0';
          this.totalImpuestoNeto = '0';
          this.cargarDatosDefault();
          this.limpiarLineaDetalle();
          this.limpiarTotalesFactura();
          (document.getElementById("selectProducto") as HTMLSelectElement).value = '';
          (document.getElementById("selectCodigo") as HTMLSelectElement).value = '';
          (document.getElementById("cantidadLinea") as HTMLInputElement).value= '';
          this.quitarCliente();
          this.mostrar = false;
          this.mostrarMensajeProceso();
          this.tipoProforma = 'profGuadar';

          const enviarCorreo =  response.tipo_factura == '01' ? true: false;

          this.facturaService.procesarComprobanteElectronico(obj)
            .subscribe(response => {
           

              if(enviarCorreo) {
                this.facturaService.enviarCorreo({
                  id: idfactura, 
                  tipo: '02',
                  listaCorreos: correoCliente,
                  tipo_factura: '01'
                }).subscribe(() => {
                  //Swal.fire('Comprobante enviado', response.message, 'success')
                },
                () => {
                  //const {error, status} = err;
                })
              } 
            },  
            err => {
              const {error, status} = err;
              Swal.fire('Generar Factura', error.err, 'error');

              this.arrayDetalles = [];
              this.totalPagar = '0';
              this.totalImpuesto = '0';
              this.totalDescuento = '0';
              this.SubtotalComprobante = '0';
              this.totalImpuestoNeto = '0';
              this.cargarDatosDefault();
              this.limpiarLineaDetalle();
              this.limpiarTotalesFactura();
              (document.getElementById("selectProducto") as HTMLSelectElement).value = '';
              (document.getElementById("selectCodigo") as HTMLSelectElement).value = '';
              (document.getElementById("cantidadLinea") as HTMLInputElement).value= '';
              this.quitarCliente();
              this.mostrar = false;
              this.mostrarMensajeProceso();
              this.tipoProforma = 'profGuadar';
            })

          //-----------------------------------------------------------------

          if(this.tablaPequena) { // esta en responsive
            //descargar el reporte
            this.facturaService.descargarReporteFacturaPDF(Number(response.idfactura));

            this.posService.obtenerReporte().subscribe(posResponse => {
              const datosRespuesta = JSON.parse(posResponse);
              this.pdfURL = datosRespuesta.path;
              const pestana = window.open(this.pdfURL, '_blank');
              pestana.focus();
             
            },  
            err => {
              const {error, status} = err;
              Swal.fire('Genear reporte', error.message, 'error');
            })
          } else {

            this.posService.obtenerReporte().subscribe(posResponse => {
            
              const datosRespuesta = JSON.parse(posResponse);
              //this.pdfURL = ;
              $('#ModalFacturaPdf').modal('show');
              setTimeout(() => {
                
                (document.getElementById("ticket") as HTMLObjectElement).data = datosRespuesta.path;
              },2000)
            },  
            err => {
              const {error, status} = err;
              Swal.fire('Genear reporte', error.message, 'error');
            })
          }

          //----------------------------------------------------------------

          //Limpiar valores


          
         
      },
      err => {
        this.mostrar = false;
        this.mostrarMensajeProceso();
          //Swal.fire('Generar Comprobante', 'No se pudo generar la factura', 'error');  
          this.tipoProforma = 'profGuadar';

          const {error, status} = err;
          if(error.err){
            Swal.fire('Generar Comprobante',error.err , 'error'); 

          }

          if(error.message){
            Swal.fire('Generar Comprobante', error.message, 'error'); 
          }

          this.arrayDetalles = [];
          this.totalPagar = '0';
          this.totalImpuesto = '0';
          this.totalDescuento = '0';
          this.SubtotalComprobante = '0';
          this.totalImpuestoNeto = '0';
          this.cargarDatosDefault();
          this.limpiarLineaDetalle();
          this.limpiarTotalesFactura();
          (document.getElementById("selectProducto") as HTMLSelectElement).value = '';
          (document.getElementById("selectCodigo") as HTMLSelectElement).value = '';
          (document.getElementById("cantidadLinea") as HTMLInputElement).value= '';
          this.quitarCliente();
          this.objFactura.tipo_factura = '04';
          this.objFactura.condicion_venta = '01';
          this.objFactura.medio_pago = '01';
          this.mostrar = false;
          this.mostrarMensajeProceso();
          this.tipoProforma = 'profGuadar';
      });
      //return;
      //this.generarFactura(obj);
  }

  guardarComprobante(){
    
    
    //se debe validar que la diferencia entre saldo disponible y monto de Proforma no sea negativo 
    //this.saldoDisponible = this.saldoDisponible.toString().replace(',','.');
    if(this.arrayDetalles.length === 0) return alert("Debe cargar al menos una línea para generar la proforma");

    let noValido = this.arrayDetalles.filter(linea => linea.idcliente == null || linea.idcliente == '' || linea.idcliente == '1');

    if(noValido[0]) return alert("No se puede generar una proforma si no hay un cliente cargado");


    if(Number(this.saldoDisponibleNumber) - Number(this.totalPagar) < 0 ){

      this.facturaService.obtenerEstadoAutorizadoCliente(Number(this.objDataCliente.id))
        .toPromise().then(response  => {
          const {estado} = JSON.parse(response);

          if(parseInt(estado) === 0){
            Swal.fire('Nueva Proforma','El cliente actual sobrepasa el disponible','warning');
          } else {
                      //console.log('detalles ', this.arrayDetalles);
              this.objFactura.autorizado = true;
              this.objFactura.prefactura = 'SI';
              this.objFactura.tipoProforma =  this.tipoProforma;
              const obj = this.obtenerTotalesFactura();
              console.log(obj); 
              this.facturaService.guardarFactura(obj).subscribe(response => {

                const datosRespuesta = JSON.parse(response);
                // console.log(response);
                  Swal.fire('Generar Proforma', datosRespuesta.message, 'success');
                  //this.limpiarLineaDetalle();
                  this.limpiarTotalesFactura();
                  this.quitarCliente();
                  this.totalImpuestoNeto = '0';
                  this.cargarDatosDefault();
                  this.arrayDetalles = [];
                  this.SubtotalComprobante = '0';
                  this.totalImpuesto = '0';
                  this.totalDescuento = '0';
                  this.totalPagar = '0';
                  this.tipoProforma  = 'profGuadar';
                  this.objFactura.tipoProforma = this.tipoProforma ;
                
                  console.log(datosRespuesta);
                  this.facturaService.descargarReporteProforma(Number(datosRespuesta.idfactura));
              },
              err => {
                const {status, error} = err;
                Swal.fire('Generar Proforma', error.message,'error');
              })
          }
        })
        .catch(err =>{
          Swal.fire('Generar Proforma', err.message,'error');
        })
      
    } else {
        //console.log('detalles ', this.arrayDetalles);
      this.objFactura.prefactura = 'SI';
      this.objFactura.tipoProforma =  this.tipoProforma;
      const obj = this.obtenerTotalesFactura();
      console.log(obj); 
      this.facturaService.guardarFactura(obj).subscribe(response => {

        const datosRespuesta = JSON.parse(response);
        // console.log(response);
          Swal.fire('Generar Proforma', datosRespuesta.message, 'success');
          //this.limpiarLineaDetalle();
          this.limpiarTotalesFactura();
          this.quitarCliente();
          this.totalImpuestoNeto = '0';
          this.cargarDatosDefault();
          this.arrayDetalles = [];
          this.SubtotalComprobante = '0';
          this.totalImpuesto = '0';
          this.totalDescuento = '0';
          this.totalPagar = '0';
          this.tipoProforma  = 'profGuadar';
          this.objFactura.tipoProforma = this.tipoProforma ;
      
          this.facturaService.descargarReporteProforma(Number(datosRespuesta.idfactura));
      },
      err => {
        const {status, error} = err;
        Swal.fire('Generar Proforma', error.message,'error');
      })
    }
  }

  quitarOrden(idlinea) {

    let indice = 0;
    let nuevoSubtotal = 0;
    let nuevoImpuesto = 0;
    let nuevoTotal =  0;
    let nuevoDescuento = 0;
    let nuevoImpuestoNeto = 0;
    // tslint:disable-next-line: forin
    console.log(idlinea)
   

      this.facturaService.eliminarLineaTemporal(idlinea)
      .subscribe(() => {

        this.arrayDetalles = this.arrayDetalles.filter(elemento => elemento.idlinea != idlinea );              
        
        for (let linea of this.arrayDetalles) {
          nuevoSubtotal += Number(linea.subtotal);
          nuevoImpuesto += Number(linea.impuesto);
          nuevoTotal += Number(linea.montoitotallinea);
          nuevoDescuento += Number(linea.montodescuento);
          nuevoImpuestoNeto += Number(linea.impuesto_neto);
        }

        this.objFactura.ordenes = this.arrayDetalles;
        this.totalImpuesto = nuevoImpuesto.toFixed(2);
        this.totalPagar = nuevoTotal.toFixed(2);
        this.totalDescuento = nuevoDescuento.toFixed(2);
        this.SubtotalComprobante = nuevoSubtotal.toFixed(2);
        this.totalImpuestoNeto = nuevoImpuestoNeto.toFixed(2);
        this.objFactura.ordenes = this.arrayDetalles; 

      }, err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Eliminar linea', message?message:'Error al eliminar la linea');
      })   
      
  } 

  limpiarLineaDetalle() {
    this.lineaDetalle.idproducto = '';
    this.lineaDetalle.precio_linea = '',
    this.lineaDetalle.cantidad = '',
    this.lineaDetalle.descripcioDetalle = '',
    this.lineaDetalle.porcentajedescuento = '',
    this.lineaDetalle.montodescuento = '',
    this.lineaDetalle.naturalezadescuento = '',
    this.lineaDetalle.numerolineadetalle = '',
    this.lineaDetalle.subtotal = '',
    this.lineaDetalle.montototal = '',
    this.lineaDetalle.codigo = '',
    this.lineaDetalle.codigo_tarifa = '',
    this.lineaDetalle.tarifa = '',
    this.lineaDetalle.monto = '',
    this.lineaDetalle.baseimponible = '',
    this.lineaDetalle.impuesto = '',
    this.lineaDetalle.impuesto_neto = '',
    this.lineaDetalle.numerodocumento = '',
    this.lineaDetalle.montoitotallinea = '';
  }


  limpiarTotalesFactura() {

    this.objFactura.id = '',
    this.objFactura.idcliente = '1',
    this.objFactura.nombreCliente = '',
    this.objFactura.condicion_venta = '01',
    this.objFactura.medio_pago = '01',
    this.objFactura.porcentaje_descuento_total = '',
    this.objFactura.monto_descuento_total = '',
    this.objFactura.subtotal = '',
    this.objFactura.totalservgravados = '',
    this.objFactura.totalservexentos = '',
    this.objFactura.totalservexonerado = '',
    this.objFactura.totalmercanciasgravadas = '',
    this.objFactura.totalmercanciasexentas = '',
    this.objFactura.totalmercanciaexonerada = '',
    this.objFactura.totalgravado = '',
    this.objFactura.totalexento = '',
    this.objFactura.totalexonerado = '',
    this.objFactura.totalventa = '',
    this.objFactura.totaldescuentos = '',
    this.objFactura.totalventaneta = '',
    this.objFactura.totalimpuesto = '',
    this.objFactura.totalcomprobante = '',
    this.objFactura.codigomoneda = 'CRC',
    // this.objFactura.tipocambio= '',
    this.objFactura.tipo_factura = '04',
    this.objFactura.ordenes = [],
    this.objFactura.objOrdenes = {};
    this.objFactura.notas = ''
    this.objFactura.autorizado = null;
  }
  generarJsonDetalles() {

    let listaDetalles = {};
    let descuento = 0;
    let montototal = 0;
    const subTotal = 0;
    const impuesto = {};
    const descuentoorden = 0;
    let montototallinea = 0;
    const object = {};
    let index = 0;
    let monto_impuesto = 0;
    let porcentaje = '';
    let decimal = '';
    let impuestoNeto = 0;
    const porcentajeExoneracionGlobal = 0;
    // tslint:disable-next-line: forin
    for (const i in this.arrayDetalles) {
      index = index + 1;

      montototal = Number(this.arrayDetalles[i].subtotal);
      descuento = Number(this.arrayDetalles[i].montodescuento);
      // subTotal = Number(this.arrayDetalles[i].total_orden);

      object[index] = {
        codigo    : String(this.arrayDetalles[i].codigo_servicio),
        codigoComercial : {tipo: String(this.arrayDetalles[i].tipo_servicio), codigo: String(this.arrayDetalles[i].codigo_servicio)},
        cantidad        : String(this.arrayDetalles[i].cantidad),
        unidadMedida    : String(this.arrayDetalles[i].unidadMedida),
        detalle         : String(this.arrayDetalles[i].descripcioDetalle),
        precioUnitario  : String(this.arrayDetalles[i].precio_linea),
        montoTotal      : String(montototal)
      };
      if (Number(this.arrayDetalles[i].montodescuento ) > 0) {
        // tslint:disable-next-line: max-line-length
        object[index].descuento = [{montoDescuento: String(this.arrayDetalles[i].montodescuento), naturalezaDescuento: String(this.arrayDetalles[i].naturalezadescuento)}];
      }

      object[index].subtotal        = String(montototal);
      if (this.arrayDetalles[i].codigo == '07' || this.arrayDetalles[i].codigo == '01') {
        if (this.arrayDetalles[i].codigo_tarifa == '07') { // aplicar base imponible
          object[index].baseImponible = String(this.arrayDetalles[i].precio_linea);
        }

        object[index].impuesto = {
          1: {
            codigo: String(this.arrayDetalles[i].codigo),
            codigoTarifa: String(this.arrayDetalles[i].codigo_tarifa),
            tarifa: String(this.arrayDetalles[i].tarifa),
            monto: ''
          }
        };

        if (Number(this.arrayDetalles[i].porcentaje_impuesto) > 9) {
          decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
          porcentaje = '0.' + String(decimal);
          monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
        } else {
          decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
          porcentaje = '0.0' + String(decimal);
          monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
        }
        object[index].impuesto[1].monto = String(monto_impuesto);
        montototallinea = (montototal  + Number(object[index].impuesto[1].monto));
      } else {
        object[index].impuesto = {
          1: {
            codigoTarifa: String(this.arrayDetalles[i].codigo_tarifa),
            tarifa: String(this.arrayDetalles[i].tarifa),
            monto: ''
          }
        };

        if (Number(this.arrayDetalles[i].porcentaje_impuesto) > 9) {
            decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
            porcentaje = '0.' + String(decimal);
            monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
        } else {
            decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
            porcentaje = '0.0' + String(decimal);
            monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
        }

        object[index].impuesto[1].monto = String(monto_impuesto);
        montototallinea = (montototal  + Number(object[index].impuesto[1].monto));
      }

      impuestoNeto = monto_impuesto - Number((monto_impuesto * porcentajeExoneracionGlobal).toFixed(2));
      object[index].impuestoNeto    = String(impuestoNeto);
      /*-----------------------------------------------------------------------------*/

      object[index].montoTotalLinea = String(montototallinea);

      // Agrega el array en formato JSON
      listaDetalles = object;
    }
  
    return listaDetalles;

  }

  cargarProducto() {

     
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
      // tslint:disable-next-line: one-variable-per-declaration
      let subtotal = 0,
          impuestos = 0,
          descuentos = 0,
          totalPagar = 0,
          impuestoNeto = 0;
      // OBTENER LOS TOTALES DEL COMPROBANTE

      // tslint:disable-next-line: forin

      for (const linea of this.arrayDetalles) {
        subtotal += Number(linea.subtotal);
        totalPagar += Number(linea.montoitotallinea);
        impuestos += Number(linea.impuesto);
        descuentos += Number(linea.montodescuento);
        impuestoNeto += Number(linea.impuesto_neto);
      }

      this.totalPagar = totalPagar.toFixed(2)
      this.totalImpuesto = impuestos.toFixed(2)
      this.totalDescuento = descuentos.toFixed(2)
      this.SubtotalComprobante = subtotal.toFixed(2);//
      this.totalImpuestoNeto = impuestoNeto.toFixed(2);
      // this.limpiarLineaDetalle();
    
  }

  listarOrdenes() {
    const getDetalles = localStorage.getItem('detalles');
    
    // tslint:disable-next-line: one-variable-per-declaration
    let subtotal = 0,
    impuestos = 0,
    descuentos = 0,
    totalPagar = 0;
    if (getDetalles !== '' && getDetalles != null && JSON.parse(getDetalles) != '[]' ) {

      // tslint:disable-next-line: one-variable-per-declaration
      this.arrayDetalles = JSON.parse(localStorage.getItem('detalles'));
      this.objFactura.ordenes = JSON.parse(localStorage.getItem('detalles'));
      // tslint:disable-next-line: forin
      for (const linea in this.arrayDetalles) {
        subtotal += parseFloat(this.arrayDetalles[linea].subtotal);
        totalPagar += parseFloat(this.arrayDetalles[linea].montoitotallinea);
        impuestos += parseFloat(this.arrayDetalles[linea].impuesto);
        descuentos += parseFloat(this.arrayDetalles[linea].montodescuento);
      }

      this.totalPagar = totalPagar.toFixed(2);
      this.totalImpuesto = impuestos.toFixed(2);
      this.totalDescuento = descuentos.toFixed(2);
      this.SubtotalComprobante = subtotal.toString();
    } else {
      localStorage.setItem('detalles', '[]');
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
    obj.iddescuento = 1;

    this.productoService.nuevoProducto(obj)
      .subscribe((response: any) => {
        //this.buscarProducto(this.objProducto.descripcion);
        // this.listaProductos

       // (document.getElementById('txt_nombreProducto') as HTMLInputElement).value = this.objProducto.descripcion;
       
        $('#ModalNuevoProducto').modal('hide');
        this.cargarProductos();
        Swal.fire('Nuevo Producto', response.message,'success');
        // agregar el producto, agregar el idproducto a la linea y mostrar los totales

      },
      err => console.log(err));
  }

  actualizarProducto(e,obj){
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
    
    this.objProducto;

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
    form.append('codigocabys',obj.codigocabys);
    form.append('DescuArt',obj.DescuArt);
    form.append('SinDescu',obj.SinDescu);
    form.append('id',obj.id);

    this.productoService.actualizarProducto(form)
      .subscribe((response: any) => {
        
        $('#ModalActualizarProducto').modal('hide');
        Swal.fire("Actualizar Producto", response.message, 'success');
       /// this.recalcularlineas();
         this.actualizarLinea(this.lineaTemporal);
      },
      err => {
        console.error(err)
        Swal.fire("Actualizar Producto", 'No se pudo actualizar el producto','error'); 
      })
  }
  cargarProductoModal(linea){
   const idproducto = linea.idproducto;
    this.productoService.obtenerProductoPorId(idproducto)
      .subscribe((response: any) => {
        console.log(response);
        this.objProducto.id = response.producto.idproducto;
        this.objProducto.codigo_barra = response.producto.codigobarra_producto;
        this.objProducto.tipo_impuesto = response.producto.tipo_impuesto;
        this.objProducto.descripcion = response.producto.descripcion;
        this.objProducto.unidad_medida = response.producto.unidad_medida;
        this.objProducto.unidad_medida_comercial = response.producto.unidad_medida_comercial;
        this.objProducto.tipo_servicio = response.producto.tipo_servicio;
        this.objProducto.codigo_servicio = response.producto.tipo_servicio;
        this.objProducto.idcategoria = response.producto.idcategoria;
        this.objProducto.precio_producto = response.producto.precio_producto;
        this.objProducto.precio_final = response.producto.precio_final;
        this.objProducto.costo_unitario = response.producto.costo_unitario; //codigocabys
        this.objProducto.codigocabys = response.producto.codigoCabys; //codigocabys
        this.objProducto.DescuArt = response.producto.DescuArt;
        this.objProducto.SinDescu = response.producto.SinDescu;
        this.lineaTemporal = linea;
        //cantidadProducto
        for(const producto of this.arrayDetalles){
          if(producto.numerolineadetalle == linea.numerolineadetalle) {
            this.cantidadProducto = producto.cantidad;
            producto.cantidad = this.cantidadProducto;
          }
        }
      },
      err => console.log(err))
      console.log(this.objProducto)
  }
  nuevoCliente(obj) {
    console.log(obj);

    this.clienteService.guardarCliente(obj)
      .subscribe((response: any) => {
        
        const {insertId} = response;
        this.objFactura.idcliente = insertId;
        this.objFactura.tipo_factura = '01';
        (document.getElementById('nombreCliente') as HTMLInputElement).value = this.objCliente.cliente_nombre;
        (document.getElementById('nombreComercialCliente') as HTMLInputElement).value = this.objCliente.cliente_nombre_comercial ? this.objCliente.cliente_nombre_comercial : '';
        (document.getElementById('cedulaCliente') as HTMLInputElement).value = this.objCliente.cedula_cliente;
        (document.getElementById('correoCliente') as HTMLInputElement).value = this.objCliente.cliente_correo;
        (document.getElementById('telefonoCliente') as HTMLInputElement).value = this.objCliente.cliente_telefono_numtelefono ? this.objCliente.cliente_telefono_numtelefono : '';
        if(this.arrayDetalles.length > 0){
          for(let linea of this.arrayDetalles){
            linea.idcliente = this.objFactura.idcliente;
          }
        }
        // (document.getElementById('formBuscarCliente') as HTMLFormElement).reset();
        
        //($('#ModalNuevoCliente') as any).modal('hide');
        $('#ModalNuevoCliente').modal('hide');
        Swal.fire('Nuevo Cliente','Cliente agregado','success');
        //limpiarDatosCliente()
        // (document.getElementById('formNuevoCliente') as HTMLFormElement).reset();
        // $('#ModalNuevoCliente').hide();
        // this.cargarCliente(this.objCliente.cliente_nombre);
      },
      err => console.log(err));
  }

  

  quitarCliente() {

    this.objFactura.idcliente = '1';
    this.objDataCliente.numero_cliente= '';
    this.objDataCliente.nombre = '';
    this.objDataCliente.cedula = '';
    this.objDataCliente.id = '';
    this.objDataCliente.nombreComercial = '';
    this.objDataCliente.correo = '';
    this.objDataCliente.telefono = '';
    this.objFactura.tipo_factura = '04';
    this.porcentajeExoneracion = 0;
    this.descuentoCliente = 0;
    (document.getElementById('nombreCliente') as HTMLInputElement).value = '';
    (document.getElementById('nombreComercialCliente') as HTMLInputElement).value = '';
    (document.getElementById('cedulaCliente') as HTMLInputElement).value = '';
    (document.getElementById('correoCliente') as HTMLInputElement).value = '';
    (document.getElementById('telefonoCliente') as HTMLInputElement).value = '';
    this.recalcularlineas();

    if(this.arrayDetalles.length > 0){
      for(let linea of this.arrayDetalles){
        linea.idcliente = null;
      }
    }
  }
  cargarCliente(obj) {

    (document.getElementById('nombreCliente') as HTMLInputElement).value = obj.nombre;
    (document.getElementById('nombreComercialCliente') as HTMLInputElement).value = obj.nombreComercial ? obj.nombreComercial: '';
    (document.getElementById('cedulaCliente') as HTMLInputElement).value = obj.cedula;
    (document.getElementById('correoCliente') as HTMLInputElement).value = obj.correo;
    (document.getElementById('telefonoCliente') as HTMLInputElement).value = obj.telefono ? obj.telefono : '';
    this.objFactura.idcliente = this.objDataCliente.id;
    this.objFactura.tipo_factura = '01';
    this.descuentoCliente = Number(this.objDataCliente.descuento);
    //this.descuentos=this.descuentoCliente;
    this.plazo_credito = Number(this.objDataCliente.plazo_credito);
    console.log("plazo credito ", this.plazo_credito);
    this.objFactura.plazo_credito = Number(this.objDataCliente.plazo_credito);
    console.log("plazo credito ",this.plazo_credito);
    if(this.arrayDetalles.length > 0){
      for(let linea of this.arrayDetalles){
        linea.idcliente = this.objFactura.idcliente;
      }
    }
    (document.getElementById('formBuscarCliente') as HTMLFormElement).reset();
    this.recalcularlineas();
    $('#ModalBuscarCliente').modal('hide');

  }

  buscarCliente(query: string|number) {
    if (query === '') {
      return;
    } else {
      console.log(query)
      for(let cliente of this.listaClientes){
        if(query == cliente.cliente_nombre || Number(query) === Number(cliente.id)){
        
          this.objDataCliente.nombre = cliente.cliente_nombre;
          this.objDataCliente.cedula = cliente.cedula_cliente;
          this.objDataCliente.id = cliente.id;
          this.objDataCliente.nombreComercial = cliente.cliente_nombre_comercial;
          this.objDataCliente.correo = cliente.cliente_correo;
          this.objDataCliente.telefono = cliente.cliente_telefono_numtelefono;
          this.objDataCliente.descuento = cliente.descuento;
          if (this.descuentoCliente == 0){
            this.descuentoCliente=cliente.descuento;
          } 
         // this.descuentos = cliente.descuento;
          this.objDataCliente.plazo_credito = cliente.plazo_credito;
          this.objDataCliente.numero_cliente = cliente.numero_cliente;
          this.objDataCliente.limi_credit = cliente.limi_credi ? cliente.limi_credi : 0; 
          this.objDataCliente.saldo = cliente.saldo ? cliente.saldo : 0; 
          this.objDataCliente.d15 = cliente.vence1 ? cliente.vence1 : 0; 
          this.objDataCliente.d30 = cliente.vence2 ? cliente.vence2 : 0; 
          this.objDataCliente.d45 = cliente.vence3 ? cliente.vence3 : 0; 
          this.objDataCliente.d60 = cliente.vence4 ? cliente.vence4 : 0;
          this.objDataCliente.d90m = cliente.vence5 ? cliente.vence5 : 0;
          this.objDataCliente.enplazo = (Number(this.objDataCliente.saldo) - (Number(this.objDataCliente.d15) + Number(this.objDataCliente.d30) + Number(this.objDataCliente.d45) + Number(this.objDataCliente.d60) + Number(this.objDataCliente.d90m))).toFixed(2);
          this.saldoDisponible = (Number(this.objDataCliente.limi_credit) - Number(this.objDataCliente.saldo)).toFixed(2);
          this.saldoDisponibleNumber = Number(this.objDataCliente.limi_credit) - Number(this.objDataCliente.saldo);
          // valores FORMATEADOS
          const enPlazo = Number(this.objDataCliente.d15) + Number(this.objDataCliente.d30) + Number(this.objDataCliente.d45) + Number(this.objDataCliente.d60) + Number(this.objDataCliente.d90m);
          
          this.objDataCliente.enplazo = this.formatNumber(Number(this.objDataCliente.saldo) - enPlazo);
          this.saldoDisponible = this.formatNumber(Number(this.objDataCliente.limi_credit) - Number(this.objDataCliente.saldo));

          this.objDataCliente.limi_credit = cliente.limi_credi ? this.formatNumber(cliente.limi_credi) : '0,00'; 
          this.objDataCliente.saldo = cliente.saldo ? this.formatNumber(cliente.saldo) : '0,00'; 
          this.objDataCliente.d15 = cliente.vence1 ? this.formatNumber(cliente.vence1) : '0,00'; 
          this.objDataCliente.d30 = cliente.vence2 ? this.formatNumber(cliente.vence2) : '0,00'; 
          this.objDataCliente.d45 = cliente.vence3 ? this.formatNumber(cliente.vence3) : '0,00'; 
          this.objDataCliente.d60 = cliente.vence4 ? this.formatNumber(cliente.vence4) : '0,00';
          this.objDataCliente.d90m = cliente.vence5 ? this.formatNumber(cliente.vence5) : '0,00';
            
          this.nombreClientePendientes = cliente.cliente_nombre && cliente.cliente_nombre.length > 0 ? cliente.cliente_nombre: cliente.cliente_nombre_comercial;
          
          // tslint:disable-next-line: max-line-length
          this.porcentajeExoneracion = (cliente.porcentajeExoneracion == null || cliente == '') ? 0 : Number(cliente.porcentajeExoneracion);
         console.log(this.objDataCliente);
          this.objFactura.idcliente = cliente.id;
         if(this.arrayDetalles.length > 0){
          for(let linea of this.arrayDetalles){
            linea.idcliente = this.objDataCliente.id;
          }
        }
          //this.descuentoCliente = cliente.descuento;
        } else {
          console.log("NO se cumple");
        }
      }
    }
  }

  mostrarFechaHora() {
    this.fechaHora();
    setInterval(() => this.fechaHora(), 1000);
  }

  fechaHora() {
    const d = new Date();
    const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
    const dia =  (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
    const anio = d.getFullYear();
    const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    const minutos = (d.getMinutes() < 10) ?  '0' + d.getMinutes() : d.getMinutes();
    const segundos = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
    this.fechaActual = dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos + ':' + segundos;}

  cargarDatosDefault() {
    this.objFactura.tipo_factura = '04';
    this.objFactura.condicion_venta = '01';
    this.objFactura.medio_pago = '01';
    this.objFactura.codigomoneda = 'CRC';
    this.objFactura.idcliente = '1';
    (document.querySelector("#tipoModena") as HTMLSelectElement).value = this.objFactura.codigomoneda;
    
  }

  obtenerTipoCambio() {
    this.facturaService.obtenerTipoCambio()
      .subscribe((tipoCambio: any) => {

      try {
        const respuesta = tipoCambio.response;
        let xmlDoc: any; // cambio
        //let window: any;
        const parser = new DOMParser();
        
        //if (window.DOMParser) { // PARSEAR el xml para poder leerlo
          xmlDoc = parser.parseFromString(respuesta, 'text/html');
  
        //} 
        /*else {
          // EN EL CASO QUE SEA INTERNET EXPLORER
          xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
          xmlDoc.async = false;
          xmlDoc.loadXML(respuesta);
        }*/
  
        const tipocambio = Number(xmlDoc.getElementsByTagName('NUM_VALOR')[0].innerHTML).toFixed(2);
        //this.objFactura.tipocambio = tipocambio.toString();
        this.tipoCambio = tipocambio.toString();
      } catch(err){
        this.tipoCambio  = '1.00';
      }
    },
     err => {
      this.tipoCambio  = '1.00';
     });
  }

  obtenerMonedas() {
    this.facturaService.obtenerMonedas()
      .subscribe((response: any) => {
        
       this.listaMonedas = response.monedas;
       console.log(this.listaMonedas);
      },
      err => console.log(err));
  }

  TipoDocumento() {
    this.facturaService.tipoDocumento()
      .subscribe((response: any) => {
        this.tipoDocumento = response.tipoDocumento;
      },
      err => console.error(err));
  }

  MedioPago() {
    this.facturaService.medioPago()
      .subscribe((response: any) =>  {
        this.medioPago = response.medioPago;
      },
      err => console.error(err));
  }

  CondicionVenta() {
    this.facturaService.condicionVenta()
      .subscribe((response: any) => {
        this.condicionVenta = response.condicionVenta;
      },
      err => console.error(err));
  }


  actualizarLinea(linea) {

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
    
        linea.cantidad = this.cantidadProducto;
    montototal = Number(this.objProducto.precio_producto) * Number(linea.cantidad);
    
    if(Number(linea.porcentajedescuento) > 0){
      montoDescuento = (parseFloat(linea.porcentajedescuento) / 100) * montototal;
    }

    subtotal = montototal - montoDescuento;
  
    for(const i in this.tipoImpuesto){
      if(this.objProducto.tipo_impuesto == this.tipoImpuesto[i].id){
        console.log("impuesto ",this.tipoImpuesto[i].porcentaje_impuesto)
        porcentajeImpuesto = Number(this.tipoImpuesto[i].porcentaje_impuesto);
        
        if (linea.codigo == '01' || linea.codigo == '07') {
          if (linea.codigo == '07') { // linea que agrega la baseimponible
            baseImponible = linea.precio_producto;
            montoImpuesto = Number(subtotal * porcentajeImpuesto) / 100;  
            linea.codigo_tarifa = this.tipoImpuesto[i].codigo_impuesto;
            linea.tarifa = porcentajeImpuesto.toString();
            linea.monto = montoImpuesto.toString();
            
          } else if(linea.codigo == '01'){
            montoImpuesto = Number(subtotal * porcentajeImpuesto) / 100;
            linea.codigo_tarifa = this.tipoImpuesto[i].codigo_impuesto;
            linea.tarifa = porcentajeImpuesto.toString();
            linea.monto = montoImpuesto.toString();
            
            if( Number(this.porcentajeExoneracion) === 0) {

              impuestoExonerado = 0;
              montoExonerado = 0;
              impuestoNeto = montoImpuesto ;
              linea.PorcentajeExonerado = impuestoExonerado;
            }

            else if(Number(this.porcentajeExoneracion) > Number(porcentajeImpuesto)){
              impuestoExonerado = porcentajeImpuesto;
              montoExonerado = ((subtotal * impuestoExonerado) / 100);
              impuestoNeto = montoImpuesto - montoExonerado;
              linea.PorcentajeExonerado = impuestoExonerado;
            } else {
              impuestoExonerado = this.porcentajeExoneracion;
              montoExonerado = ((subtotal * impuestoExonerado) / 100);
              impuestoNeto = montoImpuesto - montoExonerado;
              linea.PorcentajeExonerado = impuestoExonerado;
            }
           
          }

          /*
        
          if(Number(this.porcentajeExoneracion) > Number(this.listaProductos[0].porcentaje_impuesto)){
                impuestoExonerado = this.listaProductos[0].porcentaje_impuesto;
                MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
              } else {
                impuestoExonerado = this.porcentajeExoneracion;
                MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
              }
        
        */
        } 
      }
    }
    
    linea.idproducto = this.objProducto.id;
    linea.precio_linea = this.objProducto.precio_producto.toString();
    linea.descripcioDetalle = this.objProducto.descripcion;
    linea.montodescuento = montoDescuento.toFixed(2);
    linea.subtotal = subtotal.toFixed(2);
    linea.montototal = montototal.toFixed(2);
    linea.codigobarra_producto = this.objProducto.codigo_barra;
    linea.unidadMedida = this.objProducto.unidad_medida;
    linea.unidadMedidaComercial = this.objProducto.unidad_medida_comercial;
    linea.codigo_servicio = this.objProducto.codigo_servicio;
    linea.tipo_servicio = this.objProducto.tipo_servicio;
    linea.baseimponible = baseImponible.toString();
    linea.impuesto_neto = impuestoNeto.toFixed(2);
    linea.otrosCargos = (subtotal * .10);
    linea.impuesto = montoImpuesto.toFixed(2);  

    totalLinea = subtotal + Number(impuestoNeto);
    linea.montoitotallinea = totalLinea.toString();
    linea.MontoExoneracion = montoExonerado.toFixed(2);
    
    console.log(linea);

    //ACTUALIZAR LOS TOTALES DE LA FACTURA
    let subtotalNuevo = 0;
    let descuentosNuevo = 0;
    let impuestoNuevo = 0;
    let totalPagarNuevo = 0;
    let impuestoNetoNuevo =0;
    for(let linea of this.arrayDetalles){

      subtotalNuevo += Number(linea.subtotal);
      descuentosNuevo += Number(linea.montodescuento);
      impuestoNuevo += Number(linea.monto);
      totalPagarNuevo += Number(linea.montoitotallinea);
      impuestoNetoNuevo += Number(linea.impuesto_neto);
    }

    this.SubtotalComprobante = subtotalNuevo.toFixed(2);
    this.totalDescuento = descuentosNuevo.toFixed(2);
    this.totalImpuesto = impuestoNuevo.toFixed(2);
    this.totalPagar = totalPagarNuevo.toFixed(2);
    this.totalImpuestoNeto = impuestoNetoNuevo.toFixed(2);
    //(document.getElementById("formActualizarProducto") as HTMLFormElement).reset();
        //this.objProducto.unidad_medida = 'Unid';
  }


  //FUNCION PARA RECALCULAR LINEAS CUANDO SE CAMBIA EL CLIENTE O SE  QUITA EL CLIENTE

  recalcularlineas() {

    //RESTAR TOTALES ANTERIORES
   /* let subtotalAnterior = Number(this.SubtotalComprobante);
    subtotalAnterior -= Number(linea.subtotal)
    this.SubtotalComprobante = subtotalAnterior.toFixed(2);
    let descuentosAnterior = Number(this.totalDescuento);
    descuentosAnterior -= Number(linea.montodescuento);
    this.totalDescuento = descuentosAnterior.toFixed(2);
    let impuestoAnterior = Number(this.totalImpuesto);
    impuestoAnterior -= Number(linea.monto);
    this.totalImpuesto = impuestoAnterior.toFixed(2);
    let totalPagarAnterior = Number(this.totalPagar);
    totalPagarAnterior -= Number(linea.montoitotallinea);
    this.totalPagar = totalPagarAnterior.toFixed(2);*/

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
        let lineaDescuento: Number = 0;
        let listaOrdenes = this.arrayDetalles;
    for(let linea of listaOrdenes){
      
      linea.cantidad = Number(linea.cantidad).toFixed(2);
      linea.precio_linea = Number(linea.precio_linea).toFixed(2);
      montototal = Number(linea.precio_linea) * Number(linea.cantidad);
      if(Number(this.descuentoCliente) > 0 && Number(this.descuentoCliente) > Number(linea.porcentajedescuento) && Number(linea.SinDescu) == 0){ //modificado x SYN
        linea.naturalezadescuento = 'Descuento Cliente';
        lineaDescuento = this.descuentoCliente;
      } else {
        if(Number(linea.porcentajedescuento) > 0){
          lineaDescuento= linea.porcentajedescuento;
          //montoDescuento = (parseFloat(linea.porcentajedescuento) / 100) * montototal;
          linea.naturalezadescuento = 'Descuento Cliente';
        } else {
          lineaDescuento= 0;
        }
      }
      //this.codigoProducto= linea.idproducto;
      //console.log(this.codigoProducto);
      montoDescuento = (Number(lineaDescuento) / 100) * montototal;

      subtotal = montototal - montoDescuento;
      console.log(linea)
      console.log("-----------------------------------------------")
      for(const i in this.tipoImpuesto){
  
        porcentajeImpuesto = Number(linea.tarifa);
        
        if (linea.codigo == '01' || linea.codigo == '07') {
          if (linea.codigo == '07') { // linea que agrega la baseimponible
            baseImponible = linea.precio_linea;
            montoImpuesto = Number(subtotal * porcentajeImpuesto) / 100;  
            //linea.codigo_tarifa = linea.codigo_impuesto;
            linea.tarifa = porcentajeImpuesto.toString();
            linea.monto = montoImpuesto.toString();
            
          } else if(linea.codigo == '01'){
              montoImpuesto = Number(subtotal * porcentajeImpuesto) / 100;
              //linea.codigo_tarifa = this.tipoImpuesto[i].codigo_impuesto;
              linea.tarifa = linea.tarifa;
              linea.monto = montoImpuesto.toString();
            
            if( Number(this.porcentajeExoneracion) === 0) {

              impuestoExonerado = 0;
              montoExonerado = 0;
              impuestoNeto = montoImpuesto ;
              linea.PorcentajeExonerado = impuestoExonerado;
            }

            else if(Number(this.porcentajeExoneracion) > Number(porcentajeImpuesto)){ // si el porcentaje de exoneracion es mayor a 0 y mayor al impuesto 
              // de la linea
              impuestoExonerado = porcentajeImpuesto;
              montoExonerado = ((subtotal * impuestoExonerado) / 100);
              impuestoNeto = montoImpuesto - montoExonerado;
              linea.PorcentajeExonerado = impuestoExonerado;
            } else { // si el porcentaje de exoneracion es mayor a 0 y menor al impuesto 
              // de la linea
              impuestoExonerado = this.porcentajeExoneracion;
              montoExonerado = ((subtotal * impuestoExonerado) / 100);
              impuestoNeto = montoImpuesto - montoExonerado;
              linea.PorcentajeExonerado = impuestoExonerado;
            }
          }
        } 
      }
      
      //linea.idproducto = this.objProducto.id;
      //linea.precio_linea = this.objProducto.precio_producto.toString();
     // linea.descripcioDetalle = this.objProducto.descripcion;
      linea.montodescuento = montoDescuento.toFixed(2);
      linea.subtotal = subtotal.toFixed(2);
      linea.montototal = montototal.toFixed(2);
      //linea.codigobarra_producto = this.objProducto.codigo_barra;
      //linea.unidadMedida = this.objProducto.unidad_medida;
      //linea.unidadMedidaComercial = this.objProducto.unidad_medida_comercial;
      //linea.codigo_servicio = this.objProducto.codigo_servicio;
      //linea.tipo_servicio = this.objProducto.tipo_servicio;
      linea.baseimponible = baseImponible.toString();
      linea.impuesto_neto = impuestoNeto.toFixed(2);
      linea.otrosCargos = (subtotal * .10);
      linea.impuesto = montoImpuesto.toFixed(2);  

      totalLinea = subtotal + Number(impuestoNeto);
      //linea.montoitotallinea = totalLinea.toString();
      linea.montoitotallinea = totalLinea.toFixed(2); //modificado x SYN
      linea.MontoExoneracion = montoExonerado.toFixed(2);
    }

    //ACTUALIZAR LOS TOTALES DE LA FACTURA
    let subtotalNuevo = 0;
    let descuentosNuevo = 0;
    let impuestoNuevo = 0;
    let totalPagarNuevo = 0;
    let impuestoNetoNuevo =0;
    
    for(let linea of this.arrayDetalles){
      subtotalNuevo += Number(linea.subtotal);
      descuentosNuevo += Number(linea.montodescuento);
      impuestoNuevo += Number(linea.monto);
      totalPagarNuevo += Number(linea.montoitotallinea);
      impuestoNetoNuevo += Number(linea.impuesto_neto);
    }

    this.SubtotalComprobante = subtotalNuevo.toFixed(2);
    this.totalDescuento = descuentosNuevo.toFixed(2);
    this.totalImpuesto = impuestoNuevo.toFixed(2);
    this.totalPagar = totalPagarNuevo.toFixed(2);
    this.totalImpuestoNeto = impuestoNetoNuevo.toFixed(2);

    //(document.getElementById("formActualizarProducto") as HTMLFormElement).reset();
        //this.objProducto.unidad_medida = 'Unid';
  }

  ///--- FIN DE FUNCION DE RECALCULCULAR LINEAS




  recalcularlineasProforma(arr) {

    //RESTAR TOTALES ANTERIORES
   /* let subtotalAnterior = Number(this.SubtotalComprobante);
    subtotalAnterior -= Number(linea.subtotal)
    this.SubtotalComprobante = subtotalAnterior.toFixed(2);
    let descuentosAnterior = Number(this.totalDescuento);
    descuentosAnterior -= Number(linea.montodescuento);
    this.totalDescuento = descuentosAnterior.toFixed(2);
    let impuestoAnterior = Number(this.totalImpuesto);
    impuestoAnterior -= Number(linea.monto);
    this.totalImpuesto = impuestoAnterior.toFixed(2);
    let totalPagarAnterior = Number(this.totalPagar);
    totalPagarAnterior -= Number(linea.montoitotallinea);
    this.totalPagar = totalPagarAnterior.toFixed(2);*/

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
        //this.arrayDetalles = arr;
        let listaOrdenes = arr;
    for(let linea of listaOrdenes){
      linea.cantidad = Number(linea.cantidad).toFixed(2);
      linea.precio_linea = (linea.precio_linea).toFixed(2);
      montototal = Number(linea.precio_linea) * Number(linea.cantidad);
    
      if(linea.naturalezadescuento != ''){
        montoDescuento = (parseFloat(linea.porcentajedescuento) / 100) * montototal;
      }

      subtotal = montototal - montoDescuento;
      //subtotal = montototal ; //modificado x SYN
  
      for(const i in this.tipoImpuesto){
  
        porcentajeImpuesto = Number(linea.tarifa);
        
        if (linea.codigo == '01' || linea.codigo == '07') {
          if (linea.codigo == '07') { // linea que agrega la baseimponible
            baseImponible = linea.precio_linea;
            montoImpuesto = Number(subtotal * porcentajeImpuesto) / 100;  
            //linea.codigo_tarifa = linea.codigo_impuesto;
            linea.tarifa = porcentajeImpuesto.toString();
            linea.monto = montoImpuesto.toString();
            
          } else if(linea.codigo == '01'){
              montoImpuesto = Number(subtotal * porcentajeImpuesto) / 100;
              //linea.codigo_tarifa = this.tipoImpuesto[i].codigo_impuesto;
              linea.tarifa = linea.tarifa;
              linea.monto = montoImpuesto.toString();
            
            if( Number(this.porcentajeExoneracion) === 0) {

              impuestoExonerado = 0;
              montoExonerado = 0;
              impuestoNeto = montoImpuesto ;
              linea.PorcentajeExonerado = impuestoExonerado;
            }

            else if(Number(this.porcentajeExoneracion) > Number(porcentajeImpuesto)){
              impuestoExonerado = porcentajeImpuesto;
              montoExonerado = ((subtotal * impuestoExonerado) / 100);
              impuestoNeto = montoImpuesto - montoExonerado;
              linea.PorcentajeExonerado = impuestoExonerado;
            } else {
              impuestoExonerado = this.porcentajeExoneracion;
              montoExonerado = ((subtotal * impuestoExonerado) / 100);
              impuestoNeto = montoImpuesto - montoExonerado;
              linea.PorcentajeExonerado = impuestoExonerado;
            }
          }
        } 
      }

      //linea.idproducto = this.objProducto.id;
      //linea.precio_linea = this.objProducto.precio_producto.toString();
     // linea.descripcioDetalle = this.objProducto.descripcion;
      linea.montodescuento = montoDescuento.toFixed(2);
      linea.subtotal = subtotal.toFixed(2);
      linea.montototal = montototal.toFixed(2);
      //linea.codigobarra_producto = this.objProducto.codigo_barra;
      //linea.unidadMedida = this.objProducto.unidad_medida;
      //linea.unidadMedidaComercial = this.objProducto.unidad_medida_comercial;
      //linea.codigo_servicio = this.objProducto.codigo_servicio;
      //linea.tipo_servicio = this.objProducto.tipo_servicio;
      linea.baseimponible = baseImponible.toString();
      linea.impuesto_neto = impuestoNeto.toFixed(2);
      linea.otrosCargos = (subtotal * .10);
      linea.impuesto = montoImpuesto.toFixed(2);  

      totalLinea = subtotal + Number(impuestoNeto);
      //linea.montoitotallinea = totalLinea.toString();
      linea.montoitotallinea = totalLinea.toFixed(2) ; //modificado x SYN
      linea.MontoExoneracion = montoExonerado.toFixed(2);

      console.log(linea);
    }

    this.arrayDetalles = listaOrdenes;

    //ACTUALIZAR LOS TOTALES DE LA FACTURA
    let subtotalNuevo = 0;
    let descuentosNuevo = 0;
    let impuestoNuevo = 0;
    let totalPagarNuevo = 0;
    let impuestoNetoNuevo =0;
    for(let linea of this.arrayDetalles){

      subtotalNuevo += Number(linea.subtotal);
      descuentosNuevo += Number(linea.montodescuento);
      impuestoNuevo += Number(linea.monto);
      totalPagarNuevo += Number(linea.montoitotallinea);
      impuestoNetoNuevo += Number(linea.impuesto_neto);
    }

    this.SubtotalComprobante = subtotalNuevo.toFixed(2);
    this.totalDescuento = descuentosNuevo.toFixed(2);
    this.totalImpuesto = impuestoNuevo.toFixed(2);
    this.totalPagar = totalPagarNuevo.toFixed(2);
    this.totalImpuestoNeto = impuestoNetoNuevo.toFixed(2);
    //(document.getElementById("formActualizarProducto") as HTMLFormElement).reset();
        //this.objProducto.unidad_medida = 'Unid';
  }

  mostrarMensajeProceso(){
    if(this.mostrar == true){
      (document.getElementById("btnGuardarProforma") as HTMLButtonElement).disabled = true;
      (document.getElementById("btnGenerarFactura") as HTMLButtonElement).disabled = true;
    } else {
      (document.getElementById("btnGuardarProforma") as HTMLButtonElement).disabled = false;
      (document.getElementById("btnGenerarFactura") as HTMLButtonElement).disabled = false;
    } 
  }

  validarValoresDecimales(e){
    const texto = e.target.value;
    const expresion = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
  
    if(expresion.test(texto) == false){
      this.objCliente.descuento = texto.substr(0, texto.length - 1 );
    }
  }

  validarValoresEnteros(e){
    //^\d+$
    const texto = e.target.value;
    const expresion = /^\d+$/
  
    if(expresion.test(texto) == false){
      this.objFactura.plazo_credito = texto.substr(0, texto.length - 1 );
    }
  }

  obtenerExistencia(idproducto: number) {


  }

  cargarProductoALista(descripcion: string, tipo: string){

    if(tipo == '01'){ // descripcion 
    
      for(let producto of this.listaProductosCargados){
        
        if(descripcion == producto.descripcion  ){
          console.log("igual");
          this.listaProductos =[];
          this.listaProductos.push(producto) ;
          this.precio = Number(Number(this.listaProductos[0].precio_producto).toFixed(2));
          this.facturaService.obtenerExistencia(producto.idproducto,this.idebodegaSeleccionada).subscribe(response => {
            const respuesta = JSON.parse(response);  
            this.existencia = (respuesta.existencia.length == 0)? null: respuesta.existencia[0].existencia_actual;
          })
        }  
      }
      //
    } else {
      let codigo = descripcion.split(' ')[0];
      console.log(codigo);
      for(let producto of this.listaProductosCargados){
        
        if(codigo == producto.codigobarra_producto){
          this.listaProductos =[];
          this.listaProductos.push(producto) ;
          this.precio = Number(Number(this.listaProductos[0].precio_producto).toFixed(2));
          this.facturaService.obtenerExistencia(producto.idproducto,this.idebodegaSeleccionada).subscribe(response => {
            const respuesta = JSON.parse(response);  
            this.existencia = (respuesta.existencia.length == 0)? null: respuesta.existencia[0].existencia_actual;
        })
        }  
      }
    }
  }

  validarCorreo(texto: string){
    console.log(texto);
    const reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    this.errorCorreo = reLargo.test(texto);

    console.log(this.errorCorreo );
    
  }

  limpiarDatosCliente(){

    this.objCliente.cliente_nombre= '',
    this.objCliente.cliente_nombre_comercial= '',
    this.objCliente.cliente_tipo_identificacion= '',
    this.objCliente.cedula_cliente= '',
    this.objCliente.numero_cliente= '',
    this.objCliente.identificacion_extranjero= '',
    this.objCliente.provincia= '',
    this.objCliente.canton= '',
    this.objCliente.distrito= '',
    this.objCliente.cliente_barrio= '',
    this.objCliente.otras_senas= '',
    this.objCliente.otras_senas_extranjero= '',
    this.objCliente.cliente_telefono_codigopais= '',
    this.objCliente.cliente_telefono_numtelefono= '',
    this.objCliente.cliente_fax_codigopais= '',
    this.objCliente.cliente_fax_numtelefono= '',
    this.objCliente.cliente_correo= '',
    this.objCliente.descuento= '0',
    this.objCliente.plazo_credito= '0';
    //this.objCliente.ubicacion = '';
    this.errorCorreo = null;
  }

  mostrarCamposExtranjero(tipo) {

      const cajaidentificacionExtranjero = (document.getElementById("cajaIdentificacionExtranjero") as HTMLInputElement);
      const cajaotrasSenasExtranjero = (document.getElementById("cajaOtrasSenasExtranjeroActualizar") as HTMLInputElement);
      const identificacion_extranjero = (document.getElementById("identificacion_extranjero") as HTMLInputElement);
      const otras_senas_extranjero = (document.getElementById("otras_senas_extranjero") as HTMLInputElement);
      const cedula_cliente = (document.getElementById("cedula_cliente") as HTMLInputElement);
      if(tipo == "01" || tipo == "02" || tipo == ''){
        cajaidentificacionExtranjero.style.display = "none";
        cajaotrasSenasExtranjero.style.display = "none";
        identificacion_extranjero.value="";
        otras_senas_extranjero.value="";
        cedula_cliente.value= '';
      } else {
        cajaidentificacionExtranjero.style.display = "block";
        cajaotrasSenasExtranjero.style.display = "block";
        identificacion_extranjero.value="";
        otras_senas_extranjero.value="";
        cedula_cliente.value= '';
      }
  } 

  private formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  enviarEstadoCuentaPorCorreo() {
    $('#ModalEstadoCuenta').modal('hide');
    const {value} = (document.getElementById("correo") as HTMLInputElement);
    
    if(value.length === 0) return alert("El correo es requerido");
    else {
      this.facturaService.enviarEstadoCuentaPorCorreo(Number(this.objDataCliente.id),value)
      .subscribe(response => {
        const {message} = JSON.parse(response);
        Swal.fire("Enviar estado cuenta", message, 'success');
      },err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
        Swal.fire('Enviar estado cuenta',message?message: 'Error al enviar el estado de cuenta');
      })
    }
  }

  cargarMensajeArchivoP12(){
    this.emisorService.mostrarMensajeArchivoP12Validado()
      .subscribe(response => {
        console.log(response);
        if(response){
          const {message,error} = JSON.parse(response);
          const permiso = localStorage.getItem("role");
        
          if(error && String(permiso) === 'superusuario' || String(permiso) === 'integrador' || String(permiso) === 'facturador'){
            this.mensajeError = message
          }
        }
      },
      err => {
        const {error,status} = err;
        const {message} = JSON.parse(error);
          Swal.fire('Cargando información...',message?message:'Error al cargar la información de la llave criptográfica','error');
      })
  }

  validacionDatosTOkenHacienda() {

    this.facturaService.validacionDatosTokenHacienda()
      .subscribe(response => {

      },
      err => {
        if(err.status === 400) {
          const {error} = err;
          const {message} = JSON.parse(error);

          const permiso = localStorage.getItem("role");

          if(String(permiso) === 'superusuario' || String(permiso) === 'integrador' || String(permiso) === 'facturador'){
            this.mensajeErrorDatosToken = message
          }

        }
      })
  }


  limpiarLinasYtotales() {
   // this.limpiarTotalesFactura();

    //this.objFactura.nombreCliente = '',
    // this.objFactura.condicion_venta = '01',
    //this.objFactura.medio_pago = '01',
    this.objFactura.porcentaje_descuento_total = '',
    this.objFactura.monto_descuento_total = '',
    this.objFactura.subtotal = '',
    this.objFactura.totalservgravados = '',
    this.objFactura.totalservexentos = '',
    this.objFactura.totalservexonerado = '',
    this.objFactura.totalmercanciasgravadas = '',
    this.objFactura.totalmercanciasexentas = '',
    this.objFactura.totalmercanciaexonerada = '',
    this.objFactura.totalgravado = '',
    this.objFactura.totalexento = '',
    this.objFactura.totalexonerado = '',
    this.objFactura.totalventa = '',
    this.objFactura.totaldescuentos = '',
    this.objFactura.totalventaneta = '',
    this.objFactura.totalimpuesto = '',
    this.objFactura.totalcomprobante = '',
    //this.objFactura.codigomoneda = 'CRC',
    // this.objFactura.tipocambio= '',
    //this.objFactura.tipo_factura = '04',
    this.objFactura.ordenes = [],
    this.objFactura.objOrdenes = {};
   // this.objFactura.notas = ''
    //this.objFactura.autorizado = null;

    this.totalImpuestoNeto = '0';
    this.arrayDetalles = [];
    this.SubtotalComprobante = '0';
    this.totalImpuesto = '0';
    this.totalDescuento = '0';
    this.totalPagar = '0';
    //this.tipoProforma  = 'profGuadar';
    //this.objFactura.tipoProforma = this.tipoProforma ;
  }
}
