import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/pages/login.service';
import {baseURL} from '../../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { 
    this.cargarCredencialesUsuario();
  }
  
  ngOnInit() {

  }

  cargarCredencialesUsuario(){
    setTimeout(() => {
      const imagen = localStorage.getItem('imagenUsuario');
      const usuario = localStorage.getItem('usuario');
      const src = baseURL() + '/' + imagen;
      console.log(src);
      const imgBox = (document.getElementById('img_header_box') as HTMLImageElement);
      imgBox.src = src;
      const img = (document.getElementById('img_header') as HTMLImageElement);
      img.src = src;
      const h4Usuario = (document.getElementById('nombreUsuario') as HTMLHtmlElement);
      h4Usuario.innerHTML = usuario;
    }, 500);

  }

  cerrarSesion(){
    localStorage.setItem('token', '');
    localStorage.setItem('permiso', '');
    localStorage.setItem('imagenUsuario', '');
    localStorage.setItem('imagenUsuario', '');
    localStorage.setItem('usuario', '');
    this.router.navigate(['/login']);
  }

}
