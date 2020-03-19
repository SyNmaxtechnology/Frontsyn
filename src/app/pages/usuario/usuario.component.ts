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
  idusuario: number = 0;
  
  constructor(private usuarioService: UsuarioService) {
    this.obtenerPermisos();  
  }

  ngOnInit() {
  }

  nuevoUsuario(e,obj) {
    e.preventDefault();
    const File = (document.getElementById('imagen') as HTMLInputElement);
    if (File.value.length > 0) {
      const mimeType = File.files[0].type;
      obj.imagen = File.files[0];
      if(!(mimeType === 'image/jpeg' || mimeType === 'image/png')){
        alert('El tipo de archivo que intenta subir no está permitido');
        obj.imagen = null;
        return;
      }
    } else {
      obj.imagen = null;
    }

    const formData = new FormData();
    formData.append('idpermiso', obj.idpermiso);
    formData.append('usuario', obj.usuario);
    formData.append('contrasena', obj.contrasena);
    formData.append('imagen', obj.imagen);

    this.usuarioService.nuevoUsuario(formData)
      .subscribe((response: any) => {
      const {message} = response;
      Swal.fire('Nuevo Usuario', message, 'success');
      (document.getElementById('formUsuario') as HTMLFormElement).reset();
      },
      err => console.error(err));
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
          this.objUsuario.imagen = usuario.imagen;
          this.idusuario = usuario.id;
          console.log(usuario.imagen);
          let imagen = baseURL() + '/' + usuario.imagen;
         /* const imgUsuario = (document.getElementById('img_usuario') as HTMLImageElement);
          imgUsuario.src = imagen;*/

        },
      err => console.error(err));
    }
  }
  procesarUsuario(e,obj) {
    if (this.idusuario === 0) {
      console.log('Insertar Usuario');
      this.nuevoUsuario(e,obj);
    } else {
      this.actualizarUsuario(e,obj);
    }
  }

  actualizarUsuario(e,obj){
    e.preventDefault();
    let imagen: File;
    const File = (document.getElementById('imagen') as HTMLInputElement);
    
    if(File.files.length > 0){
      const mimeType = File.files[0].type;
      if (mimeType === 'image/jpeg' || mimeType === 'image/png'){
        imagen = File.files[0];
      } else {
        alert('El tipo de archivo que intenta subir no está permitido');
        return;
      }
    } else {
      imagen = null;
    }

    const objActualizarUsuario = {
      id: this.idusuario,
      usuario: this.objUsuario.usuario,
      idpermiso: this.objUsuario.idpermiso,
      imagen,
      contrasena: undefined
    };

    const contrasena = (this.objUsuario.contrasena as string);
    if(typeof contrasena !== 'undefined' || contrasena != ''){
      objActualizarUsuario.contrasena = contrasena;
    }
    console.log(objActualizarUsuario); return;
    const formData = new FormData();
    formData.append('usuario', objActualizarUsuario.usuario);
    formData.append('id', objActualizarUsuario.id.toString());
    formData.append('contrasena', objActualizarUsuario.contrasena);
    formData.append('imagen', objActualizarUsuario.imagen);
    formData.append('idpermiso', objActualizarUsuario.idpermiso.toString());

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
