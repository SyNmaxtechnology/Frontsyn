import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/pages/factura.service';
import { ClienteService } from '../../services/pages/cliente.service';
import { DescuentoService } from '../../services/pages/descuento.service';
import { ProductoService } from '../../services/pages/producto.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
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
    this.listarOrdenes();
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
    impuesto: '',
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
  listaProductos: object = [];
  totalPagar = '0';
  totalImpuesto = '0';
  totalDescuento = '0';
  SubtotalComprobante = '0';

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

  obtenerImpuesto() {
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

  obtenerCantones(idProvincia) {
    this.clienteService.obtenerCantones(idProvincia)
      .subscribe(response => {
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
      .subscribe(response => {
        this.distrito = response.distritos;
      },
      err => console.error(err));
  }

  obtenerBarrios(idcanton, idprovincia, iddistrito) {

    const obj = {
      idcanton, idprovincia, iddistrito
    };

    this.clienteService.obtenerBarrios(obj)
      .subscribe(response => {
        this.barrio = response.barrios;
      },
      err => console.error(err));
  }

  buscarProducto(texto) {
    if (texto === '') {
      return;
    } else {
      const type = 'like';
      this.productoService.obtenerProducto(texto, type)
        .subscribe(response => {
          console.log(response);
          this.listaProductos = response;
        },
        err => console.log(err));
    }
  }

  cargarDatosLinea() {

    try {

      const nombreProducto = (document.getElementById('txt_nombreProducto') as HTMLInputElement).value;
      const campoCantidad = (document.getElementById('cantidadLinea') as HTMLInputElement).value;
      const campoDescuento = (document.getElementById('descuentoLinea') as HTMLSelectElement).value;
      let cantidadTotal = 0;
      let descuentoTotal = 0;
      const porcentajeExoneracionGlobal = 0;
      let impuestoNeto = 0;

      if (campoCantidad.length > 0) {
        cantidadTotal = Number(campoCantidad);
      }

      if (campoDescuento !== '') {
        for (const des in this.descuentos) {
          if (campoDescuento == this.descuentos[des].descripcion) {
            descuentoTotal = Number(this.descuentos[des].porcentaje);
            this.lineaDetalle.naturalezadescuento = campoDescuento;
            this.lineaDetalle.porcentajedescuento = this.descuentos[des].porcentaje;
          }
        }
      } else {
        this.lineaDetalle.naturalezadescuento = '';
        this.lineaDetalle.porcentajedescuento = '0';
      }

      if (nombreProducto != '') {

        for (const obj in this.listaProductos) {
          if (nombreProducto == this.listaProductos[obj].descripcion) {

            // tslint:disable-next-line: max-line-length
            const impuestoTotal = (parseFloat(this.listaProductos[obj].precio_final) - parseFloat(this.listaProductos[obj].precio_producto)).toFixed(2);
            const subtotal = parseFloat(this.listaProductos[obj].precio_producto) * cantidadTotal;
            const descuentoAplicado = (descuentoTotal / 100 ) * Number(this.listaProductos[obj].precio_producto);
            const totalLinea = subtotal - (descuentoAplicado) + Number(impuestoTotal);
            let monto = 0;
            let baseImponible = 0;

            /*if (this.listaProductos[obj].codigo_impuesto == '01' || this.listaProductos[obj].codigo_impuesto == '07') {
                if (this.listaProductos[obj].codigo_impuesto == '07') {
                  baseImponible = this.listaProductos[obj].precio_producto;
                  monto = baseImponible * Number(this.listaProductos[obj].porcentaje_impuesto);
                }
            } else {
              monto = subtotal * Number(this.listaProductos[obj].porcentaje_impuesto);
            }*/

            baseImponible = this.listaProductos[obj].precio_producto;
            monto = baseImponible * Number(this.listaProductos[obj].porcentaje_impuesto);

            impuestoNeto = parseFloat(impuestoTotal) - porcentajeExoneracionGlobal;
            this.lineaDetalle.idproducto = this.listaProductos[obj].idproducto,
            this.lineaDetalle.precio_linea = String(parseFloat(this.listaProductos[obj].precio_producto).toFixed(2)),
            this.lineaDetalle.cantidad = cantidadTotal.toString(),
            this.lineaDetalle.descripcioDetalle = this.listaProductos[obj].descripcion,
            // this.lineaDetalle.porcentajedescuento = '0',
            this.lineaDetalle.montodescuento = descuentoAplicado.toString(),
           // this.lineaDetalle.naturalezadescuento = '',
            this.lineaDetalle.numerolineadetalle = String(this.arrayDetalles.length  + 1),
            this.lineaDetalle.subtotal = subtotal.toString(),
            this.lineaDetalle.montototal = subtotal.toString(),
            this.lineaDetalle.codigo = this.listaProductos[obj].codigo_impuesto, // codigo para base imponible
            this.lineaDetalle.codigo_tarifa = '07', // codigo del impuesto
            this.lineaDetalle.tarifa = this.listaProductos[obj].porcentaje_impuesto, // porcentaje aplicado para el impuesto
            this.lineaDetalle.monto = monto.toString(),
            this.lineaDetalle.baseimponible = baseImponible.toString(),
            // tslint:disable-next-line: max-line-length
            this.lineaDetalle.impuesto = impuestoTotal.toString(),
            this.lineaDetalle.impuesto_neto = impuestoNeto.toString(),
            this.lineaDetalle.numerodocumento = '0',
            // tslint:disable-next-line: max-line-length
            this.lineaDetalle.montoitotallinea = totalLinea.toString();
            console.log(this.lineaDetalle);
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
  }


  obtenerTotalesFactura() {

    // VARIABLES PARA OBTENER LOS TOTALES DE FACTURA
    let porcentaje_descuento_total = 0;
    let monto_descuento_total = parseFloat(this.totalDescuento);
    let subtotal = Number(this.SubtotalComprobante);
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
    let totaldescuentos = 0;
    let totalventaneta = 0;
    let totalimpuesto = 0;
    let totalcomprobante = parseFloat(this.totalPagar);

    for (const linea in this.arrayDetalles){

      
    }

    // CARGAR EL OBJETO PARA GUARDAR LA FACTURA
    this.objFactura.id = '',
    this.objFactura.idcliente = '',
    this.objFactura.idemisor = '',
    this.objFactura.condicion_venta = '',
    this.objFactura.medio_pago = '',
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
    this.objFactura.codigomoneda = '',
    this.objFactura.tipoCambio = '',
    this.objFactura.tipo_factura = '',
    this.objFactura.fecha_factura = '',
    this.objFactura.ordenes = [];

  }

  quitarOrden(idorden) {
    let i = 0;
    let nuevoSubtotal = Number(this.SubtotalComprobante);
    let nuevoImpuesto = parseFloat(this.totalImpuesto);
    let nuevoTotal =  parseFloat(this.totalPagar);
    let nuevoDescuento = parseFloat(this.totalDescuento);
    // tslint:disable-next-line: forin
    for (const obj in this.arrayDetalles) {
      if (idorden == this.arrayDetalles[obj].idproducto) {

        nuevoSubtotal -= Number(this.arrayDetalles[obj].subtotal);
        this.SubtotalComprobante = nuevoSubtotal.toString();
        nuevoImpuesto -= parseFloat(this.arrayDetalles[obj].impuesto);
        this.totalImpuesto = nuevoImpuesto.toString();
        nuevoTotal -= parseFloat(this.arrayDetalles[obj].montoitotallinea);
        this.totalPagar = nuevoTotal.toString();
        nuevoDescuento -= parseFloat(this.arrayDetalles[obj].montodescuento);
        this.totalDescuento = nuevoDescuento.toString();
        this.arrayDetalles.splice(i, 1);
        localStorage.setItem('detalles', JSON.stringify(this.arrayDetalles));
      }
      i += 1;
    }// sub   impue   desc    total
  } // 60370	1961.72	4861.82	57469.90

  limpiarLineaDetalle() {
    this.lineaDetalle.idproducto = '';
   /* this.lineaDetalle.precio_linea = '',
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
    this.lineaDetalle.montoitotallinea = '';*/
  }

  cargarProducto() {
    if (this.lineaDetalle.idproducto === '') {
      return;
    } else {

      this.cargarDatosLinea();
      // tslint:disable-next-line: one-variable-per-declaration
      let subtotal = 0,
          impuestos = 0,
          descuentos = 0,
          totalPagar = 0;
      const getDetalles = localStorage.getItem('detalles');
      let localStorageDetalles = [];
      if (!getDetalles) {

        localStorageDetalles.push(this.lineaDetalle);
        localStorage.setItem('detalles', JSON.stringify(localStorageDetalles));
        this.arrayDetalles = localStorageDetalles;
        // this.limpiarLineaDetalle();
      } else {
        localStorageDetalles = JSON.parse(localStorage.getItem('detalles'));
        localStorageDetalles.push(this.lineaDetalle);
        localStorage.setItem('detalles', JSON.stringify(localStorageDetalles));
        this.arrayDetalles = localStorageDetalles;

        // OBTENER LOS TOTALES DEL COMPROBANTE

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
        // this.limpiarLineaDetalle();
      }
    }
  }

  listarOrdenes() {
    const getDetalles = localStorage.getItem('detalles');
    if (getDetalles) {

        // tslint:disable-next-line: one-variable-per-declaration
        let subtotal = 0,
        impuestos = 0,
        descuentos = 0,
        totalPagar = 0;
        this.arrayDetalles = JSON.parse(localStorage.getItem('detalles'));

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
      .subscribe(response => {
        console.log(response);
      },
      err => console.log(err));
  }

  nuevoCliente(obj) {
    console.log(obj);

    this.clienteService.guardarCliente(obj)
      .subscribe(response => {
        (document.getElementById('formNuevoCliente') as HTMLFormElement).reset();
        $('#ModalNuevoCliente').hide();
        this.cargarCliente(this.objCliente.cliente_nombre);
      },
      err => console.log(err));
  }

  cargarCliente(obj) {

    (document.getElementById('nombreCliente') as HTMLInputElement).value = obj.nombre;
    (document.getElementById('nombreComercialCliente') as HTMLInputElement).value = obj.nombreComercial;
    (document.getElementById('cedulaCliente') as HTMLInputElement).value = obj.cedula;
    (document.getElementById('correoCliente') as HTMLInputElement).value = obj.correo;
    (document.getElementById('telefonoCliente') as HTMLInputElement).value = obj.telefono;
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

    (document.getElementById('nombreCliente') as HTMLInputElement).value = '';
    (document.getElementById('nombreComercialCliente') as HTMLInputElement).value = '';
    (document.getElementById('cedulaCliente') as HTMLInputElement).value = '';
    (document.getElementById('correoCliente') as HTMLInputElement).value = '';
    (document.getElementById('telefonoCliente') as HTMLInputElement).value = '';
  }

  buscarCliente(e, query) {
    e.preventDefault();

    if (query === '') {
      return;
    } else {
     this.clienteService.buscarCliente(query)
       .subscribe(response =>  {

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

  mostrarFechaHora() {
    this.fechaHora();
    setInterval(() => this.fechaHora(), 1000);
  }

  fechaHora() {
    const d = new Date();
    const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
    const dia = d.getDate();
    const anio = d.getFullYear();
    const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    const minutos = (d.getMinutes() < 10) ?  '0' + d.getMinutes() : d.getMinutes();
    const segundos = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
    this.objFactura.fecha_factura = dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos + ':' + segundos;
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
