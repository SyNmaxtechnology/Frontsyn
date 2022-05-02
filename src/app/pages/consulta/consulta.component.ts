import { Router } from '@angular/router';
import  Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/pages/consulta.service';
import { FacturaService} from '../../services/pages/factura.service';
declare var $: any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(
    private consultaService: ConsultaService,
    private router: Router,
    private facturaService: FacturaService
    ) {

    this.tipoDocumento();
    this.medioPago();
    this.condicionVenta();

    window.addEventListener("resize",() => {
      if (screen.width < 1024) {

        this.mostrarTabla = true;

       } else {
        this.mostrarTabla = false;
      }
     
      })

  }
  permiso : string = this.facturaService.obtenerRole();
  mostrar : boolean = false;
  config: any;
  collection = { count: 0, data: [] };
  idfactura = '';
  objBusquedaFacturas = {
    fechaInicio: '',
    fechaFin: '',
    numeroInterno: '',
    nombreCliente: '',
    claveNumerica: '',
    consecutivo: '',
    tipoFactura: ''
  };
  filtroFactura: any;
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
    totalotroscargos: 0,
    notas: ''
  };

  arrayOrdenes = [];
  arrayComprobantes = [];
  tiposDocumento = [];
  mediosPago = [];
  condicionesVenta = [];
  datosRespuestaAceptacionHacienda: String = '';
  mostrarTabla = false;

  ngOnInit() {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };


    
  }
  buscarFacturas(obj: any) {

    const objetoFactura: any = {};
    objetoFactura.tipoFactura = obj.tipoFactura;
    
    if(obj.fechaInicio != '' && obj.fechaFin != ''){
     
      console.log(obj.fechaInicio)
      console.log(obj.fechaFin)

      if(obj.fechaInicio > obj.fechaFin) {
        return alert("La fecha de inicio no se puede ser mayo a la fecha de fin");
      }
      objetoFactura.fechaInicio = obj.fechaInicio;
      objetoFactura.fechaFin = obj.fechaFin;

    }
    
    if(obj.numeroInterno != ''){
      objetoFactura.numeroInterno = obj.numeroInterno;
    }
  
    if(obj.claveNumerica != ''){
      objetoFactura.claveNumerica = obj.claveNumerica;
    }

    if(obj.consecutivo != ''){
      objetoFactura.consecutivo = obj.consecutivo;
    }

    if(obj.nombreCliente != ''){
      objetoFactura.nombreCliente = obj.nombreCliente;
    }

    this.consultaService.buscarFacturas(objetoFactura)
      .subscribe((response: any) =>  {
        
        this.filtroFactura = this.objBusquedaFacturas.tipoFactura;
        if(obj.tipoFactura == '05' || obj.tipoFactura == '08'){
          console.log(response.entradas)
          this.arrayComprobantes =response.entradas;
          //localStorage.setItem('comprobantes', JSON.stringify(response.entradas));
          //localStorage.setItem('filtros', JSON.stringify(objetoFactura));
          this.collection.count = this.arrayComprobantes.length;
          this.collection.data = this.arrayComprobantes;

      
        } else{
        
          console.log(response.data);
          this.arrayComprobantes =response.data;
          //localStorage.setItem('comprobantes', JSON.stringify(response.data));
          //localStorage.setItem('filtros', JSON.stringify(objetoFactura));
          this.collection.count = this.arrayComprobantes.length;
          this.collection.data = this.arrayComprobantes;
 
        }
      },
      err => console.error(err));
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  tipoDocumento() {
    this.consultaService.tipoDocumento()
      .subscribe((response: any) => {
        // permiso
        const tiposDocumento = response.tipoDocumento;        
        if(['superusuario','facturador','integrador'].includes(this.permiso)) {
          this.tiposDocumento = tiposDocumento;
        } else {
          for(const tipo of tiposDocumento){
            if(tipo.descripcion == 'Proforma'){

              this.tiposDocumento.push(tipo);
            }   
          }
        }
      },
      err => console.error(err));
  }

  reporteFactura(id: number) {
    const tipo_factura = this.objBusquedaFacturas.tipoFactura;
    const obj = {
      tipo_factura,
      id
    }
    
    this.consultaService.reporteFactura(obj)
      .subscribe((response: any) => {
        console.log(response);
        if (response.factura[0].tipo_factura === '01') {
          this.objFacturaResultado.tipoFactura = 'Factura Electrónica';
        } else if (response.factura[0].tipo_factura === '04') {
          this.objFacturaResultado.tipoFactura = 'Tiquete Electrónico';
        } else if (response.factura[0].tipo_factura === '03') {
          this.objFacturaResultado.tipoFactura = 'Nota de Crédito';
        }
        
        // cargar datos totales y encabezado de factura

        this.objFacturaResultado.clave = response.factura[0].clavenumerica;
        this.objFacturaResultado.consecutivo = response.factura[0].consecutivo;
        this.objFacturaResultado.medioPago = response.factura[0].medio_pago;
        this.objFacturaResultado.condicionVenta = response.factura[0].condicion_venta;
        this.objFacturaResultado.fechaFactura = response.factura[0].fecha_factura;
        this.objFacturaResultado.porcentajeDescuentoTotal = response.factura[0].porcentaje_descuento_total;
        this.objFacturaResultado.descuentoTotal = response.factura[0].monto_descuento_total;
        this.objFacturaResultado.subtotal = response.factura[0].subtotal;
        this.objFacturaResultado.totalservgravados = response.factura[0].totalservgravados;
        this.objFacturaResultado.totalservexentos = response.factura[0].totalservexentos;
        this.objFacturaResultado.totalservexonerado = response.factura[0].totalservexonerado;
        this.objFacturaResultado.totalmercanciasgravadas = response.factura[0].totalmercanciasgravadas;
        this.objFacturaResultado.totalmercanciasexentas = response.factura[0].totalmercanciasexentas;
        this.objFacturaResultado.totalmercanciaexonerada = response.factura[0].totalmercanciaexonerada;
        this.objFacturaResultado.totalgravado = response.factura[0].totalgravado;
        this.objFacturaResultado.totalexento = response.factura[0].totalexento;
        this.objFacturaResultado.totalexonerado = response.factura[0].totalexonerado;
        this.objFacturaResultado.totalventa = response.factura[0].totalventa;
        this.objFacturaResultado.totaldescuentos = response.factura[0].totaldescuentos;
        this.objFacturaResultado.totalventaneta = response.factura[0].totalventaneta;
        this.objFacturaResultado.totalimpuesto = response.factura[0].totalimpuesto;
        this.objFacturaResultado.totalcomprobante = response.factura[0].totalcomprobante;
        this.objFacturaResultado.tipocambio = response.factura[0].tipocambio;
        this.objFacturaResultado.id = response.factura[0].id;
        this.objFacturaResultado.totalotroscargos = response.factura[0].TotalOtrosCargos;
        this.objFacturaResultado.notas = response.factura[0].notas ? response.factura[0].notas :'';
        this.arrayOrdenes = response.ordenes;

        console.log(this.arrayOrdenes);
      },
      err => console.error(err));
  }

  medioPago() {
    this.consultaService.medioPago()
      .subscribe((response: any) =>  {
      console.log(response);
      this.mediosPago = response.medioPago;
      console.log("Anchoi ",screen.width)
      }, err => console.error(err));
  }

  condicionVenta() {
    this.consultaService.condicionVenta()
      .subscribe((response: any) => {
        console.log(response);
        this.condicionesVenta = response.condicionVenta;
      },
      err => console.error(err));
  }

  descargarPDF(id, tipo) {
    try {

      const tipo_factura = this.objBusquedaFacturas.tipoFactura;
      
      this.consultaService.descargarPDF({id , tipo, tipo_factura});
    } catch (err) {
      console.error(err);
    }
  }

  enviarCorreo() {
  
    const tipo = '02';
    const id = this.idfactura;
    const listaCorreos = [];
    const correo1 = (document.getElementById('correo1') as HTMLInputElement).value;
    const correo2 = (document.getElementById('correo2') as HTMLInputElement).value;
    const correo3 = (document.getElementById('correo3') as HTMLInputElement).value;

    if (correo1.length > 0) {
      listaCorreos.push(correo1);
    }
    if (correo2.length >  0) {
      listaCorreos.push(correo2);
    }
    if (correo3.length > 0) {
      listaCorreos.push(correo3);
    }

    $('#ModalCorreos').modal('hide');
    this.mostrar = true;
    const tipo_factura = this.objBusquedaFacturas.tipoFactura;
    this.consultaService.enviarCorreo({id, tipo, listaCorreos, tipo_factura})
      .subscribe((response: any) => {
        console.log(response);
        this.mostrar = false;
        Swal.fire('Correo enviado',response.message,'success');
      },
      err => {
        console.log(err);
        this.mostrar = false;
        Swal.fire('Correo enviado','Falló el envío de correos','error');
      });
  }

  cargarFactura(id) {
    this.idfactura = id;
  }

  obtenerCorreoClinente(){
    console.log(this.idfactura,this.objBusquedaFacturas.tipoFactura);
    this.consultaService.obtenerCorreoCliente(this.idfactura,this.objBusquedaFacturas.tipoFactura)
      .subscribe((response: any) => {
       (document.getElementById("correo1") as HTMLInputElement).value = response.correo;
      })
  }

  descargarReporteExcel(obj) {

    try{

      const objetoFactura: any = {};
    objetoFactura.tipoFactura = obj.tipoFactura;
    
    if(obj.fechaInicio != '' && obj.fechaFin != ''){
     
      console.log(obj.fechaInicio)
      console.log(obj.fechaFin)

      if(obj.fechaInicio > obj.fechaFin) {
        return alert("La fecha de inicio no se puede ser mayo a la fecha de fin");
      }
      objetoFactura.fechaInicio = obj.fechaInicio;
      objetoFactura.fechaFin = obj.fechaFin;

      }
      
      if(obj.numeroInterno != ''){
        objetoFactura.numeroInterno = obj.numeroInterno;
      }
    
      if(obj.claveNumerica != ''){
        objetoFactura.claveNumerica = obj.claveNumerica;
      }

      if(obj.consecutivo != ''){
        objetoFactura.consecutivo = obj.consecutivo;
      }

      if(obj.nombreCliente != ''){
        objetoFactura.nombreCliente = obj.nombreCliente;
      }

      this.consultaService.buscarFacturas(objetoFactura)
        .subscribe((response: any) => {


          this.filtroFactura = this.objBusquedaFacturas.tipoFactura;
          let comprobantes = []
          if(obj.tipoFactura == '05' || obj.tipoFactura == '08'){
            comprobantes =response.entradas;
          } else{
            comprobantes =response.data;
          }

          if(comprobantes.length === 0){
            return;
          } else {
            this.consultaService.reporteExcel(comprobantes, this.objBusquedaFacturas.tipoFactura);
          } 
                        
        })
    } catch (err){
      console.error(err);
    }
  }

  cargarVistaFacturas(obj) {
    try {  
      this.consultaService.cargarVistaFacturas(obj);
    } catch(err){
      console.error(err);
    }
  }

  anularCompra(id: number) {
    Swal.fire({
      title: 'Anular Factura de Compra',
      text: "¿Está segur@ de seguir con esta acción?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Anular',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
      this.mostrar = true;
      ////this.mostrarMensajeProceso();
        this.consultaService.anularCompra(id)
          .subscribe((response) => {
            this.mostrar = false;
            //this.mostrarMensajeProceso();
              Swal.fire('Generar Comprobante', 'La factura ha suido anulada', 'success'); 
          }, err => {

              console.log(err);
              this.mostrar = false;
              //this.mostrarMensajeProceso();
        
              Swal.fire('Generar Comprobante', 'No se pudo anular la factura', 'error');  
            
          });
      }
    })
    
  }


