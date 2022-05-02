import { RazonNoVentaService,Razon } from './../../services/pages/razon-no-venta.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare var $;
@Component({
  selector: 'app-razon-no-venta',
  templateUrl: './razon-no-venta.component.html',
  styleUrls: ['./razon-no-venta.component.css']
})
export class RazonNoVentaComponent implements OnInit {

  constructor(
    private razonNoVentaService: RazonNoVentaService
  ) { 
    
  }

  ngOnInit() {
    
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
    this.cargarRazones();
  }

  listaRazones: Razon[] = [];
  query: string;
  tablaPequena : boolean = false;
  objRazon: Razon = {
    id: null,
    razon: '',
    auditoria: ''
  };
  collection = { count: 0, data: [] };
  config: any;
  disable : boolean = false;
  
  pageChanged(event){
    this.config.currentPage = event;
  }

  agregarRazon(razon: Razon){
    this.razonNoVentaService.agregarRazon(razon)
      .subscribe(response =>{

        const {message} = JSON.parse(response);
        (document.getElementById("formNuevaRazon") as HTMLFormElement).reset();
        $('#ModalNuevaRazon').modal('hide');
        this.limpiarCampos();
        Swal.fire('Agregar razon',message,'success');
        this.cargarRazones();
      
      },err => {
        const {error,status}=err;
        const {message} = JSON.parse(error);
        Swal.fire('Agregar razon',message?message:'Error al agregar la razon','error');
    })
  }

  obtenerRazonPorId(id: number){
    this.razonNoVentaService.obtenerRazonPorId(id)
      .subscribe(response => {
        this.objRazon.id = response[0].id;
        this.objRazon.razon = response[0].razon;
      },err => {
        const {error,status}=err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar razon',message?message:'Error al obtener la razon','error');
    })
  }

  cargarRazones(){
    this.razonNoVentaService.obtenerRazones()
      .subscribe(response => {
        for (const razon of response) {
          this.listaRazones = response;
        }

        this.collection.data = this.listaRazones;
        this.collection.count = this.collection.data.length;
      },err => {
        const {error,status}=err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar Razones',message?message:'Error al cargar las razones','error');
    })
  }

  actualizarRazon(razon: Razon){
    this.razonNoVentaService.actualizarRazon(razon)
      .subscribe(response =>{
        const {message} = JSON.parse(response);
        (document.getElementById("formNuevaRazon") as HTMLFormElement).reset();
        $('#ModalActualizarRazon').modal('hide');
        this.limpiarCampos();
        Swal.fire('Actualizar razon',message,'success');
        this.cargarRazones();
      },err=> {
        const {error,status}=err;
        const {message} = JSON.parse(error);
        Swal.fire('Cargar razon',message?message:'Error al actualizar la razon','error');
      })
  }

  limpiarCampos(){
    this.objRazon.auditoria = '';
    this.objRazon.razon = '';
    this.objRazon.id = null;
  }

  validarExpresion(razon: string){
    const expresion = /^[0-9A-Za-zÁÉÍÓÚáéíóúñÑ.,; ]+$/g;
    if(expresion.test(razon)){
      this.disable = false;
    } else {
      this.disable = true;
    }
  }

  buscarRazon(query: string){
    for (const razon of this.listaRazones) {
      if(query.trim() === razon.razon.trim()){
        this.collection.data = [];
        this.collection.data.push(razon);
      }
    }
  }

  recargarRazones(query: string){
    if(query.length === 0){
      this.collection.data = this.listaRazones;
    }
  }

  eliminarRazon(id: string){
    this.razonNoVentaService.eliminarRazon(Number(id))
      .subscribe(() => { 
        this.collection.data = this.collection.data.filter(linea => Number(linea.id) !== Number(id));
        this.collection.count = this.collection.data.length;
    },err => {
      const {error,status} = err;
      const {message} = JSON.parse(error);
      Swal.fire('Eliminar Razón',message?message:'Error al eliminar la razón','error');
    })
  }
}
