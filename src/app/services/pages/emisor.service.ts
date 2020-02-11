import { Injectable } from '@angular/core';
import clienteAxios from '../../config/axios';

@Injectable({
  providedIn: 'root'
}) // emisor

export class EmisorService {

  constructor() { }

  static obtenerProvincias() {
    return new Promise((resolve, reject) => {
      clienteAxios.get('/provincias')
        .then(provincias => {
          resolve(provincias.data.provincias);
        })
      .catch(err => reject(err));
    });
  }

  static obtenerCantones(idprovincia) {
    return new Promise((resolve, reject) => {
      clienteAxios.get('/cantones/' + idprovincia)
        .then(cantones => {
          resolve(cantones.data.cantones);
        })
      .catch(err => reject(err));
    });
  }
  static obtenerDistritos(obj) {
    return new Promise((resolve, reject) => {
      const url = '/distritos/' + obj.idcanton.trim() + '&' + obj.idprovincia;
      clienteAxios.get(url)
        .then(distritos => {
          resolve(distritos.data.distritos);
        })
      .catch(err => reject(err));
    });
  }
  static obtenerBarrios(obj) {
    return new Promise((resolve, reject) =>  {

      const {idcanton, idprovincia, iddistrito} = obj;
      const url = '/barrios/' + idcanton + '&' + idprovincia + '&' + iddistrito;

      clienteAxios.get(url)
        .then(barrios =>  {
          resolve(barrios.data.barrios);
        })
        .catch(err => reject(err));
    });
  }

  static cargarCodigosActividad() {
    return new Promise((resolve, reject) =>  {
      const url = 'https://cloud-cube.s3.amazonaws.com/sp5z9nxkd1ra/public/assets/json/actividades_por_codigo.json';
      fetch(url)
        .then(response => {
          return response.json();
      })
      .then(actividades => {
        resolve(actividades);
      })
      .catch(err => reject(err));
    });
  }
  static tipoServicio() {
    return [
      {
        codigo: '01',
        tipo_codigo: 'Código del producto del vendedor'
      },
      {
        codigo: '02',
        tipo_codigo: 'Código del producto del comprador'
      },
      {
        codigo: '03',
        tipo_codigo: 'Código del producto asignado por la industria'
      },
      {
        codigo: '04',
        tipo_codigo: 'Código uso interno'
      },
      {
        codigo: '99',
        tipo_codigo: 'Otros'
      }
    ];
  }

  static tipoIdentificacion() {

    return [
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
  }

  static guardarEmisor(obj) {

    clienteAxios.post('/emisor', obj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(data => {

    })
    .catch(err => {

    });
  }


}
