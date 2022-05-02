import  Swal from 'sweetalert2';
import { FacturaCompraService } from './../../services/pages/factura-compra.service';
import { ClienteService } from './../../services/pages/cliente.service';
import { ProveedorService } from './../../services/pages/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  constructor(
    private proveedorService: ProveedorService,
    private clienteService: ClienteService,
    private facturaCompraService: FacturaCompraService
  ) { 

    this.obtenerProveedores();
    this.tipoDocumento();
    this.Provincias();
  }


  ngOnInit() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    }; 


    window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
    })

    //obtener los elementos del DOM

    const txtQuery = (document.getElementById("query") as HTMLInputElement);
    const selectcodigoProvincia = (document.getElementById("codigoProvincia") as HTMLSelectElement);
    const selectCodigoCanton = (document.getElementById("codigoCanton") as HTMLSelectElement);
    const selectCodigoDistrito = (document.getElementById("codigoDistrito") as HTMLSelectElement);

    // actualizar los valores de ubicacion

    const selectcodigoProvinciaActualizar = (document.getElementById("codigoProvinciaActualizar") as HTMLSelectElement);
    const selectCodigoCantonActualizar = (document.getElementById("codigoCantonActualizar") as HTMLSelectElement);
    const selectCodigoDistritoActualizar = (document.getElementById("codigoDistritoActualizar") as HTMLSelectElement);


    //------------------------------------------------------
    const btnGuardarProveedor =(document.getElementById("guardarProveedor") as HTMLButtonElement);
    const selectProveedorTipoIdentificacion = (document.getElementById("proveedor_tipo_identificacion") as HTMLSelectElement);
    const selectProveedorTipoIdentificacionActualizar = (document.getElementById("tipoCedulaActualizar") as HTMLSelectElement);
    const btnActualizarProveedor = (document.getElementById("actualizarProveedor") as HTMLButtonElement);
    //declaracion de los eventos tipoCedulaActualizar
   
    const selectcodigoProvinciaChange = fromEvent(selectcodigoProvincia,'change');
    const selectCodigoCantonChange = fromEvent(selectCodigoCanton,'change');
    const selectCodigoDistritoChange = fromEvent(selectCodigoDistrito,'change');

    //ACTUALIZAR UBICACION ------------------------------------------------

    const selectcodigoProvinciaActualizarChange = fromEvent(selectcodigoProvinciaActualizar,'change');
    const selectCodigoCantonActualizarChange = fromEvent(selectCodigoCantonActualizar,'change');
    const selectCodigoDistritoActualizarChange = fromEvent(selectCodigoDistritoActualizar,'change');

    //---------------------------------------------------------------------


    const btnGuardarProveedorClick = fromEvent(btnGuardarProveedor,'click');
    const selectProveedorTipoIdentificacionChange = fromEvent(selectProveedorTipoIdentificacion,'change');
    const selectProveedorTipoIdentificacionActualizarChange =  fromEvent(selectProveedorTipoIdentificacionActualizar,'change');
    const btnActualizarProveedorClick = fromEvent(btnActualizarProveedor,'click');
    //FUnciones de los eventos
   
    selectcodigoProvinciaChange.subscribe((response: Event) => {
    
        this.obtenerCantones(Number(selectcodigoProvincia.value))
    })  

    selectCodigoCantonChange.subscribe((response: Event) => {
      
      const idprovincia = Number(selectcodigoProvincia.value);
      const idcanton = selectCodigoCanton.value;

      this.obtenerDistritos(idprovincia,idcanton);
    })

    selectCodigoDistritoChange.subscribe((response: Event) => {
      
      const idprovincia = Number(selectcodigoProvincia.value);
      const idcanton = selectCodigoCanton.value;
      const idddistrito = selectCodigoDistrito.value;

      this.obtenerBarrios(idprovincia,idcanton,idddistrito)
    })


    //--------------------------------------------------------

    selectcodigoProvinciaActualizarChange.subscribe((response: Event) => {
    
      this.obtenerCantones(Number(selectcodigoProvinciaActualizar.value))
  })  

  selectCodigoCantonActualizarChange.subscribe((response: Event) => {
    
    const idprovincia = Number(selectcodigoProvinciaActualizar.value);
    const idcanton = selectCodigoCantonActualizar.value;

    this.obtenerDistritos(idprovincia,idcanton);
  })

  selectCodigoDistritoActualizarChange.subscribe((response: Event) => {
    
    const idprovincia = Number(selectcodigoProvinciaActualizar.value);
    const idcanton = selectCodigoCantonActualizar.value;
    const idddistrito = selectCodigoDistritoActualizar.value;

    this.obtenerBarrios(idprovincia,idcanton,idddistrito)
  })


    //----------------------------------------------------------

    btnGuardarProveedorClick.subscribe((response: Event) => {
      let numeroProveedor = '';

      if(this.objProveedor.cedula_proveedor.toString().length == 12 ){
        numeroProveedor = this.objProveedor.cedula_proveedor;
      } else if(this.objProveedor.cedula_proveedor.toString().length == 11) {
          numeroProveedor = '0' + String(this.objProveedor.cedula_proveedor);
      } else if(this.objProveedor.cedula_proveedor.toString().length == 10) {
          numeroProveedor = '00' + String(this.objProveedor.cedula_proveedor);
      } else {
          numeroProveedor = '000' + String(this.objProveedor.cedula_proveedor);
      }
      
      //this.objProveedor.proveedor_tipo_identificacion = this.tipoCedula;
      //this.objProveedor.proveedor_barrio = this.codigoBarrio;
      this.objProveedor.numero_proveedor = numeroProveedor;
      //this.objProveedor.proveedor_barrio = this.codigoBarrio;
      const proveedor = this.objProveedor;
      this.nuevoProveedor(proveedor)
    })

    selectProveedorTipoIdentificacionChange.subscribe((response: Event) => {

      const opcionSeleccionada = selectProveedorTipoIdentificacion.value;
      const divIdExtranjero = (document.getElementById("divIdentificacionExtranjero") as HTMLDivElement);
      const divSenasExtranjero = (document.getElementById("divOtrasSenasExtranjero") as HTMLDivElement);
      const senasExtranjero = (document.getElementById("otras_senas_extranjero") as HTMLInputElement);
      const idExtranjero = (document.getElementById("identificacion_extranjero") as HTMLInputElement);
      if(opcionSeleccionada == '01' || opcionSeleccionada == '02'){
        divIdExtranjero.style.display= 'none';
        divSenasExtranjero.style.display= 'none';
        senasExtranjero.value= '';
        idExtranjero.value = '';
      } else {
        divIdExtranjero.style.display= 'block';
        divSenasExtranjero.style.display= 'block';
        senasExtranjero.value= '';
        idExtranjero.value = '';
      }
    })


    selectProveedorTipoIdentificacionActualizarChange.subscribe((repsonse: Event) => {
      const opcionSeleccionada = selectProveedorTipoIdentificacion.value;
      const divIdExtranjero = (document.getElementById("divIdentificacionExtranjeroActualizar") as HTMLDivElement);
      const divSenasExtranjero = (document.getElementById("divOtrasSenasExtranjeroActualizar") as HTMLDivElement);
      const senasExtranjero = (document.getElementById("otras_senas_extranjeroActualizar") as HTMLInputElement);
      const idExtranjero = (document.getElementById("identificacion_extranjeroActualizar") as HTMLInputElement);
      if(opcionSeleccionada == '01' || opcionSeleccionada == '02'){
        divIdExtranjero.style.display= 'none';
        divSenasExtranjero.style.display= 'none';
        senasExtranjero.value= '';
        idExtranjero.value = '';
      } else {
        divIdExtranjero.style.display= 'block';
        divSenasExtranjero.style.display= 'block';
        senasExtranjero.value= '';
        idExtranjero.value = '';
      }
    })

    btnActualizarProveedorClick.subscribe((response: Event) => {
      let numeroProveedor = '';

      if(this.objProveedor.proveedor_tipo_identificacion == '04' ){
          numeroProveedor = this.objProveedor.cedula_proveedor;
      } else if(this.objProveedor.proveedor_tipo_identificacion == '03') {
          numeroProveedor = String(this.objProveedor.cedula_proveedor);
      } else if(this.objProveedor.proveedor_tipo_identificacion == '02') {
          numeroProveedor = '00' + String(this.objProveedor.cedula_proveedor);
      } else {
          numeroProveedor = '000' + String(this.objProveedor.cedula_proveedor);
      }

      //this.objProveedor.proveedor_tipo_identificacion = this.tipoCedula;
      //this.objProveedor.proveedor_barrio = this.codigoBarrio;
      this.objProveedor.numero_proveedor = numeroProveedor;
      this.objProveedor.proveedor_barrio = this.codigoBarrio;
      if(this.codigoActividadBusqueda !== ''){
        this.objProveedor.codigo_actividad = this.codigoActividadBusqueda;
      }
      const proveedor = this.objProveedor;

      this.actualizarProveedor(proveedor)
    })

  }
  tablaPequena = false;
  query: '';
  config: any;
  collection = { count: 0, data: [] };
  listaProveedores = [];
  listaProveedoresCaragdos = [];
  listaTipoCedulas = [];
  provincias= [];
  cantones= [];
  distritos= [];
  barrios = [];
  cedulaProveedorBusqueda: string;
  descripcionActividad: string;
  codigoActividadBusqueda: string;
  codigoProvincia: number;
  codigoCanton: string;
  codigoDistrito: string;
  codigoBarrio: string;
  objProveedor = {
    id: '',
    proveedor_nombre: '',
    proveedor_nombre_comercial: '',
    proveedor_tipo_identificacion: '',
    cedula_proveedor: '',
    numero_proveedor: '',
    codigo_actividad: '',
    identificacion_extranjero: '',
    proveedor_barrio: '',
    otras_senas: '',
    otras_senas_extranjero: '',
    proveedor_telefono_codigopais: '',
    proveedor_telefono_numtelefono: '',
    proveedor_fax_codigopais: '',
    proveedor_fax_numtelefono: '',
    proveedor_correo: ''
  }

  obtenerProveedores(){
    this.proveedorService.obtenerProveedores()
      .subscribe(response => {
        const datosProveedor = JSON.parse(response);
        this.listaProveedores = datosProveedor.proveedores;
        this.listaProveedoresCaragdos = datosProveedor.proveedores

        for(const i in this.listaProveedores){

          switch(this.listaProveedores[i].cedula_proveedor.length){
            case 9:
              this.listaProveedores[i].proveedor_tipo_identificacion = 'Física';
            break;
            case 10:
              this.listaProveedores[i].proveedor_tipo_identificacion = 'Jurídica';
            break;
            case 11:
              this.listaProveedores[i].proveedor_tipo_identificacion = 'DIMEX';
            break;
            case 12:
              this.listaProveedores[i].proveedor_tipo_identificacion = 'NITE';
            break;
          }

          if(this.listaProveedores[i].estado_proveedor == 1){
            this.listaProveedores[i].estado_proveedor  = 'SI';
          } else {
            this.listaProveedores[i].estado_proveedor  = 'NO';
          }
        }

        this.collection.count = this.listaProveedores.length;
        this.collection.data = this.listaProveedores;
      })
  }

  pageChanged(event){
    this.config.currentPage = event;
  }


  obtenerProveedorPorId(id){
    console.log(id);

    this.proveedorService.obtenerProveedorPorId(id)
      .subscribe(response => {
        const datos = JSON.parse(response);
        console.log(response);  

        this.objProveedor.id= datos.proveedor.id;
        this.objProveedor.proveedor_nombre= datos.proveedor.proveedor_nombre;
        this.objProveedor.proveedor_nombre_comercial= datos.proveedor.proveedor_nombre_comercial;
        this.objProveedor.proveedor_tipo_identificacion= datos.proveedor.proveedor_tipo_identificacion;
        this.objProveedor.cedula_proveedor= datos.proveedor.cedula_proveedor;
                // codigo_actividad= ;
        this.objProveedor.identificacion_extranjero= datos.proveedor.identificacion_extranjero;
        //this.objProveedor.proveedor_barrio= datos.proveedor.proveedor_barrio;
        this.objProveedor.codigo_actividad = datos.proveedor.codigo_actividad == null ? '': datos.proveedor.codigo_actividad;
        this.objProveedor.otras_senas= datos.proveedor.otras_senas;
        this.objProveedor.otras_senas_extranjero= datos.proveedor.otras_senas_extranjero;
        this.objProveedor.proveedor_telefono_codigopais= datos.proveedor.proveedor_telefono_codigopais;
        this.objProveedor.proveedor_telefono_numtelefono= datos.proveedor.proveedor_telefono_numtelefono;
        this.objProveedor.proveedor_fax_codigopais= datos.proveedor.proveedor_fax_codigopais;
        this.objProveedor.proveedor_fax_numtelefono= datos.proveedor.proveedor_fax_numtelefono;
        this.objProveedor.proveedor_correo= datos.proveedor.proveedor_correo;
        this.codigoProvincia = datos.proveedor.provincia;
        this.codigoCanton = datos.proveedor.canton;
        this.codigoDistrito = datos.proveedor.distrito;
        this.codigoBarrio = datos.proveedor.CodNew;
        
        this.obtenerCantones(this.codigoProvincia);
        this.obtenerDistritos(this.codigoProvincia,this.codigoCanton);
        this.obtenerBarrios(this.codigoProvincia,this.codigoCanton,this.codigoDistrito)   
        console.log(this.objProveedor);     
      })
  }

  actualizarEstado(proveedor){
    let nuevoEstado = 0, descripcion = '';

    if(proveedor.estado_proveedor == 'SI'){
      nuevoEstado = 0;
      descripcion = 'NO';
      proveedor.estado_proveedor = descripcion;
    } else {
      nuevoEstado = 1;
      descripcion = 'SI';
      proveedor.estado_proveedor = descripcion;
    }

    this.proveedorService.actualizarEstado({
      estado: nuevoEstado,
      idproveedor: proveedor.id
    }).subscribe(response => {
        proveedor.estado_proveedor = descripcion;
        this.listaProveedoresCaragdos = this.listaProveedores;
    },
    err => {
      console.log(err);
    })
  }

  tipoDocumento(){
    this.proveedorService.tipoCedula()
      .subscribe(response => {
        const datos = JSON.parse(response);
        this.listaTipoCedulas = datos.tipoCedula;
      })
  }

  Provincias(){
    this.clienteService.obtenerProvincias()
    .subscribe((response: any) => {
        this.provincias = response.provincias;
      //clienteService
    })
  }

  obtenerCantones(idprovincia: number){
    this.clienteService.obtenerCantones(idprovincia)
      .subscribe((response: any) => {
        this.cantones = response.cantones;
      })
  }

  obtenerDistritos(idprovincia: number, idcanton: string){
    
    this.clienteService.obtenerDistritos({
      idprovincia,
      idcanton
    }).subscribe((response: any) => {
      this.distritos = response.distritos;
    })
  }

  obtenerBarrios(idprovincia : number, idcanton: string, iddistrito: string){

    this.clienteService.obtenerBarrios({
      idprovincia,
      idcanton,
      iddistrito
    }).subscribe((response: any) => {
      this.barrios = response.barrios;
    })
  }

  nuevoProveedor(obj){

    this.facturaCompraService.nuevoProveedor(obj)
      .subscribe(response => {
        const respuesta = JSON.parse(response);
        $('#ModalNuevoProveedor').modal('hide');
        (document.getElementById("formNuevoProveedor") as HTMLFormElement).reset();
        Swal.fire('Nuevo Proveedor', respuesta.message, 'success');
        this.obtenerProveedores();
      },
      
      err => {
        console.error(err);
        Swal.fire('Nuevo Proveedor', 'No se pudo insertar el proveedor', 'error');
      })
  }

  obtenerActividad(cedula : string){
    if(cedula === ''){
      return;
    } else {
      this.proveedorService.obtenerActividad(cedula)
        .subscribe(response => {
          console.log(response);
          const datosActividad = JSON.parse(response);

          this.codigoActividadBusqueda = datosActividad.response.codigo;
          this.descripcionActividad = datosActividad.response.descripcion;
        })
    }
  }


  buscarProveedor(query: string){
    if(query === ''){
      return ;
    } else {
      this.listaProveedores.forEach((proveedor,index) =>{
        if(query == proveedor.proveedor_nombre){
          this.listaProveedores = [];
          this.listaProveedores.push(proveedor);
          for(const i in this.listaProveedores){

            switch(this.listaProveedores[i].cedula_proveedor.length){
              case 9:
                this.listaProveedores[i].proveedor_tipo_identificacion = 'Física';
              break;
              case 10:
                this.listaProveedores[i].proveedor_tipo_identificacion = 'Jurídica';
              break;
              case 11:
                this.listaProveedores[i].proveedor_tipo_identificacion = 'DIMEX';
              break;
              case 12:
                this.listaProveedores[i].proveedor_tipo_identificacion = 'NITE';
              break;
            }

            if(this.listaProveedores[i].estado_proveedor == 1){
              this.listaProveedores[i].estado_proveedor  = 'SI';
            } else {
              this.listaProveedores[i].estado_proveedor  = 'NO';
            }
          }

          this.collection.count = this.listaProveedores.length;
          this.collection.data = this.listaProveedores;

          return;
        } else {
          console.log
        }
      })
    }
  }

  actualizarProveedor(obj){
    this.proveedorService.actualizarProveedor(obj)
      .subscribe(response => {
        const datosRespuesta =JSON.parse(response);

        $('#ModalActualizarProveedor').modal('hide');
        (document.getElementById("formActualizarProveedorActualizar") as HTMLFormElement).reset();
        Swal.fire('Actualizar Proveedor', datosRespuesta.message, 'success');
        this.obtenerProveedores();
      },err => {
        console.error(err);
        Swal.fire('Actualizar Proveedor', 'No se pudo actualizar el proveedor', 'error');
      })
  }

  limpiarModalNUevoProveedor(){
    (document.getElementById("formNuevoProveedor") as HTMLFormElement).reset();
  }

  limpiarModalActualizarProveedor(){
    (document.getElementById("formActualizarProveedorActualizar") as HTMLFormElement).reset();
  }

  recargarProveedores(texto: string){
    if(texto.length === 0){
      this.listaProveedores = this.listaProveedoresCaragdos;
      this.collection.count = this.listaProveedores.length;
      this.collection.data = this.listaProveedores;
    } 
  }
}

