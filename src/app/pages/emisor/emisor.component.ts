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

  obtenerCantones(id) {
    const idprovincia = id.toString().split(':')[0];
    this.emisorService.obtenerCantones(idprovincia)
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
