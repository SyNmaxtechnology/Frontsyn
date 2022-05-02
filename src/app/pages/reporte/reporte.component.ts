import { RecepcionesService } from './../../services/pages/recepciones.service';
import { ConsultaService } from './../../services/pages/consulta.service';
import { ReporteService } from './../../services/pages/reporte.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fromEvent, Observable, Subscription } from "rxjs";
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,
      private reporteService: ReporteService,
      private consultaService: ConsultaService,
      private recepcionService:RecepcionesService) { 

    this.cargarReporte();

  }

  arrayTotales = [];
  arrayComprobantes = [];
  arrayfacturas = [];
  numeroComprobantes: number;
  numerofacturas: number;
  tipoReporte: string;
  tabla: string;
  objetoFiltros: any;
  objetoFiltrosfc: any;
  descripcionFiltros: string;
  tituloReporte : string;
  promedioGlobal : number = null;
  subtotal : string;
  impuestos : string;
  otroscargos: string;
  total: string;
  config: any;
  collection = { count: 0, data: [] };
  ultimaPagina: number;
  mostrarTotales: boolean = false;
  tablaPequena = false;
  mostrarHeader : boolean = false;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  ngOnInit() {
    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.collection.count
    };

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
    //this.obtenerTotalPaginas();
  }

  pageChanged(event){
    this.config.currentPage = event;

    if(this.ultimaPagina == this.config.currentPage){
      this.mostrarTotales = true;
    }  else {
      this.mostrarTotales = false;
    }
  }

  obtenerTotalPaginas(){

    const numRegistrosPaginados = 15;
    let totalRegistros = Number(this.arrayComprobantes.length);
    let restante = 0, paginas = 0;
      const totalIterar = totalRegistros

      if(numRegistrosPaginados >= totalIterar){
        paginas = 1;
        this.ultimaPagina = paginas;
        this.mostrarTotales = true;
      } else {
        for(let i = 0; i < totalIterar; i++){
          const numeroObtenido = totalRegistros / numRegistrosPaginados;
          for(let b = 0 ; b < numeroObtenido.toString().length; b++){
            if(numeroObtenido.toString()[b] == '.'){
              totalRegistros--;
              restante ++;
            } else {
              paginas = numeroObtenido;
            }
          }
        }
        if(restante > 0){
          paginas++;
        }

        this.ultimaPagina = paginas;        
      }
  }

  cargarReporte(){
    try{
      this.objetoFiltros = JSON.parse(localStorage.getItem("filtros"));
      this.objetoFiltrosfc = JSON.parse(localStorage.getItem("filtrosfc"));
      const tipoReporte = localStorage.getItem("tipoReporte");
      this.cargainformacionDeReporte(tipoReporte)
    } catch(err){
      console.error(err);
    }
  }

  async cargainformacionDeReporte(tipoReporte: string){

    if(tipoReporte == 'Facturacion'){
      
      try {
        const {fechaInicio,fechaFin,numDocumento,numConsecutivo,tipoDocumento} = this.objetoFiltros;
      const medioPago : any = await this.consultaService.medioPago().toPromise(); 
      const condicionVenta: any = await this.consultaService.condicionVenta().toPromise();
      const tipoComprobante: any = await this.consultaService.tipoDocumento().toPromise();
      const objCompras = JSON.parse(localStorage.getItem("comprobantes"));
      const {encabezados,totales} = objCompras;
      this.arrayComprobantes = encabezados;
      this.numeroComprobantes = encabezados.length;
      this.collection.count = encabezados.length;
      this.collection.data = encabezados;
      this.obtenerTotalPaginas();

      
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;

      }
      console.log("cargado")
      console.log("tipo documento",tipoDocumento);
      if(tipoDocumento == '01' || tipoDocumento == '04'  || tipoDocumento == '00'){
        console.log("entró aquí")
        this.tabla = '01';
        this.descripcionFiltros = '';   
          if(tipoDocumento  == '01'){
            this.descripcionFiltros += 'Tipo Documento: Factura Electrónica \n';
          } else if(tipoDocumento  == '04'){
            this.descripcionFiltros += 'Tipo Documento: Tiquete Electrónico \n';
          }

          this.tituloReporte = 'Reporte de Facturación';

          if(fechaInicio !== '' && fechaFin !== '' && numDocumento === '' && numConsecutivo === ''){
            this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. \n';
          } 

          if(numConsecutivo !== ''){
            this.descripcionFiltros += ' Consecutivo: '+numConsecutivo+'. \n';
          }

          if(numDocumento !== ''){
            this.descripcionFiltros += ' Clavenumérica: '+numDocumento;
          }

          this.arrayComprobantes.forEach(elemento => {

            elemento.totaldescuentos = Number(elemento.totaldescuentos).toFixed(2);
            elemento.totalservgravados = Number(elemento.totalservgravados).toFixed(2);
            elemento.totalservexentos = Number(elemento.totalservexentos).toFixed(2);
            elemento.totalservexonerado = Number(elemento.totalservexonerado).toFixed(2);
            elemento.totalmercanciasgravadas = Number(elemento.totalmercanciasgravadas).toFixed(2);
            elemento.totalmercanciasexentas = Number(elemento.totalmercanciasexentas).toFixed(2);
            elemento.totalmercanciaexonerada = Number(elemento.totalmercanciaexonerada).toFixed(2);
            elemento.totalgravado = Number(elemento.totalgravado).toFixed(2);
            elemento.totalexento = Number(elemento.totalexento).toFixed(2);
            elemento.totalexonerado = Number(elemento.totalexonerado).toFixed(2);
            elemento.totalventa = Number(elemento.totalventa).toFixed(2);
            elemento.totalventaneta = Number(elemento.totalventaneta).toFixed(2);
            elemento.subtotal = Number(elemento.subtotal).toFixed(2);
            elemento.totalimpuesto = Number(elemento.totalimpuesto).toFixed(2);
            elemento.TotalOtrosCargos = Number(elemento.TotalOtrosCargos).toFixed(2);
            elemento.totalcomprobante = Number(elemento.totalcomprobante).toFixed(2); 
            
            for(const medio of medioPago.medioPago){
              if(elemento.medio_pago == medio.id){
                  elemento.medio_pago = medio.medio;
              }
            }
  
            for(const tipo of tipoComprobante.tipoDocumento ){
              if(elemento.tipo_factura == tipo.codigo){
                elemento.tipo_factura= tipo.descripcion;
              }
            }
  
            for(const condicion of condicionVenta.condicionVenta ){
              if(elemento.condicion_venta == condicion.id){
                elemento.condicion_venta= condicion.condicion;
              }
            }
        });
  
        this.arrayTotales = totales;
      }
      } catch (error) {
        alert("Error al cargar la información")
      }
    }


    if(tipoReporte == 'Producto'){
      
      const {fechaInicio, fechaFin, producto} = this.objetoFiltros;
      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Reporte Venta Productos';
      this.tabla = '02';
      this.descripcionFiltros = '';
      let total = 0, subtotal = 0, impuestos = 0, otroscargos = 0;

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      if(fechaInicio !== '' && fechaFin !== '' && producto !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Producto: '+producto;
      }

      else if(fechaInicio !== '' && fechaFin !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Producto: Todos';
      } 

      else if(producto !== ''){
        this.descripcionFiltros = 'Producto: '+producto;
      }

    console.log(this.arrayComprobantes);

    for(const i in this.arrayComprobantes){
      total += Number(this.arrayComprobantes[i].totalcomprobante);
      subtotal += Number(this.arrayComprobantes[i].subtotal);
      otroscargos += Number(this.arrayComprobantes[i].otroscargos);
      impuestos += Number(this.arrayComprobantes[i].totalimpuesto);
    }

    this.total = Number(total).toFixed(2); 
    this.subtotal = Number(subtotal).toFixed(2);
    this.otroscargos = Number(otroscargos).toFixed(2); 
    this.impuestos = Number(impuestos).toFixed(2);

    }

    //---------------------------------------------------------------------------

    if(tipoReporte == 'Cliente'){
      
      const {fechaInicio, fechaFin, cliente} = this.objetoFiltros;
      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Reporte Venta Por Clientes';
      this.tabla = '03';
      this.descripcionFiltros = '';
      let total = 0, subtotal = 0, impuestos = 0, otroscargos = 0;

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      if(fechaInicio !== '' && fechaFin !== '' && cliente !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Cliente: '+cliente;
      }

      else if(fechaInicio !== '' && fechaFin !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Cliente: Todos';
      } 

      else if(cliente !== ''){
        this.descripcionFiltros = 'Cliente: '+cliente;
      }

      console.log(this.arrayComprobantes);

      for(const i in this.arrayComprobantes){
        total += Number(this.arrayComprobantes[i].total);
        subtotal += Number(this.arrayComprobantes[i].subtotal);
        otroscargos += Number(this.arrayComprobantes[i].otroscargos);
        impuestos += Number(this.arrayComprobantes[i].totalimpuesto);
      }

      this.total = Number(total).toFixed(2); 
      this.subtotal = Number(subtotal).toFixed(2);
      this.otroscargos = Number(otroscargos).toFixed(2); 
      this.impuestos = Number(impuestos).toFixed(2);

    }
