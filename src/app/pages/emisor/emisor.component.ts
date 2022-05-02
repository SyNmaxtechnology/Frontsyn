import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../../services/pages/emisor.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-emisor',
  templateUrl: './emisor.component.html',
  styles: []
})

export class EmisorComponent implements OnInit {

  constructor(private emisorService: EmisorService) {
    this.obtenerProvincias();
    //this.obtenerUsuarios();
    this.tipoIdentificacion = emisorService.tipoIdentificacion();
    this.tipoServicio = emisorService.tipoServicio();

  }
  botonPrioridad: boolean = false;
  role = this.emisorService.obtenerRole();
  query = '';
  numeroInternoInicio: '';
  numeroInternoFin: '';
  objEmisor = {
    id: '',
    emisor_nombre: '',
    emisor_nombrecomercial: '',
    tipoIdentificacion: '',
    emisor_cedula: '',
    provincia: '',
    canton: '',
    distrito: '',
    barrio: '',
    otras_senas: '',
    tel_codigo_pais: '',
    num_telefono: '',
    fax_codigo_pais: '',
    fax_num_telefono: '',
    correo: '',
    casamatriz: '',
    puntoventa: '',
    codigo_servicio: '',
    tipo_codigo_servicio: '',
    codigo_actividad: '',
    client_id: '',
    API_TOKEN: '',
    API: '',
    numero_resolucion: '',
    fecha_resolucion: '',
    user_hacienda: '',
    password_hacienda: '',
    file_p12: '',
    logo: '',
    contrasenaP12: '',
    pos: '',
    activaCabys: '0',
    autorizaSaldo: '',
    cerca_perimetral: null,
    correo_administrativo: '',
    multi_sucursal: '',
    notas_emisor: '',
    grupoencomun: '',
    token_emisor: '',
    prioridad: null
  };

  objDataActividad = {
    descripcion: '',
    nombre: '',
    codigo: '',
    cedula: ''
  };

  tipoIdentificacion = [];
  tipoServicio = [];
  listaProvincias = [];
  listaCantones = [];
  listaDistritos = [];
  listaBarrios = [];
  listaActividades = [];
  listaUsuarios = [];
  listaEmisores = [];

  ngOnInit() {
    if (this.obtenerPermiso() == 'facturador') {
      this.cargarEmisor();
    }

    this.emisorService.obtenerDatosGlobales()
      .subscribe(response => {

        const { client_id, TOKEN_API, API, tipo_codigo_servicio } = JSON.parse(response);

        this.objEmisor.client_id = client_id;
        this.objEmisor.API_TOKEN = TOKEN_API;
        this.objEmisor.API = API;
        this.objEmisor.codigo_servicio = tipo_codigo_servicio;

      })
  }

