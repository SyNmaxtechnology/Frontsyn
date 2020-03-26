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

  constructor(private loginService: LoginService, private router: Router) { }

  objLogin = {
    usuario: '',
    contrasena: ''
  };

  ngOnInit() {
  }

  autenticarUsuario(forma: NgForm) {
    if(forma.invalid){
      return;
    } else {

      this.loginService.autenticarUsuario(this.objLogin)
      .subscribe(response => {
        if(response === 'Autenticado'){
          this.router.navigate(['/factura']);
        } else {
          Swal.fire('Iniciar Sesión', response , 'success');
        }
      },
      err => {
        const {status, error} = err;

        if(status === 401){
          Swal.fire('Iniciar Sesión', error.message , 'error');
        } else if(status === 403){
          Swal.fire('Iniciar Sesión', error.message , 'error');
        } else {
          console.log(error);
          Swal.fire('Iniciar Sesión', 'Ha ocurrido un error en el servidor' , 'error');
        }
      });
    }
    
  }
}


/*


 
*/