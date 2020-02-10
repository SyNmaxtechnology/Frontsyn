import { Injectable } from '@angular/core';
import clienteAxios from '../../config/axios';

@Injectable({
  providedIn: 'root'
}) // emisor
export class EmisorService {

  constructor() { }

  guardarEmisor(obj) {

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
