import { HeaderService } from './../../services/shared/header.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/pages/login.service';
import { baseURL } from '../../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  permiso = localStorage.getItem("role");
  constructor(
      private loginService: LoginService, 
      private router: Router,
      private headerService: HeaderService) { 
        
      this.cargarCredencialesUsuario();
      this.nombrecomercial = localStorage.getItem("nombrecomercial") && localStorage.getItem("nombrecomercial").length > 0 ?localStorage.getItem("nombrecomercial").toUpperCase(): '';
      this.imagen = localStorage.getItem("imagen");
      this.sucursal = !localStorage.getItem("sucursal") || localStorage.getItem("sucursal").length === 0 ? 0 : Number(localStorage.getItem("sucursal")); 
  }

  ngOnInit() {

  }
  nombrecomercial = '';
  imagen: string = '';
  sucursal: Number = null;
  cargarCredencialesUsuario(){
    setTimeout(() => {
      //const imagen = localStorage.getItem('imagenUsuario');
      const usuario = localStorage.getItem('usuario');
      
      //const src = baseURL() + '/' + imagen;
      //console.log(src);
      //const imgBox = (document.getElementById('img_header_box') as HTMLImageElement);
      //imgBox.src = src;
      //const img = (document.getElementById('img_header') as HTMLImageElement);
      //img.src = src;
      const h4Usuario = (document.getElementById('nombreUsuario') as HTMLHtmlElement);
     // h4Usuario.innerHTML = usuario;

    }, 500);

  }

  cerrarSesion(){

    localStorage.clear(); 
    this.router.navigate(['/login']);
    return;
    
    localStorage.setItem('token', '');
        localStorage.setItem('permiso', '');
        localStorage.setItem('imagenUsuario', '');
        localStorage.setItem('imagenUsuario', '');
        localStorage.setItem('usuario', '');
        
  }

  Emisores(){
    this.router.navigate(['/emisores']);
  }
}
