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
    this.TipoDocumento();
    this.MedioPago();
    this.CondicionVenta();
    this.cargarDatosDefault();

  /* this.tipoDocumento = facturaService.tipoDocumento();
    this.medioPago = facturaService.medioPago();
    this.condicionVenta = facturaService.condicionVenta(); */
    this.tipoIdentificacion = clienteService.tipoIdentificacion();
   
  }


  fechaActual = '';
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
    idcliente: '1',
    idemisor: '4',
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
    tipocambio: '',
    tipo_factura: '',
    ordenes: [],
    objOrdenes: {}
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
          console.log(this.listaProductos);
          this.lineaDetalle.idproducto = response[0].idproducto;
          //this.cargarDatosLinea();
        },
        err => console.log(err));
    }
  }

  cargarDatosLinea() {

    try {

      const nombreProducto = (document.getElementById('txt_nombreProducto') as HTMLInputElement).value;
      const campoCantidad = (document.getElementById('cantidadLinea') as HTMLInputElement).value;
      console.log(campoCantidad);
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
            this.lineaDetalle.unidadMedida = this.listaProductos[obj].unidad_medida;
            this.lineaDetalle.unidadMedidaComercial = this.listaProductos[obj].unidad_medida_comercial;
            this.lineaDetalle.tipo_servicio = this.listaProductos[obj].tipo_servicio;
            this.lineaDetalle.codigo_servicio = this.listaProductos[obj].codigo_servicio;
            // tslint:disable-next-line: max-line-length
            this.lineaDetalle.montoitotallinea = totalLinea.toString();
            this.objFactura.ordenes.push(this.lineaDetalle);
            
            console.log("array detallles",this.arrayDetalles);
            console.log("Ordenes",this.objFactura.ordenes);

            /*
                  localStorage.setItem('detalles', JSON.stringify(this.arrayDetalles));
                  localStorage.setItem('totalFactura', this.totalPagar);
                  localStorage.setItem('subtotalFactura', this.SubtotalComprobante);
                  localStorage.setItem('descuentosFactura', this.totalDescuento);
                  localStorage.setItem('impuestosFactura', this.totalImpuesto);
            */
            this.cargarProducto();
             
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }


  obtenerTotalesFactura() {

    // VARIABLES PARA OBTENER LOS TOTALES DE FACTURA

    let porcentaje_descuento_total = ((parseFloat(this.totalDescuento) * 100 ) / parseFloat(this.totalPagar)).toFixed(2);
    let monto_descuento_total = parseFloat(this.totalDescuento);
    const subtotal = Number(this.SubtotalComprobante);
    let totalservgravados = 0;
    let totalservexentos = 0;
    const totalservexonerado = 0;
    let totalmercanciasgravadas = 0;
    let totalmercanciasexentas = 0;
    const totalmercanciaexonerada = 0;
    let totalgravado = 0;
    let totalexento = 0;
    const totalexonerado = 0;
    let totalventa = 0;
    const totaldescuentos = monto_descuento_total;
    let totalventaneta = 0;
    let totalimpuesto = 0;
    const totalOtrosCargos = 0;
    let totalcomprobante = 0;
    let montototal = 0;
    let impuestoLinea = 0;
    // tslint:disable-next-line: forin
    for (const linea in this.arrayDetalles) {
      console.log(this.arrayDetalles[linea]);
      montototal = parseFloat(this.arrayDetalles[linea].cantidad) *  parseFloat(this.arrayDetalles[linea].precio_linea);

      if (this.arrayDetalles[linea].codigo_impuesto != '01') { // productos exentos del IVA
          if (this.arrayDetalles[linea].tipo_servicio == '01') {
            // mercancái
            totalmercanciasexentas += montototal;
          }

          if (this.arrayDetalles[linea].tipo_servicio == '02') {
            totalservexentos += montototal;
          }

          totalexento  += montototal;
          impuestoLinea = parseFloat(this.arrayDetalles[linea].impuesto) ;
          totalimpuesto += impuestoLinea;

      } else { // Aplica IVA
          if (this.arrayDetalles[linea].tipo_servicio == '01') {
            // mercancái
            console.log('aqui');
            totalmercanciasgravadas += montototal;
          }

          if (this.arrayDetalles[linea].tipo_servicio == '02') {
            totalservgravados += montototal;
          }
          impuestoLinea = parseFloat(this.arrayDetalles[linea].impuesto);
          totalimpuesto += impuestoLinea;
          totalgravado = montototal;
      }

    }
    totalventa = totalgravado + totalexento + totalexonerado;
    totalventaneta = totalventa - totaldescuentos;
    totalcomprobante = totalventaneta + totalimpuesto + totalOtrosCargos;
    // CARGAR EL OBJETO PARA GUARDAR LA FACTURA
    this.objFactura.id = '',
    // this.objFactura.idcliente = '',
    this.objFactura.idemisor = '4',
    /*this.objFactura.condicion_venta = '',
    this.objFactura.medio_pago = '',*/
    this.objFactura.porcentaje_descuento_total = porcentaje_descuento_total,
    this.objFactura.monto_descuento_total = monto_descuento_total.toFixed(2),
    this.objFactura.subtotal = subtotal.toString(),
    this.objFactura.totalservgravados = totalservgravados.toString(),
    this.objFactura.totalservexentos = totalservexentos.toString(),
    this.objFactura.totalservexonerado = totalservexonerado.toString(),
    this.objFactura.totalmercanciasgravadas = totalmercanciasgravadas.toString(),
    this.objFactura.totalmercanciasexentas = totalmercanciasexentas.toString(),
    this.objFactura.totalmercanciaexonerada = totalmercanciaexonerada.toString(),
    this.objFactura.totalgravado = totalgravado.toString(),
    this.objFactura.totalexento = totalexento.toString(),
    this.objFactura.totalexonerado = totalexonerado.toString(),
    this.objFactura.totalventa = totalventa.toString(),
    this.objFactura.totaldescuentos = totaldescuentos.toString(),
    this.objFactura.totalventaneta = totalventaneta.toString(),
    this.objFactura.totalimpuesto = totalimpuesto.toFixed(2).toString(),
    this.objFactura.totalcomprobante = totalcomprobante.toFixed(2),
    this.objFactura.codigomoneda = 'CRC',
    /*this.objFactura.tipoCambio = '',
    this.objFactura.tipo_factura = '',*/
    this.objFactura.objOrdenes = this.generarJsonDetalles();

    const obj = {
      ordenes: this.objFactura.ordenes,
      factura: this.objFactura,
      objOrdenes: this.objFactura.objOrdenes
    };

    console.log(this.objFactura);
    console.log("detalles ",this.arrayDetalles);
     this.generarFactura(obj);

    this.limpiarLineaDetalle();
    this.limpiarTotalesFactura();

    // localStorage.setItem('detalles','[]');
    localStorage.setItem('totalFactura', '0');
    localStorage.setItem('subtotalFactura', '0');
    localStorage.setItem('descuentosFactura', '0');
    localStorage.setItem('impuestosFactura', '0');
    this.arrayDetalles = [];
    localStorage.setItem('detalles', '[]');
    this.totalPagar = localStorage.getItem('totalFactura');
    this.totalImpuesto = localStorage.getItem('subtotalFactura');
    this.totalDescuento = localStorage.getItem('descuentosFactura');
    this.SubtotalComprobante = localStorage.getItem('impuestosFactura');
  }

  generarFactura(obj) {
    this.facturaService.nuevoComprobante(obj)
      .subscribe(response => {
        console.log(response);
      },
      err => console.error(err));
  }

  quitarOrden(idorden) {
    let i = 0;
    let nuevoSubtotal = Number(localStorage.getItem('subtotalFactura'));
    let nuevoImpuesto = parseFloat(localStorage.getItem('impuestosFactura'));
    let nuevoTotal =  parseFloat(localStorage.getItem('totalFactura'));
    let nuevoDescuento = parseFloat(localStorage.getItem('descuentosFactura'));
    // tslint:disable-next-line: forin
    for (const obj in this.arrayDetalles) {
      if (idorden == this.arrayDetalles[obj].numerolineadetalle) {
        nuevoSubtotal -= Number(this.arrayDetalles[obj].subtotal);
        this.SubtotalComprobante = nuevoSubtotal.toFixed(2);

        nuevoImpuesto -= parseFloat(this.arrayDetalles[obj].impuesto);
        this.totalImpuesto = nuevoImpuesto.toFixed(2);
        nuevoTotal -= parseFloat(this.arrayDetalles[obj].montoitotallinea);

        this.totalPagar = nuevoTotal.toFixed(2);
        nuevoDescuento -= parseFloat(this.arrayDetalles[obj].montodescuento);
        this.totalDescuento = nuevoDescuento.toFixed(2);
        this.arrayDetalles.splice(i, 1);
        this.objFactura.ordenes.splice(i, 1);
        localStorage.setItem('detalles', JSON.stringify(this.arrayDetalles));
        localStorage.setItem('totalFactura', this.totalPagar);
        localStorage.setItem('subtotalFactura', this.SubtotalComprobante);
        localStorage.setItem('descuentosFactura', this.totalDescuento);
        localStorage.setItem('impuestosFactura', this.totalImpuesto);

      }
      i += 1;
    }// sub   impue   desc    total
  } // 60370	1961.72	4861.82	57469.90

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
    //this.objFactura.idemisor = '1',
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
    this.objFactura.codigomoneda = '',
    // this.objFactura.tipocambio= '',
    this.objFactura.tipo_factura = '01',
    this.objFactura.ordenes = [],
    this.objFactura.objOrdenes = {};

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
      if (this.arrayDetalles[i].codigo_tarifa == '07' || this.arrayDetalles[i].codigo_tarifa == '01') {
        if (this.arrayDetalles[i].codigo_tarifa == '07') {
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

      if (this.lineaDetalle.idproducto === '') {

      return;
    } else {

      // tslint:disable-next-line: one-variable-per-declaration
      let subtotal = 0,
          impuestos = 0,
          descuentos = 0,
          totalPagar = 0;
      const getDetalles = localStorage.getItem('detalles');
      let localStorageDetalles = [];

      localStorageDetalles = JSON.parse(getDetalles);
      localStorageDetalles.push(this.lineaDetalle);
      localStorage.setItem('detalles', JSON.stringify(localStorageDetalles));
      this.arrayDetalles = localStorageDetalles;


      // OBTENER LOS TOTALES DEL COMPROBANTE

      // tslint:disable-next-line: forin
      for (const linea in this.arrayDetalles) {
        subtotal += Number(parseFloat(this.arrayDetalles[linea].subtotal).toFixed(2));
        totalPagar += Number(parseFloat(this.arrayDetalles[linea].montoitotallinea).toFixed(2));
        impuestos += Number(parseFloat(this.arrayDetalles[linea].impuesto).toFixed(2));
        descuentos += Number(parseFloat(this.arrayDetalles[linea].montodescuento).toFixed(2));
      }
        // this.limpiarLineaDetalle();

      localStorage.setItem('totalFactura', totalPagar.toString());
      localStorage.setItem('subtotalFactura', subtotal.toString());
      localStorage.setItem('descuentosFactura', descuentos.toString());
      localStorage.setItem('impuestosFactura', impuestos.toString());

      this.totalPagar = localStorage.getItem('totalFactura');
      this.totalImpuesto = localStorage.getItem('impuestosFactura');
      this.totalDescuento = localStorage.getItem('descuentosFactura');
      this.SubtotalComprobante = localStorage.getItem('subtotalFactura');//

    }
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
        //$('#ModalNuevoCliente').hide();
        //this.cargarCliente(this.objCliente.cliente_nombre);
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
    this.objFactura.tipo_factura = '01';
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
    this.objFactura.tipo_factura = '04';
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
    this.fechaActual = dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos + ':' + segundos;
  }

  cargarDatosDefault() {
    this.objFactura.tipo_factura = '04';
    this.objFactura.condicion_venta = '01';
    this.objFactura.medio_pago = '01';
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
      this.objFactura.tipocambio = tipocambio.toString();
    },
     err => {
       if (err.status === 500) {
        this.objFactura.tipocambio = '1.00';
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

  TipoDocumento() {
    this.facturaService.tipoDocumento()
      .subscribe(response => {
        this.tipoDocumento = response.tipoDocumento;
      },
      err => console.error(err));
  }

  MedioPago() {
    this.facturaService.medioPago()
      .subscribe(response =>  {
        this.medioPago = response.medioPago;
      },
      err => console.error(err));
  }

  CondicionVenta() {
    this.facturaService.condicionVenta()
      .subscribe(response => {
        this.condicionVenta = response.condicionVenta;
      },
      err => console.error(err));
  }
}