  buscarEmisor(texto) {
    //  e.preventDefault();

    if (texto === '') {
      return;
    } else {
      this.emisorService.buscarEmisor(texto)
        .subscribe((response: any) => {
          console.log(response.emisor);
          this.listaEmisores = response.emisor;

          //if(response.cliente.length > 2){

          if (response.emisor.length > 2) {
            return;
          } else {
            (document.getElementById("formBuscarEmisor") as HTMLFormElement).reset();
            this.objEmisor.id = response.emisor[0].id;

            this.objEmisor.emisor_nombre = response.emisor[0].emisor_nombre;
            this.objEmisor.emisor_nombrecomercial = response.emisor[0].emisor_nombrecomercial;
            this.objEmisor.tipoIdentificacion = response.emisor[0].emisor_tipo_identificacion;
            this.objEmisor.emisor_cedula = response.emisor[0].cedula_emisor;
            this.objEmisor.provincia = response.emisor[0].provincia;
            this.objEmisor.canton = response.emisor[0].canton;
            this.objEmisor.distrito = response.emisor[0].distrito;
            this.objEmisor.barrio = response.emisor[0].CodNew;
            this.objEmisor.otras_senas = response.emisor[0].emisor_otras_senas;
            this.objEmisor.tel_codigo_pais = response.emisor[0].emisor_telefono_codigopais;
            this.objEmisor.num_telefono = response.emisor[0].emisor_telefono_numtelefono;
            this.objEmisor.fax_codigo_pais = response.emisor[0].emisor_fax_codigopais;
            this.objEmisor.fax_num_telefono = response.emisor[0].emisor_fax_numtelefono;
            this.objEmisor.correo = response.emisor[0].emisor_correo;
            this.objEmisor.casamatriz = response.emisor[0].casaMatriz;
            this.objEmisor.puntoventa = response.emisor[0].puntoVenta;
            this.objEmisor.contrasenaP12 = response.emisor[0].pin_p12;
            this.objEmisor.user_hacienda = response.emisor[0].key_username_hacienda;
            this.objEmisor.password_hacienda = response.emisor[0].key_password_hacienda;
            this.objEmisor.codigo_actividad = response.emisor[0].codigo_actividad;
            this.objEmisor.codigo_servicio = response.emisor[0].tipo_codigo_servicio;
            this.objEmisor.API = response.emisor[0].API;
            this.objEmisor.API_TOKEN = response.emisor[0].TOKEN_API;
            this.objEmisor.client_id = response.emisor[0].Client_ID;
            this.objEmisor.numero_resolucion = response.emisor[0].numeroresolucion;
            this.objEmisor.fecha_resolucion = response.emisor[0].fecharesolucion;
            this.objEmisor.logo = response.emisor[0].logo;
            this.objEmisor.pos = response.emisor[0].pos;
            this.objEmisor.activaCabys = response.emisor[0].activaCabys;
            this.objEmisor.autorizaSaldo = !response.emisor[0].autorizaSaldo ? '' : response.emisor[0].autorizaSaldo;
            this.objEmisor.cerca_perimetral = !response.emisor[0].cerca_perimetral ? '' : response.emisor[0].cerca_perimetral;
            this.objEmisor.correo_administrativo = !response.emisor[0].correo_administrativo ? '' : response.emisor[0].correo_administrativo;
            this.objEmisor.multi_sucursal = response.emisor[0].multi_sucursal;
            this.objEmisor.grupoencomun = response.emisor[0].grupoencomun; //multi_sucursalgrupoencomun notas_emisor token_emisor
            this.objEmisor.notas_emisor = !response.emisor[0].notas_emisor ? '' : response.emisor[0].notas_emisor;
            this.objEmisor.token_emisor = !response.emisor[0].token_emisor ? '' : response.emisor[0].token_emisor; //prioridad
            this.objEmisor.prioridad = response.emisor[0].prioridad;
            this.botonPrioridad = true;
            this.obtenerProvincias();
            this.obtenerCantones();
            this.obtenerDistritos(this.objEmisor.provincia.trim(), this.objEmisor.canton.trim());
            this.obtenerBarrios(this.objEmisor.provincia.trim(), this.objEmisor.canton.trim(), this.objEmisor.distrito.trim());
          }
        },
          err => {
            console.log(err);
            /*if(err.status === 404){
              Swal.fire('Buscar Emisor',
              err.error.message,
              'error');
            }*/
          })
    }
  }

