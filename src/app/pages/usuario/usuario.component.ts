import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../services/pages/usuario.service';
import { Permiso } from '../../modelos/permiso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  
  objUsuario = new Usuario();
  query: '';
  listaPermisos : any = [];
  
  constructor(private usuarioService: UsuarioService) {
    this.obtenerPermisos();
  }

  ngOnInit() {
  }

  nuevoUsuario(obj) {
   this.usuarioService.nuevoUsuario(obj)
     .subscribe((response: any) => {
      console.log(response);
     },
     err => console.error(err));
  }

  obtenerPermisos(){
    this.usuarioService.obtenerPermisos()
      .subscribe((response: Usuario) => {
        // tslint:disable-next-line: forin
        this.listaPermisos = response.permisos;
      
      },
      err => console.error(err));
  }

}
