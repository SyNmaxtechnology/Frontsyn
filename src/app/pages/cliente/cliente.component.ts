import { VisitaService } from './../../services/pages/visita.service';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/pages/cliente.service';
import Swal from 'sweetalert2';
import { type } from 'jquery';
declare var $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private clienteService: ClienteService,
    private visitaService: VisitaService) {
  }

  claveAutorizar: string;
  tablaPequena = false;
  config: any;
  collection = { count: 0, data: [] };
  listaProvincias: object = [];
  listaCantones: object = [];
  listaDistritos: object = [];
  listaBarrios: object = [];
  listaClientes: any = [];
  listaClientesCargados: any = [];
  tipoIdentificacion: object = [];
  listaTipoExoneracion: object = [];
  errorCorreo: boolean = null;
  autorizar: boolean = false;
  query = '';
  selected = '';
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
    porcentajeExoneracion: '',
    NombreInstitucion: '',
    documentoExoneracion: '',
    descuento: '0',
    estado_cliente: false,
    plazo_credito: '0',
    latitud: '',
    longitud: '',
    c_zona: ''
  };

  listaErrores: boolean | string[] = [];
  errorCampos: boolean = false;
  mostrarmensajesError: boolean = false;
  ngOnInit() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    window.addEventListener("resize", () => {
      if (screen.width < 638) {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
      }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
    })

    this.obtenerProvincias();
    this.tipoExoneracion();
    this.obtenerClientes();
    this.tipoIdentificacion = this.clienteService.tipoIdentificacion();

    //         
    /*this.clienteService.obtenerClientesListado()
      .subscribe(response => {
        this.listaClientes = JSON.parse(response);
        this.listaClientesCargados = JSON.parse(response);
      },err => {
        const {error} = JSON.parse(err); 
        const {message} = error;
        Swal.fire('Buscar Cliente', message, 'error');
      })*/


  }


  buscarClientePorQuery(texto) {
    if (texto === '') {
      return;
    } else {

      let arrCliente = [];
      this.listaClientes.forEach((element, index) => {
        if (texto == element.cliente_nombre) {

          arrCliente.push(element);
          this.listaClientes = arrCliente;
          console.log(this.listaClientes);
          for (const i in this.listaClientes) {
            switch (this.listaClientes[0].cedula_cliente.length) {
              case 9:
                this.listaClientes[0].cliente_tipo_identificacion = 'Física'
                break;
              case 10:
                this.listaClientes[0].cliente_tipo_identificacion = 'Jurídica'
                break;
              case 11:
                this.listaClientes[0].cliente_tipo_identificacion = 'DIMEX'
                break;
              case 10:
                this.listaClientes[0].cliente_tipo_identificacion = 'DIMEX'
                break;

            }

            if (this.listaClientes[0].cliente_nombre_comercial == null || this.listaClientes[0].cliente_nombre_comercial == "") {
              this.listaClientes[0].cliente_nombre_comercial = '-';
            }
            if (this.listaClientes[0].estado_cliente == 1) {
              this.listaClientes[0].estado_cliente = 'SI';
            } else {
              this.listaClientes[0].estado_cliente = 'NO';
            }
          }

          this.collection.count = this.listaClientes.length;
          this.collection.data = this.listaClientes;
        }
      });
    }
  }

  buscarClientePorId(id) {

    if (id === '') {
      return;
    } else {
      console.log(id);
      this.clienteService.obtenerClientePorId(id)
        .subscribe((response: any) => {

          console.log("cliente ", response)
          // cargar los datos en el formulario de cliente
          this.objCliente.id = response.cliente.id;
          const selectProvincia = (document.getElementById("provincia") as HTMLSelectElement);

          this.objCliente.cliente_nombre = response.cliente.cliente_nombre;
          this.objCliente.cliente_nombre_comercial = response.cliente.cliente_nombre_comercial;
          this.objCliente.cliente_tipo_identificacion = response.cliente.cliente_tipo_identificacion;
          this.objCliente.cedula_cliente = response.cliente.cedula_cliente;
          this.objCliente.identificacion_extranjero = response.cliente.identificacion_extranjero;
          this.objCliente.otras_senas = response.cliente.otras_senas;
          this.objCliente.otras_senas_extranjero = response.cliente.otras_senas_extranjero;
          this.objCliente.cliente_telefono_codigopais = response.cliente.cliente_telefono_codigopais;
          this.objCliente.cliente_telefono_numtelefono = response.cliente.cliente_telefono_numtelefono;
          this.objCliente.cliente_fax_codigopais = response.cliente.cliente_fax_codigopais;
          this.objCliente.cliente_fax_numtelefono = response.cliente.cliente_fax_numtelefono;
          this.objCliente.cliente_correo = response.cliente.cliente_correo;
          this.objCliente.exentoIVA = response.cliente.exentoIVA;
          this.objCliente.tipoExoneracion = response.cliente.tipoExoneracion;
          this.objCliente.porcentajeExoneracion = response.cliente.porcentajeExoneracion;
          this.objCliente.NombreInstitucion = response.cliente.NombreInstitucion;
          this.objCliente.documentoExoneracion = response.cliente.documentoExoneracion;
          this.objCliente.descuento = response.cliente.descuento;
          this.objCliente.plazo_credito = response.cliente.plazo_credito;
          //numero_cliente
          this.objCliente.numero_cliente = response.cliente.numero_cliente; //numero_cliente

          if (response.cliente.ubicacion && response.cliente.ubicacion.length > 0) {

            //this.objCliente.ubicacion
            const ubicacion = response.cliente.ubicacion.split(' ');
            console.log(ubicacion)
            if (ubicacion.length == 2) {
              this.objCliente.latitud = ubicacion[0];
              this.objCliente.longitud = ubicacion[1];
            }
          }
          // tslint:disable-next-line: forin
          const idProvincia = response.cliente.provincia;
          const idCanton = response.cliente.canton;
          const idDistrito = response.cliente.distrito;
          const idBarrio = response.cliente.cliente_barrio;
          for (let i in selectProvincia.options) {
            if (typeof selectProvincia.options[i].value !== 'undefined') {
              if (selectProvincia.options[i].value.split(':')[0] == idProvincia.trim()) {
                // selectProvincia.options[i].selected = true;
                this.objCliente.provincia = idProvincia;
                this.objCliente.canton = idCanton;
                this.objCliente.distrito = idDistrito;
                this.objCliente.cliente_barrio = idBarrio;
                this.obtenerCantones();
                this.obtenerDistritos(idProvincia.trim(), idCanton.trim());
                this.obtenerBarrios(idProvincia.trim(), idCanton.trim(), idDistrito.trim());

              }
            }
          }
          const tipo = this.objCliente.cliente_tipo_identificacion;
          const identificacionExtranjero = (document.getElementById("cajaIdentificacionsExtranjeroActualizar") as HTMLInputElement);
          const otrasSenasExtranjero = (document.getElementById("cajaOtrasSenasExtranjeroActualizar") as HTMLInputElement);
          const identificacion_extranjero = (document.getElementById("identificacion_extranjeroActualizar") as HTMLInputElement);
          const otras_senas_extranjero = (document.getElementById("otras_senas_extranjeroActualizar") as HTMLInputElement);
          if (tipo == "01" || tipo == "02") {
            identificacionExtranjero.style.display = "none";
            otrasSenasExtranjero.style.display = "none";
            identificacion_extranjero.value = "";
            otras_senas_extranjero.value = "";
          } else {
            identificacionExtranjero.style.display = "block";
            otrasSenasExtranjero.style.display = "block";
          }
        },
          err => {
            if (err.status === 404) {

              Swal.fire('Buscar Cliente', err.error.message, 'error');
            }
          });
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  nuevoCliente(obj) {

    this.objCliente.cliente_barrio.toString().trim();
    const checkExento = (document.getElementById('exentoIVA') as HTMLInputElement);
    let estaExento = 0;

    /*let numero_cliente = '';

    if (obj.cedula_cliente.length === 9) {
        numero_cliente = '000' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 10) {
        numero_cliente = '00' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 11) {
        numero_cliente = '0' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 12) {
        numero_cliente = obj.cedula_cliente;
    }

  
    obj.numero_cliente = numero_cliente;
  */
    this.clienteService.guardarCliente(obj)
      .subscribe((response) => {
        const datosCliente = JSON.parse(response);
        Swal.fire('Nuevo Cliente', datosCliente.message, 'success');
        (document.getElementById('formNuevoCliente') as HTMLFormElement).reset();
        $('#ModalNuevoCliente').modal('hide');
        this.obtenerClientes();
        this.limpiarObjetoCliente();

      },
        err => {
          const { status, error } = err;
          if (status === 400) {
            Swal.fire('Nuevo Cliente', error.message, 'error');
          } else {
            Swal.fire('Nuevo Cliente', 'Hubo un error en el servidor', 'error');
          }
        });
    /* console.log("objeto cliente ", obj);
     if (typeof this.validarCamposCliente(obj) === 'object') { // hay errores en la informacion
       this.listaErrores = this.validarCamposCliente(obj);
       this.mostrarmensajesError = true;
       $("#ModalNuevoCliente").scrollTop(0);
     } else {
      
     }*/
  }

  actualizarCliente(obj) {


    //et numero_cliente = '';
    const nombre = (document.getElementById("cliente_nombreActualizar") as HTMLInputElement); 165
    const nombreComercial = (document.getElementById("cliente_nombre_comercialActualizar") as HTMLInputElement);
    const tipoIdentificacion = (document.getElementById("cliente_tipo_identificacionActualizar") as HTMLSelectElement);
    const selectBarrio = (document.getElementById("cliente_barrioActualizar") as HTMLSelectElement);
    const otras_senas = (document.getElementById("otras_senasActualizar") as HTMLInputElement);
    const otras_senas_extranjero = (document.getElementById("otras_senas_extranjeroActualizar") as HTMLInputElement);
    const cedula_cliente = (document.getElementById("cedula_clienteActualizar") as HTMLInputElement);
    const identificacion_extranjero = (document.getElementById("identificacion_extranjeroActualizar") as HTMLInputElement);
    const cliente_telefono_codigopais = (document.getElementById("cliente_telefono_codigopaisActualizar") as HTMLInputElement);
    const cliente_telefono_numtelefono = (document.getElementById("cliente_telefono_numtelefonoActualizar") as HTMLInputElement);
    const cliente_fax_codigopais = (document.getElementById("cliente_fax_codigopaisActualizar") as HTMLInputElement);
    const cliente_fax_numtelefono = (document.getElementById("cliente_fax_numtelefonoActualizar") as HTMLInputElement);
    const cliente_correo = (document.getElementById("cliente_correoActualizar") as HTMLInputElement);
    const numero_cliente = (document.getElementById("numero_clienteActualizar") as HTMLInputElement);
    console.log(numero_cliente.value)
    //const checkExento = (document.getElementById("exentoIVA") as HTMLInputElement);
    let estaExento = 0;
    //console.log(tipoIdentificacion.value);

    /*let numero_cliente = '';

      if (obj.cedula_cliente.length === 9) {
          numero_cliente = '000' + obj.cedula_cliente;
      }
      if (obj.cedula_cliente.length === 10) {
          numero_cliente = '00' + obj.cedula_cliente;
      }
      if (obj.cedula_cliente.length === 11) {
          numero_cliente = '0' + obj.cedula_cliente;
      }
      if (obj.cedula_cliente.length === 12) {
          numero_cliente = obj.cedula_cliente;
      }

    
      obj.numero_cliente = numero_cliente;
    */

    //obj.numero_cliente = numero_cliente.value;
    obj.cliente_nombre = nombre.value,
      obj.cliente_nombre_comercial = nombreComercial.value,
      obj.cliente_tipo_identificacion = tipoIdentificacion.value,
      obj.cedula_cliente = cedula_cliente.value,
      obj.identificacion_extranjero = identificacion_extranjero.value,
      obj.cliente_barrio = selectBarrio.value.split(': ')[1],
      obj.otras_senas = otras_senas.value,
      obj.otras_senas_extranjero = otras_senas_extranjero.value,
      obj.cliente_telefono_codigopais = cliente_telefono_codigopais.value,
      obj.cliente_telefono_numtelefono = cliente_telefono_numtelefono.value,
      obj.cliente_fax_codigopais = cliente_fax_codigopais.value,
      obj.cliente_fax_numtelefono = cliente_fax_numtelefono.value,
      obj.cliente_correo = cliente_correo.value

    this.clienteService.actualizarCliente(obj)
      .subscribe((response) => {
        const datosCliente = JSON.parse(response);
        this.objCliente.id = '';
        Swal.fire('Actualizar Cliente', datosCliente.message, 'success');
        (document.getElementById("formModificarCliente") as HTMLFormElement).reset();
        $('#ModalModificarCliente').modal('hide');
        this.obtenerClientes();
        this.limpiarObjetoCliente();
      },
        err => {
          const { status, error } = err;
          if (status === 400) {
            Swal.fire('Actualizar Cliente', error.message, 'error');
          } else {
            Swal.fire('Actualizar Cliente', 'Hubo un error en el servidor', 'error');
          }
        });

    /*if (typeof this.validarCamposCliente(obj) === 'object') { // hay errores en la informacion
      this.listaErrores = this.validarCamposCliente(obj);
      this.mostrarmensajesError = true;
      $("#ModalModificarCliente").scrollTop(0);
    } else {

      
    }*/
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes()
      .subscribe((response: any) => {

        this.listaClientes = response.clientes;
        this.listaClientesCargados = this.listaClientes;

        for (const i in this.listaClientes) {
          switch (this.listaClientes[i].cedula_cliente.length) {
            case 9:
              this.listaClientes[i].cliente_tipo_identificacion = 'Física'
              break;
            case 10:
              this.listaClientes[i].cliente_tipo_identificacion = 'Jurídica'
              break;
            case 11:
              this.listaClientes[i].cliente_tipo_identificacion = 'DIMEX'
              break;
            case 10:
              this.listaClientes[i].cliente_tipo_identificacion = 'DIMEX'
              break;
          }

          if (this.listaClientes[i].cliente_nombre_comercial == null || this.listaClientes[i].cliente_nombre_comercial == "") {
            this.listaClientes[i].cliente_nombre_comercial = '-';
          }
          if (this.listaClientes[i].estado_cliente == 1) {
            this.listaClientes[i].estado_cliente = 'SI';
          } else {
            this.listaClientes[i].estado_cliente = 'NO';
          }
        }

        this.collection.count = this.listaClientes.length;
        this.collection.data = this.listaClientes;

      })
  }

  actualizarEstado(cliente) {

    let nuevoEstado: number, descripcionEstado: string;
    let obj = {
      idcliente: 0,
      estado: 0
    }

    if (cliente.estado_cliente == 'SI') {
      nuevoEstado = 0;
      descripcionEstado = 'NO'
      obj.estado = nuevoEstado
      obj.idcliente = cliente.id;
    } else {
      nuevoEstado = 1;
      descripcionEstado = 'SI';
      obj.estado = nuevoEstado
      obj.idcliente = cliente.id;
    }

    this.clienteService.actualizarEstado(obj)
      .subscribe((response: any) => {
        console.log(response)

        cliente.estado_cliente = descripcionEstado;

        this.listaClientesCargados = this.listaClientes;
      },
        err => {
          console.log(err);
        });
  }

  obtenerProvincias() {
    // tslint:disable-next-line: semicolon
    this.clienteService.obtenerProvincias()
      .subscribe((response: any) => {
        this.listaProvincias = response.provincias;
      });
  }

  obtenerCantones() {
    console.log(this.objCliente);
    const idprovincia = this.objCliente.provincia;
    this.clienteService.obtenerCantones(idprovincia.trim())
      .subscribe((response: any) => {
        this.listaCantones = response.cantones;
      });
  }
  obtenerDistritos(idprovincia, idcanton) {
    const obj = {
      idprovincia,
      idcanton
    };

    this.clienteService.obtenerDistritos(obj)
      .subscribe((response: any) => {
        this.listaDistritos = response.distritos;
      });
  }

  obtenerBarrios(idprovincia, idcanton, iddistrito) {
    const obj = {
      idprovincia: idprovincia.trim(),
      idcanton: idcanton.trim(),
      iddistrito: iddistrito.trim()
    };

    this.clienteService.obtenerBarrios(obj)
      .subscribe((response: any) => {
        this.listaBarrios = response.barrios;
      });
  }

  tipoExoneracion() {
    this.clienteService.tipoExoneracion()
      .subscribe((response: any) => {
        this.listaTipoExoneracion = response.tipoExoneracion;
      },
        err => console.error(err));
  }

  /*bloquearCajaExoneracion(){
    const cajaExoneracion =(document.getElementById("cajaExoneracion") as HTMLDivElement);
    const check = (document.getElementById("exentoIVA") as HTMLInputElement);

    if(check.checked){
      cajaExoneracion.style.display = "none";
    }else {
      cajaExoneracion.style.display = "inline"; 
    }

    //exentoIVA
  }*/


  mostrarCamposExtranjero(tipo, campo) {
    if (campo == 'cliente_tipo_identificacion') {
      const identificacionExtranjero = (document.getElementById("cajaIdentificacionsExtranjero") as HTMLInputElement);
      const otrasSenasExtranjero = (document.getElementById("cajaOtrasSenasExtranjero") as HTMLInputElement);
      const identificacion_extranjero = (document.getElementById("identificacion_extranjero") as HTMLInputElement);
      const otras_senas_extranjero = (document.getElementById("otras_senas_extranjero") as HTMLInputElement);
      if (tipo == "01" || tipo == "02") {
        identificacionExtranjero.style.display = "none";
        otrasSenasExtranjero.style.display = "none";
        identificacion_extranjero.value = "";
        otras_senas_extranjero.value = "";
      } else {
        identificacionExtranjero.style.display = "block";
        otrasSenasExtranjero.style.display = "block";
      }
    } else if (campo == 'cliente_tipo_identificacionActualizar') {
      const identificacionExtranjero = (document.getElementById("cajaIdentificacionsExtranjeroActualizar") as HTMLInputElement);
      const otrasSenasExtranjero = (document.getElementById("cajaOtrasSenasExtranjeroActualizar") as HTMLInputElement);
      const identificacion_extranjero = (document.getElementById("identificacion_extranjeroActualizar") as HTMLInputElement);
      const otras_senas_extranjero = (document.getElementById("otras_senas_extranjeroActualizar") as HTMLInputElement);
      if (tipo == "01" || tipo == "02") {
        identificacionExtranjero.style.display = "none";
        otrasSenasExtranjero.style.display = "none";
        identificacion_extranjero.value = "";
        otras_senas_extranjero.value = "";
      } else {
        identificacionExtranjero.style.display = "block";
        otrasSenasExtranjero.style.display = "block";
      }
    }
  }

  limpiarObjetoCliente() {

    this.objCliente.id = '';
    this.objCliente.cliente_nombre = '';
    this.objCliente.cliente_nombre_comercial = '';
    this.objCliente.cliente_tipo_identificacion = '';
    this.objCliente.cedula_cliente = '';
    this.objCliente.numero_cliente = '';
    this.objCliente.identificacion_extranjero = '';
    this.objCliente.provincia = '';
    this.objCliente.canton = '';
    this.objCliente.distrito = '';
    this.objCliente.cliente_barrio = '';
    this.objCliente.otras_senas = '';
    this.objCliente.otras_senas_extranjero = '';
    this.objCliente.cliente_telefono_codigopais = '';
    this.objCliente.cliente_telefono_numtelefono = '';
    this.objCliente.cliente_fax_codigopais = '';
    this.objCliente.cliente_fax_numtelefono = '';
    this.objCliente.cliente_correo = '';
    this.objCliente.exentoIVA = false;
    this.objCliente.tipoExoneracion = '';
    this.objCliente.porcentajeExoneracion = '0';
    this.objCliente.NombreInstitucion = '';
    this.objCliente.documentoExoneracion = '';
    this.objCliente.estado_cliente = false;
    this.objCliente.descuento = '0';
    this.objCliente.latitud = '';
    this.objCliente.longitud = '';
    this.errorCorreo = null;
    this.claveAutorizar = null;

    this.listaErrores = [];
  }

  validarValoresDecimales(e) {
    console.log(e)
    const texto = e.target.value;
    const expresion = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/

    if (expresion.test(texto) == false) {
      this.objCliente.descuento = texto.substr(0, texto.length - 1);
    }
  }

  validarValoresEnteros(e) {
    //^\d+$
    const texto = e.target.value;
    const expresion = /^\d+$/

    if (expresion.test(texto) == false) {
      this.objCliente.plazo_credito = texto.substr(0, texto.length - 1);
    }
  }

  validarCorreo(texto: string) {
    const reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    this.errorCorreo = reLargo.test(texto);
  }

  autorizarClienteProforma(idcliente, clave) {

    if (typeof this.claveAutorizar === 'undefined' || this.claveAutorizar.length === 0) {
      return alert("La clave es requerida");
    }

    this.clienteService.autorizarClienteProforma(Number(idcliente), clave.trim())
      .subscribe(response => {

        const { message } = JSON.parse(response);
        Swal.fire('Autorizar Cliente', message, 'success');
        //this. limpiarObjetoCliente();

      }, err => {

        const { error } = err;
        const { message } = JSON.parse(error);
        Swal.fire('Autorizar Cliente', message, 'error');

      })
  }

  innhabilitarEstadoAutorizado(idcliente) {

    this.clienteService.innhabilitarEstadoAutorizado(Number(idcliente))
      .subscribe(response => {
        const { message } = JSON.parse(response);
        Swal.fire('Autorizar Cliente', message, 'success');
      },
        err => {
          const { error } = err;
          const { message } = JSON.parse(error);
          Swal.fire('Autorizar Cliente', message, 'error');
        })
  }

  recargarClientes(texto: string) {
    if (texto.length === 0) {
      this.listaClientes = this.listaClientesCargados;
      this.collection.count = this.listaClientes.length;
      this.collection.data = this.listaClientes;
    }
  }

  actualizarUbicacion(id: string) {
    try {

      this.visitaService.obtenerUbicacionActual().then(({ lat, lng }) => {
        const obj = {
          ubicacion: String(lat) + ' ' + String(lng),
          id: Number(id)
        }

        this.clienteService.actualizarUbicacion(obj)
          .subscribe(response => {
            const { message } = JSON.parse(response);
            Swal.fire('Actualizar Ubicación', message, 'success');
          }, err => {
            const { error } = err;
            const { message } = JSON.parse(error);
            Swal.fire('Actualizar Ubicación', message, 'error');
          })
      }).catch(err => {
        Swal.fire('Ubicación', err, 'error');
      })

    } catch (error) {
      Swal.fire('Ubicación', error.message, 'error');
    }
  }

  validarCamposCliente(obj) {

    /*
      id: '',cliente_nombre: '',cliente_nombre_comercial: '',
      cliente_tipo_identificacion: '',cedula_cliente: '',numero_cliente: '',
      identificacion_extranjero: '',provincia: '',canton: '',distrito: '',cliente_barrio: '',
      otras_senas: '',
      otras_senas_extranjero: '',cliente_telefono_codigopais: '',cliente_telefono_numtelefono: '',cliente_fax_codigopais: '',
      cliente_fax_numtelefono: '',cliente_correo: '',exentoIVA: false,tipoExoneracion: '',
      porcentajeExoneracion: 0,NombreInstitucion: '',documentoExoneracion: '',descuento: '0',
      estado_cliente: false,plazo_credito: '0',ubicacion: '',c_zona: ''
    */
    console.log(obj);
    let errores: string[] = [];

    const expresionNombres = /^[0-9A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
    const expresionNumero = /^\d*$/;

    if (!expresionNombres.test(obj.cliente_nombre)) {
      errores.push('El nombre del cliente no es válido');
    }
    if (obj.cliente_nombre_comercial.length > 0 &&
      !expresionNombres.test(obj.cliente_nombre_comercial)) {
      errores.push('El nombre comercial del cliente no es válido');
    }

    if (obj.cliente_tipo_identificacion.length === 0 || obj.cedula_cliente.length === 0) {
      errores.push('Los campos de tipo cédula y cédula son necesarios');
    }

    if (obj.provincia == '' && obj.canton == '' && obj.distrito == '' && obj.cliente_barrio == '') {
      obj.cliente_barrio = '1010101';
    } else if (obj.provincia == '' || obj.canton == '' || obj.distrito == '' || obj.cliente_barrio == '') {
      errores.push('Si envía la ubicación, los valores de provincia, cantón, distrito y barrio son necesarios');
    }

    if (obj.otras_senas.length === 0) {
      obj.otras_senas = 'ND';
    }

    if (String(obj.cliente_tipo_identificacion) === '03' && obj.identificacion_extranjero.length == 0) {
      obj.identificacion_extranjero = 'ND';
    }

    if (obj.cliente_correo.length === 0) {
      errores.push('El correo es requerido')
    }

    if ((obj.cliente_telefono_codigopais.length == 0 && obj.cliente_telefono_numtelefono.length > 0)
      || (obj.cliente_telefono_codigopais.length > 0 && obj.cliente_telefono_numtelefono.length == 0)) {
      errores.push('Si ingresa el dato del número de teléfono debe ingresar tanto el código de país como el número de télefono')
    }

    if ((obj.cliente_fax_codigopais.length === 0 && obj.cliente_fax_numtelefono.length > 0)
      || (obj.cliente_fax_codigopais.length > 0 && obj.cliente_fax_numtelefono.length === 0)) {
      errores.push('Si ingresa el dato del número de fax debe ingresar tanto el código de país como el número de fax');
    }

    //validar datos de exoneracion

    // si cualquier de esos campos trae algo, validar todos los campos de exoneracion dentro del if

    //tipoExoneracion: '',porcentajeExoneracion: 0,NombreInstitucion: '',documentoExoneracion

    if (obj.tipoExoneracion.length > 0 || obj.porcentajeExoneracion > 0
      || obj.NombreInstitucion.length > 0 || obj.documentoExoneracion.length > 0) {
      if (obj.tipoExoneracion.length === 0) {
        errores.push('Si envía los campos de exoneración, el tipo de exoneración es requerido');
      }
      if (obj.porcentajeExoneracion == 0) {
        errores.push('Si envía los campos de exoneración, el porcentaje exonerado debe ser mayor a 0');
      }

      if (obj.NombreInstitucion.length === 0) {
        errores.push('Si envía los campos de exoneración, el nombre de institución es requerido');
      }

      if (obj.documentoExoneracion.length === 0) {
        errores.push('Si envía los campos de exoneración, el número de documento es requerido');
      }

      if (obj.documentoExoneracion.length > 40) {
        errores.push('El número de documento no puede ser mayor a 40 carácteres');
      }
    }

    if (errores.length > 0) {
      return errores;
    } else {

      return true;
    }
  }

  validarCedula(tipo: string, cedula: string) {


    const expresionNumero = /^\d*$/;
    ;
    let errores: string[] = [];
    this.listaErrores = [];
    if (cedula == null || cedula.length === 0) {
      errores.push('Los campos de la cédula son necesario');
    }

    if (tipo == '01') {
      if (!expresionNumero.test(cedula)) {

        errores.push('La cédula debe numeros');
      }
      if (cedula.toString().length !== 9) {
        errores.push('La cédula física debe llevar 9 dígitos');
      }
    }

    if (tipo == '02') {
      if (!expresionNumero.test(cedula)) {
        errores.push('La cédula debe numeros');
      }
      if (cedula.toString().length !== 10) {
        errores.push('La cédula física debe llevar 10 dígitos');
      }
    }

    if (tipo == '03') {
      if (!expresionNumero.test(cedula)) {
        errores.push('La cédula debe numeros');
      }
      if (cedula.toString().length < 11 || cedula.toString().length > 12) {
        errores.push('La cédula DIMEX debe llevar 11 o 12 dígitos');
      }
    }

    if (tipo == '04') {
      if (!expresionNumero.test(cedula)) {
        errores.push('La cédula debe numeros');
      }
      if (cedula.toString().length < 11 || cedula.toString().length > 12) {
        errores.push('La cédula DIMEX debe llevar 10 dígitos');
      }
    }
    if (errores.length > 0) {
      this.errorCampos = true;
      this.listaErrores = errores;
    } else {
      this.errorCampos = false;
    }

  }
}