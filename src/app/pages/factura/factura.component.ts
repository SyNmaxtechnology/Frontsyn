import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/pages/factura.service';
import { ClienteService } from '../../services/pages/cliente.service';
import { DescuentoService } from '../../services/pages/descuento.service';
import { ProductoService } from '../../services/pages/producto.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: []
})
export class FacturaComponent implements OnInit {

  constructor(private facturaService: FacturaService, private clienteService: ClienteService,
              private descuentoService: DescuentoService, private productoService: ProductoService) {

    this.obtenerTipoCambio();
    this.mostrarFechaHora();
    this.obtenerMonedas();
    this.obtenerDescuentos();
    this.obtenerUnidadesMedida();
    this.obtenerImpuesto();
    this.obtenerProvincias();
    this.obtenerCategorias();
    this.tipoDocumento = facturaService.tipoDocumento();
    this.medioPago = facturaService.medioPago();
    this.condicionVenta = facturaService.condicionVenta();
    this.tipoIdentificacion = clienteService.tipoIdentificacion();

  }

  objDataCliente = {
    nombre: '',
    cedula: '',
    query: '',
    id: '',
    correo: '',
    telefono: '',
    nombreComercial: ''
  };

  objFactura =  {
    id: '',
    idcliente: '',
    idemisor: '',
    nombreCliente: '',
    condicion_venta: '',
    medio_pago: '',
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
    codigomoneda: '',
    tipoCambio: '',
    tipo_factura: '',
    fecha_factura: '',
    ordenes: []
  };

