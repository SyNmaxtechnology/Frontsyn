import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../../services/pages/emisor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emisor',
  templateUrl: './emisor.component.html',
  styles: []
})

export class EmisorComponent implements OnInit {

  constructor(private emisorService: EmisorService) {
    this.obtenerProvincias();
    this.obtenerActividades();
    this.tipoIdentificacion = emisorService.tipoIdentificacion();
    this.tipoServicio = emisorService.tipoServicio();
  }
  query = '';
  objEmisor = {
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
    contrasenaP12: ''
  };
  
  tipoIdentificacion: any = [];
  tipoServicio: any = [];
  listaProvincias: any = [];
  listaCantones: any = [];
  listaDistritos: any = [];
  listaBarrios: any = [];
  listaActividades: any = [];



  ngOnInit() {

  }

  buscarEmisor(e, texto){
    e.preventDefault();

    if(texto === ''){
      return;
    } else {
      this.emisorService.buscarEmisor(texto)
        .subscribe(response => {
          console.log(response.emisor);
          this.objEmisor.emisor_nombre = response.emisor[0].emisor_nombre;
          this.objEmisor.emisor_nombrecomercial = response.emisor[0].emisor_nombrecomercial;
          this.objEmisor.tipoIdentificacion = response.emisor[0].emisor_tipo_identificacion;
          this.objEmisor.emisor_cedula = response.emisor[0].cedula_emisor;
          this.objEmisor.provincia = response.emisor[0].provincia;
          this.objEmisor.canton = response.emisor[0].canton;
          this.objEmisor.distrito = response.emisor[0].distrito;
          this.objEmisor.barrio = response.emisor[0].codigo;
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
          this.obtenerProvincias();
          this.obtenerCantones();
          this.obtenerDistritos(this.objEmisor.provincia.trim(),this.objEmisor.canton.trim());
          this.obtenerBarrios(this.objEmisor.provincia.trim(),this.objEmisor.canton.trim(),this.objEmisor.distrito.trim());
        
        },
        err =>{
          console.error(err);
        })
    }
  }

  nuevoEmisor(e, obj) {
   // formatear informacion a formData para enviar el archivo p12 del emisor
      e.preventDefault();

        // <HTMLInputElement> ESTO CASTEA EL DATO DE ENTRADA COMO SI FUERA LEER UN CAMPO DE HTML EN 
        // JAVASCRIPT PURO
      const File = (document.getElementById('file_p12') as HTMLInputElement); // con esa linea voy a subir la
      if (File.value.length === 0) { // validar que algo se ha subido
        alert('No ha cargado ningun archivo');
        return;
      } else { // aqui entra al if de validar el tipo de archivo

         if (File.files[0].type === 'application/x-pkcs12') { // si el archivo es de tipo p12 pasa
          const formData = new FormData();
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
          formData.append('codigo_actividad', '99999');
          formData.append('tipo_codigo_servicio', '01');
          formData.append('codigo_servicio', obj.codigo_servicio);
          formData.append('Client_ID', obj.client_id);
          formData.append('API', obj.API);
          formData.append('TOKEN_API', obj.API_TOKEN);
          formData.append('numeroresolucion', obj.numero_resolucion);
          formData.append('fecharesolucion', obj.fecha_resolucion);

          this.emisorService.guardarEmisor(formData)
            .subscribe(response => {

            });
         } else {
          console.log('Archivo no permitido');
          return;
         }
      }
  }

  obtenerProvincias() {
    // tslint:disable-next-line: semicolon

    this.emisorService.obtenerProvincias()
      .subscribe(response =>  {
        this.listaProvincias = response.provincias;
      })
  }

  obtenerCantones() {
    const idprovincia = this.objEmisor.provincia;
    this.emisorService.obtenerCantones(idprovincia.trim())
    .subscribe(response =>  {
      this.listaCantones = response.cantones;
    });
  }
  obtenerDistritos(idprovincia, idcanton) {

    const obj = {
      idprovincia,
      idcanton
    };
    this.emisorService.obtenerDistritos(obj)
      .subscribe(response =>  {
        this.listaDistritos= response.distritos;
      })
  }

  obtenerBarrios(idprovincia, idcanton, iddistrito) {
    const obj = {
      idprovincia: idprovincia.trim(),
      idcanton: idcanton.trim(),
      iddistrito: iddistrito.trim()
    };

    this.emisorService.obtenerBarrios(obj)
      .subscribe(response => {
        this.listaBarrios = response.barrios;
      })
  }
  obtenerActividades() {
    this.emisorService.cargarCodigosActividad()
      .subscribe(actividades => {
        this.listaActividades = actividades;
      });
  }
}
