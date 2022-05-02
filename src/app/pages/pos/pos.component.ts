import Swal  from 'sweetalert2';
import { ClienteService } from './../../services/pages/cliente.service';
import { ProveedorService } from './../../services/pages/proveedor.service';
import { ProductoService } from './../../services/pages/producto.service';
import { POSService, Descuento,URL_SERVICIOS } from './../../services/pages/pos.service';
import { FacturaCompraService } from './../../services/pages/factura-compra.service';
import { FacturaService } from './../../services/pages/factura.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import * as xmlConverter from 'xml-js';
import { fromEvent } from 'rxjs';
declare var $: any;
// facturaCompraService
@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class POSComponent implements OnInit {

  constructor(
      private posService: POSService,
      private clienteService: ClienteService,
      private proveedorService: ProveedorService,
      private productoService: ProductoService,
      private facturaCompraService: FacturaCompraService,
      private facturaService: FacturaService
  ) {
    //this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerDescuento();
    this.obtenerTiposCedula();
    this.obtenerProductosPorCategoria(null);
    this.obtenerTipoCambio();
    this.medioPago();
    this.obtenerCondicionesVenta();
   }
  
  iddescuento : number = 0;
  listaProductos = [] ;
  listaFormaPago = [];
  listaProductosVendidos = [] ;
  listaCategorias = [];
  listaDescuentos : Descuento[] = [];
  listaTiposCedula = [];
  listaCondicionesVenta = [];
  config: any;
  collection = { count: 0, data: [] };
  totalVenta : string = '0';
  totalDescuento: string  = '0';
  totalImpuesto: string  = '0';
  totalImpuestoNeto : string | number = 0;
  subtotalVenta: string  = '0' ;
  cantidadProductos : number = 0;
  txtCedbuscarCliente: string;
  cliente: string = '';
  correo: string = '';
  mensaje: string = 'No hay productos asociados a esta categoría';
  mostrar: boolean = true;
  impServicio: string = '';
  nombreProducto: string = '';
  formaPago: string = '01';
  condicionVenta: string = '01';
  pdfURL : string = '';
  vuelto:number = 0;
  errorDecimales: boolean = false;
  monto: number = null;
  montoTarjeta: number = null;
  montoTotalVenta : string = '0';
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
    exentoIVA: false,
    tipoExoneracion: '',
    porcentajeExoneracion: 0,
    NombreInstitucion: '',
    documentoExoneracion: '',
  };

  objFactura =  {
    id: '',
    idcliente: '1',
    nombreCliente: '',
    condicion_venta: '01',
    plazo_credito: 0,
    medio_pago: '01',
    medio_pago2: null,
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
    tipo_factura: '04',
    prefactura: '',
    otrosCargos : '',
    ordenes: [],
    objOrdenes: {}
  };

  porcentajeExoneracion = 0;
  tipoCambio: string;
  plazo_credito: number;
  iddescuentoSeleccionado: number = 0;
  bloquearBtnPagar: boolean = true;
  ngOnInit() {

    //$('#ModalFacturaPdf').modal('show');

    this.config = {
      itemsPerPage: 16,
      currentPage: 1,
      totalItems: this.collection.count
    }; 

   
    /*
      const btnPagar = (document.getElementById("btnPagar") as HTMLButtonElement);
    const btnPagarClick = fromEvent(btnPagar,'click');


    btnPagarClick.subscribe((e: Event) => {

      if (this.listaProductosVendidos.length === 0){
        return ;
      } else {
        this.generarFactura();
      }
    })
    */
  }

  agregarProducto(producto){

    let totalVenta = 0, totalImpuesto= 0, totalDescuento = 0, subtotalVenta = 0, cantidadProductos =0, montoTotal = 0;
    let existe : boolean = false;
    if(this.listaProductosVendidos.length == 0){

     for(let i in this.listaProductos){
        if(producto.idproducto == this.listaProductos[i].idproducto){

          const precio = Number(producto.precio_producto);
          const cantidad: number = 1;
          producto.cantidad = cantidad;
          producto.precio_producto = precio.toFixed(2);
          cantidadProductos +=1;
          this.cantidadProductos = cantidadProductos;
          this.obtenerTotalesLinea(producto, true);           
        }
     }

    } else {

      let productoActual = null;
      for(let i in this.listaProductosVendidos){
        if(this.listaProductosVendidos[i].idproducto == producto.idproducto){
          existe = true;
          productoActual = this.listaProductosVendidos[i];
        } 
      }

      if(existe){
      

        let cantidad  = Number(productoActual.cantidad);
        cantidad += 1;
        productoActual.cantidad = cantidad;
        cantidadProductos = Number(this.cantidadProductos);
        cantidadProductos += 1;
        this.cantidadProductos = cantidadProductos;

        this.obtenerTotalesLinea(productoActual, false);
        
        
      } else {

        producto.cantidad = 1;
        cantidadProductos = Number(this.cantidadProductos);
        cantidadProductos += 1;
        this.cantidadProductos = cantidadProductos;
        
        this.obtenerTotalesLinea(producto, true);
      
      }
    }
  }

  obtenerTotalesLinea(producto, insertar: boolean){
   
    let subtotal = 0,
    cantidad = producto.cantidad,
    montoDescuento = 0,
    montoTotal = 0,
    naturalezadescuento= '',
    porcentajeDescuento= 0,
    porcentajeImpuesto = 0, 
    montoImpuesto = 0,
    baseImponible = 0,
    impuestoNeto = 0,
    montototallinea = 0,
    montoExoneracion = 0,
    factorIVA = 0,
    subtotal2 = 0,
    descuento = 0,
    impuesto = 0;
    let existe = false;
    let impuestoExonerado = 0;
    let linea = { //identrada y numero linea se asignan en el servidor
      idproducto: '',precio_linea: '',cantidad: '',descripcioDetalle: '',porcentajedescuento: '',montodescuento: '',
      naturalezadescuento: '',numerolineadetalle: '',subtotal: '',montototal: '',codigo: '',codigo_tarifa: '',
      tipo_servicio: '',tarifa: '',monto: '',impuesto_neto: '',numerodocumento: '',montoitotallinea: '',baseimponible: '',
      MontoExoneracion: '',factorIVA: '',otrosCargos: '', PorcentajeExonerado: 0,iddescuento : null
    };

    console.log("linra antes de procesar",linea)
    for(let i in this.listaProductosVendidos){
      if(this.listaProductosVendidos[i].idproducto == producto.idproducto){
        existe = true;
      }
    }

    if(existe == false){ // no se ha cambiado el descuento

      porcentajeImpuesto = producto.porcentaje_impuesto;
      montoTotal = Number(producto.precio_producto) * 1;
      subtotal = montoTotal - montoDescuento;


      if(Number(this.porcentajeExoneracion) > Number(producto.porcentaje_impuesto)){
        
        impuestoExonerado = Number(producto.porcentaje_impuesto);
        montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
        montoExoneracion = ((subtotal * impuestoExonerado) /100); 
        impuestoNeto = montoImpuesto - montoExoneracion;
        linea.PorcentajeExonerado = impuestoExonerado;
        //MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
      } else {
        impuestoExonerado = Number(this.porcentajeExoneracion);
        montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
        montoExoneracion = ((subtotal * impuestoExonerado) /100); 
        impuestoNeto = montoImpuesto - montoExoneracion;
        linea.PorcentajeExonerado = impuestoExonerado;
      }
      montototallinea = subtotal + impuestoNeto; 

      linea.idproducto = producto.idproducto;
      linea.descripcioDetalle = producto.descripcion;
      linea.naturalezadescuento = naturalezadescuento;
      linea.montodescuento = montoDescuento.toFixed(2);
      linea.porcentajedescuento = porcentajeDescuento.toString();
      linea.precio_linea = Number(producto.precio_producto).toFixed(2);
      linea.cantidad = producto.cantidad;
      linea.subtotal = subtotal.toFixed(2);
      linea.montototal = montoTotal.toFixed(2);
      linea.codigo = '01';
      linea.numerolineadetalle = this.listaProductosVendidos.length.toString();
      linea.codigo_tarifa = producto.codigo_impuesto;
      linea.tipo_servicio = producto.tipo_servicio;
      linea.tarifa = Number(porcentajeImpuesto).toFixed(2);
      linea.monto =  montoImpuesto.toFixed(2);
      linea.impuesto_neto = impuestoNeto.toFixed(0);
      linea.baseimponible = baseImponible.toFixed(0);
      linea.MontoExoneracion = montoExoneracion.toFixed(0);
      linea.factorIVA = factorIVA.toFixed(2);
      linea.montoitotallinea = montototallinea.toFixed(2);
      linea.otrosCargos = (subtotal * .10).toFixed(2);
      linea.iddescuento = '';
     
      console.log(linea)
      
     
      this.listaProductosVendidos.push(linea); 

      for(let i in this.listaProductosVendidos){
        if(this.listaProductosVendidos[i].idproducto == linea.idproducto){
          this.listaProductosVendidos[i] = linea;
        }
      }

     

      montoImpuesto = 0;
      subtotal = 0;
      montototallinea = 0;
      montoDescuento = 0;
      let montImpuestoNeto = 0,montoVenta=0;
      this.listaProductosVendidos.forEach((element) => {
        
        montoTotal = Number(element.montototal);
        montoVenta +=montoTotal;
        montoDescuento += Number(element.montodescuento);
        descuento = Number(element.montodescuento);
        subtotal += montoTotal - descuento;
        subtotal2 = montoTotal - descuento;
        montoImpuesto += Number(element.monto);
        impuesto = Number(element.monto);
        //montototallinea += subtotal2 + impuesto;
        montototallinea += Number(element.montoitotallinea);
        montImpuestoNeto +=Number(element.impuesto_neto);         
      });

      this.subtotalVenta = subtotal.toFixed(2);
      this.totalVenta = montototallinea.toFixed(2); 
      this.totalImpuesto = montoImpuesto.toFixed(2);
      this.totalDescuento = montoDescuento.toFixed(2);
      this.totalImpuestoNeto = montImpuestoNeto.toFixed(2);
      this.montoTotalVenta = montoVenta.toFixed(2);
    } else {// se ha cambiado el descuento
    
      console.log(producto)

      montoTotal = Number(producto.precio_linea) * cantidad;
       
      naturalezadescuento = producto.naturalezadescuento;
      montoDescuento = ( Number(producto.porcentajedescuento)/ 100 ) * Number(montoTotal);
      porcentajeDescuento = producto.porcentajedescuento;

      subtotal = montoTotal - montoDescuento;
      
      porcentajeImpuesto = producto.tarifa;
     // montoImpuesto = (subtotal * porcentajeImpuesto) / 100;

     if(Number(this.porcentajeExoneracion) > Number(porcentajeImpuesto)){
        
      impuestoExonerado = Number(porcentajeImpuesto);
      montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
      montoExoneracion = ((subtotal * impuestoExonerado) /100); 
      impuestoNeto = montoImpuesto - montoExoneracion;
      linea.PorcentajeExonerado = impuestoExonerado;
      //MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
    } else {
      impuestoExonerado = Number(this.porcentajeExoneracion);
      montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
      montoExoneracion = ((subtotal * impuestoExonerado) /100); 
      impuestoNeto = montoImpuesto - montoExoneracion;
      linea.PorcentajeExonerado = impuestoExonerado;
    }

      montototallinea = subtotal + impuestoNeto;

      linea.idproducto = producto.idproducto;
      linea.descripcioDetalle = producto.descripcioDetalle;
      linea.naturalezadescuento = naturalezadescuento;
      linea.montodescuento = montoDescuento.toFixed(2);
      linea.porcentajedescuento = porcentajeDescuento.toString();
      linea.precio_linea = Number(producto.precio_linea).toFixed(2);
      linea.cantidad = producto.cantidad;
      linea.subtotal = subtotal.toFixed(2);
      linea.montototal = montoTotal.toFixed(2);
      linea.codigo = '01';
      linea.codigo_tarifa = producto.codigo_tarifa;
      linea.tipo_servicio = producto.tipo_servicio;
      linea.tarifa = Number(porcentajeImpuesto).toFixed(2);
      linea.monto =  montoImpuesto.toString();
      linea.impuesto_neto = impuestoNeto.toFixed(0);
      linea.baseimponible = baseImponible.toFixed(0);
      linea.MontoExoneracion = montoExoneracion.toFixed(0);
      linea.factorIVA = factorIVA.toFixed(2);
      linea.montoitotallinea = montototallinea.toFixed(2);
      linea.otrosCargos = (subtotal * .10).toFixed(2);
      
      for(let i in this.listaProductosVendidos){
        if(this.listaProductosVendidos[i].idproducto == linea.idproducto){
          this.listaProductosVendidos[i] = linea;
        }
      }

      linea.iddescuento = producto.iddescuento;
      

      montoImpuesto = 0;
      subtotal = 0;
      montototallinea = 0;
      montoDescuento = 0;
      let impuestoTotal = 0;
      let montoImpuestoNeto = 0,montoVenta=0;
      this.listaProductosVendidos.forEach((element,i) => {
        i++;
        console.log(i);
        element.numerolineadetalle = i;
        montoTotal = Number(element.montototal);
        montoVenta +=montoTotal;
        montoDescuento += Number(element.montodescuento);
        descuento = Number(element.montodescuento);
        subtotal += montoTotal - descuento;
        subtotal2 = montoTotal - descuento;
        montoImpuesto += Number(element.monto);
        impuesto = Number(element.monto);
        impuestoTotal += impuesto;
        //montototallinea += subtotal2 + impuesto;
        montototallinea += Number(element.montoitotallinea);        
        montoImpuestoNeto += Number(element.impuesto_neto); 
      });

      this.subtotalVenta = subtotal.toFixed(2);
      this.totalVenta = montototallinea.toFixed(2); 
      this.totalImpuesto = impuestoTotal.toFixed(2);
      this.totalDescuento = montoDescuento.toFixed(2);
      this.totalImpuestoNeto = montoImpuestoNeto.toFixed(2);
      this.montoTotalVenta = montoVenta.toFixed(2);
    }
  }

  obtenerTotalesConDescuento(producto, iddescuento){
   
    console.log(producto)
    let subtotal = 0,
        cantidad = producto.cantidad,
        montoDescuento = 0,
        montoTotal = 0,
        naturalezadescuento= '',
        porcentajeDescuento= 0,
        porcentajeImpuesto = 0, 
        montoImpuesto = 0,
        baseImponible = 0,
        impuestoNeto = 0,
        montototallinea = 0,
        montoExoneracion = 0,
        factorIVA = 0,
        subtotal2 = 0,
        descuento = 0,
        impuesto = 0,
        impuestoExonerado = 0;
        this.monto = null;
        this.vuelto = 0;
      let linea = { //identrada y numero linea se asignan en el servidor
        idproducto: '',precio_linea: '',cantidad: '',descripcioDetalle: '',porcentajedescuento: '',montodescuento: '',
        naturalezadescuento: '',numerolineadetalle: '',subtotal: '',montototal: '',codigo: '',codigo_tarifa: '',
        tipo_servicio: '',tarifa: '',monto: '',impuesto_neto: '',numerodocumento: '',montoitotallinea: '',baseimponible: '',
        MontoExoneracion: '',factorIVA: '',otrosCargos: '',PorcentajeExonerado: 0,iddescuento: "0"
      };

      montoTotal = Number(producto.montototal) ;
    
      for(let descuento of this.listaDescuentos){

        if (descuento.id === Number(iddescuento)){
          naturalezadescuento = descuento.descripcion;
          montoDescuento = ( Number(descuento.porcentaje)/ 100 ) * Number(montoTotal);
          porcentajeDescuento = descuento.porcentaje; 
        }
      }

      porcentajeImpuesto = producto.tarifa;
      subtotal = montoTotal - montoDescuento;

   
     if(Number(this.porcentajeExoneracion) > Number(porcentajeImpuesto)){
        
      impuestoExonerado = Number(porcentajeImpuesto);
      montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
      montoExoneracion = ((subtotal * impuestoExonerado) /100); 
      impuestoNeto = montoImpuesto - montoExoneracion;
      
      //MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
    } else {
      impuestoExonerado = Number(this.porcentajeExoneracion);
      montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
      montoExoneracion = ((subtotal * impuestoExonerado) /100); 
      impuestoNeto = montoImpuesto - montoExoneracion;
      
    }
      montototallinea = subtotal + impuestoNeto; 
      linea.PorcentajeExonerado = impuestoExonerado;
      linea.idproducto = producto.idproducto;
      linea.descripcioDetalle = producto.descripcioDetalle;
      linea.naturalezadescuento = naturalezadescuento;
      linea.montodescuento = montoDescuento.toFixed(2);
      linea.porcentajedescuento = porcentajeDescuento.toString();
      linea.precio_linea = Number(producto.precio_linea).toFixed(2);
      linea.cantidad = cantidad;
      linea.subtotal = subtotal.toFixed(2);
      linea.montototal = montoTotal.toFixed(2);
      linea.codigo = producto.codigo;
      linea.codigo_tarifa = producto.codigo_tarifa;
      linea.tipo_servicio = producto.tipo_servicio;
      linea.tarifa = Number(porcentajeImpuesto).toFixed(2);
      linea.monto =  montoImpuesto.toFixed(2);
      linea.impuesto_neto = impuestoNeto.toFixed(0);
      linea.baseimponible = baseImponible.toFixed(0);
      linea.MontoExoneracion = montoExoneracion.toFixed(0);
      linea.factorIVA = factorIVA.toFixed(2);
      linea.montoitotallinea = montototallinea.toFixed(2);
      linea.otrosCargos = (subtotal * .10).toFixed(2);
      linea.iddescuento = producto.iddescuento
      
      for(let i in this.listaProductosVendidos){
        if(this.listaProductosVendidos[i].idproducto == linea.idproducto){
          this.listaProductosVendidos[i] = linea;
        }
      }
      montoImpuesto = 0;
      subtotal = 0;
      montototallinea = 0;
      montoDescuento = 0;
      let montoImpuestoNeto = 0,montoVenta=0;
    this.listaProductosVendidos.forEach((element,i) => {
        i++;
        console.log(i);
        element.numerolineadetalle = i;
        montoTotal = Number(element.montototal);
        montoVenta +=montoTotal;
        montoDescuento += Number(element.montodescuento);
        descuento = Number(element.montodescuento);
        subtotal += montoTotal - descuento;
        subtotal2 = montoTotal - descuento;
        montoImpuesto += Number(element.monto);
        impuesto = Number(element.monto);
        //montototallinea += subtotal2 + impuesto;
        montototallinea += Number(element.montoitotallinea); 
        montoImpuestoNeto += Number(element.impuesto_neto);
      
    });

    this.subtotalVenta = subtotal.toFixed(2);
    this.totalVenta = montototallinea.toFixed(2); 
    this.totalImpuesto = montoImpuesto.toFixed(2);
    this.totalDescuento = montoDescuento.toFixed(2);
    this.totalImpuestoNeto = montoImpuestoNeto.toFixed(2); 
    this.montoTotalVenta = montoVenta.toFixed(2);
  }

  pageChanged(event){
    this.config.currentPage = event;
  }


  obtenerCategorias(){
    this.posService.obtenerCategorias()
      .subscribe(response => {
        const datosCategorias = JSON.parse(response);
        this.listaCategorias = datosCategorias.categorias;
      })
  }

  obtenerDescuento(){
    this.posService.obtenerDescuentos()
      .subscribe(response => {
        const datosDescuentos = JSON.parse(response);
        this.listaDescuentos = datosDescuentos.descuentos;
        for(let i in this.listaDescuentos){
          const porcentaje = Number(this.listaDescuentos[i].porcentaje).toFixed(0);
          this.listaDescuentos[i].porcentaje = Number(porcentaje);
        }
      },
      err => {
        console.log(err)
      })
  }

  quitarLinea(producto){
    
    let montoTotal = 0;
    let montoDescuento = 0;
    let subtotal = 0;
    let subtotal2 = 0;
    let montoImpuesto = 0;
    let montototallinea = 0;
    let cantidadProductos = 0;
    let descuento = 0;
    let impuesto = 0;
    let index = 0;
    let impuestoNeto =0;
    let numeroLinea = 0;
    let montoVenta =0;
    for(let i in this.listaProductosVendidos){
      numeroLinea++;
      this.listaProductosVendidos[i].numerolineadetalle = numeroLinea;
    }

    this.listaProductosVendidos.forEach((element,i) => {
      
      if(producto.idproducto != element.idproducto){
        i++;
        console.log(i);
        element.numerolineadetalle = i;
        console.log("entró")
        montoTotal = Number(element.montototal);
        montoVenta += montoTotal;
        montoDescuento += Number(element.montodescuento)
        descuento = Number(element.montodescuento)
        subtotal += montoTotal - descuento;
        subtotal2 = montoTotal - descuento;
        montoImpuesto += Number(element.monto);
        impuesto = Number(element.monto);
        //montototallinea += subtotal2 + impuesto;
        montototallinea += Number(element.montoitotallinea);
        cantidadProductos += Number(element.cantidad);
        impuestoNeto += Number(element.impuesto_neto);   

      }  else {
        index = i;
      }  
    });
    
    this.listaProductosVendidos.splice(index, 1);
    this.subtotalVenta = subtotal.toFixed(2);
    this.totalImpuesto = montoImpuesto.toFixed(2);
    this.totalVenta = montototallinea.toFixed(2);
    this.totalDescuento = montoDescuento.toFixed(2);
    this.totalImpuestoNeto = impuestoNeto.toFixed(2);
    this.cantidadProductos = cantidadProductos;
    this.montoTotalVenta = montoVenta.toFixed(2);
  }

  cargarDescuento(descuento){
    this.iddescuento = descuento.id
  }

  buscarCliente(cedula: string){
    const txtCedulaCliente = (document.getElementById("txtCedbuscarCliente") as HTMLInputElement).value;
    if(txtCedulaCliente === ''){
      return ;
    } else {
      this.clienteService.buscarCliente(cedula)
      .subscribe((response: any) => {
        console.log("respuesta ",response);
        this.objFactura.idcliente = response.cliente[0].id;
        this.objFactura.tipo_factura = '01';
        this.porcentajeExoneracion = (!response.cliente[0].porcentajeExoneracion || response.cliente[0].porcentajeExoneracion == '') ? 0 : Number(Number(response.cliente[0].porcentajeExoneracion).toFixed(0));
        this.objFactura.plazo_credito = (response.cliente[0].plazo_credito && Number(response.cliente[0].plazo_credito) > 0 )? response.cliente[0].plazo_credito: 0;
        this.plazo_credito = (response.cliente[0].plazo_credito && Number(response.cliente[0].plazo_credito) > 0 )? response.cliente[0].plazo_credito: 0;

        $('#ModalBuscarCliente').modal('hide');
          const nombre = response.cliente[0].cliente_nombre.split(' ');
          this.cliente = nombre[0]+' '+nombre[1] + ` (${response.cliente[0].cedula_cliente})`;
          this.correo = response.cliente[0].cliente_correo;  
          this.recalcularLineas();
      },
      err => {
        console.log(err);
       const {status } = err
       if(status === 404){
         console.log("entró")
        $('#ModalBuscarCliente').modal('hide');
        $('#ModalCrearCliente').modal('show');

       } else {
         Swal.fire('Buscar Cliente', 'Ha ocurrido un error en el servidor','error');
       }
      })
    }
  }

  registrarCliente(cliente){

    let cedula = cliente.cedula_cliente, numero_cliente = '';
    
    switch(cedula.length){
      case 9: 
        numero_cliente = '000'+ cedula;
      break;
      case 10:
        numero_cliente = '00'+ cedula;
      break;
      case 11:
        numero_cliente = '0'+ cedula;
      break;

      case 12:
        numero_cliente =  cedula;
      break;
    }

    cliente.numero_cliente;
    cliente.cliente_barrio = '1010101';

    this.clienteService.guardarCliente(cliente)
      .subscribe((response: any) => {
        $('#ModalCrearCliente').modal('hide');
        Swal.fire('Registrar Cliente',response.message,'success');
        const nombre = cliente.cliente_nombre.split(' ');
        const cedula = cliente.cedula_cliente;
        if(typeof nombre[0] !== 'undefined'){
          if(typeof nombre[1] !== 'undefined'){
            this.cliente = nombre[0]+' '+nombre[1] +' ('+cedula+')';
          }else {
            this.cliente = nombre[0]+ ' ('+cedula+')';
          }
        }else {
          this.cliente = nombre+ ' ('+cedula+')';
        }
        this.objFactura.idcliente = response.insertId;
        this.objFactura.tipo_factura = '01';
        this.correo = this.objCliente.cliente_correo;
        this.porcentajeExoneracion = 0;
        this.recalcularLineas();
      },
      err => {
        Swal.fire('Nuevo Cliente', 'Ha ocurrido un error en el servidor', 'error');
      })
  }

  obtenerTiposCedula(){
    this.proveedorService.tipoCedula()
      .subscribe(response => {
        const datosTipoCedula = JSON.parse(response);
        this.listaTiposCedula = datosTipoCedula.tipoCedula;
      },
      err => {
        console.log(err);
    })
  }

  obtenerProductosPorCategoria(e){


    let id = 0;

    if(typeof e !== 'undefined' && e != null){
      id = e.target.value;
    }

    this.posService.obtenerProductosPorCategoria(id)
      .subscribe(response => {
        
        const datosProductos = JSON.parse(response);
        console.log(datosProductos.productos);
        const arr = datosProductos.productos;
    
        this.listaProductos = datosProductos.productos;
        this.collection.data = arr;
        this.collection.count = arr.length;
        console.log(this.listaProductos);    
       
        // slice:1:3"
        for(let objeto of this.collection.data){
          objeto.descripcion = objeto.descripcion.toLowerCase();
          /*
          if(objeto.imagen == null){
            objeto.imagen = URL_SERVICIOS + '/default.png';
          } else {
            objeto.imagen = objeto.imagen;
          } 
          */
        }
        if(this.collection.count > 0){
          this.mostrar = true;
        } else  {
          this.mostrar = false;
        }
      },
      
      err =>  console.log(err));
  }

  restarCantidad(producto){

    let subtotal = 0,
        cantidad = Number(producto.cantidad),
        montoDescuento = 0,
        montoTotal = 0,
        naturalezadescuento= '',
        porcentajeDescuento= 0,
        porcentajeImpuesto = 0, 
        montoImpuesto = 0,
        baseImponible = 0,
        impuestoNeto = 0,
        montototallinea = 0,
        montoExoneracion = 0,
        factorIVA = 0,
        subtotal2 = 0,
        descuento = 0,
        impuesto = 0,
        cantidadProductos =0,
        impuestoExonerado = 0;
      let linea = { //identrada y numero linea se asignan en el servidor
        idproducto: '',precio_linea: '',cantidad: '',descripcioDetalle: '',porcentajedescuento: '',montodescuento: '',
        naturalezadescuento: '',numerolineadetalle: '',subtotal: '',montototal: '',codigo: '',codigo_tarifa: '',
        tipo_servicio: '',tarifa: '',monto: '',impuesto_neto: '',numerodocumento: '',montoitotallinea: '',baseimponible: '',
        MontoExoneracion: '',factorIVA: '',otrosCargos: '',PorcentajeExonerado: 0,iddescuento: null
      };  
      // numerolineadetalle
      if(cantidad > 1) {
        cantidad -= 1;
      } else {
        return;
      }

      montoTotal = Number(producto.precio_linea) * cantidad;      
      naturalezadescuento = producto.naturalezadescuento;
      montoDescuento = ( Number(producto.porcentajedescuento)/ 100 ) * Number(montoTotal);
      porcentajeDescuento = producto.porcentajedescuento; 
      porcentajeImpuesto = producto.tarifa;
      subtotal = montoTotal - montoDescuento;
     // 

     //------------------------------------------------------------------

    if(Number(this.porcentajeExoneracion) > Number(porcentajeImpuesto)){
        
      impuestoExonerado = Number(porcentajeImpuesto);
      montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
      montoExoneracion = ((subtotal * impuestoExonerado) /100); 
      impuestoNeto = montoImpuesto - montoExoneracion;
      linea.PorcentajeExonerado = impuestoExonerado;
      //MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
    } else {
      impuestoExonerado = Number(this.porcentajeExoneracion);
      montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
      montoExoneracion = ((subtotal * impuestoExonerado) /100); 
      impuestoNeto = montoImpuesto - montoExoneracion;
      linea.PorcentajeExonerado = impuestoExonerado;
    }

      montototallinea = subtotal + impuestoNeto; 

      linea.idproducto = producto.idproducto;
      linea.descripcioDetalle = producto.descripcioDetalle;
      linea.naturalezadescuento = naturalezadescuento;
      linea.montodescuento = montoDescuento.toFixed(2);
      linea.porcentajedescuento = porcentajeDescuento.toString();
      linea.precio_linea = Number(producto.precio_linea).toFixed(2);
      linea.cantidad = cantidad.toString();
      linea.subtotal = subtotal.toFixed(2);
      linea.montototal = montoTotal.toFixed(2);
      linea.codigo = producto.codigo;
      linea.codigo_tarifa = producto.codigo_tarifa;
      linea.tipo_servicio = producto.tipo_servicio;
      linea.tarifa = Number(porcentajeImpuesto).toFixed(2);
      linea.monto =  montoImpuesto.toFixed(2);
      linea.impuesto_neto = impuestoNeto.toFixed(0);
      linea.baseimponible = baseImponible.toFixed(0);
      linea.MontoExoneracion = montoExoneracion.toFixed(0);
      linea.factorIVA = factorIVA.toFixed(2);
      linea.montoitotallinea = montototallinea.toFixed(2);
      linea.otrosCargos = (subtotal * .10).toFixed(2);
      linea.iddescuento = producto.iddescuento;

      for(let i in this.listaProductosVendidos){
        if(this.listaProductosVendidos[i].idproducto == linea.idproducto){
          this.listaProductosVendidos[i] = linea;
          console.log(linea);
        }

      }
      montoImpuesto = 0;
      subtotal = 0;
      montototallinea = 0;
      montoDescuento = 0;
      let montoImpuestoNeto = 0,montoVenta = 0;
    this.listaProductosVendidos.forEach((element,i) => {
        i++;
        console.log(i);
        element.numerolineadetalle = i;
        montoTotal = Number(element.montototal);
        montoVenta+=montoTotal;
        montoDescuento += Number(element.montodescuento);
        descuento = Number(element.montodescuento);
        subtotal += montoTotal - descuento;
        subtotal2 = montoTotal - descuento;
        montoImpuesto += Number(element.monto);
        impuesto = Number(element.monto);
        //montototallinea += subtotal2 + impuesto;
        montototallinea += Number(element.montoitotallinea);
        montoImpuestoNeto += Number(element.impuesto_neto);
      
    });
      cantidadProductos = Number(this.cantidadProductos);
      cantidadProductos-= 1;
      this.cantidadProductos = cantidadProductos;
      this.subtotalVenta = subtotal.toFixed(2);
      this.totalVenta = montototallinea.toFixed(2); 
      this.totalImpuesto = montoImpuesto.toFixed(2);
      this.totalDescuento = montoDescuento.toFixed(2);
      this.totalImpuestoNeto = montoImpuestoNeto.toFixed(2);
      this.montoTotalVenta = montoVenta.toFixed(2);
  }

  filtrarProducto(texto){
    
    this.productoService.obtenerProducto(texto,'like')
      .subscribe((response: any) => {

        const arr = response;

        this.listaProductos = arr;//3102737315
        this.collection.data = arr;
        this.collection.count = arr.length;

        for(let objeto of this.collection.data){
          objeto.descripcion = objeto.descripcion.toLowerCase();
          console.log(typeof objeto.imagen)
          console.log(objeto.imagen);
          /*
            if(objeto.imagen == null){
              objeto.imagen = URL_SERVICIOS + '/default.png';
            } else {
              objeto.imagen = URL_SERVICIOS +'/'+objeto.imagen;
            } 
          */
        }
    })
  }

  recargarProductos(texto){
    if(texto === ''){
      this.obtenerProductosPorCategoria(null);
    }
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
    for (const i in this.listaProductosVendidos) {
      index = index + 1;

      montototal = Number(this.listaProductosVendidos[i].subtotal);
      descuento = Number(this.listaProductosVendidos[i].montodescuento);
      // subTotal = Number(this.listaProductosVendidos[i].total_orden);

      object[index] = {
        codigo    : String(this.listaProductosVendidos[i].codigo_servicio),
        codigoComercial : {tipo: String(this.listaProductosVendidos[i].tipo_servicio), codigo: String(this.listaProductosVendidos[i].codigo_servicio)},
        cantidad        : String(this.listaProductosVendidos[i].cantidad),
        unidadMedida    : String(this.listaProductosVendidos[i].unidadMedida),
        detalle         : String(this.listaProductosVendidos[i].descripcioDetalle),
        precioUnitario  : String(this.listaProductosVendidos[i].precio_linea),
        montoTotal      : String(montototal)
      };
      if (Number(this.listaProductosVendidos[i].montodescuento ) > 0) {
        // tslint:disable-next-line: max-line-length
        object[index].descuento = [{montoDescuento: String(this.listaProductosVendidos[i].montodescuento), naturalezaDescuento: String(this.listaProductosVendidos[i].naturalezadescuento)}];
      }

      object[index].subtotal        = String(montototal);
      if (this.listaProductosVendidos[i].codigo == '07' || this.listaProductosVendidos[i].codigo == '01') {
        if (this.listaProductosVendidos[i].codigo_tarifa == '07') { // aplicar base imponible
          object[index].baseImponible = String(this.listaProductosVendidos[i].precio_linea);
        }

        object[index].impuesto = {
          1: {
            codigo: String(this.listaProductosVendidos[i].codigo),
            codigoTarifa: String(this.listaProductosVendidos[i].codigo_tarifa),
            tarifa: String(this.listaProductosVendidos[i].tarifa),
            monto: ''
          }
        };

        if (Number(this.listaProductosVendidos[i].porcentaje_impuesto) > 9) {
          decimal = parseFloat(this.listaProductosVendidos[i].porcentaje_impuesto).toFixed(0);
          porcentaje = '0.' + String(decimal);
          monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
        } else {
          decimal = parseFloat(this.listaProductosVendidos[i].porcentaje_impuesto).toFixed(0);
          porcentaje = '0.0' + String(decimal);
          monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
        }
        object[index].impuesto[1].monto = String(monto_impuesto);
        montototallinea = (montototal  + Number(object[index].impuesto[1].monto));
      } else {
        object[index].impuesto = {
          1: {
            codigoTarifa: String(this.listaProductosVendidos[i].codigo_tarifa),
            tarifa: String(this.listaProductosVendidos[i].tarifa),
            monto: ''
          }
        };

        if (Number(this.listaProductosVendidos[i].porcentaje_impuesto) > 9) {
            decimal = parseFloat(this.listaProductosVendidos[i].porcentaje_impuesto).toFixed(0);
            porcentaje = '0.' + String(decimal);
            monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
        } else {
            decimal = parseFloat(this.listaProductosVendidos[i].porcentaje_impuesto).toFixed(0);
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


  obtenerTotalesFactura() {

    // VARIABLES PARA OBTENER LOS TOTALES DE FACTURA
    let monto_descuento_total = Number(this.totalDescuento);
    let porcentaje_descuento_total = ((Number(monto_descuento_total) * 100 ) / Number(this.totalVenta));
    const subtotal = Number(this.subtotalVenta);
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
    let OtrosCargos = 0;
    let totalOtrosCargos = 0;
    let totalcomprobante = 0;
    let montototal = 0;
    let impuestoLinea = 0;
    let valorImpuestoExonerado = 0;
    let ordenes = this.listaProductosVendidos;
    // tslint:disable-next-line: forin
    let index = 0;
    for (let linea in ordenes) {
      index ++;
      ordenes[linea].numerolineadetalle = String(index);
      OtrosCargos += Number(ordenes[linea].otrosCargos);
      montototal = parseFloat(ordenes[linea].montototal);
      const tarifa = ordenes[linea].tarifa;
      let tarifaAplicada = 0;
      if (ordenes[linea].codigo == '01' || ordenes[linea].codigo == '07') { // codigo del impuesto
        //Obtener el monto de impuesto exonerado
          
        //
          if (ordenes[linea].codigo_tarifa == '01'){ // productos exentos del IVA
            if (ordenes[linea].tipo_servicio == '01') {
              // servicios
              // tslint:disable-next-line: max-line-length
              totalservexentos += montototal;
              //totalexento  += montototal;

              // tslint:disable-next-line: max-line-length
              
            }
  
            if (ordenes[linea].tipo_servicio == '02') { //Mercancía
              // mercancías
              // tslint:disable-next-line: max-line-length
              totalmercanciasexentas += montototal; 
              //totalexento  += montototal;
              // tslint:disable-next-line: max-line-length
            }
            totalexento = totalservexentos + totalmercanciasexentas;
            impuestoLinea = Number(ordenes[linea].impuesto_neto);
            totalimpuesto += impuestoLinea;
          } else {
              // Aplica IVA

              if (ordenes[linea].tipo_servicio == '01') {
                // servicios
              
                if(this.porcentajeExoneracion > tarifa){
                  tarifaAplicada = tarifa;
                } else {
                  tarifaAplicada = this.porcentajeExoneracion
                }
  
               const tarifaLinea = (((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
               const tarifaExoneradas = tarifaLinea; //Math.round(tarifaLinea * 100000) / 100000;
               const valorRedondeadoExonerado = tarifaExoneradas * montototal;
                console.log("tarifa exonerada ",tarifaExoneradas);
                console.log("exonerado ",valorRedondeadoExonerado);
               const tarifaLineaGravados = (1- ((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
               const tarifaGravados = tarifaLineaGravados;//Math.round(tarifaLineaGravados * 100000) / 100000;
               const valorRedondeadoGravado = tarifaGravados * montototal;
  
               totalservexonerado += Math.round(valorRedondeadoExonerado * 100000) / 100000;
               totalservgravados += Math.round(valorRedondeadoGravado * 100000) / 100000;
            
              }
    
              if (ordenes[linea].tipo_servicio == '02') {
                // mercancías

  
                if(this.porcentajeExoneracion > tarifa){
                  tarifaAplicada = tarifa;
                } else {
                  tarifaAplicada = this.porcentajeExoneracion
                }
  
               const tarifaLinea = (((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
               const tarifaExoneradas = tarifaLinea; //Math.round(tarifaLinea * 100000) / 100000;
               const valorRedondeadoExonerado = tarifaExoneradas * montototal;
                console.log("tarifa exonerada ",tarifaExoneradas);
                console.log("exonerado ",valorRedondeadoExonerado);
               const tarifaLineaGravados = (1- ((Number(tarifaAplicada) * 100 /100)/ parseFloat(tarifa)));
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
    if(this.impServicio == 'SI'){
      totalOtrosCargos = OtrosCargos;
    } else {
      totalOtrosCargos = 0;
    }// 603650833

    totalventa = totalgravado + totalexento + totalexonerado;
    totalventaneta = totalventa - totaldescuentos;
    totalcomprobante = totalventaneta + totalimpuesto + totalOtrosCargos;
    // CARGAR EL OBJETO PARA GUARDAR LA FACTURA
    this.objFactura.id = '',
    
    this.objFactura.condicion_venta = '01';
    this.objFactura.porcentaje_descuento_total = porcentaje_descuento_total.toFixed(2),
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
    this.objFactura.totalcomprobante = Number(totalcomprobante).toFixed(2),
    this.objFactura.otrosCargos = Number(totalOtrosCargos).toFixed(2);
    this.objFactura.codigomoneda = 'CRC',
    this.objFactura.objOrdenes = this.generarJsonDetalles();
    this.objFactura.ordenes = ordenes;
    /*let tipocambioFinal = ''; 


    if(this.objFactura.codigomoneda == 'USD'){
    
      tipocambioFinal = '1'
    }else {
       tipocambioFinal=this.tipoCambio;
    }*/

    if(this.formaPago == '06'){
      this.objFactura.medio_pago2 = '02' //tarjeta
      this.objFactura.medio_pago = '01'  //efectivo
    } else {
      this.objFactura.medio_pago = this.formaPago;
    }

    this.objFactura.tipocambio = this.tipoCambio;
  
    const obj = {
      ordenes: this.objFactura.ordenes,
      factura: this.objFactura,
      objOrdenes: {},
      tipo : 'nuevaFactura'
    };

    console.log("factura" ,obj);
    return obj
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

  limpiarTotalesFactura() {
    this.plazo_credito = 0;
    this.condicionVenta = '01';
    this.formaPago = '01';
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
    this.objFactura.codigomoneda = '',
    // this.objFactura.tipocambio= '',
    this.objFactura.tipo_factura = '04',
    this.objFactura.ordenes = [],
    this.objFactura.objOrdenes = {};

  }

  generarFactura() {
        
    const obj = this.obtenerTotalesFactura(); 
    const txtCliente = (document.getElementById("txtcliente")  as HTMLInputElement);
    this.facturaService.nuevoComprobante(obj)
      .subscribe((response: any) => {
        
          const idfactura = response.idfactura;
          const correoCliente = this.correo+',';
          this.listaProductosVendidos = [];
          this.totalVenta = '0';
          this.totalImpuesto = '0';
          this.totalDescuento = '0';
          this.totalImpuestoNeto = '0';
          this.subtotalVenta = '0';
          this.montoTotalVenta = '0';
          this.cantidadProductos = 0;
          this.cliente = '';
          this.vuelto = 0;
          this.monto = null;
          this.limpiarTotalesFactura();
          txtCliente.value = '';
          this.porcentajeExoneracion = 0;
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
          })

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
      },
      err => {
         this.listaProductosVendidos = [];
          this.totalVenta = '0';
          this.totalImpuesto = '0';
          this.totalDescuento = '0';
          this.subtotalVenta = '0';
          this.totalImpuestoNeto = '0';
          this.montoTotalVenta = '0';
          this.cantidadProductos = 0;
          this.objFactura.idcliente = '1';
          this.objFactura.medio_pago = '01';
          this.porcentajeExoneracion = 0;
          this.cliente = '';
          this.vuelto = 0;
          this.monto = null;
          this.limpiarTotalesFactura();
          txtCliente.value = '';
          Swal.fire('Generar Comprobante', 'Ha habido un error en el servidor', 'error');  
    });
  }

  medioPago(){
    this.facturaService.medioPago()
      .subscribe((response: any) => {
        const mediosPago = response.medioPago;

        mediosPago.forEach(element => {
          if(element.id == '01' || element.id == '02' || element.id == '06' ){
            this.listaFormaPago.push(element);
          }
        });
    },err => {
      console.log(err);
    })
  }

  cargarFormaPago(formaPago){
    this.objFactura.medio_pago = formaPago;
  }

  quitarCliente(){
    this.objFactura.idcliente = '1';
    this.objFactura.tipo_factura = '04';
    this.cliente = '';
    this.porcentajeExoneracion = 0;
    this.recalcularLineas();
  }  


  recalcularLineas(){


      let subtotal = 0,
          //cantidad = Number(),
          montoDescuento = 0,
          montoTotal = 0,
          naturalezadescuento= '',
          porcentajeDescuento= 0,
          porcentajeImpuesto = 0, 
          montoImpuesto = 0,
          baseImponible = 0,
          impuestoNeto = 0,
          montototallinea = 0,
          montoExoneracion = 0,
          factorIVA = 0,
          subtotal2 = 0,
          descuento = 0,
          impuesto = 0,
          cantidadProductos =0,
          impuestoExonerado = 0;
        /*let linea = { //identrada y numero linea se asignan en el servidor
          idproducto: '',precio_linea: '',cantidad: '',descripcioDetalle: '',porcentajedescuento: '',montodescuento: '',
          naturalezadescuento: '',numerolineadetalle: '',subtotal: '',montototal: '',codigo: '',codigo_tarifa: '',
          tipo_servicio: '',tarifa: '',monto: '',impuesto_neto: '',numerodocumento: '',montoitotallinea: '',baseimponible: '',
          MontoExoneracion: '',factorIVA: '',otrosCargos: '',PorcentajeExonerado: 0
        };  */
        // numerolineadetalle
        

        for(let linea of this.listaProductosVendidos){
          montoTotal = Number(linea.precio_linea) * Number(linea.cantidad);      
          naturalezadescuento = linea.naturalezadescuento;
          if(Number(linea.porcentajedescuento) > 0){
            montoDescuento = ( Number(linea.porcentajedescuento)/ 100 ) * Number(montoTotal);
          }
          
          porcentajeDescuento = linea.porcentajedescuento; 
          porcentajeImpuesto = linea.tarifa;
          subtotal = montoTotal - montoDescuento;
          // montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
        
          
          if(Number(this.porcentajeExoneracion) > Number(porcentajeImpuesto)){
            
          impuestoExonerado = Number(porcentajeImpuesto);
          montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
          montoExoneracion = ((subtotal * impuestoExonerado) /100); 
          impuestoNeto = montoImpuesto - montoExoneracion;
          linea.PorcentajeExonerado = impuestoExonerado;
          //MontoExoneracion = ((subtotal * impuestoExonerado) / 100).toFixed(2);
        } else {
          impuestoExonerado = Number(this.porcentajeExoneracion);
          montoImpuesto = (subtotal * porcentajeImpuesto) / 100;
          montoExoneracion = ((subtotal * impuestoExonerado) /100); 
          impuestoNeto = montoImpuesto - montoExoneracion;
          linea.PorcentajeExonerado = impuestoExonerado;
        }

          montototallinea = subtotal + impuestoNeto; 

          
          
          //linea.naturalezadescuento = naturalezadescuento;
          linea.montodescuento = montoDescuento.toFixed(2);
          //linea.porcentajedescuento = porcentajeDescuento.toString();
          //linea.precio_linea = Number(producto.precio_linea).toFixed(2);
          //linea.cantidad = cantidad.toString();
          linea.subtotal = subtotal.toFixed(2);
          linea.montototal = montoTotal.toFixed(2);
          //linea.codigo = producto.codigo;
          //linea.codigo_tarifa = producto.codigo_tarifa;
          //linea.tipo_servicio = producto.tipo_servicio;
          linea.tarifa = Number(porcentajeImpuesto).toFixed(2);
          linea.monto =  montoImpuesto.toFixed(2);
          linea.impuesto_neto = impuestoNeto.toFixed(0);
          linea.baseimponible = baseImponible.toFixed(0);
          linea.MontoExoneracion = montoExoneracion.toFixed(0);
          linea.factorIVA = factorIVA.toFixed(2);
          linea.montoitotallinea = montototallinea.toFixed(2);
          linea.otrosCargos = (subtotal * .10).toFixed(2);
        }


        
        montoImpuesto = 0;
        subtotal = 0;
        montototallinea = 0;
        montoDescuento = 0;
        let montoImpuestoNeto = 0,montoVenta =0;
      this.listaProductosVendidos.forEach((element,i) => {
          i++;
          console.log(i);
          element.numerolineadetalle = i;
          montoTotal = Number(element.montototal);
          montoVenta += montoTotal;
          montoDescuento += Number(element.montodescuento);
          descuento = Number(element.montodescuento);
          subtotal += montoTotal - descuento;
          subtotal2 = montoTotal - descuento;
          montoImpuesto += Number(element.monto);
          impuesto = Number(element.monto);
          //montototallinea += subtotal2 + impuesto;
          montototallinea += Number(element.montoitotallinea);
          montoImpuestoNeto += Number(element.impuesto_neto);
        
      });

      console.log("lineas ",this.listaProductosVendidos)

        cantidadProductos = Number(this.cantidadProductos);
        this.cantidadProductos = cantidadProductos;
        this.subtotalVenta = subtotal.toFixed(2);
        this.totalVenta = montototallinea.toFixed(2); 
        this.totalImpuesto = montoImpuesto.toFixed(2);
        this.totalDescuento = montoDescuento.toFixed(2);
        this.totalImpuestoNeto = montoImpuestoNeto.toFixed(2);
        this.montoTotalVenta = montoVenta.toFixed(2);
  }

  obtenerCondicionesVenta() {
    // listaCondicionesVenta

    this.facturaService.condicionVenta().subscribe((response: any) => {
      this.listaCondicionesVenta = response.condicionVenta;
    })
  }

  validarValoresEnteros(e){
    //^\d+$
    const texto = e.target.value;
    const expresion = /^\d+$/
  
    if(expresion.test(texto) == false){
      this.objFactura.plazo_credito = texto.substr(0, texto.length - 1 );
    }
  }

  aplicarPlazoCredito(valor: number){
    this.objFactura.plazo_credito = valor;
  }

  cargarCondicionVenta(condicion: string){
    this.objFactura.condicion_venta = condicion;
  }

  pagarVentaModal () {
    if (this.listaProductosVendidos.length === 0){
      return ;
    } else {
      this.generarFactura();
    }
  }

  private validarNumerosEnterosOdecimales(monto: number){
    console.log(monto)
    const regexp = /^[0-9]+([.][0-9]+)?$/g;
    if(regexp.test(monto.toString())){
      const montoString = monto.toString().lastIndexOf('.');
      if(montoString != -1 ){
          const montoSubstr = monto.toString().substr(montoString + 1,monto.toString().length);
          if(montoSubstr.length > 2){
            this.errorDecimales = true;
            return false;
          } else {
            return true;
          }
      } else {
        return true
      }
    } else {
      return false
    };
  }

  obtenerVuelto() {
    if(this.formaPago == '01') {
      this.vuelto = 0;
      this.montoTarjeta = null;
      if(this.validarNumerosEnterosOdecimales(this.monto)){
        const totalVenta = Number(Number(this.totalVenta).toFixed(2));
        this.vuelto = -1 * Number((totalVenta - this.monto).toFixed(2));

        if(Number(Number(this.monto).toFixed(2)) >= Number(Number(this.totalVenta).toFixed(2))) {
          this.bloquearBtnPagar = false;
        } else {
          this.bloquearBtnPagar = true;
        }
      } else {
        if(this.errorDecimales){
          this.bloquearBtnPagar = true;
          return alert("Solo puede agregar dos decimales al monto");
          
        }
        this.bloquearBtnPagar = false;
        //this.vuelto = 0;
        //this.monto = null;
        //return alert("El monto no es válido");
      }
    } else if( this.formaPago == '06'){
      this.vuelto = 0;
      if(this.validarNumerosEnterosOdecimales(this.monto) || this.validarNumerosEnterosOdecimales(this.montoTarjeta)){
        if(this.validarNumerosEnterosOdecimales(this.monto) && this.validarNumerosEnterosOdecimales(this.montoTarjeta)){
          const totalPagarAmbosMetodos = Number( this.monto) + Number(this.montoTarjeta);
          const totalVenta = Number(Number(this.totalVenta).toFixed(2));
          this.vuelto = -1 * Number((totalVenta - totalPagarAmbosMetodos).toFixed(2));

          if(Number(Number(totalPagarAmbosMetodos).toFixed(2)) >= Number(Number(this.totalVenta).toFixed(2))) {
            this.bloquearBtnPagar = false;
          } else {
            this.bloquearBtnPagar = true;
          }

        }else {
          if(this.errorDecimales){
            return alert("Solo puede agregar dos decimales en los montos");
          }
          this.vuelto = 0;
          this.monto = null;
          this.montoTarjeta = null;
          return alert("Digite montos válidos");
        }
      }
    }
  }
}