  nuevoEmisor(e, obj) {
    // formatear informacion a formData para enviar el archivo p12 del emisor
    e.preventDefault();

    // <HTMLInputElement> ESTO CASTEA EL DATO DE ENTRADA COMO SI FUERA LEER UN CAMPO DE HTML EN 
    // JAVASCRIPT PURO
    const File = (document.getElementById('file_p12') as HTMLInputElement); // con esa linea voy a subir la
    const logo = (document.getElementById("logo") as HTMLInputElement);
    const formData = new FormData();

    if (File.value.length === 0) { // validar que algo se ha subido
      alert('No ha cargado ningun archivo');
      return;
    } else { // aqui entra al if de validar el tipo de archivo

      if (File.files[0].type === 'application/x-pkcs12') { // si el archivo es de tipo p12 pasa

        if (logo.value.length > 0) { // cargó un logo
          if (logo.files[0].type === 'image/jpeg' || logo.files[0].type === 'image/png') {
            formData.append('logo', logo.files[0]);
          } else {
            return alert("El archivo que intentar cargar no tiene el formato correcto")
          }
        }
        //-------------------------------


        let numero_emisor = '';

        if (obj.emisor_cedula.length === 9) {
          numero_emisor = '000' + obj.emisor_cedula;
        }
        if (obj.emisor_cedula.length === 10) {
          numero_emisor = '00' + obj.emisor_cedula;
        }
        if (obj.emisor_cedula.length === 11) {
          numero_emisor = '0' + obj.emisor_cedula;
        }
        if (obj.emisor_cedula.length === 12) {
          numero_emisor = obj.emisor_cedula;
        }
        formData.append('idusuario', obj.idusuario);
        formData.append('emisor_nombre', obj.emisor_nombre);
        formData.append('emisor_nombrecomercial', obj.emisor_nombrecomercial);
        formData.append('emisor_tipo_identificacion', obj.tipoIdentificacion);
        formData.append('cedula_emisor', obj.emisor_cedula);
        formData.append('numero_emisor', numero_emisor);
        formData.append('emisor_barrio', obj.barrio);
        formData.append('emisor_otras_senas', obj.otras_senas);
        formData.append('emisor_telefono_codigopais', obj.tel_codigo_pais);
        formData.append('emisor_telefono_numtelefono', obj.num_telefono);
        formData.append('emisor_fax_codigopais', obj.fax_codigo_pais);
        formData.append('emisor_fax_numtelefono', obj.fax_num_telefono);
        formData.append('emisor_correo', obj.correo);
        formData.append('file_p12', File.files[0]);
        formData.append('pin_p12', obj.contrasenaP12);
        formData.append('key_username_hacienda', obj.user_hacienda);
        formData.append('key_password_hacienda', obj.password_hacienda);
        formData.append('casaMatriz', obj.casamatriz);
        formData.append('puntoVenta', obj.puntoventa);
        formData.append('codigo_actividad', obj.codigo_actividad);
        formData.append('tipo_codigo_servicio', '01');
        formData.append('codigo_servicio', obj.codigo_servicio);
        formData.append('Client_ID', obj.client_id);
        formData.append('API', obj.API);
        formData.append('TOKEN_API', obj.API_TOKEN);
        formData.append('numeroresolucion', obj.numero_resolucion);
        formData.append('fecharesolucion', obj.fecha_resolucion);
        formData.append('pos', obj.pos);
        formData.append('activaCabys', obj.activaCabys);
        formData.append('cerca_perimetral', obj.cerca_perimetral);
        formData.append('correo_administrativo', obj.correo_administrativo);
        formData.append('multi_sucursal', obj.multi_sucursal);
        formData.append('grupoencomun', obj.grupoencomun);
        formData.append('notas_emisor', obj.notas_emisor);
        formData.append('token_emisor', obj.token_emisor);

        console.log(formData);
        this.emisorService.guardarEmisor(formData)
          .subscribe((response: any) => {

            Swal.fire('Nuevo Emisor', response.message, 'success');
            (document.getElementById("formEmisor") as HTMLFormElement).reset();
          },
            err => {

              const { status, error } = err;

              if (status === 400) {
                const msgError = JSON.parse(error);
                Swal.fire('Nuevo Emisor', msgError.message, 'error');
              } else {
                Swal.fire('Nuevo Emisor', error.message, 'error');
              }

            });

        //-----------------------
      } else {
        alert("El archivo que intenta subir no está permitido")
        return;
      }
    }
  }

