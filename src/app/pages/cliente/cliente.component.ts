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
    this.tipoExoneracion();
    this.tipoIdentificacion = clienteService.tipoIdentificacion();
  }

  listaProvincias: object = [];
  listaCantones: object = [];
  listaDistritos: object = [];
  listaBarrios: object = [];
  tipoIdentificacion: object = [];
  listaTipoExoneracion: object = [];
  query = '';
  selected = '';
  objCliente = {
    id: '',
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
    exentoIVA: 0,
    tipoExoneracion: '',
    porcentajeExoneracion: 0,
    NombreInstitucion: '',
    documentoExoneracion: ''
  };

  ngOnInit() {
  }

  buscarCliente(e,texto){

    e.preventDefault();

    if(texto === ''){
      return;
    } else {
    this.clienteService.buscarCliente(texto)
      .subscribe((response: any) => {
        console.log(response);
          // cargar los datos en el formulario de cliente
        this.objCliente.id = response.cliente[0].id;
        const selectProvincia = (document.getElementById("provincia") as HTMLSelectElement);
       
        this.objCliente.cliente_nombre = response.cliente[0].cliente_nombre;
        this.objCliente.cliente_nombre_comercial = response.cliente[0].cliente_nombre_comercial;
        this.objCliente.cliente_tipo_identificacion = response.cliente[0].cliente_tipo_identificacion;
        this.objCliente.cedula_cliente = response.cliente[0].cedula_cliente;
        this.objCliente.identificacion_extranjero = response.cliente[0].identificacion_extranjero;
        this.objCliente.otras_senas = response.cliente[0].otras_senas;
        this.objCliente.otras_senas_extranjero = response.cliente[0].otras_senas_extranjero;
        this.objCliente.cliente_telefono_codigopais = response.cliente[0].cliente_telefono_codigopais;
        this.objCliente.cliente_telefono_numtelefono = response.cliente[0].cliente_telefono_numtelefono;
        this.objCliente.cliente_fax_codigopais = response.cliente[0].cliente_fax_codigopais;
        this.objCliente.cliente_fax_numtelefono = response.cliente[0].cliente_fax_numtelefono;
        this.objCliente.cliente_correo = response.cliente[0].cliente_correo;
        this.objCliente.exentoIVA = response.cliente[0].exentoIVA;
        this.objCliente.tipoExoneracion = response.cliente[0].tipoExoneracion;
        this.objCliente.porcentajeExoneracion = response.cliente[0].porcentajeExoneracion;
        this.objCliente.NombreInstitucion = response.cliente[0].NombreInstitucion;
        this.objCliente.documentoExoneracion = response.cliente[0].documentoExoneracion;
        // tslint:disable-next-line: forin
        const idProvincia = response.cliente[0].provincia;
        const idCanton = response.cliente[0].canton;
        const idDistrito = response.cliente[0].distrito;
        const idBarrio = response.cliente[0].cliente_barrio;
        for(let i in selectProvincia.options){
            if(typeof selectProvincia.options[i].value !== 'undefined'){
              if (selectProvincia.options[i].value.split(':')[0] == idProvincia.trim()) {
               // selectProvincia.options[i].selected = true;
               this.objCliente.provincia = idProvincia;
               this.objCliente.canton = idCanton;
               this.objCliente.distrito = idDistrito;
               this.objCliente.cliente_barrio = idBarrio;
               this.obtenerCantones();
               this.obtenerDistritos(idProvincia.trim(),idCanton.trim());
               this.obtenerBarrios(idProvincia.trim(),idCanton.trim(),idDistrito.trim());
              
              } 
            }
        }
      },
      err => {
        if(err.status === 404){
         
          Swal.fire('Buscar Cliente', err.error.message, 'error');
        }
      });
    }
  }
  
  procesarCliente(e,obj){
    if (obj.id === '') {
      this.nuevoCliente(e, obj);
    } else {
      this.actualizarCliente(e, obj);
    }
  }

  nuevoCliente(e,obj){

    e.preventDefault();
    this.objCliente.cliente_barrio.toString().trim();
    const checkExento = (document.getElementById('exentoIVA') as HTMLInputElement);
    let estaExento = 0;

    let numero_cliente = '';

    if (obj.cedula_cliente.length === 9) {
        numero_cliente = '000' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 10) {
        numero_cliente = '00' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 11) {
        numero_cliente = '0' + obj.cedula_cliente;
    }
    if (obj.cedula_cliente.length === 12) {
        numero_cliente = obj.cedula_cliente;
    }

    if(checkExento.checked){
      estaExento = 1;
    }
    
    obj.numero_cliente = numero_cliente;
    obj.exentoIVA = estaExento;

    this.clienteService.guardarCliente(obj)
      .subscribe((response: any) =>  {
        Swal.fire('Nuevo Cliente', response.message, 'success');
        (document.getElementById('form_cliente') as HTMLFormElement).reset();
      },
      err => {
        console.log(err);
      });
  }

  actualizarCliente(e,obj) {
    e.preventDefault();
    console.log("Actualizar")
    let numero_cliente = '';
    const nombre = (document.getElementById('cliente_nombre') as HTMLInputElement);
    const nombreComercial = (document.getElementById('cliente_nombre_comercial') as HTMLInputElement);
    const tipoIdentificacion = (document.getElementById('cliente_tipo_identificacion') as HTMLSelectElement);
    const selectBarrio = (document.getElementById("barrio") as HTMLSelectElement);
    const otras_senas = (document.getElementById("otras_senas") as HTMLInputElement);
    const otras_senas_extranjero = (document.getElementById("otras_senas_extranjero") as HTMLInputElement);
    const cedula_cliente = (document.getElementById("cedula_cliente") as HTMLInputElement);
    const identificacion_extranjero = (document.getElementById("identificacion_extranjero") as HTMLInputElement);
    const cliente_telefono_codigopais = (document.getElementById("cliente_telefono_codigopais") as HTMLInputElement);
    const cliente_telefono_numtelefono = (document.getElementById("cliente_telefono_numtelefono") as HTMLInputElement);
    const cliente_fax_codigopais = (document.getElementById("cliente_fax_codigopais") as HTMLInputElement);
    const cliente_fax_numtelefono = (document.getElementById("cliente_fax_numtelefono") as HTMLInputElement);
    const cliente_correo = (document.getElementById("cliente_correo") as HTMLInputElement);
    const checkExento = (document.getElementById("exentoIVA") as HTMLInputElement);
    let estaExento = 0;
    
  
    if (cedula_cliente.value.length === 9) {
        numero_cliente = '000' + cedula_cliente.value;
    }
    if (cedula_cliente.value.length === 10) {
        numero_cliente = '00' + cedula_cliente.value;
    }
    if (cedula_cliente.value.length === 11) {
        numero_cliente = '0' + cedula_cliente.value;
    }
    if (cedula_cliente.value.length === 12) {
        numero_cliente = cedula_cliente.value;
    }

    if(checkExento.checked){
      estaExento = 1;
    }

    obj.numero_cliente = numero_cliente;
    obj.cliente_nombre = nombre.value,
    obj.cliente_nombre_comercial = nombreComercial.value,
    obj.cliente_tipo_identificacion = tipoIdentificacion.value.split(': ')[1],
    obj.cedula_cliente = cedula_cliente.value,
    obj.identificacion_extranjero = identificacion_extranjero.value,
    obj.cliente_barrio = selectBarrio.value.split(': ')[1],
    obj.otras_senas = otras_senas.value,
    obj.otras_senas_extranjero = otras_senas_extranjero.value,
    obj.cliente_telefono_codigopais = cliente_telefono_codigopais.value,
    obj.cliente_telefono_numtelefono = cliente_telefono_numtelefono.value,
    obj.cliente_fax_codigopais = cliente_fax_codigopais.value,
    obj.cliente_fax_numtelefono = cliente_fax_numtelefono.value,
    obj.cliente_correo = cliente_correo.value,
    obj.exentoIVA = estaExento;

    this.clienteService.actualizarCliente(obj)
      .subscribe((response: any) =>  {
        console.log(response)
        this.objCliente.id = '';
        Swal.fire('Actualizar Cliente', response.message, 'success');
        (document.getElementById("form_cliente") as HTMLFormElement).reset();
      },
      err => {
        console.log(err);
      });
  }

  obtenerProvincias() {
    // tslint:disable-next-line: semicolon
    this.clienteService.obtenerProvincias()
      .subscribe((response: any) =>  {
        this.listaProvincias = response.provincias;
      });
  }

  obtenerCantones() {
    console.log(this.objCliente);
    const idprovincia = this.objCliente.provincia;
    this.clienteService.obtenerCantones(idprovincia.trim())
      .subscribe((response: any) =>  {
        this.listaCantones = response.cantones;
      });
  }
  obtenerDistritos(idprovincia, idcanton) {
  const obj = {
      idprovincia,
      idcanton
    };

  this.clienteService.obtenerDistritos(obj)
      .subscribe((response: any) =>  {
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
      .subscribe((response: any) => {
        this.listaBarrios = response.barrios;
      });
  }

  tipoExoneracion(){
    this.clienteService.tipoExoneracion()
      .subscribe((response: any) => {
        this.listaTipoExoneracion = response.tipoExoneracion;
      },
      err => console.error(err));
  }
}
