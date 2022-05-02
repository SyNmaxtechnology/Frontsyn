import { Router } from '@angular/router';
import { ListaEmisoresService } from './../../services/pages/lista-emisores.service';
import { Component, OnInit } from '@angular/core';


interface Emisor {
  emisor_nombre: string;
  usuario: string;
  idusuario: number;
  idemisor: number;
}

@Component({
  selector: 'app-lista-emisores',
  templateUrl: './lista-emisores.component.html',
  styleUrls: ['./lista-emisores.component.css']
})
export class ListaEmisoresComponent implements OnInit {

  constructor(
    private listaEmisoresService: ListaEmisoresService,
    private router: Router
  ) {
    this.obtenerEmisores();
  }

  listaEmisores = [];
  listaEmisoresBusqueda = [];

  busquedaEmisor: string = '';
  config: any;
  collection = { count: 0, data: [] };
  desactivado: boolean = false;
  ngOnInit() {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.collection.count
    };


  }
  cerrarSesion() {
    this.listaEmisoresService.cerrarSesion();
    localStorage.clear();
  }

  obtenerEmisores() {
    this.listaEmisoresService.obtenerEmisores()
      .subscribe(response => {

        const datosEmisores = JSON.parse(response);
        this.listaEmisores = datosEmisores.emisores;
        this.collection.data = this.listaEmisores;
        this.collection.count = this.listaEmisores.length;
        this.listaEmisoresBusqueda = this.listaEmisores;
      },
        err => {
          console.log(err);
        })
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ingresarSistema(obj: Emisor) {
    console.log(obj);
    const objSuperUsuario = {
      idemisor: obj.idemisor,
      idusuario: obj.idusuario,
      permiso: 'superusuario'
    }
    this.listaEmisoresService.obtenerLoginSuperUsuario(objSuperUsuario)
      .subscribe(response => {
        if (response) {

          this.listaEmisoresService.obtenerPermisos().toPromise().then(response => {
            const { objPermisos, permisos } = JSON.parse(response);

            localStorage.setItem("ac", JSON.stringify(objPermisos));
            const host = window.location.origin;
            const url = host + '/#/factura';
            window.location.href = url;
            window.location.reload();
          })
        }
      });
  }

  cambiarEstado(emisor) {

    let nuevoEstado = 0;

    if (emisor.estado_emisor == 1) {
      nuevoEstado = 0;
      //emisor.estado_emisor = nuevoEstado;
    } else {
      nuevoEstado = 1;
      //emisor.estado_emisor = nuevoEstado;
    }

    const obj = {
      estado: nuevoEstado,
      idemisor: emisor.idemisor
    }

    this.listaEmisoresService.actualizarEstado(obj)
      .subscribe(response => {
        emisor.estado_emisor = nuevoEstado;
      },
        err => {
          console.log(err);
        })

  }

  buscarEmisor(texto: string) {
    if (texto.trim().length === 0) {
      this.listaEmisores = this.listaEmisoresBusqueda;
      this.collection.data = this.listaEmisores;
      this.collection.count = this.listaEmisores.length;
    } else {
      this.listaEmisores = this.listaEmisores.filter(emisor => emisor.emisor_nombre.toLowerCase().includes(texto) || emisor.emisor_nombrecomercial.toLowerCase().includes(texto));
      this.collection.data = this.listaEmisores;
      this.collection.count = this.listaEmisores.length;
    }
  }
}