if(tipoReporte == 'Estadocuenta'){
  
      const {fechaInicio, fechaFin, cliente} = this.objetoFiltros;
      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Estado de Cuenta';
      this.tabla = '24';
      this.descripcionFiltros = '';
      let totalfacturado = 0, totalpagado = 0, saldo = 0;

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      if(fechaInicio !== '' && fechaFin !== '' && cliente !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Cliente: '+cliente;
      }

      else if(fechaInicio !== '' && fechaFin !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Cliente: Todos';
      } 

      else if(cliente !== ''){
        this.descripcionFiltros = 'Cliente: '+cliente;
      }

      console.log(this.arrayComprobantes);

      for(const i in this.arrayComprobantes){
        if(this.arrayComprobantes[i].tipo  == 'Factura') {
          totalfacturado += Number(this.arrayComprobantes[i].montototal);
          saldo += Number(this.arrayComprobantes[i].saldoactual);
          
        }else{
          totalpagado += Number(this.arrayComprobantes[i].montototal);
          saldo += Number(this.arrayComprobantes[i].saldoactual);
        }
      }

      this.total = Number(totalfacturado).toFixed(2); 
      this.subtotal = Number(totalpagado).toFixed(2);
      this.otroscargos = Number(saldo).toFixed(2); 
      
    

    }

    if(tipoReporte == 'Compras'){
      console.log("aqui")
      try {

        const medioPago : any = await this.consultaService.medioPago().toPromise();
        const condicionImpuesto: any =await this.recepcionService.condicionImpuesto().toPromise();
        const condicionVenta: any = await this.consultaService.condicionVenta().toPromise();
        const tipoComprobante: any = await this.consultaService.tipoDocumento().toPromise();
        const {fechaInicio, fechaFin, clave, consecutivo} = this.objetoFiltros;
        const objCompras = JSON.parse(localStorage.getItem("comprobantes"));
        const {encabezados,totales} = objCompras;
      
        this.arrayComprobantes = encabezados;
        this.numeroComprobantes = encabezados.length;
        this.collection.count = encabezados.length;
        this.collection.data = encabezados;
        this.obtenerTotalPaginas();
        this.tituloReporte = 'Reporte de Compras';
        this.tabla = '05';
        this.descripcionFiltros = '';
     
       

        if(fechaInicio !== '' && fechaFin !== '' && clave !== '' && consecutivo !== ''){
          this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Clave: '+clave+'. Consecutivo: '+consecutivo;
        }

        if(fechaInicio !== '' && fechaFin !== ''  && consecutivo !== ''){
          this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Consecutivo: '+consecutivo;
        }

        if(fechaInicio !== '' && fechaFin !== '' && clave !== '' ){
          this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Clave: '+clave;
        }

        if(fechaInicio !== '' && fechaFin !== ''){
          this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin;
        } 

        if(clave !== '' && consecutivo === '' && fechaInicio === '' && fechaFin === ''){
          
          this.descripcionFiltros += 'Clave: '+clave;
        
        }
        if(consecutivo !== '' && clave === '' && fechaInicio === '' && fechaFin === ''){

          this.descripcionFiltros += 'Consecutivo: '+consecutivo;
        }


         this.arrayComprobantes.forEach(elemento => {
          if(elemento.clavenumerica.substring(29,31) == '03'){
            elemento.totaldescuentos = -Number(elemento.totaldescuentos).toFixed(2);
            elemento.totalservgravados = -Number(elemento.totalservgravados).toFixed(2);
            elemento.totalservexentos = -Number(elemento.totalservexentos).toFixed(2);
            elemento.totalservexonerado = -Number(elemento.totalservexonerado).toFixed(2);
            elemento.totalmercanciasgravadas = -Number(elemento.totalmercanciasgravadas).toFixed(2);
            elemento.totalmercanciasexentas = -Number(elemento.totalmercanciasexentas).toFixed(2);
            elemento.totalmercanciaexonerada = -Number(elemento.totalmercanciaexonerada).toFixed(2);
            elemento.totalgravado = -Number(elemento.totalgravado).toFixed(2);
            elemento.totalexento = -Number(elemento.totalexento).toFixed(2);
            elemento.totalexonerado = -Number(elemento.totalexonerado).toFixed(2);
            elemento.totalventa = -Number(elemento.totalventa).toFixed(2);
            elemento.totalventaneta = -Number(elemento.totalventaneta).toFixed(2);
            elemento.subtotal = -Number(elemento.subtotal).toFixed(2);
            elemento.totalimpuesto = -Number(elemento.totalimpuesto).toFixed(2);
            elemento.TotalOtrosCargos = -Number(elemento.TotalOtrosCargos).toFixed(2);
            elemento.totalcomprobante = -Number(elemento.totalcomprobante).toFixed(2); 
          }
          
          for(const medio of medioPago.medioPago){
            if(elemento.medio_pago == medio.id){
                elemento.medio_pago = medio.medio;
            }
          }

          for(const tipo of tipoComprobante.tipoDocumento ){
            if(elemento.tipo_factura == tipo.codigo){
              elemento.tipo_factura= tipo.descripcion;
            }
          }

          for(const condicion of condicionVenta.condicionVenta ){
            if(elemento.condicion_venta == condicion.id){
              elemento.condicion_venta= condicion.condicion;
            }
          }


          for(const condicionI of JSON.parse(condicionImpuesto).condicionImpuesto){
            if( elemento.codicion_impuesto == condicionI.codigo){
              elemento.codicion_impuesto = condicionI.descripcion
            }
          }
      });

      this.arrayTotales = totales;
      } catch(err){
        alert("Ha ocurrido un error al cargar la informacion")
      }
    }

    if(tipoReporte == 'Articulos'){
      
      const {fechaInicio, fechaFin, articulo} = this.objetoFiltros;
      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Reporte de Compras por Artículo';
      this.tabla = '05';
      this.descripcionFiltros = '';
      let total = 0, subtotal = 0, impuestos = 0, otroscargos = 0;

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      if(fechaInicio !== '' && fechaFin !== '' && articulo !== ''){
        this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Artículo: '+articulo;
      }

      if(fechaInicio !== '' && fechaFin !== ''  && articulo === ''){
        this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+' Artículo: Todos';
      }

      
      if(articulo !== '' && fechaInicio === '' && fechaFin === ''){

        this.descripcionFiltros += 'Artículo: '+articulo;
      }

      console.log(this.arrayComprobantes);

      for(const i in this.arrayComprobantes){
        total += Number(this.arrayComprobantes[i].total);
        subtotal += Number(this.arrayComprobantes[i].subtotal);
        otroscargos += Number(this.arrayComprobantes[i].otroscargos);
        impuestos += Number(this.arrayComprobantes[i].totalimpuesto);
      }

      this.total = Number(total).toFixed(2); 
      this.subtotal = Number(subtotal).toFixed(2);
      this.otroscargos = Number(otroscargos).toFixed(2); 
      this.impuestos = Number(impuestos).toFixed(2);

    }


    if(tipoReporte == 'Proveedores'){
      
      const {fechaInicio, fechaFin, proveedor} = this.objetoFiltros;
      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Reporte de Compras por Proveedor';
      this.tabla = '06';
      this.descripcionFiltros = '';
      let total = 0, subtotal = 0, impuestos = 0, otroscargos = 0;

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      if(fechaInicio !== '' && fechaFin !== '' && proveedor !== ''){
        this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Proveedor: '+proveedor;
      }

      if(fechaInicio !== '' && fechaFin !== ''  && proveedor === ''){
        this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+' Proveedor: Todos';
      }

      
      if(proveedor !== '' && fechaInicio === '' && fechaFin === ''){

        this.descripcionFiltros += 'Proveedor: '+proveedor;
      }

      console.log(this.arrayComprobantes);

      for(const i in this.arrayComprobantes){
        total += Number(this.arrayComprobantes[i].total);
        subtotal += Number(this.arrayComprobantes[i].subtotal);
        otroscargos += Number(this.arrayComprobantes[i].otroscargos);
        impuestos += Number(this.arrayComprobantes[i].totalimpuesto);
      }

      this.total = Number(total).toFixed(2); 
      this.subtotal = Number(subtotal).toFixed(2);
      this.otroscargos = Number(otroscargos).toFixed(2); 
      this.impuestos = Number(impuestos).toFixed(2);

    }


    //reporte por Forma de Pago


    if(tipoReporte == 'FormaPago'){
      
      const {fechaInicio,fechaFin,medio_pago} = this.objetoFiltros;

      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Reporte de Ventas por Forma de Pago';
      this.tabla = '09';
      this.descripcionFiltros = '';
      let total = 0, subtotal = 0, impuestos = 0, otroscargos = 0;
      let nuevoMedioPago = ''
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      if(fechaInicio !== '' && fechaFin !== '' && medio_pago !== ''){
        if(medio_pago == '01'){
          nuevoMedioPago ='Efectivo'
        }   

        if(medio_pago == '02'){
          nuevoMedioPago ='Tarjeta'
        }
        this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+ '. Medio de Pago: '+nuevoMedioPago;
      }

      if(fechaInicio !== '' && fechaFin !== ''  && medio_pago === ''){
        this.descripcionFiltros += 'Fechas entre: '+fechaInicio +' y '+fechaFin+' Medio de Pago: Niguno';
      }

      
      if(medio_pago !== '' && fechaInicio === '' && fechaFin === ''){
        
        if(medio_pago == '01'){
          nuevoMedioPago ='Efectivo'
        }   

        if(medio_pago == '02'){
          nuevoMedioPago ='Tarjeta'
        }

        this.descripcionFiltros += 'Medio de Pago: '+nuevoMedioPago;
      }



      for(const i in this.arrayComprobantes){

        total += Number(this.arrayComprobantes[i].totalcomprobante);
        subtotal += Number(this.arrayComprobantes[i].subtotal);
        otroscargos += Number(this.arrayComprobantes[i].TotalOtrosCargos);
        impuestos += Number(this.arrayComprobantes[i].totalimpuesto);
      }

      this.total = Number(total).toFixed(2); 
      this.subtotal = Number(subtotal).toFixed(2);
      this.otroscargos = Number(otroscargos).toFixed(2); 
      this.impuestos = Number(impuestos).toFixed(2);

    }

    if(tipoReporte == 'Existencia'){

      const {categoria,bodega,articulo} = this.objetoFiltros;
      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Reporte de Existencia de Artículos';
      this.tabla = '10';
      this.descripcionFiltros = '';

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }

      if(articulo != '' && categoria == '' && bodega == ''){
        this.descripcionFiltros = 'Artículo : '+articulo;
      }

      if(articulo != '' && categoria != '' && bodega == ''){
        this.descripcionFiltros = 'Artículo : '+articulo +', Categoría: '+categoria;
      }

      if(articulo != '' && categoria != '' && bodega != ''){
        this.descripcionFiltros = 'Artículo : '+articulo +', Categoría: '+categoria+ ' y Bodega: '+bodega;
      }

      if(articulo != '' && categoria == '' && bodega != ''){
        this.descripcionFiltros = 'Artículo : '+articulo +', Bodega: '+bodega;
      }

      if(articulo == '' && categoria != '' && bodega == ''){
        this.descripcionFiltros = 'Categoría: '+categoria;
      }

      if(articulo == '' && categoria == '' && bodega != ''){
        this.descripcionFiltros = 'Bodega: '+bodega;
      }

      if(articulo == '' && categoria != '' && bodega != ''){
        this.descripcionFiltros = 'Bodega: '+bodega+ ', Categoría: '+categoria;
      }

    }

    if(tipoReporte == 'Ajustes'){

      const {tipomovimiento,categoria,bodega,fechaInicio,fechaFin,articulo} = this.objetoFiltros;
      const {comprobantes , tipo} = JSON.parse(localStorage.getItem("comprobantes"));
      this.arrayComprobantes =comprobantes
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.obtenerTotalPaginas();
      this.tituloReporte = 'Reporte de Ajustes';
      this.tabla = '11';
      this.descripcionFiltros = '';

      if(tipomovimiento != '' && categoria != '' && 
          bodega != ''&& fechaInicio != '' && fechaFin != '' 
          && articulo != ''){

      }
      let total = 0;

      if (screen.width < 638) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }

      if(tipo == '01'){
        this.mostrarHeader = true; //group by
      } else {
        this.mostrarHeader =false;
      }

      for (let linea of comprobantes){
        total += Number(linea.total);
      }
      this.total = total.toFixed(2);


    }

    if(tipoReporte == 'Visitas'){
      
      const {fechaInicio, fechaFin,cliente,tipoVisita} = this.objetoFiltros;
      this.tabla = '12';
      this.arrayComprobantes = JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;

      if(cliente  && tipoVisita && fechaInicio != '' && fechaFin != ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'. Cliente : '+cliente+'. Tipo Visita: '+tipoVisita;
      }

      if(cliente && !tipoVisita && fechaInicio != '' && fechaFin != ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'. Cliente : '+cliente+'.';
      }

      if(!cliente && tipoVisita && fechaInicio != '' && fechaFin != ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'. Tipo Visita: '+tipoVisita;
      }

      if(!cliente && !tipoVisita && fechaInicio != '' && fechaFin != ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +'.';
      }

      let arrVisitas =[];
      let distancia : string | number = null;
     console.log(this.arrayComprobantes);
      for(const item of this.arrayComprobantes){

        //const ubicacion = item["X(GEOMFROMTEXT(astext(v.localizacion)))"] +' '+ item["Y(GEOMFROMTEXT(astext(v.localizacion)))"];

        /*
        

         obj.forEach(elemento => {
        if(elemento.tipo_movimiento =='ENTRADA') {
          arr.push([
            elemento.usuario,
            elemento.cliente,
            elemento.fecha,
            elemento.d_zona,
            elemento.tipo_movimiento,
            '',
            '',
            ''
          ]);
        } else {
          arr.push([
            elemento.usuario,
            elemento.cliente,
            elemento.fecha,
            elemento.d_zona,
            elemento.tipo_movimiento,
            elemento.visita,
            elemento.venta,
            elemento.razon
          ]);
        }
      });
        
        arrVisitas.push({
          usuario: item.usuario,
          cliente: item.cliente,
          fecha: item.fecha,
          zona: item.d_zona,
          razon: item.razon
        }) */

        if(item.tipo_movimiento =='ENTRADA') {
          arrVisitas.push({
            usuario:item.usuario,
            cliente:item.cliente,
            fecha:item.fecha,
            zona:item.d_zona,
            ubicacionCliente:'',
            tipo_movimiento:item.tipo_movimiento,
            visita:'',
            venta:'',
            razon:''
          });
        } else {

          if(item.distancia == -1 || !item.distancia){
            distancia = 'NO SE PUDO CALCULAR LA DISTANCIA';
          } else {
            distancia = item.distancia;
          }
      
          arrVisitas.push({
            usuario:item.usuario,
            cliente:item.cliente,
            fecha:item.fecha,
            zona:item.d_zona,
            ubicacionCliente: item.ubicacionCliente,
            tipo_movimiento:item.tipo_movimiento,
            visita:item.visita,
            venta:item.venta,
            razon:item.razon,
            distancia:distancia,
            ubicacionSalida: item.ubicacionSalida
          })
        }
      }

      console.log(arrVisitas); 
      
      this.arrayComprobantes = arrVisitas;
    }

    if(tipoReporte == 'D151Ventas'){
      console.log("1")
      const {montoVenta,fechaInicio,fechaFin} = this.objetoFiltros;
      let {totales , facturas} = JSON.parse(localStorage.getItem("comprobantes"));
     
      this.tituloReporte = 'D151 Detallado Ventas Detallado';
      this.arrayComprobantes =facturas;
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.arrayTotales = totales;
      this.tabla = '13';
      this.obtenerTotalPaginas();
      let listaMediosPago : any =  []; 
      let listaTiposComprobante : any = []; 
      let listaCondicionVenta : any =  [];

      listaMediosPago = await this.consultaService.medioPago().toPromise();
     // const condicionImpuesto: any[] =await this.recepcionService.condicionImpuesto().toPromise();
      listaCondicionVenta = await this.consultaService.condicionVenta().toPromise(); 
      listaTiposComprobante  = await this.consultaService.tipoDocumento().toPromise();

      if(fechaInicio !== '' && fechaFin !== '' && !montoVenta){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }

      if(fechaInicio !== '' && fechaFin !== '' && montoVenta && montoVenta.toString().length > 0){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+', monto de venta :'+montoVenta;
      }

      if(fechaInicio === '' && fechaFin === '' && montoVenta && montoVenta.toString().length > 0){
        this.descripcionFiltros = 'Monto de venta ='+montoVenta;
      }

      let medioPago: any,condicionVenta: any,tipoComprobante: any;
      for(let factura of this.arrayComprobantes){
        medioPago = listaMediosPago.medioPago.filter(medio => medio.id == factura.medio_pago);
        condicionVenta = listaCondicionVenta.condicionVenta.filter(condicion => condicion.id == factura.condicion_venta);
        tipoComprobante = listaTiposComprobante.tipoDocumento.filter(condicion => condicion.codigo == factura.tipo_factura);
        console.log("medio pago ", medioPago);
        console.log("condicion venta ", condicionVenta);
        console.log("tipo comprobante ", tipoComprobante);
        factura.medio_pago = medioPago ? medioPago[0].medio: '';
        factura.condicion_venta = condicionVenta ? condicionVenta[0].condicion: '';
        factura.tipo_factura = tipoComprobante ? tipoComprobante[0].descripcion: '';
      }
    }

    if(tipoReporte == 'D151VentasResumido'){

      const {montoVenta,fechaInicio,fechaFin} = this.objetoFiltros;
      let {totales , facturas} = JSON.parse(localStorage.getItem("comprobantes"));
      this.tituloReporte = 'D151 Detallado Ventas Resumido';
      this.arrayComprobantes =facturas;
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;
      this.arrayTotales = totales;
      this.tabla = '14';
      this.obtenerTotalPaginas();
      let listaMediosPago : any =  []; 
      let listaTiposComprobante : any = []; 
      let listaCondicionVenta : any =  [];
      let condicionImpuesto: any = [];

      listaMediosPago = await this.consultaService.medioPago().toPromise();
      condicionImpuesto = await this.recepcionService.condicionImpuesto().toPromise();
      listaCondicionVenta = await this.consultaService.condicionVenta().toPromise(); 
      listaTiposComprobante  = await this.consultaService.tipoDocumento().toPromise();

      if(fechaInicio !== '' && fechaFin !== '' && !montoVenta){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }

      if(fechaInicio !== '' && fechaFin !== '' && montoVenta && montoVenta.toString().length > 0){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+', monto de venta :'+montoVenta;
      }

      if(fechaInicio === '' && fechaFin === '' && montoVenta && montoVenta.toString().length > 0){
        this.descripcionFiltros = 'Monto de venta ='+montoVenta;
      }

      //let medioPago: any,condicionVenta: any,tipoComprobante: any;
      for(let factura of this.arrayComprobantes){
      //  medioPago = listaMediosPago.medioPago.filter(medio => medio.id == factura.medio_pago);
        //condicionVenta = listaCondicionVenta.condicionVenta.filter(condicion => condicion.id == factura.condicion_venta);
        //tipoComprobante = listaTiposComprobante.tipoDocumento.filter(condicion => condicion.codigo == factura.tipo_factura);
  
       /* factura.medio_pago = medioPago ? medioPago[0].medio: '';
        factura.condicion_venta = condicionVenta ? condicionVenta[0].condicion: '';
        factura.tipo_factura = tipoComprobante ? tipoComprobante[0].descripcion: '';
        */

        Number(factura.totaldescuentos).toFixed(2),
        Number(factura.totalservgravados).toFixed(2), 
        Number(factura.totalservexentos).toFixed(2),
        Number(factura.totalservexonerado).toFixed(2), 
        Number(factura.totalmercanciasgravadas).toFixed(2), 
        Number(factura.totalmercanciasexentas).toFixed(2),
        Number(factura.totalmercanciaexonerada).toFixed(2),
        Number(factura.totalgravado).toFixed(2), 
        Number(factura.totalexento).toFixed(2),
        Number(factura.totalexonerado).toFixed(2), 
        Number(factura.totalventa).toFixed(2), 
        Number(factura.totalventaneta).toFixed(2),
        Number(factura.subtotal).toFixed(2), 
        Number(factura.totalimpuesto).toFixed(2),
        Number(factura.TotalOtrosCargos).toFixed(2), 
        Number(factura.totalcomprobante).toFixed(2)
      }
    }

    if(tipoReporte == 'D151ComprasDetallado'){
      const {montoCompra,fechaInicio,fechaFin} = this.objetoFiltros;
      let { entradas} = JSON.parse(localStorage.getItem("comprobantes"));
      console.log(entradas);
      this.tituloReporte = 'D151 Detallado Compras Detallado';
      this.arrayComprobantes =entradas;
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;      
      this.tabla = '15';
      let totales = [];
      let codigomoneda = ''; 
      let subtotal = 0;
      let totalservgravados  = 0; 
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
      let totalcomprobante = 0;
      let TotalOtrosCargos = 0;

      this.obtenerTotalPaginas();

      
      //this.arrayTotales = totales;

      let listaMediosPago : any =  []; 
      let listaTiposComprobante : any = []; 
      let listaCondicionVenta : any =  [];
      let listaCondicionImpuesto: any = [];

      listaMediosPago = await this.consultaService.medioPago().toPromise();
      listaCondicionImpuesto =await this.recepcionService.condicionImpuesto().toPromise();
      listaCondicionVenta = await this.consultaService.condicionVenta().toPromise(); 
      listaTiposComprobante  = await this.consultaService.tipoDocumento().toPromise();

      if(fechaInicio !== '' && fechaFin !== '' && !montoCompra){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }

      if(fechaInicio !== '' && fechaFin !== '' && montoCompra && montoCompra.toString().length > 0){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+', monto de compra :'+montoCompra;
      }

      if(fechaInicio === '' && fechaFin === '' && montoCompra && montoCompra.toString().length > 0){
        this.descripcionFiltros = 'Monto de compra :'+montoCompra;
      }

      let medioPago: any,condicionVenta: any,tipoComprobante: any,condicionImpuesto: any;


      for(let factura of this.arrayComprobantes){

        medioPago = listaMediosPago.medioPago.filter(medio => medio.id == factura.medio_pago);
        condicionVenta = listaCondicionVenta.condicionVenta.filter(condicion => condicion.id == factura.condicion_venta);
        tipoComprobante = listaTiposComprobante.tipoDocumento.filter(condicion => condicion.codigo == factura.tipo_factura);
        condicionImpuesto = JSON.parse(listaCondicionImpuesto).condicionImpuesto.filter(condicion => condicion.codigo == factura.codicion_impuesto);       


       factura.tipo_factura = typeof tipoComprobante[0] === 'undefined'? '': tipoComprobante[0].descripcion;
       factura.medio_pago = typeof medioPago[0] === 'undefined'? '': medioPago[0].medio;
       factura.condicion_venta = typeof condicionVenta[0] === 'undefined'? '': condicionVenta[0].condicion;
       factura.codicion_impuesto = typeof condicionImpuesto[0] === 'undefined'? '': condicionImpuesto[0].descripcion;
      }

      if(this.arrayComprobantes.filter(factura => factura.codigomoneda == 'CRC')[0]){
        this.cargarArrayCompras([],entradas,0, 'CRC',this.arrayTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      }

      if(this.arrayComprobantes.filter(factura => factura.codigomoneda == 'USD')[0]){
        this.cargarArrayCompras([],entradas,0, 'USD',this.arrayTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      }     
    
    }

    if(tipoReporte == 'D151ComprasResumido'){
      const {montoCompra,fechaInicio,fechaFin} = this.objetoFiltros; //4396 // PIN tarjeta 
      this.tituloReporte = 'D151 Compras Detallado';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;    
      this.tabla = '16';
      this.obtenerTotalPaginas();

      if(fechaInicio !== '' && fechaFin !== '' && !montoCompra){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }

      if(fechaInicio !== '' && fechaFin !== '' && montoCompra && montoCompra.toString().length > 0){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+', monto de compra :'+montoCompra;
      }

      if(fechaInicio === '' && fechaFin === '' && montoCompra && montoCompra.toString().length > 0){
        this.descripcionFiltros = 'Monto de compra :'+montoCompra;
      }
    }

    if(tipoReporte == 'Transferencias'){
      const {fechaInicio,fechaFin} = this.objetoFiltros; 
      console.log(this.objetoFiltros);
      this.tituloReporte = 'Depósitos';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;  
      console.log(this.collection.data)  
      this.tabla = '17';
      this.obtenerTotalPaginas();

      if(fechaInicio !== '' && fechaFin !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }
    }

    if(tipoReporte == 'Transferencias'){
      const {fechaInicio,fechaFin} = this.objetoFiltros; 
      console.log(this.objetoFiltros);
      this.tituloReporte = 'Transferencias';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;  
      console.log(this.collection.data)  
      this.tabla = '18';
      this.obtenerTotalPaginas();

      if(fechaInicio !== '' && fechaFin !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }
    }

    if(tipoReporte == 'MovimientosCuenta'){

      const {fechaInicio,fechaFin} = this.objetoFiltros; 
      this.tituloReporte = 'MovimientosCuenta';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;  
      let listaCuentas = [];
      this.tabla = '19';
      this.obtenerTotalPaginas();
      this.arrayTotales = [{
        debitos: 0
      },
      {
        creditos: 0
      }];
      let debitos= 0, creditos = 0;
      if(fechaInicio !== '' && fechaFin !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }

      for (const linea of this.collection.data) {

        /*
        
          linea.numctabanco,
            linea.fecha,
            linea.tipomovimiento,
            linea.descripcion,
            '',
            Number(linea.monto),
        */
        if(linea.tipomovimiento == 'Depósito'){
          listaCuentas.push({
            numctabanco: linea.numctabanco,
            tipomovimiento: linea.tipomovimiento,
            descripcion: linea.descripcion,
            debito: linea.monto,
            credito: ''
          })
          debitos += Number(linea.monto);
          this.arrayTotales[0].debitos = Number(debitos).toString();
        } else {
          listaCuentas.push({
            numctabanco: linea.numctabanco,
            tipomovimiento: linea.tipomovimiento,
            descripcion: linea.descripcion,
            debito: '',
            credito: linea.monto
          })
          creditos += Number(linea.monto);
          this.arrayTotales[1].creditos = Number(creditos).toString();
        }
      }

      this.arrayComprobantes = listaCuentas;
    }

    if(tipoReporte == 'ReporteRequerimientoPorCliente'){

      const {fechaInicio,fechaFin,cliente} = this.objetoFiltros; 
      
      this.tituloReporte = 'Encuesta por Cliente';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;  
        
      this.tabla = '20';
      this.obtenerTotalPaginas();

      if(fechaInicio !== '' && fechaFin !== '' && cliente == ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'';
      }

      if(fechaInicio !== '' && fechaFin !== '' && cliente !== ''){
        this.descripcionFiltros = 'Fechas entre: '+fechaInicio +' y '+fechaFin+'. Cliente : '+cliente;
      }

    }

    //

    if(tipoReporte == 'ReporteRequerimientoPorRequerimiento'){

      const {fechaInicio,fechaFin,pregunta,total} = this.objetoFiltros; 
      
      this.tituloReporte = 'Encuesta por Requerimiento';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;  
      this.descripcionFiltros = '';
      this.tabla = '21';
      this.obtenerTotalPaginas();

      this.descripcionFiltros = `

        ${fechaInicio !== '' && fechaFin !== '' && pregunta == ''?
          'Fechas entre: '+fechaInicio +' y '+fechaFin: ''}
      
        ${fechaInicio !== '' && fechaFin !== '' && pregunta !== ''? 
        'Fechas entre: '+fechaInicio +' y '+fechaFin+'. Pregunta : '+pregunta:''
        }

        Total de requerimientos seleccionados: ${total}
      ` 
    }

    if(tipoReporte == 'ReporteResultadoEncuestaServicio'){

      const {usuario,pregunta,promedioGlobal} = this.objetoFiltros; 
      
      this.tituloReporte = 'Encuesta Servicio';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;  
      this.descripcionFiltros = '';
      this.tabla = '22';

      this.promedioGlobal =promedioGlobal;
      this.obtenerTotalPaginas();

      this.descripcionFiltros = `

        ${usuario !== '' && pregunta !== ''?
          `Usuario: ${usuario}, Pregunta: ${pregunta}`: ''}

          ${usuario === '' && pregunta === '' ?
          `Usuario: Todos, Pregunta: Todas`: ''}


          ${usuario !== '' && pregunta === '' ?
          `Usuario: ${usuario}`: ''}

          ${usuario === '' && pregunta !== '' && pregunta ?
          `Pregunta: ${pregunta}`: ''}
      
      ` 
    }

    if(tipoReporte == 'ReporteRazonesNoventa') {
      const {razon,fecha1,fecha2,totalSeleccionadas,porcentajeTotal} = this.objetoFiltros; 
      
      this.tituloReporte = 'Razones No Venta';
      this.arrayComprobantes =JSON.parse(localStorage.getItem("comprobantes"));
      this.numeroComprobantes = this.arrayComprobantes.length;
      this.collection.count = this.arrayComprobantes.length;
      this.collection.data = this.arrayComprobantes;  
      this.descripcionFiltros = '';
      this.tabla = '23';
      this.promedioGlobal = Number(Number(porcentajeTotal).toFixed(0));
      this.subtotal = totalSeleccionadas;

      this.obtenerTotalPaginas();

      this.descripcionFiltros = `

        ${razon && razon != '' &&  !fecha1 && !fecha2 || fecha1 == '' && fecha2 == ''? `Razón no venta: ${razon} `:''}      
        ${razon && razon != '' && fecha1 && fecha2 && fecha1 != '' && fecha2 != ''? `Razón no venta: ${razon}. Fechas entre ${fecha1} y ${fecha2}`:''}      
        ${fecha1 && fecha2 && fecha1 != '' && fecha2 != ''?`Fechas entre ${fecha1} y ${fecha2}`:''}
      ` 
    }
  }

  private cargarArrayCompras(arrGlobal,array,indice, tipo,arrTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos){
    //codigomoneda === 'USD'
    let tipo_entrada = null;
    if(Number(indice) + 1 > array.length){


      arrTotales.push(
        {
          codigomoneda: codigomoneda, 
          subtotal :subtotal,
          totalservgravados: totalservgravados , 
          totalservexentos: totalservexentos,
          totalservexonerado :totalservexonerado,
          totalmercanciasgravadas :totalmercanciasgravadas,
          totalmercanciasexentas: totalmercanciasexentas,
          totalmercanciaexonerada :totalmercanciaexonerada,
          totalgravado: totalgravado,
          totalexento : totalexento,
          totalexonerado : totalexonerado,
          totalventa: totalventa,
          totaldescuentos: totaldescuentos,
          totalventaneta: totalventaneta,
          totalimpuesto: totalimpuesto,
          totalcomprobante: totalcomprobante,
          TotalOtrosCargos: TotalOtrosCargos
        }
      );

      return arrGlobal;
    } else {
      if(array[indice].codigomoneda === tipo){
       
        tipo_entrada = array[indice].numero_interno.charAt(0);
        
        if( tipo_entrada == 'N'){ //entradas anuladas

          codigomoneda = tipo; 
          subtotal-= Number(array[indice].subtotal);
          totalservgravados  -= Number(array[indice].totalservgravados); 
          totalservexentos-= Number(array[indice].totalservexentos);
          totalservexonerado-= Number(array[indice].totalservexonerado);
          totalmercanciasgravadas-= Number(array[indice].totalmercanciasgravadas);
          totalmercanciasexentas-= Number(array[indice].totalmercanciasexentas);
          totalmercanciaexonerada-= Number(array[indice].totalmercanciaexonerada);
          totalgravado-= Number(array[indice].totalgravado);
          totalexento-= Number(array[indice].totalexento);
          totalexonerado-= Number(array[indice].totalexonerado);
          totalventa-= Number(array[indice].totalventa);
          totaldescuentos-= Number(array[indice].totaldescuentos);
          totalventaneta-= Number(array[indice].totalventaneta);
          totalimpuesto-= Number(array[indice].totalimpuesto);
          totalcomprobante-= Number(array[indice].totalcomprobante);
          TotalOtrosCargos-= Number(array[indice].TotalOtrosCargos);

        } else { //entradas 

          codigomoneda = tipo; 
          subtotal += Number(array[indice].subtotal);
          totalservexentos += Number(array[indice].totalservexentos);
          totalservexonerado += Number(array[indice].totalservexonerado);
          totalmercanciasgravadas += Number(array[indice].totalmercanciasgravadas);
          totalmercanciasexentas += Number(array[indice].totalmercanciasexentas);
          totalmercanciaexonerada += Number(array[indice].totalmercanciaexonerada);
          totalgravado += Number(array[indice].totalgravado);
          totalexento += Number(array[indice].totalexento);
          totalexonerado += Number(array[indice].totalexonerado);
          totalventa += Number(array[indice].totalventa);
          totaldescuentos += Number(array[indice].totaldescuentos);
          totalventaneta += Number(array[indice].totalventaneta);
          totalimpuesto += Number(array[indice].totalimpuesto);
          totalcomprobante += Number(array[indice].totalcomprobante);
          TotalOtrosCargos += Number(array[indice].TotalOtrosCargos);

        }
        indice++;
        return this.cargarArrayCompras(arrGlobal,array,indice,tipo,arrTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      } else {
        indice++;
        return this.cargarArrayCompras(arrGlobal,array,indice,tipo,arrTotales, codigomoneda,  subtotal, totalservgravados ,  totalservexentos, totalservexonerado, totalmercanciasgravadas, totalmercanciasexentas, totalmercanciaexonerada, totalgravado, totalexento, totalexonerado, totalventa, totaldescuentos, totalventaneta, totalimpuesto, totalcomprobante, TotalOtrosCargos);
      }
    }
  }
}