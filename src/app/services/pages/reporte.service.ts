import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }

  obtenerListadoComprobantes() {
    const comprobantes = JSON.parse(localStorage.getItem("comprobantes"));
    return comprobantes;
  }
  
}

