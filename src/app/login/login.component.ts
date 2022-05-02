import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/pages/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // indicar el estilo del componente login
})
export class LoginComponent implements OnInit {

  constructor(
      private loginService: LoginService,
      private router: Router,
      ) { 

    if (screen.width < 1244) 
       {
        this.loginResponsivo = true;
       }
      else {
        this.loginResponsivo = false;
      }

      console.log(this.loginResponsivo);
  }

  objLogin = {
    usuario: '',
    contrasena: ''
  };

  ngOnInit() {
    window.addEventListener("resize",() => {
      if (screen.width < 1244) 
       {
        this.loginResponsivo = true;
       }
      else {
        this.loginResponsivo = false;
      }
    }) // contestar lo que Kat me envió por correo
  }


  loginResponsivo : boolean = true;

  autenticarUsuario(forma: NgForm) {
    if(forma.invalid){
      return;
    } else {

      this.loginService.autenticarUsuario(this.objLogin)
      .subscribe(response => {
  
        if(response === 'SP'){

          this.router.navigate(['/emisores']);
          
        } else if( response === 'I'){
          this.loginService.obtenerPermisos().toPromise().then(response => {
            const {objPermisos,permisos} = JSON.parse(response);
            localStorage.setItem("ac",JSON.stringify(objPermisos));
            const host = window.location.origin;
            const url = host +'/#/consulta';
            window.location.href = url;
            window.location.reload();
          }).catch(err => console.log(err));
          
        }   else if(response === 'IS') {
          this.router.navigate(['/sucursales']);
          //mostrar pantalla de sucursales
        } else if(response === 'FS'){
          this.router.navigate(['/sucursales']);
          //mostrar pantalla de sucursales
        } else {
          this.loginService.obtenerPermisos().toPromise().then(response => {
            const {objPermisos,permisos} = JSON.parse(response);
            localStorage.setItem("ac",JSON.stringify(objPermisos));
            const host = window.location.origin;
            const url = host +'/#/consulta';
            window.location.href = url;
            window.location.reload();
          }).catch(err => console.log(err));
          
        }

         /*
            this.loginService.obtenerPermisos().toPromise().then(response => {
              const {objPermisos,permisos} = JSON.parse(response);
              console.log(objPermisos)
              localStorage.setItem("ac",JSON.stringify(objPermisos));
              const host = window.location.origin;
              const url = host +'/#/factura';
              window.location.href = url;
              window.location.reload();
            }).catch(err => console.log(err));
          */
      },
      err => {
        console.log(err);
        const {status, error} = err;

        if(status === 401){
          Swal.fire('Iniciar Sesión', error.message , 'error');
        } else if(status === 403){
          Swal.fire('Iniciar Sesión', error.message , 'error');
        } else {
          Swal.fire('Iniciar Sesión','Ha ocurrido un error en el servidor' , 'error');
        }
      });
    }
  }
}


/*


 
*/