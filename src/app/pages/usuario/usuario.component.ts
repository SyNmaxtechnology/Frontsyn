import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../services/pages/usuario.service';
import {baseURL} from '../../config/config';
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
  listaPermisos: any = [];
  
  constructor(private usuarioService: UsuarioService) {
    this.obtenerPermisos();  
  }

  ngOnInit() {
  }

  nuevoUsuario(obj) {

    const File = (document.getElementById('imagen') as HTMLInputElement);
    if (File.value.length === 0) {
      obj.imagen = null;
    } else {
      const mimeType = File.files[0].type;
      if (mimeType === 'image/jpeg' || mimeType === 'image/png'){
        const formData = new FormData();
        formData.append('idpermiso', obj.idpermiso);
        formData.append('usuario', obj.usuario);
        formData.append('contrasena', obj.contrasena);
        formData.append('imagen', File.files[0]);

        this.usuarioService.nuevoUsuario(formData)
         .subscribe((response: any) => {
          const {message} = response;
          Swal.fire('Nuevo Usuario', message, 'success');
          (document.getElementById('formImpuesto') as HTMLFormElement).reset();
         },
         err => console.error(err));
      } else {
        alert('El tipo de archivo que intenta subir no está permitido');
      }
    }
  }
  
  obtenerUsuario(e,texto) {
    e.preventDefault();

    console.log(texto)
    if(texto === '') {
      return;
    } else {
      this.usuarioService.obtenerUsuario(texto)
        .subscribe((response) =>  {
          const usuario: any = response.usuario[0];
          this.objUsuario.usuario = usuario.usuario;
          this.objUsuario.idpermiso = usuario.idpermiso;
          const imagen = baseURL() + '/' + usuario.imagen;
          const imgUsuario = (document.getElementById('img_usuario') as HTMLImageElement);
          imgUsuario.src = imagen;

        },
      err => console.error(err));
    }
  }

  obtenerPermisos() {
    this.usuarioService.obtenerPermisos()
      .subscribe((response: Usuario) => {
        // tslint:disable-next-line: forin
        this.listaPermisos = response.permisos;
      },
      err => console.error(err));
  }



}
