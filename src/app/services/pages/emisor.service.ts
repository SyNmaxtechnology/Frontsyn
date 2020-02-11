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
        console.log(actividades)
        resolve(actividades);
      })
      .catch(err => reject(err));
    });
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
