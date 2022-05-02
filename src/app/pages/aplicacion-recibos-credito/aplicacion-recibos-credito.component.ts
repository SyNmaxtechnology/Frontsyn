import { MovimientosBancoService } from './../../services/pages/movimientos-banco.service';
import  Swal  from 'sweetalert2';
import { AplicacionRecibosCreditoService } from './../../services/pages/aplicacion-recibos-credito.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as xmlConverter from 'xml-js';

export interface Factura {
  numfactura: string,
  tipocambio: string,
  fecha: string,
  monto: number,
  saldo: number,
  moneda: string,
  selected: boolean;
  saldoRestante : number;
}

@Component({
  selector: 'app-aplicacion-recibos-credito',
  templateUrl: './aplicacion-recibos-credito.component.html',
  styleUrls: ['./aplicacion-recibos-credito.component.css']
})
export class AplicacionRecibosCreditoComponent implements OnInit {
  constructor(
    private aplicacionRecibosService: AplicacionRecibosCreditoService,
    private movimientosBancoService: MovimientosBancoService
  ) { 

    this.medioPago();
    this.tipoCambio();
    this.obtenerMonedas();
    this.cargarClientes();
  }

  ngOnInit() {

    

    this.movimientosBancoService.cargarCuentas().subscribe(response => {
      this.listaCuentas = JSON.parse(response);
    },err => {
      const {error,status} = err
      const {message} = JSON.parse(error);
      Swal.fire('Cargando cuentas',message,'error');
    })

    window.addEventListener("resize",() => {
      if (screen.width < 700) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }
    })
    this.moneda = 'CRC';
    let fecha = new Date(); //Fecha actual
    let mes = String(fecha.getMonth()+1); //obteniendo mes
    let dia = String(fecha.getDate()); //obteniendo dia
    let ano = String(fecha.getFullYear()); //obteniendo año
    
    if(Number(dia)<10) dia='0'+dia; //agrega cero si el menor de 10
    if(Number(mes)<10) mes='0'+mes; //agrega cero si el menor de 10
    
    this.fechaActual = ano+"-"+mes+"-"+dia;

    (document.getElementById("fecha") as HTMLInputElement).disabled = true;
    (document.getElementById("nombreCliente") as HTMLInputElement).disabled = true;
    (document.getElementById("formaPago") as HTMLSelectElement).disabled= true;
    (document.getElementById("txtTotal") as HTMLSelectElement).disabled= true;
    (document.getElementById("saldo") as HTMLSelectElement).disabled= true;

    const btnResetDatos = (document.getElementById("resetDatos") as HTMLButtonElement);
    //const btnaplicarRecibo = (document.getElementById("aplicarRecibo") as HTMLButtonElement);
    const btnPagarFacturas = (document.getElementById("pagarFacturas") as HTMLButtonElement);
    const btnLimpiarCampos = (document.getElementById("limpiarCampos") as HTMLButtonElement);
    const txtMonto = (document.getElementById("monto") as HTMLInputElement);
    const txtMontoAplicado = (document.getElementById("montoAplicado") as HTMLInputElement);
    // limpiarCampos
    //aplicarRecibo
    //resetDatos
    // txtTotal
    //pagarFacturas 

    const btnResetDatosClick = fromEvent(btnResetDatos, 'click');
    //const btnaplicarReciboClick = fromEvent(btnaplicarRecibo,'click');
    const btnPagarFacturasClick = fromEvent(btnPagarFacturas,'click');
    const btnLimpiarCamposClick = fromEvent(btnLimpiarCampos,'click')
    const txtMontoKeyUp = fromEvent(txtMonto,'focusout');
    const txtMontoAplicadoFocusOut = fromEvent(txtMontoAplicado,'focusout');

    btnLimpiarCamposClick.subscribe(() => {
      this.listaFacturas =[];
      this.listaFacturasPagar = [];
      this.totalPagado = 0;
      this.moneda = 'CRC';
      this.monto = 0;
      this.saldo = 0;
      this.nombreCliente = '';
      this.idcuenta = '';
      this.montototal = null;
    })
  
