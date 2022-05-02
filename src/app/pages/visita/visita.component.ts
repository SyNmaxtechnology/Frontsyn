import { Razon,RazonNoVentaService } from './../../services/pages/razon-no-venta.service';
import Swal from 'sweetalert2';
import { VisitaService } from './../../services/pages/visita.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import HaversineGeolocation from 'haversine-geolocation';
import { isNumber } from 'util';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  constructor(
    private visitasService: VisitaService,
    private razonNoVentaService: RazonNoVentaService
  ) { 
    
  }

  ngOnInit() {

    
    const btnEntrada = (document.getElementById("btnEntrada") as HTMLButtonElement);
    const btnSalida = (document.getElementById("btnSalida") as HTMLButtonElement);
    
    const btnEntradaClick = fromEvent(btnEntrada,'click');
    const btnSalidaClick = fromEvent(btnSalida,'click');
   
    this.habilitarBoton(btnEntrada,btnSalida);
    
    this.visitasService.obtenerCercaPerimetral().subscribe(response => {
      console.log(response);
      const perimetral = JSON.parse(response);
      if(perimetral.length === 0 || isNumber(perimetral[0].cerca_perimetral)){
        Swal.fire('Distancia','El valor de la cerca perimetral no es válido','info');
      } else {
        this.cercaPerimetral = perimetral;
      }
    },err => {
      const {error,status} = JSON.parse(err);
      const { message } = JSON.parse(error);
      Swal.fire('Cargar información',message?message:'Hubo un error en el servidor','error');
    })

    btnEntradaClick.subscribe((e: Event) => {
     
        try {
          const selectClientes = (document.getElementById("selectClientes") as HTMLSelectElement);

          if(selectClientes.value.length === 0){
            return alert("No puede registrar una visita sino hay un cliente seleccionado");
          } else {

            btnEntrada.disabled = true;
            
            this.visitasService.obtenerUbicacionActual().then(ubicacion => {

              btnSalida.disabled = true;
              btnEntrada.disabled = true;
              console.log("click entrada")
        
              const tipo_movimiento = 'ENTRADA';
              let objVisita = {
                ubicacion,
                tipo_movimiento,
                idcliente : selectClientes.value
              }
  
            
              this.visitasService.agregarVisita(objVisita).subscribe(response => {
                const {message} = JSON.parse(response);
                this.habilitarBoton(btnEntrada,btnSalida);
                Swal.fire('Nueva Entrada',message,'success');
                btnEntrada.disabled = true;
                /*const host = window.location.origin;
                  const url = host +'/#/visita';
                  window.location.href = url;
                  window.location.reload();*/
              },err => {
                const {error,status} = err;
                const {message} = JSON.parse(error);
                Swal.fire('Nueva Entrada',message,'error');
                btnEntrada.disabled = false;
              })
  
            }).catch( err => {
              Swal.fire('Ubicación',err,'error');
            })
          }
          
        } catch (error) {
          Swal.fire('Ubicación',error.message,'error');
        }      
    })

    btnSalidaClick.subscribe((e: Event) => {
      
        try {
          const selectClientes = (document.getElementById("selectClientes") as HTMLSelectElement);
          if(selectClientes.value.length === 0){
            btnSalida.disabled = false;
            return alert("No puede registrar una visita sino hay un cliente seleccionado");
          }
        
          this.visitasService.obtenerUbicacionActual().then(ubicacion => {
            
            const ubicacionActual = {lat: ubicacion.lat,lng: ubicacion.lng};
            
            if(this.venta == 'NO' && this.razon_noventa === ''){
              return alert("Debe seleccionar una razon si no se pudo realizar la venta");
            }

            btnSalida.disabled = true;
            btnEntrada.disabled = true;
            const tipo_movimiento = 'SALIDA';

            

            let objVisita = {
              ubicacion: ubicacionActual,
              tipo_movimiento,
              idcliente : selectClientes.value,
              razon: this.razon_noventa       
            }

            this.visitasService.agregarVisita(objVisita).subscribe(response => {
                const {message} = JSON.parse(response);
                this.habilitarBoton(btnEntrada,btnSalida);
                Swal.fire('Nueva Salida',message,'success');
                /*const host = window.location.origin;
                const url = host +'/#/visita';
                window.location.href = url;
                window.location.reload();*/
                this.venta = 'SI';
                this.razon_noventa= '';
            },err => {
                const {error:{message}} = err;
                this.venta = 'SI';
                this.razon_noventa= '';
                Swal.fire('Nueva Salida',message,'error');
            })
          }).catch( err => {
            console.log(err);
            Swal.fire('Ubicación1',err,'error');
          })
          
        } catch (error) {
          console.log(error);
          Swal.fire('Ubicación',error.message,'error');
        }
    })

    this.visitasService.obtenerClientes().subscribe(response => {
      const { clientes } = JSON.parse(response);
      this.listaClientes = clientes;
    },
    err => {
      const { error : {message}} = err;
      Swal.fire('Cargando información..', message,'error');

    })

    this.razonNoVentaService.obtenerRazones().subscribe(response => {
      this.listaRazones = response;
    },err => {
      const { error,status} = err;
      const {message} = JSON.parse(error);
      Swal.fire('Cargando información..', message,'error');
    })

    //
  }

  ubicacionCliente : any = null ;
  listaClientes = [];
  idclienteActual : string = '';
  cercaPerimetral : Number;
  listaRazones : Razon[]; 
  venta: string = 'SI';
  boton: string = 'ENTRADA';
  razon_noventa: string = '';
  
 async obtenerUbicacion(){

    try {

      const ubicacion = await this.visitasService.obtenerUbicacionActual();
   
      return ubicacion;

    } catch (error) {
      throw new Error("No se pudo obtener la ubicación");
    }
  }

  fechaHora() {
    const d = new Date();
    const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
    const dia =  (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
    const anio = d.getFullYear();
    //const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    //const minutos = (d.getMinutes() < 10) ?  '0' + d.getMinutes() : d.getMinutes();
    //const segundos = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
    const fecha = (document.getElementById("fecha") as HTMLInputElement);
    fecha.value = anio + '-' + mes + '-' +dia;
  }

  habilitarBoton(btnEntrada: HTMLButtonElement, btnSalida: HTMLButtonElement){
    this.visitasService.habilitarTipoMovimiento().subscribe(data => {
      const {response: { tipo,cliente }} = JSON.parse(data);
      btnSalida.disabled = true;
      btnEntrada.disabled = true;
      if(typeof cliente === 'undefined'){
        
          this.idclienteActual  = '';
          btnSalida.disabled = true;
          btnEntrada.disabled = false;
          this.boton = 'ENTRADA';
      } else {
          if(tipo == 'ENTRADA'){
            btnSalida.disabled = false;
            btnEntrada.disabled = true;
            const selectsClientes = (document.getElementById("selectClientes") as HTMLSelectElement);
            this.idclienteActual = cliente;
            selectsClientes.disabled = true;
            this.boton = 'SALIDA'
            //this.obtenerUbicacionCliente(cliente);
          } else {
            btnSalida.disabled = true;
            btnEntrada.disabled = false;

            const selectsClientes = (document.getElementById("selectClientes") as HTMLSelectElement);
            selectsClientes.disabled = false;
            this.boton = 'ENTRADA'
          }
      }
      
    }, err => {
      Swal.fire('Cargando información...','Ocurrió un error','error');
    })
  }

  obtenerUbicacionCliente(idcliente:string){
    if(idcliente){
      this.visitasService.obtenerUbicacionCliente(Number(idcliente))
        .subscribe(response => {
          console.log(response);
           const {ubicacion} = JSON.parse(response);
          if(ubicacion == null){
            Swal.fire('Ubicacion','El cliente seleccionado no registra una ubicacion valida','info');
            
          } else {
            
            const ubicacionConvertida = ubicacion.split(' ');
            this.ubicacionCliente = {latitude: parseFloat(ubicacionConvertida[0]),longitude: parseFloat(ubicacionConvertida[1])};
          }
        },err => {
          const {error,status} = err;
          const {message} = JSON.parse(error);
          Swal.fire('Obtener ubicacion',message? message: 'Error en el servidor','error');
      })
    } 
  }
}
