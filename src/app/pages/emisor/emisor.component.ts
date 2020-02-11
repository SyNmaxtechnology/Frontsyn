import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../../services/pages/emisor.service';

@Component({
  selector: 'app-emisor',
  templateUrl: './emisor.component.html',
  styles: []
})
export class EmisorComponent implements OnInit {

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
    correo: ''
  };

  tipoIdentificacion = [
    {
      codigo: '01',
      descripcion: 'Física'
    },
    {
      codigo: '02',
      descripcion: 'Jurídica'
    },
    {
      codigo: '03',
      descripcion: 'DIMEX'
    },
    {
      codigo: '04',
      descripcion: 'NITE'
    }
  ];

  listaProvincias: any = [];
  listaCantones: any = [];
  listaDistritos: any = [];
  listaBarrios: any = [];

  constructor() {
    this.obtenerProvincias();
    this.obtenerActividades();
  }

  ngOnInit() {

  }

  nuevoEmisor(e, obj) {
   // formatear informacion a formData para enviar el archivo p12 del emisor
      e.preventDefault();
      let formData = new FormData();
      console.log(obj);
  }

  obtenerProvincias() {
    // tslint:disable-next-line: semicolon
    EmisorService.obtenerProvincias()
      .then(response => {
        this.listaProvincias = response;
      })
      .catch(err => console.error(err));
  }

  obtenerCantones(id) {
    const idprovincia = id.toString().split(':')[0];
    EmisorService.obtenerCantones(idprovincia)
      .then(cantones =>  {
        this.listaCantones = cantones;
      })
      .catch(err => console.log(err));
  }
  obtenerDistritos(idprovincia, idcanton) {

    const obj = {
      idprovincia,
      idcanton
    };
    EmisorService.obtenerDistritos(obj)
      .then(distritos =>  {
        this.listaDistritos = distritos;
      })
      .catch(err => console.log(err));
  }

  obtenerBarrios(idprovincia, idcanton, iddistrito) {
    const obj = {
      idprovincia: idprovincia.trim(),
      idcanton: idcanton.trim(),
      iddistrito: iddistrito.trim()
    };

    EmisorService.obtenerBarrios(obj)
      .then(barrios => {
        this.listaBarrios = barrios;
      })
    .catch(err => console.error(err));
  }

  obtenerActividades() {
    EmisorService.cargarCodigosActividad();
  }
}