  procesarEmisor(e, obj) {
    if (this.objEmisor.id === '') {
      this.nuevoEmisor(e, obj);
    } else {
      this.actualizarEmisor(e, obj);
    }

  }

  obtenerActividades(e, query) {
    e.preventDefault();

    if (query === '') {
      return;
    } else {
      console.log(query);
      this.emisorService.obtenerCodigosActividad(query)
        .subscribe((response: any) => {
          console.log(response);
          this.objDataActividad.nombre = response.nombre;
          this.objDataActividad.codigo = response.actividades[0].codigo;
          this.objDataActividad.descripcion = response.actividades[0].descripcion;
        },
          err => console.error(err));
    }
  }
  cargarActividad(codigo) {
    console.log(codigo)
    this.objEmisor.codigo_actividad = codigo;
    (document.getElementById('formActividad') as HTMLFormElement).reset();
    $('#formBuscarActividad').modal('hide');
  }
  actualizarEmisor(e, obj) {
    e.preventDefault();

    const File = (document.getElementById('file_p12') as HTMLInputElement);
    const logo = (document.getElementById('logo') as HTMLInputElement);
    const formData = new FormData();
    const selectTipoServicio = (document.getElementById("codigo_servicio") as HTMLSelectElement);
    const codigo = selectTipoServicio.options[selectTipoServicio.selectedIndex].text;
    const tipo = selectTipoServicio.options[selectTipoServicio.selectedIndex].value;

    if (File.value.length > 0) {
      if (File.files[0].type !== 'application/x-pkcs12') {
        return alert("El tipo de archivo que intenta subir no está permitido");
      } else {
        formData.append("file_p12", File.files[0]);
      }
    }

    if (logo.value.length > 0) { // cargó un logo
      if (logo.files[0].type === 'image/jpeg' || logo.files[0].type === 'image/png') {
        formData.append('logo', logo.files[0]);
      } else {
        return alert("El archivo que intentar cargar no tiene el formato correcto")
      }
    }

    let numero_emisor = '';

    if (obj.emisor_cedula.length === 9) {
      numero_emisor = '000' + obj.emisor_cedula;
    }
    if (obj.emisor_cedula.length === 10) {
      numero_emisor = '00' + obj.emisor_cedula;
    }
    if (obj.emisor_cedula.length === 11) {
      numero_emisor = '0' + obj.emisor_cedula;
    }
    if (obj.emisor_cedula.length === 12) {
      numero_emisor = obj.emisor_cedula;
    }

    obj.numero_emisor = numero_emisor;

    //INFORMACION FORMATEADA
    obj.codigo_servicio = codigo;
    obj.tipo_codigo_servicio = tipo.split(": ")[1];
    formData.append("id", obj.id);
    formData.append('idusuario', obj.idusuario);
    formData.append('emisor_nombre', obj.emisor_nombre);
    formData.append('emisor_nombrecomercial', obj.emisor_nombrecomercial);
    formData.append('emisor_tipo_identificacion', obj.tipoIdentificacion);
    formData.append('cedula_emisor', obj.emisor_cedula);
    formData.append('numero_emisor', obj.numero_emisor);
    formData.append('emisor_barrio', obj.barrio);
    formData.append('emisor_otras_senas', obj.otras_senas);
    formData.append('emisor_telefono_codigopais', obj.tel_codigo_pais);
    formData.append('emisor_telefono_numtelefono', obj.num_telefono);
    formData.append('emisor_fax_codigopais', obj.fax_codigo_pais);
    formData.append('emisor_fax_numtelefono', obj.fax_num_telefono);
    formData.append('emisor_correo', obj.correo);
    formData.append('pin_p12', obj.contrasenaP12);
    formData.append('key_username_hacienda', obj.user_hacienda);
    formData.append('key_password_hacienda', obj.password_hacienda);
    formData.append('casaMatriz', obj.casamatriz);
    formData.append('puntoVenta', obj.puntoventa);
    formData.append('codigo_actividad', obj.codigo_actividad);
    formData.append('tipo_codigo_servicio', obj.tipo_codigo_servicio);
    formData.append('codigo_servicio', obj.codigo_servicio);
    formData.append('Client_ID', obj.client_id);
    formData.append('API', obj.API);
    formData.append('TOKEN_API', obj.API_TOKEN);
    formData.append('numeroresolucion', obj.numero_resolucion);
    formData.append('fecharesolucion', obj.fecha_resolucion);
    formData.append('pos', obj.pos);
    formData.append('activaCabys', obj.activaCabys);
    formData.append('autorizaSaldo', obj.autorizaSaldo);
    formData.append('cerca_perimetral', obj.cerca_perimetral);
    formData.append('correo_administrativo', obj.correo_administrativo);
    formData.append('multi_sucursal', obj.multi_sucursal);
    formData.append('grupoencomun', obj.grupoencomun); //notas_emisor
    formData.append('notas_emisor', obj.notas_emisor); //notas_emisor
    formData.append('token_emisor', obj.token_emisor); //notas_emisor

    this.emisorService.actualizarEmisor(formData)
      .subscribe((response: any) => {
        Swal.fire('Editar Emisor',
          response.message,
          'success');
        (document.getElementById("formEmisor") as HTMLFormElement).reset();
        this.objEmisor.id = '';
        this.botonPrioridad = false;
      }, err => {
        console.log(err);
        if (err.status == 500) {
          Swal.fire('Actualizar Emisor',
            'No se pudo actualizar el emisor',
            'error');
          (document.getElementById("formEmisor") as HTMLFormElement).reset();
          this.objEmisor.id = '';
        } else {

          Swal.fire('Actualizar Emisor',
            err.error.err,
            'error');
        }
      })
  }