    txtMontoKeyUp.subscribe((e: Event) => {
      if(this.validarNumerosEnterosOdecimales(this.monto)){
        this.saldo = this.monto;
      } else {
        if(this.errorDecimales){
          return alert("Solo puede agregar dos decimales al monto");
        }
        return alert("El monto no es válido");
      }
    })

    txtMontoAplicadoFocusOut.subscribe((e: Event) => {
      if(!this.validarNumerosEnterosOdecimales(this.montoAplicado)){
        if(this.errorDecimales){
          return alert("Solo puede agregar dos decimales al monto");
        }
      }
    })
    
    btnResetDatosClick.subscribe((e: Event) => {
       
       //this.listaFacturasPagar = this.listaFacturasReset;
        for(let factura of this.listaFacturas){
          factura.saldoactual = factura.montototal;
          factura.selected = false;
        }
        this.listaFacturasPagar = [];

        this.monto = 0;
        this.saldo= 0;
        this.totalPagado = 0;
        this.moneda = 'CRC';
     })

     

     btnPagarFacturasClick.subscribe((e: Event) => {
       e.preventDefault();

       if(this.idcuenta == '' || this.idcuenta == null){
         return alert("Debe seleccionar una cuenta");
       }
       const facturasPagadas = this.listaFacturasPagar;
       this.pagarFacturas(facturasPagadas,Number(this.idcuenta),this.totalPagado);
     })
  }

  fechaActual: string;
  formaPago: string;
  moneda: string;
  monto: number = 0;
  saldo: number = 0;
  nombreCliente: string = '';
  listaFacturas: any[] = [];
  listaFacturasReset: any[] = [];
  listaFacturasPagar: any[] = [];
  listaMedioPago : any[] = [];
  listaMonedas : any[] = [];
  listaClientes : any[] = [];
  listaCuentas : any[] = [];
  conversionColones: number;
  totalPagado : number = 0;
  mostrar: boolean = false;
  bloquear: boolean = false;
  tablaPequena : boolean = false;
  idcliente: number;
  reciboAplicado : boolean = false;
  montoAplicado: number = 0;
  idcuenta : number | string = '';
  montototal: number;
  errorDecimales: boolean = false;

  obtenerFacturas(query: string){
    
    const cedula: number = Number(query.split(' ')[0]);
    for(let cliente of this.listaClientes){
      if(cedula.toString() === cliente.cedula_cliente.toString()){
        this.nombreCliente = cliente.cliente_nombre;
        this.aplicacionRecibosService.obtenerFacturas(cliente.id).subscribe(response => {
          const datosFacturas = JSON.parse(response);  
          let facturas : Factura[] = [];
          for(let factura of datosFacturas){
            factura.saldoRestante = 0;
            factura.selected = false;
            factura.montototal = Number(factura.montototal).toFixed(2); 
            factura.tipocambio = Number(factura.tipocambio).toFixed(2);
            factura.saldoactual = Number(factura.saldoactual).toFixed(2);
            facturas.push(factura);
          }
          this.listaFacturas = facturas;

          console.log(this.listaFacturas);
        },
        err => {
          const {status, error} = err;
    
          if(status === 404){
            Swal.fire('Buscar Facturas', 'No hay resultados','warning');
          } else {
            Swal.fire('Buscar Facturas', error.message,'error');
          }
    
        })
      }
    }
  }

  agregarFactura(factura){

    if(this.monto === 0){
      return alert("El monto debe ser mayor a 0");
    } else if(Number(this.saldo) < Number(this.montoAplicado) ){
      return alert("El saldo no puede ser menor al monto aplicado");
    } else if(Number(this.montoAplicado) === 0){
      return alert("No se puede aplicar un recibo con un monto aplicado de 0");
    } else if(this.montoAplicado > Number(factura.saldoactual)){
      return alert("No se puede aplicar un monto mayor al saldo actual de la factura");
    } else { 
      //this.saldo = this.monto;
      let saldoTotal = 0;
      let totalRecibo = 0;
      this.reciboAplicado = true;

      if(this.validarNumerosEnterosOdecimales(this.montoAplicado)){
        if(this.moneda == 'USD') {
          saldoTotal = this.saldo  * this.conversionColones;
        } else {
          saldoTotal = this.saldo;
        }
  
        
        this.listaFacturas.forEach(elemento => { 
          if(elemento.numfactura == factura.numfactura){
            if(saldoTotal >= Number(elemento.saldoactual)){
              this.listaFacturasPagar.push(factura);
              console.log("mayor")
              
              factura.selected = true;
              totalRecibo += Number(elemento.saldoactual);
              elemento.saldoactual-=  Number(Number(this.montoAplicado).toFixed(2));
              elemento.saldoactual=  Number(Number(elemento.saldoactual).toFixed(2));
              elemento.saldoRestante = Number(Number(this.montoAplicado).toFixed(2));
              this.totalPagado += totalRecibo;
              this.totalPagado = Number(this.totalPagado.toFixed(2));
              this.saldo -= Number(Number(this.montoAplicado).toFixed(2)); //Number(Number(totalRecibo).toFixed(2));
             
              console.log("saldo actual",saldoTotal);
    
              if(Number(elemento.saldoactual) < 0){
                elemento.saldoactual = 0;
              }
  
            } else if(saldoTotal < Number(elemento.saldoactual) && saldoTotal > 0){
              console.log("menor")
              this.listaFacturasPagar.push(factura);
              factura.selected = true;
              totalRecibo += Number(elemento.saldoactual);
              elemento.saldoactual-=  Number(Number(this.montoAplicado).toFixed(2));
              elemento.saldoactual=  Number(Number(elemento.saldoactual).toFixed(2));
              elemento.saldoRestante = Number(Number(this.montoAplicado).toFixed(2));
              this.totalPagado += totalRecibo -  elemento.saldoactual;
              this.totalPagado = Number(this.totalPagado.toFixed(2));
              this.saldo = Number(saldoTotal - Number(Number(this.montoAplicado).toFixed(2)));
              if(this.saldo < 0){
                this.saldo = 0;
              }
              console.log("saldo actual",saldoTotal);
              if(Number(elemento.saldoactual) < 0){
                elemento.saldoactual = 0;
              }
  
            } else {
              return alert("El saldo del recibo está en 0");
            }
            console.log(this.listaFacturasPagar)
          }
        })
      } else {
        return alert("El monto no es válido");
      }
    }
  }

  quitarFactura(factura){
    let saldoAsumar = 0;
    let indice = 0;
    
    this.listaFacturas.forEach((elemento,i) => {
      if(factura.numfactura == elemento.numfactura){
        console.log("numfactura",factura.numfactura)
        indice = i;
        elemento.selected = false;
        elemento.saldoactual += Number(Number(elemento.saldoRestante).toFixed(2));
        elemento.saldoactual=  Number(Number(elemento.saldoactual).toFixed(2));
        saldoAsumar += Number(Number(elemento.saldoRestante).toFixed(2));
        
        this.saldo += saldoAsumar;
        this.totalPagado -= Number(saldoAsumar);
        this.listaFacturasPagar = this.listaFacturasPagar.filter(fila => factura.numfactura != fila.numfactura);
      }
    })
    
    
    console.log(this.listaFacturasPagar)
  }

  aplicarRecibo(saldo: number){
   
    if(this.monto === 0){
      return alert("El monto debe ser mayor a 0");
    } else {
      if(this.listaFacturasPagar.length === 0){
        return alert("No hay ninguna factura seleccionada");
      } else {
        this.saldo = this.monto;
        let saldoTotal = 0;
        let totalRecibo = 0;
        this.reciboAplicado = true;
        if(this.moneda == 'USD') {
          saldoTotal = this.saldo  * this.conversionColones;
        } else {
          saldoTotal = this.saldo;
        }
        this.listaFacturasPagar.forEach(elemento => { 
          if(saldoTotal >= Number(elemento.saldoactual)){
            this.reciboAplicado = true;
            totalRecibo += Number(elemento.saldoactual);
            elemento.saldoactual-= saldoTotal;
            this.totalPagado = totalRecibo;
  
            //saldoTotal = saldoTotal - Number(elemento.saldoactual);
            console.log("saldo actual",saldoTotal);
            //(document.getElementById("saldo") as HTMLInputElement).value = saldoTotal.toString();
            //this.saldo = saldo;
            saldoTotal -= this.totalPagado;
            this.saldo = Number(saldoTotal.toFixed(2));
            if(Number(elemento.saldoactual) < 0){
              elemento.saldoactual = 0;
            }
          } else {
            return alert("La factura con numero "+elemento.numfactura+" tiene un monto mayor al saldo actual");
          }
        })
      }
    }
  }

  medioPago(){
    this.aplicacionRecibosService.obtenerMedioPago()
      .subscribe((response: any) => {
        for(let medio of response.medioPago){
          if(medio.id == '01'){
            this.listaMedioPago.push(medio);
          }
        }
      },err => {
        console.log(err);
      })
  }

  tipoCambio(){
    this.aplicacionRecibosService.obtenerTipoCambio()
    .subscribe((responseTipoCambio: any) => {
      let xml : any;
      let valorTipoCambio : String;
      const datosTipoCambio = responseTipoCambio;
      xml  = xmlConverter.xml2json(datosTipoCambio.response,{compact: true, spaces: 4});
      xml = JSON.parse(xml);
      
      if(typeof xml.DataSet === 'undefined' || xml.DataSet == null ){
        this.conversionColones  = Number('1.00');
      } else {
        valorTipoCambio = xml.DataSet['diffgr:diffgram']['Datos_de_INGC011_CAT_INDICADORECONOMIC']['INGC011_CAT_INDICADORECONOMIC']['NUM_VALOR']._text;
        this.conversionColones = Number(Number(valorTipoCambio).toFixed(2));
      }
    },err => {
     Swal.fire('Tipo Cambio','Hubo un error en el servicio del tipo de cambio','error');
    })
  }

  obtenerMonedas(){
    this.aplicacionRecibosService.obtenerMonedas()
      .subscribe((response: any) => {
       this.listaMonedas = response.monedas;
      },err => {
      console.log(err);
    })
  }

  pagarFacturas (obj: any[],idcuenta: number, montopagado:number) {
   if(this.listaFacturasPagar.length === 0){
    return alert("No hay facturas cargadas");
   } else {
    for(let factura of obj){
      if(factura.saldoactual * 1 === factura.montototal * 1){
        alert("No se ha aplicado ningún pago");
        return;
      }
    }

    this.mostrar = true;
    this.bloquear = true;
    this.aplicacionRecibosService.pagarFacturasCredito({lineas : obj,idcuenta,montopagado})
      .subscribe(response => {
        this.mostrar = false;
        this.bloquear = false;
        const datosRespuesta = JSON.parse(response);
        Swal.fire('Guardar Recibo', datosRespuesta.message,'success');
        this.listaFacturas = [];
        this.listaFacturasPagar = [];
        this.listaFacturasReset = [];
        this.moneda = 'CRC';
        this.totalPagado = 0;
        this.saldo = 0;
        this.monto = 0;
        this.idcuenta = '';
      },
      err => {
        
        const {status, error } = err;
        this.mostrar = false;
        this.bloquear = false;
        this.listaFacturas = [];
        this.listaFacturasPagar = [];
        this.listaFacturasReset = [];
        this.moneda = 'CRC';
        this.totalPagado = 0;
        this.saldo = 0;
        this.monto = 0;
        this.idcuenta = '';
        
        Swal.fire('Guardar Recibo', error.message,'error');
      })
    }
  }

  cargarClientes() {
    this.aplicacionRecibosService.obtenerClientes()
      .subscribe(response => {
        const datosClientes = JSON.parse(response);
        this.listaClientes = datosClientes.clientes;
    })
  }

  validarNumerosEnterosOdecimales(monto: number){
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
}
