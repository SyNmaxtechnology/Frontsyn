import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/pages/cliente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService) {
    this.obtenerProvincias();
    this.tipoIdentificacion = clienteService.tipoIdentificacion();
  }


  listaProvincias: object = [];
  listaCantones: object = [];
  listaDistritos: object = [];
  listaBarrios: object = [];
  tipoIdentificacion: object = [];
  query = '';
  
  objCliente = {
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
  }

  ngOnInit() {
  }

  buscarCliente(e,texto){

    e.preventDefault();

    if(texto === ''){
      return;
    } else {
    this.clienteService.buscarCliente(texto)
      .subscribe(response => {
        console.log(response);
      },
      err => {
        if(err.status === 404){
         
          Swal.fire('Buscar Cliente', err.error.message, 'error');
        }
      });
    }
  }

  nuevoCliente(e,obj){
    e.preventDefault();
    this.objCliente.cliente_barrio.toString().trim();

    let numero_emisor = '';

    if (obj.cedula_cliente.length === 9) {
        numero_emisor = '000' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 10) {
        numero_emisor = '00' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 11) {
        numero_emisor = '0' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 12) {
        numero_emisor = obj.cedula_cliente;
    }

    obj.numero_cliente = numero_emisor;

    this.clienteService.guardarCliente(obj)
      .subscribe(response =>  {
        Swal.fire('Nuevo Cliente', response.message, 'success');
      },
      err => {
        console.log(err)
      })
  }

  obtenerProvincias() {
    // tslint:disable-next-line: semicolon

    this.clienteService.obtenerProvincias()
      .subscribe(response =>  {
        this.listaProvincias = response.provincias;
      });
  }

  obtenerCantones(id) {
    const idprovincia = id.toString().split(':')[0];
    
    this.clienteService.obtenerCantones(idprovincia)
    .subscribe(response =>  {
      this.listaCantones = response.cantones;
    });
  }
  obtenerDistritos(idprovincia, idcanton) {

    const obj = {
      idprovincia,
      idcanton
    };

    this.clienteService.obtenerDistritos(obj)
      .subscribe(response =>  {
        this.listaDistritos= response.distritos;
      });
  }

  obtenerBarrios(idprovincia, idcanton, iddistrito) {
    const obj = {
      idprovincia: idprovincia.trim(),
      idcanton: idcanton.trim(),
      iddistrito: iddistrito.trim()
    };

    this.clienteService.obtenerBarrios(obj)
      .subscribe(response => {
        this.listaBarrios = response.barrios;
      });
  }
}