  obtenerProvincias() {
    // tslint:disable-next-line: semicolon

    this.emisorService.obtenerProvincias()
      .subscribe((response: any) => {
        this.listaProvincias = response.provincias;
      })
  }

  obtenerCantones() {
    const idprovincia = this.objEmisor.provincia;
    this.emisorService.obtenerCantones(idprovincia.trim())
      .subscribe((response: any) => {
        this.listaCantones = response.cantones;
      });
  }
  obtenerDistritos(idprovincia, idcanton) {

    const obj = {
      idprovincia,
      idcanton
    };
    this.emisorService.obtenerDistritos(obj)
      .subscribe((response: any) => {
        this.listaDistritos = response.distritos;
      })
  }

  obtenerBarrios(idprovincia, idcanton, iddistrito) {
    const obj = {
      idprovincia: idprovincia.trim(),
      idcanton: idcanton.trim(),
      iddistrito: iddistrito.trim()
    };

    this.emisorService.obtenerBarrios(obj)
      .subscribe((response: any) => {
        this.listaBarrios = response.barrios;
      })
  }

  obtenerPermiso() {
    return this.emisorService.obtenerPermiso();
  }

  cargarEmisor() {
    this.emisorService.cargarEmisor()
      .subscribe((response) => {
        const obj = JSON.parse(response)

        //(document.getElementById("formBuscarEmisor") as HTMLFormElement).reset();
        this.objEmisor.id = obj.emisor.id;
        this.objEmisor.emisor_nombre = obj.emisor.emisor_nombre;
        this.objEmisor.emisor_nombrecomercial = obj.emisor.emisor_nombrecomercial;
        this.objEmisor.tipoIdentificacion = obj.emisor.emisor_tipo_identificacion;
        this.objEmisor.emisor_cedula = obj.emisor.cedula_emisor;
        this.objEmisor.provincia = obj.emisor.provincia;
        this.objEmisor.canton = obj.emisor.canton;
        this.objEmisor.distrito = obj.emisor.distrito;
        this.objEmisor.barrio = obj.emisor.CodNew;
        this.objEmisor.otras_senas = obj.emisor.emisor_otras_senas;
        this.objEmisor.tel_codigo_pais = obj.emisor.emisor_telefono_codigopais;
        this.objEmisor.num_telefono = obj.emisor.emisor_telefono_numtelefono;
        this.objEmisor.fax_codigo_pais = obj.emisor.emisor_fax_codigopais;
        this.objEmisor.fax_num_telefono = obj.emisor.emisor_fax_numtelefono;
        this.objEmisor.correo = obj.emisor.emisor_correo;
        this.objEmisor.casamatriz = obj.emisor.casaMatriz;
        this.objEmisor.puntoventa = obj.emisor.puntoVenta;
        this.objEmisor.contrasenaP12 = obj.emisor.pin_p12;
        this.objEmisor.user_hacienda = obj.emisor.key_username_hacienda;
        this.objEmisor.password_hacienda = obj.emisor.key_password_hacienda;
        this.objEmisor.codigo_actividad = obj.emisor.codigo_actividad;
        this.objEmisor.codigo_servicio = obj.emisor.tipo_codigo_servicio;
        this.objEmisor.API = obj.emisor.API;
        this.objEmisor.API_TOKEN = obj.emisor.TOKEN_API;
        this.objEmisor.client_id = obj.emisor.Client_ID;
        this.objEmisor.numero_resolucion = obj.emisor.numeroresolucion;
        this.objEmisor.fecha_resolucion = obj.emisor.fecharesolucion;
        this.objEmisor.pos = obj.emisor.pos;
        this.objEmisor.activaCabys = obj.emisor.activaCabys;
        this.objEmisor.cerca_perimetral = obj.emisor.cerca_perimetral; //multi_sucursal
        this.objEmisor.multi_sucursal = obj.emisor.multi_sucursal; //multi_sucursalgrupoencomun
        this.objEmisor.grupoencomun = obj.emisor.grupoencomun; //multi_sucursalgrupoencomun
        this.objEmisor.notas_emisor = obj.emisor.notas_emisor; //multi_sucursalgrupoencomun
        this.objEmisor.token_emisor = obj.emisor.token_emisor; //multi_sucursalgrupoencomun


        this.obtenerProvincias();
        this.obtenerCantones();
        this.obtenerDistritos(this.objEmisor.provincia.trim(), this.objEmisor.canton.trim());
        this.obtenerBarrios(this.objEmisor.provincia.trim(), this.objEmisor.canton.trim(), this.objEmisor.distrito.trim());
        this.deshabilitarFormulario();
      },
        err => {
          console.log(err);
          if (err.status === 404) {
            Swal.fire('Buscar Emisor',
              err.error.message,
              'error');
          }
        })
  }


