import { SidebarService } from './../../services/shared/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  private helper: JwtHelperService = new JwtHelperService();

  constructor(private sidebarService: SidebarService) { } 

  ngOnInit() {
    //this.sidebarService.obtenerPermisos();
   /// this.cargarPermisos();
    this.objPermisos = JSON.parse(localStorage.getItem("ac"));
    this.idemisor = this.desencriptarToken();
  }
  
  objPermisos : any=  {};
  cargado: boolean = null;
  idemisor : number; 

  mostrar() {
    const permiso = localStorage.getItem('role');
    return permiso;
  }

  private desencriptarToken() {
    const token = localStorage.getItem("token");
    const decodedToken = this.helper.decodeToken(token);
    return decodedToken.id;
  }

  /*cargarPermisos(){
    
   this.sidebarService.obtenerPermisos().then(data => {
      const {objPermisos,permisos} = JSON.parse(data);
      this.objPermisos = objPermisos;

      console.log(this.objPermisos)
      if(JSON.stringify(this.objPermisos) !== '{}'){
        this.cargado = true;
      }
    }).catch(err => {
      console.log(err);
      Swal.fire('Cargando información...',err,'error');
    });
  }*/
}
