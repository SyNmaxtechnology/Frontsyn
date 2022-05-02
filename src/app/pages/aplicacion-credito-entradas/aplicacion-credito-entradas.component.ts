import { FacturaService } from './../../services/pages/factura.service';
import { Factura } from './../aplicacion-recibos-credito/aplicacion-recibos-credito.component';
import { AplicacionCreditoEntradasService } from './../../services/pages/aplicacion-credito-entradas.service';
import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';
import { MovimientosBancoService } from './../../services/pages/movimientos-banco.service';

@Component({
  selector: 'app-aplicacion-credito-entradas',
  templateUrl: './aplicacion-credito-entradas.component.html',
  styleUrls: ['./aplicacion-credito-entradas.component.css']
})
export class AplicacionCreditoEntradasComponent implements OnInit {

  constructor(
    private aplicacionCreditoEntrada: AplicacionCreditoEntradasService,
    private facturaService: FacturaService,
    private movimientosBancoService: MovimientosBancoService
  ) { }

  ngOnInit() {

    this.movimientosBancoService.cargarCuentas().subscribe(response => {
      this.listaCuentas = JSON.parse(response);
    },err => {
      const {error,status} = err
      const {message} = JSON.parse(error);
      Swal.fire('Cargando cuentas',message,'error');
    })

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
    // limpiarCampos
    //aplicarRecibo
    //resetDatos
    // txtTotal
    //pagarFacturas 

    const btnResetDatosClick = fromEvent(btnResetDatos, 'click');
    //const btnaplicarReciboClick = fromEvent(btnaplicarRecibo,'click');
    const btnPagarFacturasClick = fromEvent(btnPagarFacturas,'click');
    const btnLimpiarCamposClick = fromEvent(btnLimpiarCampos,'click');
    const txtMontoKeyUp = fromEvent(txtMonto,'focusout');

    window.addEventListener("resize",() => {
      if (screen.width < 700) 
       {
        this.tablaPequena = true;
       }
      else {
        this.tablaPequena = false;
      }
    })

    this.aplicacionCreditoEntrada.obtenerProveedores().subscribe(response=> {
      this.listaProveedores = JSON.parse(response);
    },err => {
      const { status, error}= err;
      const {message} = JSON.parse(error);
      Swal.fire('Cargar Proveedores', message,'error');
    })

    this.facturaService.medioPago().subscribe((response: any) =>{
      const {medioPago} = response;
      this.listaMedioPago = medioPago;
    },err => {
      const { status, error}= err;
      const {message} = JSON.parse(error);
      Swal.fire('Cargando medios de pago', message,'error');
    })


    btnLimpiarCamposClick.subscribe(() => {
      this.listaFacturas =[];
      this.listaFacturasPagar = [];
      this.totalPagado = 0;
      this.monto = 0;
      this.saldo = 0;
      this.montoAplicado = 0;
      this.nombreCliente = '';
      this.idcuenta = '';
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

    btnResetDatosClick.subscribe((e: Event) => {
       
       //this.listaFacturasPagar = this.listaFacturasReset;
        for(let factura of this.listaFacturas){
          factura.saldoactual = factura.saldoactual;
          factura.selected = false;
        }
        this.listaFacturasPagar = [];
        this.montoAplicado = 0;
        this.monto = 0;
        this.saldo= 0;
        this.totalPagado = 0;
     })

     btnPagarFacturasClick.subscribe((e: Event) => {
       e.preventDefault();
       const facturasPagadas = this.listaFacturasPagar;
       this.pagarFacturas(facturasPagadas,Number(this.idcuenta),this.totalPagado);
     })
  }

  listaCuentas = []
  listaFacturas: any[] = [];
  listaFacturasReset: any[] = [];
  listaFacturasPagar: any[] = [];
  listaProveedores = [];
  listaMedioPago = [];
  bloquear : boolean = false;
  mostrar: boolean = false;
  fechaActual: string = '';
  nombreCliente: string = '';
  monto: number = null;
  saldo: number = null;
  tablaPequena : boolean = false;
  totalPagado: number = 0;
  reciboAplicado: boolean = null;
  montoAplicado : number = 0;
  idcuenta: number | string = '';
  bloquearFacturas : boolean = false;
  errorDecimales : boolean = false;
  obtenerFacturas(proveedor: string){
    if(proveedor.length === 0){
      return;
    } else {

      for(const elemento of this.listaProveedores){
        if(proveedor.trim() === (elemento.cedula_proveedor+' '+elemento.proveedor_nombre).toString().trim()){
          (document.getElementById("nombreCliente") as HTMLInputElement).value = elemento.proveedor_nombre; 
          this.aplicacionCreditoEntrada.obtenerFacturasPorProveedor(Number(elemento.id))
            .subscribe(response =>{
              if(JSON.parse(response).length === 0){
                Swal.fire('Cargar recibos', 'No hay resultados','warning');
              } else {
                  let facturas : Factura[] = [];
                  for(const factura of JSON.parse(response)){
                    factura.saldoRestante = 0;
                    factura.selected = false;
                    factura.montototal = Number(factura.montototal).toFixed(2); 
                    factura.tipocambio = Number(factura.tipocambio).toFixed(2);
                    factura.saldoactual = Number(factura.saldoactual).toFixed(2);
                    facturas.push(factura);
                  }
                  this.listaFacturas = facturas;
                  this.listaFacturasReset = facturas;
                }
              },
            err => {
              const { status, error}= err;
              const {message} = JSON.parse(error);
              Swal.fire('Cargar recibos', message,'error');
          })
        }
      }
    }
  }

  agregarFactura(factura){
    if(this.monto === 0){
        return alert("El monto aplicado debe ser mayor a 0");
    } else if(Number(this.saldo) < Number(this.montoAplicado) ){
        return alert("El saldo actual no puede ser menor al monto aplicado");
    } else if(Number(this.montoAplicado) === 0){
        return alert("No se puede aplicar un monto en 0");
    } else if(Number(this.montoAplicado) > factura.saldoactual){
        return alert("No se puede aplicar un monto mayor al saldo actual de la factura");
    } else {

      if(this.validarNumerosEnterosOdecimales(this.montoAplicado)){
        //this.saldo = this.monto;
        let saldoTotal = 0;
        let totalRecibo = 0;
        this.reciboAplicado = true;
        saldoTotal = this.montoAplicado;

        this.listaFacturas.forEach(elemento => { 
          if(elemento.numfactura == factura.numfactura){
            if(saldoTotal >= Number(elemento.saldoactual)){
              this.listaFacturasPagar.push(factura);
              console.log("mayor")
              
              factura.selected = true;
              totalRecibo += Number(Number(saldoTotal).toFixed(2));
              elemento.saldoactual-= Number(Number(saldoTotal).toFixed(2));
              elemento.saldoactual= Number(Number(elemento.saldoactual).toFixed(2));
              elemento.saldoRestante = totalRecibo;
              this.totalPagado += Number(totalRecibo);
              this.totalPagado = Number(Number(this.totalPagado).toFixed(2));
              this.saldo -= Number(Number(totalRecibo).toFixed(2));
            
              console.log("saldo actual",saldoTotal);
    
              if(Number(elemento.saldoactual) < 0){
                elemento.saldoactual = 0;
              }

            } else if(saldoTotal < Number(elemento.saldoactual) && saldoTotal > 0){
              console.log("menor")
              this.listaFacturasPagar.push(factura);
              factura.selected = true;
              totalRecibo += Number(Number(saldoTotal).toFixed(2));
              elemento.saldoactual-= Number(Number(saldoTotal).toFixed(2));
              elemento.saldoactual= Number(Number(elemento.saldoactual).toFixed(2));
              elemento.saldoRestante =  Number(Number(saldoTotal).toFixed(2));;
              this.totalPagado += Number(totalRecibo);
              this.totalPagado = Number(Number(this.totalPagado).toFixed(2));
              this.saldo -= Number(Number(totalRecibo).toFixed(2));
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
        return alert("El valor del monto aplicado no es valido"); 
      }
    }
  }

  quitarFactura(factura){
    let saldoAsumar = 0;
    let indice = 0;
    
    this.listaFacturas.forEach((elemento,i) => {
      if(factura.numfactura == elemento.numfactura){

        indice = i;
        elemento.selected = false;
        elemento.saldoactual += Number(Number(elemento.saldoRestante).toFixed(2));
        saldoAsumar += Number(Number(elemento.saldoRestante).toFixed(2));
        elemento.saldoactual=  Number(Number(elemento.saldoactual).toFixed(2));
        this.saldo = Number(this.saldo) + Number(saldoAsumar);
        this.totalPagado -= saldoAsumar;
        this.totalPagado = Number(Number(this.totalPagado).toFixed(2));

        this.listaFacturasPagar = this.listaFacturasPagar.filter(fila => factura.numfactura != fila.numfactura);
      }
    })
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
        saldoTotal = Number(this.saldo);
        this.listaFacturasPagar.forEach(elemento => { 
          if(saldoTotal >= Number(elemento.saldoactual)){
            this.reciboAplicado = true;
            totalRecibo += saldoTotal
            elemento.saldoactual-= saldoTotal;
            this.totalPagado = totalRecibo;
  
            //saldoTotal = saldoTotal - saldoTotal
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

  pagarFacturas (obj: any[],idcuenta: number, montopagado: number) {
    if(this.idcuenta == null || this.idcuenta == ''){
      return alert("Debe seleccionar una cuenta");
    }
    else if(this.listaFacturasPagar.length === 0){
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
     this.aplicacionCreditoEntrada.actualizarTotalesFacturasCredito({facturas: obj,idcuenta,montopagado})
       .subscribe(response => {
         this.mostrar = false;
         this.bloquear = false;
         const {message}= JSON.parse(response);
         Swal.fire('Guardar Recibo', message,'success');
         this.listaFacturas = [];
         this.listaFacturasPagar = [];
         this.listaFacturasReset = [];
         this.totalPagado = 0;
         this.saldo = 0;
         this.monto = 0;
         this.montoAplicado = 0;
         this.nombreCliente = '';
         this.idcuenta = '';
       },
       err => {
         
         const {status, error } = err;
         this.mostrar = false;
         this.bloquear = false;
         this.listaFacturas = [];
         this.listaFacturasPagar = [];
         this.listaFacturasReset = [];
         this.totalPagado = 0;
         this.saldo = 0;
         this.monto = 0;
         this.montoAplicado = 0;
         this.nombreCliente = '';
         this.idcuenta = '';
         
         Swal.fire('Guardar Recibo', error.message,'error');
       })
     }
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