//------------------------------------------------------------------------------------------------------------------------
  anularComprobante(id) {


    Swal.fire({
      title: 'Anular Comprobante',
      text: "¿Está segur@ de seguir con esta acción?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Anular',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        const tipo_factura = this.objBusquedaFacturas.tipoFactura;
      this.mostrar = true;
      ////this.mostrarMensajeProceso();
        this.consultaService.anularComprobante({id,tipo_factura})
          .subscribe((response: any) => {
            if(typeof response.idfactura !== 'undefined' && typeof response.correo !== 'undefined'){
              this.consultaService.enviarCorreo({
                id: response.idfactura,
                listaCorreos: response.correo+',',
                tipo_factura: '03',
                tipo: '02'
              }).subscribe((response : any) => {
                this.mostrar = false;
              //this.mostrarMensajeProceso();
                Swal.fire('Generar Comprobante', 'La factura ha suido anulada', 'success'); 
              },err => {
                this.mostrar = false;
              //this.mostrarMensajeProceso();
              Swal.fire('Generar Comprobante', 'El envío del correo ha fallado', 'error');  
              this.mostrar = false;
              })
            } else {
              this.mostrar = false;
              Swal.fire('Generar Comprobante', 'Se ha enviado el comprobante', 'success'); 
            }
          }, err => {

              console.log(err);
              this.mostrar = false;
              //this.mostrarMensajeProceso();
        
              Swal.fire('Generar Comprobante', 'No se pudo anular la factura', 'error');  
            
          });
      }
    })
    /*
    
    const tipo_factura = this.objBusquedaFacturas.tipoFactura;
   // this.mostrar = true;
    ////this.mostrarMensajeProceso();
    this.consultaService.anularComprobante({id,tipo_factura})
      .subscribe((response: any) => {
        if(typeof response.idfactura !== 'undefined' && typeof response.correo !== 'undefined'){
          this.consultaService.enviarCorreo({
            id: response.idfactura,
            listaCorreos: response.correo+',',
            tipo_factura: '03',
            tipo: '02'
          }).subscribe((response : any) => {
            this.mostrar = false;
          //this.mostrarMensajeProceso();
            Swal.fire('Generar Comprobante', 'La factura ha suido anulada', 'success'); 
          },err => {
            this.mostrar = false;
          //this.mostrarMensajeProceso();
          Swal.fire('Generar Comprobante', 'El envío del correo ha fallado', 'error');  
          this.mostrar = false;
          })
        } else {
          Swal.fire('Generar Comprobante', response.message, 'success'); 
        }
      }, err => {

          console.log(err);
          this.mostrar = false;
          //this.mostrarMensajeProceso();
    
          Swal.fire('Generar Comprobante', 'No se pudo anular la factura', 'error');  
        
      });
    
    */
  }

  visualizarRespuestaAceptacionHacienda (id) {
    this.consultaService.visualizarRespuestAceptacionHacienda(id)
      .subscribe((response: any) => {
        this.datosRespuestaAceptacionHacienda = response.respuesta;
      })
  }

  visualizarFacturaCompra(id){
    this.consultaService.visualizarFacturaCompra(id)
      .subscribe((response: any) => {
       // this.datosRespuestaAceptacionHacienda = response.respuesta;
       
        this.objFacturaResultado.tipoFactura = 'Factura Compra Electrónica';
     
      // cargar datos totales y encabezado de factura
      this.objFacturaResultado.nombre = response.factura[0].datosCliente.cliente_nombre
      this.objFacturaResultado.clave = response.factura[0].clavenumerica;
      this.objFacturaResultado.consecutivo = response.factura[0].consecutivo;
      this.objFacturaResultado.medioPago = response.factura[0].medio_pago;
      this.objFacturaResultado.condicionVenta = response.factura[0].condicion_venta;
      this.objFacturaResultado.fechaFactura = response.factura[0].fecha_factura;
      this.objFacturaResultado.porcentajeDescuentoTotal = response.factura[0].porcentaje_descuento_total;
      this.objFacturaResultado.descuentoTotal = response.factura[0].monto_descuento_total;
      this.objFacturaResultado.subtotal = response.factura[0].subtotal;
      this.objFacturaResultado.totalservgravados = response.factura[0].totalservgravados;
      this.objFacturaResultado.totalservexentos = response.factura[0].totalservexentos;
      this.objFacturaResultado.totalservexonerado = response.factura[0].totalservexonerado;
      this.objFacturaResultado.totalmercanciasgravadas = response.factura[0].totalmercanciasgravadas;
      this.objFacturaResultado.totalmercanciasexentas = response.factura[0].totalmercanciasexentas;
      this.objFacturaResultado.totalmercanciaexonerada = response.factura[0].totalmercanciaexonerada;
      this.objFacturaResultado.totalgravado = response.factura[0].totalgravado;
      this.objFacturaResultado.totalexento = response.factura[0].totalexento;
      this.objFacturaResultado.totalexonerado = response.factura[0].totalexonerado;
      this.objFacturaResultado.totalventa = response.factura[0].totalventa;
      this.objFacturaResultado.totaldescuentos = response.factura[0].totaldescuentos;
      this.objFacturaResultado.totalventaneta = response.factura[0].totalventaneta;
      this.objFacturaResultado.totalimpuesto = response.factura[0].totalimpuesto;
      this.objFacturaResultado.totalcomprobante = response.factura[0].totalcomprobante;
      this.objFacturaResultado.tipocambio = response.factura[0].tipocambio;
      this.objFacturaResultado.id = response.factura[0].id;
      this.objFacturaResultado.totalotroscargos = response.factura[0].TotalOtrosCargos;
      this.objFacturaResultado.notas = response.factura[0].notas ? response.factura[0].notas :'';
      this.arrayOrdenes = response.ordenes;

      })
  }

  descargarPDFCompra(obj){
    this.consultaService.descargarPDF(obj);
  }

  descargarAcuse(id){
    this.consultaService.descargarAcuseEntrada(id);
  }

  mostrarMensajeProceso(){
    /*if(this.mostrar == true){
      (document.getElementById("btnGuardarProforma") as HTMLButtonElement).disabled = true;
      (document.getElementById("btnGenerarFactura") as HTMLButtonElement).disabled = true;
    } else {
      (document.getElementById("btnGuardarProforma") as HTMLButtonElement).disabled = false;
      (document.getElementById("btnGenerarFactura") as HTMLButtonElement).disabled = false;
    }*/ 
  }

  obtenerProforma(idfactura){
    this.router.navigate(['/factura'],{ queryParams: { id: idfactura } });
  }

  obtenerFacturaCompra(idfactura){
    this.router.navigate(['/compra'],{ queryParams: { id: idfactura } });
  }
}