  deshabilitarFormulario() {
    (document.getElementById("emisor_nombre") as HTMLFormElement).disabled = true;
    (document.getElementById("emisor_nombrecomercial") as HTMLFormElement).disabled = true;
    (document.getElementById("emisor_tipo_identificacion") as HTMLFormElement).disabled = true;
    (document.getElementById("emisor_cedula") as HTMLFormElement).disabled = true;
    (document.getElementById("provincia") as HTMLFormElement).disabled = true;
    (document.getElementById("canton") as HTMLFormElement).disabled = true;
    (document.getElementById("distrito") as HTMLFormElement).disabled = true;
    (document.getElementById("barrio") as HTMLFormElement).disabled = true;
    (document.getElementById("otras_senas") as HTMLFormElement).disabled = true;
    (document.getElementById("tel_codigopais") as HTMLFormElement).disabled = true;
    (document.getElementById("num_telefono") as HTMLFormElement).disabled = true;
    (document.getElementById("fax_codigopais") as HTMLFormElement).disabled = true;
    (document.getElementById("fax_num_telefono") as HTMLFormElement).disabled = true;
    (document.getElementById("correo_emisor") as HTMLFormElement).disabled = true;
    (document.getElementById("casamatriz") as HTMLFormElement).disabled = true;
    (document.getElementById("puntoventa") as HTMLFormElement).disabled = true;
    (document.getElementById("buscarActividad") as HTMLFormElement).disabled = true;
    (document.getElementById("codigo_servicio") as HTMLFormElement).disabled = true;
    (document.getElementById("codigo_actividad") as HTMLFormElement).disabled = true;
    (document.getElementById("client_id") as HTMLFormElement).disabled = true;
    (document.getElementById("API_TOKEN") as HTMLFormElement).disabled = true;
    (document.getElementById("API") as HTMLFormElement).disabled = true;
    (document.getElementById("numero_resolucion") as HTMLFormElement).disabled = true;
    (document.getElementById("fecha_resolucion") as HTMLFormElement).disabled = true;
    (document.getElementById("user_hacienda") as HTMLFormElement).disabled = true;
    (document.getElementById("password_hacienda") as HTMLFormElement).disabled = true;
    (document.getElementById("file_p12") as HTMLFormElement).disabled = true;
    (document.getElementById("logo") as HTMLFormElement).disabled = true;
    (document.getElementById("contrasenaP12") as HTMLFormElement).disabled = true;
    (document.getElementById("contrasenaP12") as HTMLFormElement).disabled = true;
    (document.getElementById("guardarEmisor") as HTMLFormElement).disabled = true;
    //(document.getElementById("idusuario") as HTMLFormElement).disabled = true;
    (document.getElementById("tipoReporte") as HTMLFormElement).disabled = true;
  }

