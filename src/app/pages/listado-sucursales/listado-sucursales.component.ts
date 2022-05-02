import { Component, OnInit } from '@angular/core';
import { ListadoSucursalesService,Sucursales } from 'src/app/services/pages/listado-sucursales.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listado-sucursales',
  templateUrl: './listado-sucursales.component.html',
  styleUrls: ['./listado-sucursales.component.css']
})
export class ListadoSucursalesComponent implements OnInit {

  constructor(
    private listaSucursalesService: ListadoSucursalesService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    this.cargarSucursales();
  }

  listaSucursales: Sucursales[] = [];
  config: any;
  collection = { count: 0, data: [] };

  cargarSucursales(){
    this.listaSucursalesService.obtenerSucursales()
      .subscribe(sucursales => {
        console.log(sucursales.length);
        console.log(sucursales);
        this.listaSucursales = sucursales;
        this.collection.data = sucursales;
        this.collection.count = sucursales.length;
      },err => {
        const {message} = err
        Swal.fire('Sucursales',message?message:'No se pudieron cargar las sucursales','error');
      })

  }

  ingresarASucursal(idsucursal: number){
    this.listaSucursalesService.ingresarASucursal(idsucursal)
      .subscribe(() => {

        const host = window.location.origin;
        const url = host +'/#/consulta';
        window.location.href = url;
        window.location.reload();
      },
      err => {
        const {message} = err
        Swal.fire('Sucursales',message?message:'No se pudo ingresar a la sucursal','error');
      })
  }

  cerrarSesion (){
    this.listaSucursalesService.cerrarsesion();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
}