  objCliente = {
    id: '',
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
    codigo: '',
    codigo_tarifa: '',
    tarifa: '',
    monto: '',
    baseimponible: '',
    impuesto_neto: '',
    numerodocumento: '',
    montoitotallinea: ''
  };
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
    iddescuento: ''
  };

  tipoDocumento: object = [];
  condicionVenta: object = [];
  medioPago: object = [];
  listaMonedas: object = [];
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
      .subscribe(response => {  
        this.listaCategorias = response.categorias;
      },
      err => console.log(err));
  }

  obtenerImpuesto(){
    this.productoService.obtenerImpuestos()
      .subscribe(response => {
        this.tipoImpuesto = response.impuestos;
      },
      err => console.error(err));
  }

  obtenerUnidadesMedida() {
    this.productoService.obtenerUnidadesMedida()
      .subscribe(response => {
        this.unidadesMedida = response.unidades;
      },
      err => console.log(err));
  }
  obtenerDescuentos() {
    this.descuentoService.obtenerDescuentos()
      .subscribe(response => {
        this.descuentos = response.descuentos;
      },
      err => console.error(err));
  }

  obtenerProvincias() {
    this.clienteService.obtenerProvincias()
      .subscribe(response => {
        this.provincia = response.provincias;
      },
      err => console.error(err));
  }

  obtenerCantones(idProvincia){
    this.clienteService.obtenerCantones(idProvincia)
      .subscribe(response => {
        this.canton = response.cantones;
      },
      err => console.error(err));
  }

  obtenerDistritos(idcanton, idprovincia){
    const obj = {
      idcanton,
      idprovincia
    };

    this.clienteService.obtenerDistritos(obj)
      .subscribe(response => {
        this.distrito = response.distritos;
      },
      err => console.error(err));
  }

  obtenerBarrios(idcanton, idprovincia, iddistrito){

    const obj = {
      idcanton, idprovincia, iddistrito
    };

    this.clienteService.obtenerBarrios(obj)
      .subscribe(response => {
        this.barrio = response.barrios;
      },
      err => console.error(err));
  }

  buscarProducto(e,texto) {
    e.preventDefault();

    if(texto === ''){
      return;
    } else {
      this.productoService.obtenerProducto(texto)
        .subscribe(response => {
          console.log(response);

          this.objBusquedaProducto.id = response.id;
          this.objBusquedaProducto.descripcion = response.descripcion;
          this.objBusquedaProducto.codigo = response.codigobarra_producto;
        },
        err => console.log(err));
    }
  }
  
  cargarProducto(){

  }

  nuevoProducto(e,obj){
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
    obj.iddescuento =1;
  
    this.productoService.nuevoProducto(obj)
      .subscribe(response => {
        console.log(response);
      },
      err => console.log(err));
  }

  nuevoCliente(obj){
    console.log(obj);

    this.clienteService.guardarCliente(obj)
      .subscribe(response => {
        (document.getElementById('formNuevoCliente') as HTMLFormElement).reset();
        $('#ModalNuevoCliente').hide();
        this.cargarCliente(this.objCliente.cliente_nombre);
      },
      err => console.log(err));
  }

  cargarCliente(obj){
    (document.getElementById("nombreCliente") as HTMLInputElement).value = obj.nombre;
    (document.getElementById("nombreComercialCliente") as HTMLInputElement).value = obj.nombreComercial;
    (document.getElementById("cedulaCliente") as HTMLInputElement).value = obj.cedula;
    (document.getElementById("correoCliente") as HTMLInputElement).value = obj.correo;
    (document.getElementById("telefonoCliente") as HTMLInputElement).value = obj.telefono;
    this.objFactura.idcliente = this.objDataCliente.id;
    (document.getElementById('formBuscarCliente') as HTMLFormElement).reset();
    $('#ModalBuscarCliente').modal('hide');
  }

  quitarCliente() {

    this.objFactura.idcliente = '';
    this.objDataCliente.nombre = '';
    this.objDataCliente.cedula = '';
    this.objDataCliente.id = '';
    this.objDataCliente.nombreComercial = '';
    this.objDataCliente.correo = '';
    this.objDataCliente.telefono = '';

    (document.getElementById("nombreCliente") as HTMLInputElement).value = '';
    (document.getElementById("nombreComercialCliente") as HTMLInputElement).value = '';
    (document.getElementById("cedulaCliente") as HTMLInputElement).value = '';
    (document.getElementById("correoCliente") as HTMLInputElement).value = '';
    (document.getElementById("telefonoCliente") as HTMLInputElement).value = '';
  }

  buscarCliente(e,query){
    e.preventDefault();
  
    if(query === ''){
      return;
    } else {
     this.clienteService.buscarCliente(query)
       .subscribe(response =>  {
         console.log(response)
         console.log(response.cliente[0]);
         this.objDataCliente.nombre = response.cliente[0].cliente_nombre;
         this.objDataCliente.cedula = response.cliente[0].cedula_cliente;
         this.objDataCliente.id = response.cliente[0].id;
         this.objDataCliente.nombreComercial = response.cliente[0].cliente_nombre_comercial;
         this.objDataCliente.correo = response.cliente[0].cliente_correo;
         this.objDataCliente.telefono = response.cliente[0].cliente_telefono_numtelefono;
       },
       err => {
         console.log(err);
       });
    }
  }

  mostrarFechaHora(){
    this.fechaHora();
    setInterval(() => this.fechaHora(), 1000);
  }

  fechaHora(){
    const d = new Date();
    const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
    const dia = d.getDate();
    const anio = d.getFullYear();
    const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    const minutos = (d.getMinutes() < 10) ?  '0' + d.getMinutes() : d.getMinutes();
    const segundos = (d.getSeconds() < 10) ? '0'+ d.getSeconds(): d.getSeconds();
    this.objFactura.fecha_factura = dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos + ':' +segundos;
  }

  obtenerTipoCambio() {
    this.facturaService.obtenerTipoCambio()
      .subscribe(tipoCambio => {

      const respuesta = tipoCambio.response;
      let xmlDoc: any;
      const parser = new DOMParser();

      if (window.DOMParser) { // PARSEAR el xml para poder leerlo
        xmlDoc = parser.parseFromString(respuesta, 'text/html');

      } /*else {
        // EN EL CASO QUE SEA INTERNET EXPLORER
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.loadXML(respuesta);
      }*/

      const tipocambio = Number(xmlDoc.getElementsByTagName('NUM_VALOR')[0].innerHTML).toFixed(2);
      this.objFactura.tipoCambio = tipocambio.toString();
    },
     err => {
       if (err.status === 500) {
        this.objFactura.tipoCambio = '1.00';
       }
     });
  }

  obtenerMonedas() {
    this.facturaService.obtenerMonedas()
      .subscribe(monedas => {
       this.listaMonedas = monedas.response;
      },
      err => console.log(err));
  }
}