  obtenerUsuarios() {
    this.emisorService.obtenerUsuarios()
      .subscribe(response => {
        const datosUsuarios = JSON.parse(response);
        this.listaUsuarios = datosUsuarios.usuarios;
        console.log(this.listaUsuarios);
      })
  }

  eliminarFacturas(numeroInternoInicio: string, numeroInternoFin: string) {

    if (Number(numeroInternoInicio) > Number(numeroInternoFin)) {
      alert("El numero interno de inicio no puede ser mayor al numero interno final");
    }
    else if ((numeroInternoInicio && numeroInternoInicio !== '' && !numeroInternoFin || numeroInternoFin === '')
      || (!numeroInternoInicio && numeroInternoInicio === '' && numeroInternoFin && numeroInternoFin !== '')) {
      alert("Si envía el parametro de numero interno, ambos parámetros deben tener datos cargados");
    }
    else {
      this.emisorService.eliminarFacturas(numeroInternoInicio, numeroInternoFin)
        .subscribe(response => {
          const { message } = JSON.parse(response);
          $('#ModalEliminarFacturas').modal('hide');
          Swal.fire('Eliminar Facturas', message, 'success');
        }, err => {
          const { status, error } = err;
          const { message } = JSON.parse(error); //comentario
          if (status == 400) {
            Swal.fire('Eliminar Facturas', message, 'warning');
          } else {
            Swal.fire('Eliminar Facturas', message, 'error');
          }
        })
    }
  }

  validarTamanoMaximo(e: any) {

    if (e.target.value.length > 500) {
      this.objEmisor.notas_emisor = e.target.value.substring(0, 499);
    }
  }

  actualizarPrioridad(prioridad: number) {

    this.emisorService.actualizarPrioridad(prioridad)
      .subscribe(response => {

        const { message, prioridad: estadoPrioridad } = JSON.parse(response);
        this.objEmisor.prioridad = Number(estadoPrioridad) === 0 ? 1 : 0;


        Swal.fire('Prioridad', message, 'success');
      }, err => {
        const { status, error } = err;
        const { message } = JSON.parse(error); //comentario
        Swal.fire('Eliminar Facturas', message, 'error');
      })
  }
}
