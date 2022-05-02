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

  
  query: '';
  listaPermisos: any = [];
  listaAccesos = [];
  idusuario: number = 0;
  listaEmisores = [];
  listaBodegas = [];

  objUsuario = {
    usuario: '',
    idpermiso: '',
    contrasena: '',
    imagen: null,
    idbodega: '',
    accesos: this.listaAccesos
  };

  constructor(private usuarioService: UsuarioService) {
    
  }

  ngOnInit() {
    this.obtenerPermisos();  
    this.obtenerBodegas();
  }

objPermisos = 
  { documentos:
    { activo: false,
      facturar: false,
      consultar: false,
      recepcion: false,
      recepciones: false,
      compra: false,
      credito: false },
   reportes:
    { ventas:
       { activo: false,
         facturacion: false,
         detallado: false,
         productos: false,
         cliente: false,
         formaPago: false },
      compras: { activo: false, compras: false, articulo: false, proveedor: false },
      inventario: { activo: false, existencia: false, ajuste: false },
      credito: { activo: false, estadoCuenta: false },
      visita: { activo: false, visitaCliente: false },
      activo: false },
   pos: { activo: false, venta: false },
   cliente: { activo: false, listado: false },
   proveedor: { activo: false, listado: false },
   producto: { activo: false, listado: false, receta: false },
   articulo: { activo: false, listado: false, existencia: false, movimiento: false },
   impuesto: { activo: false, listado: false },
   categoria: { activo: false, listado: false },
   descuento: { activo: false, listado: false },
   emisor: { activo: false, configuracion: false },
   visita: { activo: false, registro: false },
   usuario: { activo: false, listado: false, bodegas: false }   
};
 
tieneAccesos : boolean ;



  nuevoUsuario(e,obj) {
    e.preventDefault();
    let objetoUsuario : any;
    /*const File = (document.getElementById('imagen') as HTMLInputElement);
    if (File.value.length > 0) {
      const mimeType = File.files[0].type;
      obj.imagen = File.files[0];
      if(!(mimeType === 'image/jpeg' || mimeType === 'image/png')){
        alert('El tipo de archivo que intenta subir no está permitido');
        obj.imagen = null;
        return;
      } else {
        const formData = new FormData();
        formData.append('idpermiso', obj.idpermiso);
        formData.append('usuario', obj.usuario);
        formData.append('contrasena', obj.contrasena);
        formData.append('imagen', obj.imagen); 
        objetoUsuario = formData;
      }
    } else {
      objetoUsuario = obj;
    }*/
  
      this.usuarioService.obtenerAccesosNull().subscribe(response => {

          
        this.listaAccesos = JSON.parse(response);
        console.log(this.listaAccesos)
        obj.accesos = this.listaAccesos;
        this.actualizarEstadosdeAccesos();
        this.usuarioService.nuevoUsuario(obj)
        .subscribe((response: any) => {
        const {message} = response;
        Swal.fire('Nuevo Usuario', message, 'success');
        (document.getElementById('formUsuario') as HTMLFormElement).reset();
        },
        err => {
          console.error(err)
          Swal.fire('Nuevo Usuario', err.error.err, 'error');
        });
    },
    err => {
      console.error(err)
      Swal.fire('Cargando información','Ocurrió un error al cargar la información', 'error');
    });
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
    /*let imagen: File;
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
    
      const formData = new FormData();
      formData.append('usuario', objActualizarUsuario.usuario);
      formData.append('id', objActualizarUsuario.id.toString());
      formData.append('contrasena', objActualizarUsuario.contrasena);
      formData.append('idpermiso', objActualizarUsuario.idpermiso.toString());
      formData.append('imagen', '');

    */

    console.log(obj); 
    this.actualizarEstadosdeAccesos();
    const objActualizarUsuario = {
      id: this.idusuario,
      usuario: this.objUsuario.usuario,
      idpermiso: this.objUsuario.idpermiso,
      imagen: '',
      contrasena: undefined,
      idbodega: this.objUsuario.idbodega,
      accesos: this.listaAccesos
    };
  
    console.log("actualizar  ",objActualizarUsuario); 

    const contrasena = (this.objUsuario.contrasena as string);
    if(typeof contrasena !== 'undefined' || contrasena != ''){
      objActualizarUsuario.contrasena = contrasena;
    }

    this.usuarioService.actualizarUsuario(objActualizarUsuario)
      .subscribe((response: any) =>  {
        const {message} = response;
        this.idusuario = 0;
        Swal.fire('Usuario actualizado', message, 'success');
        (document.getElementById('formUsuario') as HTMLFormElement).reset();
      },
      err => console.error(err));
  }
  obtenerPermisos() {
    this.usuarioService.obtenerPermisos()
      .subscribe((response: Usuario) => {
        // tslint:disable-next-line: forin
        this.listaPermisos = response.permisos;
      },
      err => {
        console.log(err);
      });
  }

  obtenerEmisores(){
    this.usuarioService.obtenerEmisores()
      .subscribe(response => {
        const datosEmisores = JSON.parse(response);

        this.listaEmisores = datosEmisores.emisores;
    },
    err => console.log(err));
  }


  obtenerBodegas(){
    this.usuarioService.obtenerBodegas()
      .subscribe(response => {
        console.log(response);
        const datosBodegas = JSON.parse(response);
        this.listaBodegas  = datosBodegas.bodegas;
    },
    err => {
      console.log(err);
    })
  }

  obtenerUsuario(e,texto) {
    e.preventDefault();
    if(texto === '') {
      return;
    } else {
      this.usuarioService.obtenerUsuario(texto)
        .subscribe((response) =>  {
          console.log(response);
          let {usuario,accesos:{objPermisos,permisos}}: any = response;

          this.objUsuario.usuario = usuario[0].usuario;
          this.objUsuario.idpermiso = usuario[0].idpermiso;
          this.objUsuario.idbodega = usuario[0].idbodega;
          //this.objUsuario.imagen = usuario[0].imagen;
          this.idusuario = usuario[0].id;
          if(JSON.stringify(objPermisos) !== '{}'){
            this.tieneAccesos = true;
            this.objPermisos = objPermisos;
          }else {
            this.tieneAccesos = false;
          }
          this.listaAccesos = permisos;
          console.log(this.idusuario);
        (document.getElementById("idDocumentos") as HTMLInputElement).checked = !!this.objPermisos.documentos.activo;
        (document.getElementById("idpos") as HTMLInputElement).checked = !!this.objPermisos.pos.activo;
        (document.getElementById("idcliente") as HTMLInputElement).checked = !!this.objPermisos.cliente.activo;
        (document.getElementById("idproveedor") as HTMLInputElement).checked = !!this.objPermisos.proveedor.activo;
        (document.getElementById("idproducto") as HTMLInputElement).checked = !!this.objPermisos.producto.activo;
        (document.getElementById("idArticulo") as HTMLInputElement).checked = !!this.objPermisos.articulo.activo;
        (document.getElementById("idimpuesto") as HTMLInputElement).checked = !!this.objPermisos.impuesto.activo;
        (document.getElementById("idcategoria") as HTMLInputElement).checked = !!this.objPermisos.categoria.activo;
        (document.getElementById("iddescuento") as HTMLInputElement).checked = !!this.objPermisos.descuento.activo;
        (document.getElementById("idemisor") as HTMLInputElement).checked = !!this.objPermisos.emisor.activo;
        (document.getElementById("idvisita") as HTMLInputElement).checked = !!this.objPermisos.visita.activo;
        (document.getElementById("idusuario") as HTMLInputElement).checked = !!this.objPermisos.usuario.activo;
        (document.getElementById("idreportes") as HTMLInputElement).checked = !!this.objPermisos.reportes.activo;
        console.log(this.listaAccesos)
        console.log(this.listaAccesos)
          /*console.log(usuario[0].imagen);
          //let imagen = baseURL() + '/' + usuario[0].imagen;
          //this.objUsuario.imagen = imagen;
          const File = (document.getElementById('img_usuario') as HTMLInputElement);
          File.src = imagen;*/

        },
      err => {
        console.log(err);
        const {error, status} = err;
        Swal.fire('Buscar usuario', error.message, 'error');
      });
    }
  }

  habilitarDeshabilitarDocumentos(){
    const chkDocumentos = (document.getElementById("idDocumentos") as HTMLInputElement);
    if(chkDocumentos.checked){
      
      this.objPermisos.documentos.activo = true;
      this.objPermisos.documentos.facturar = true;
      this.objPermisos.documentos.consultar = true;
      this.objPermisos.documentos.recepcion = true;
      this.objPermisos.documentos.recepciones = true;
      this.objPermisos.documentos.compra = true;
      this.objPermisos.documentos.credito = true;
    } else {
      this.objPermisos.documentos.activo = false;
      this.objPermisos.documentos.facturar = false;
      this.objPermisos.documentos.consultar = false;
      this.objPermisos.documentos.recepcion = false;
      this.objPermisos.documentos.recepciones = false;
      this.objPermisos.documentos.compra = false;
      this.objPermisos.documentos.credito = false;
    }
  }

  habilitarDeshabilitarPOS(){
    //idpos
    const chkPOS = (document.getElementById("idpos") as HTMLInputElement);

    if(chkPOS.checked ){
      this.objPermisos.pos.venta = true;
    }else {
      this.objPermisos.pos.venta = false;
    }
  }

  habilitarDeshabilitarCliente(){
    //idpos
    const chkCLiente = (document.getElementById("idcliente") as HTMLInputElement);

    if(chkCLiente.checked ){
      this.objPermisos.cliente.listado = true;
    }else {
      this.objPermisos.cliente.listado = false;
    }
  }

  habilitarDeshabilitarProveedor(){
    //idpos
    const chkProveedor = (document.getElementById("idproveedor") as HTMLInputElement);

    if(chkProveedor.checked ){
      this.objPermisos.proveedor.listado = true;
    }else {
      this.objPermisos.proveedor.listado = false;
    }
  }

  habilitarDeshabilitarProducto(){
    //idpos
    const chkProducto = (document.getElementById("idproducto") as HTMLInputElement);

    if(chkProducto.checked ){
      this.objPermisos.producto.listado = true;
      this.objPermisos.producto.receta = true;
    }else {
      this.objPermisos.producto.listado = false;
      this.objPermisos.producto.receta = false;
    }
  }

  habilitarDeshabilitarArticulo(){
    //idpos
    const chkArticulo = (document.getElementById("idArticulo") as HTMLInputElement);

    if(chkArticulo.checked ){
      this.objPermisos.articulo.listado = true;
      this.objPermisos.articulo.existencia = true;
      this.objPermisos.articulo.movimiento = true;
    }else {
      this.objPermisos.articulo.listado = false;
      this.objPermisos.articulo.existencia = false;
      this.objPermisos.articulo.movimiento = false;
    }
  }

  habilitarDeshabilitarImpuesto(){
    //idpos
    const chkImpuesto = (document.getElementById("idimpuesto") as HTMLInputElement);

    if(chkImpuesto.checked ){
      this.objPermisos.impuesto.listado = true;
    }else {
      this.objPermisos.impuesto.listado = false;
    }
  }

  habilitarDeshabilitarCategoria(){
    //idpos
    const chkCategoria = (document.getElementById("idcategoria") as HTMLInputElement);

    if(chkCategoria.checked ){
      this.objPermisos.categoria.listado = true;
    }else {
      this.objPermisos.categoria.listado = false;
    }
  }

  habilitarDeshabilitarDescuento(){
    //idpos
    const chkDescuento = (document.getElementById("iddescuento") as HTMLInputElement);

    if(chkDescuento.checked ){
      this.objPermisos.descuento.listado = true;
    }else {
      this.objPermisos.descuento.listado = false;
    }
  }

  habilitarDeshabilitarEmisor(){
    //idpos
    const chkEmisor = (document.getElementById("idemisor") as HTMLInputElement);

    if(chkEmisor.checked ){
      this.objPermisos.emisor.configuracion = true;
    }else {
      this.objPermisos.emisor.configuracion = false;
    }
  }

  habilitarDeshabilitarVisita(){
    //idpos
    const chkVisita = (document.getElementById("idvisita") as HTMLInputElement);

    if(chkVisita.checked ){
      this.objPermisos.visita.registro = true;
    }else {
      this.objPermisos.visita.registro = false;
    }
  }

  habilitarDeshabilitarUsuario(){
    //idpos
    const chkUsuario = (document.getElementById("idusuario") as HTMLInputElement);

    if(chkUsuario.checked ){
      this.objPermisos.usuario.listado = true;
      this.objPermisos.usuario.bodegas = true;
      
    }else {
      this.objPermisos.usuario.listado = false;
      this.objPermisos.usuario.bodegas = false;

    }
  }

  habilitarDeshabilitarReportes(){

    const chkReportes = (document.getElementById("idreportes") as HTMLInputElement);

    if(chkReportes.checked){

        this.objPermisos.reportes.ventas.activo = true,
        this.objPermisos.reportes.ventas.facturacion = true,
        this.objPermisos.reportes.ventas.detallado = true,
        this.objPermisos.reportes.ventas.productos = true,
        this.objPermisos.reportes.ventas.cliente = true,
        this.objPermisos.reportes.ventas.formaPago = true ;

        this.objPermisos.reportes.compras.activo = true,
        this.objPermisos.reportes.compras.compras = true,
        this.objPermisos.reportes.compras.articulo = true,
        this.objPermisos.reportes.compras.proveedor = true,


        this.objPermisos.reportes.inventario.activo = true,
        this.objPermisos.reportes.inventario.existencia = true,
        this.objPermisos.reportes.inventario.ajuste = true,
        
        this.objPermisos.reportes.credito.activo = true,
        this.objPermisos.reportes.credito.estadoCuenta = true,  

        this.objPermisos.reportes.visita.activo = true,
        this.objPermisos.reportes.visita.visitaCliente = true;
  
    } else {
      this.objPermisos.reportes.ventas.activo = false,
      this.objPermisos.reportes.ventas.facturacion = false,
      this.objPermisos.reportes.ventas.detallado = false,
      this.objPermisos.reportes.ventas.productos = false,
      this.objPermisos.reportes.ventas.cliente = false,
      this.objPermisos.reportes.ventas.formaPago = false ;

      this.objPermisos.reportes.compras.activo = false,
      this.objPermisos.reportes.compras.compras = false,
      this.objPermisos.reportes.compras.articulo = false,
      this.objPermisos.reportes.compras.proveedor = false,


      this.objPermisos.reportes.inventario.activo = false,
      this.objPermisos.reportes.inventario.existencia = false,
      this.objPermisos.reportes.inventario.ajuste = false,
      
      this.objPermisos.reportes.credito.activo = false,
      this.objPermisos.reportes.credito.estadoCuenta = false,  

      this.objPermisos.reportes.visita.activo = false,
      this.objPermisos.reportes.visita.visitaCliente = false;
    }
  }

  habilitarDeshabilitarReportesVentas(){

    if(this.objPermisos.reportes.ventas.activo){
       
      this.objPermisos.reportes.ventas.facturacion = true,
      this.objPermisos.reportes.ventas.detallado = true,
      this.objPermisos.reportes.ventas.productos = true,
      this.objPermisos.reportes.ventas.cliente = true,
      this.objPermisos.reportes.ventas.formaPago = true ;
    } else {
      this.objPermisos.reportes.ventas.facturacion = false,
      this.objPermisos.reportes.ventas.detallado = false,
      this.objPermisos.reportes.ventas.productos = false,
      this.objPermisos.reportes.ventas.cliente = false,
      this.objPermisos.reportes.ventas.formaPago = false ;
    }
      
  }

  habilitarDeshabilitarReportesCompras(){

    if(this.objPermisos.reportes.compras.activo ){
       
        this.objPermisos.reportes.compras.compras = true,
        this.objPermisos.reportes.compras.articulo = true,
        this.objPermisos.reportes.compras.proveedor = true;
    } else {
        this.objPermisos.reportes.compras.activo = false,
        this.objPermisos.reportes.compras.compras = false,
        this.objPermisos.reportes.compras.articulo = false,
        this.objPermisos.reportes.compras.proveedor = false;
    }
      
  }

  habilitarDeshabilitarReportesInventario(){

    if(this.objPermisos.reportes.inventario.activo ){
       
      this.objPermisos.reportes.inventario.existencia = true,
      this.objPermisos.reportes.inventario.ajuste = true;
    } else {
      this.objPermisos.reportes.inventario.existencia = false,
      this.objPermisos.reportes.inventario.ajuste = false;
    }
      
  }

  habilitarDeshabilitarReportesCredito(){
    if(this.objPermisos.reportes.credito.activo ){
       
      this.objPermisos.reportes.credito.estadoCuenta = true;

    } else {

      this.objPermisos.reportes.credito.estadoCuenta = false;

    }
  }

  habilitarDeshabilitarReportesVisitas(){
    if(this.objPermisos.reportes.visita.activo ){
       
      this.objPermisos.reportes.visita.visitaCliente = true;

    } else {

      this.objPermisos.reportes.visita.visitaCliente = false;

    }
  }

  actualizarEstadosdeAccesos(){
    //this.idusuario

    
    if(this.tieneAccesos === false){ // no tiene permisos asigandos
      
      //documentos  
      this.listaAccesos[0].activo = Number(this.objPermisos.documentos.facturar);
      this.listaAccesos[1].activo = Number(this.objPermisos.documentos.consultar);
      this.listaAccesos[2].activo = Number(this.objPermisos.documentos.recepcion);
      this.listaAccesos[3].activo = Number(this.objPermisos.documentos.recepciones);
      this.listaAccesos[4].activo = Number(this.objPermisos.documentos.compra);
      this.listaAccesos[5].activo = Number(this.objPermisos.documentos.credito);
      
      //reportes
      this.listaAccesos[6].activo = Number(this.objPermisos.reportes.ventas.facturacion);
      this.listaAccesos[7].activo = Number(this.objPermisos.reportes.ventas.detallado);
      this.listaAccesos[8].activo = Number(this.objPermisos.reportes.ventas.productos);
      this.listaAccesos[9].activo = Number(this.objPermisos.reportes.ventas.cliente);
      this.listaAccesos[10].activo = Number(this.objPermisos.reportes.ventas.formaPago);


      this.listaAccesos[11].activo = Number(this.objPermisos.reportes.compras.compras);
      this.listaAccesos[12].activo = Number(this.objPermisos.reportes.compras.articulo);
      this.listaAccesos[13].activo = Number(this.objPermisos.reportes.compras.proveedor);


      this.listaAccesos[14].activo = Number(this.objPermisos.reportes.inventario.existencia);
      this.listaAccesos[15].activo = Number(this.objPermisos.reportes.inventario.ajuste);


      this.listaAccesos[16].activo = Number(this.objPermisos.reportes.credito.estadoCuenta);

      this.listaAccesos[17].activo = Number(this.objPermisos.reportes.visita.visitaCliente);

      this.listaAccesos[18].activo = Number(this.objPermisos.pos.venta);

      this.listaAccesos[19].activo = Number(this.objPermisos.cliente.listado);

      this.listaAccesos[20].activo = Number(this.objPermisos.proveedor.listado);

      this.listaAccesos[21].activo = Number(this.objPermisos.producto.listado);
      this.listaAccesos[22].activo = Number(this.objPermisos.producto.receta);

      this.listaAccesos[23].activo = Number(this.objPermisos.articulo.listado);
      this.listaAccesos[24].activo = Number(this.objPermisos.articulo.existencia);
      this.listaAccesos[25].activo = Number(this.objPermisos.articulo.movimiento);

      this.listaAccesos[26].activo = Number(this.objPermisos.impuesto.listado);


      this.listaAccesos[27].activo = Number(this.objPermisos.categoria.listado);

      this.listaAccesos[28].activo = Number(this.objPermisos.descuento.listado);

      this.listaAccesos[29].activo = Number(this.objPermisos.emisor.configuracion);

      this.listaAccesos[30].activo = Number(this.objPermisos.visita.registro);

      this.listaAccesos[31].activo = Number(this.objPermisos.usuario.listado);
      this.listaAccesos[32].activo = Number(this.objPermisos.usuario.bodegas);
      
      //asignar el idusuario

      for(let acceso of this.listaAccesos){
        acceso.idusuario = this.idusuario;
      }

    } else { // tiene permisos asignados
      this.listaAccesos[0].activo = Number(this.objPermisos.documentos.facturar);
      this.listaAccesos[1].activo = Number(this.objPermisos.documentos.consultar);
      this.listaAccesos[2].activo = Number(this.objPermisos.documentos.recepcion);
      this.listaAccesos[3].activo = Number(this.objPermisos.documentos.recepciones);
      this.listaAccesos[4].activo = Number(this.objPermisos.documentos.compra);
      this.listaAccesos[5].activo = Number(this.objPermisos.documentos.credito);
      
      //reportes
      this.listaAccesos[6].activo = Number(this.objPermisos.reportes.ventas.facturacion);
      this.listaAccesos[7].activo = Number(this.objPermisos.reportes.ventas.detallado);
      this.listaAccesos[8].activo = Number(this.objPermisos.reportes.ventas.productos);
      this.listaAccesos[9].activo = Number(this.objPermisos.reportes.ventas.cliente);
      this.listaAccesos[10].activo = Number(this.objPermisos.reportes.ventas.formaPago);


      this.listaAccesos[11].activo = Number(this.objPermisos.reportes.compras.compras);
      this.listaAccesos[12].activo = Number(this.objPermisos.reportes.compras.articulo);
      this.listaAccesos[13].activo = Number(this.objPermisos.reportes.compras.proveedor);


      this.listaAccesos[14].activo = Number(this.objPermisos.reportes.inventario.existencia);
      this.listaAccesos[15].activo = Number(this.objPermisos.reportes.inventario.ajuste);


      this.listaAccesos[16].activo = Number(this.objPermisos.reportes.credito.estadoCuenta);

      this.listaAccesos[17].activo = Number(this.objPermisos.reportes.visita.visitaCliente);

      this.listaAccesos[18].activo = Number(this.objPermisos.pos.venta);

      this.listaAccesos[19].activo = Number(this.objPermisos.cliente.listado);

      this.listaAccesos[20].activo = Number(this.objPermisos.proveedor.listado);

      this.listaAccesos[21].activo = Number(this.objPermisos.producto.listado);
      this.listaAccesos[22].activo = Number(this.objPermisos.producto.receta);

      this.listaAccesos[23].activo = Number(this.objPermisos.articulo.listado);
      this.listaAccesos[24].activo = Number(this.objPermisos.articulo.existencia);
      this.listaAccesos[25].activo = Number(this.objPermisos.articulo.movimiento);

      this.listaAccesos[26].activo = Number(this.objPermisos.impuesto.listado);


      this.listaAccesos[27].activo = Number(this.objPermisos.categoria.listado);

      this.listaAccesos[28].activo = Number(this.objPermisos.descuento.listado);

      this.listaAccesos[29].activo = Number(this.objPermisos.emisor.configuracion);

      this.listaAccesos[30].activo = Number(this.objPermisos.visita.registro);

      this.listaAccesos[31].activo = Number(this.objPermisos.usuario.listado);
      this.listaAccesos[32].activo = Number(this.objPermisos.usuario.bodegas);
    }
    console.log(Number(this.objPermisos.usuario.listado));
    console.log(this.listaAccesos);
    //return this.listaAccesos;
  }

  asignarPermisos(){
    const permiso = (document.getElementById("permiso") as HTMLInputElement).value;

    if(Number(permiso.split(':')[1]) == 1){

      this.objPermisos.documentos.activo = true;
      this.objPermisos.documentos.facturar = true;
      this.objPermisos.documentos.consultar = true;
      this.objPermisos.documentos.recepcion = true;
      this.objPermisos.documentos.recepciones = true;
      this.objPermisos.documentos.compra = true;
      this.objPermisos.documentos.credito = true;

      this.objPermisos.reportes.activo = true;
      this.objPermisos.reportes.ventas.activo = true;
      this.objPermisos.reportes.ventas.facturacion = true;
      this.objPermisos.reportes.ventas.detallado = true;
      this.objPermisos.reportes.ventas.productos = true;
      this.objPermisos.reportes.ventas.cliente = true;
      this.objPermisos.reportes.ventas.formaPago = true;

      this.objPermisos.reportes.compras.activo = true;
      this.objPermisos.reportes.compras.compras = true;
      this.objPermisos.reportes.compras.articulo = true;
      this.objPermisos.reportes.compras.proveedor = true;

      this.objPermisos.reportes.inventario.activo = true;
      this.objPermisos.reportes.inventario.existencia = true;
      this.objPermisos.reportes.inventario.ajuste = true;

      this.objPermisos.reportes.credito.activo = true;
      this.objPermisos.reportes.credito.estadoCuenta = true;  

      this.objPermisos.reportes.visita.activo = true;
      this.objPermisos.reportes.visita.visitaCliente = true;

      this.objPermisos.pos.activo = true;
      this.objPermisos.pos.venta = true;

      this.objPermisos.cliente.activo = true;
      this.objPermisos.cliente.listado = true;

      this.objPermisos.proveedor.activo = true;
      this.objPermisos.proveedor.listado = true;

      this.objPermisos.producto.activo = true;
      this.objPermisos.producto.listado = true;
      this.objPermisos.producto.receta = true;

      this.objPermisos.articulo.activo = true;
      this.objPermisos.articulo.listado = true;
      this.objPermisos.articulo.existencia = true;
      this.objPermisos.articulo.movimiento = true;

      this.objPermisos.impuesto.activo = true;
      this.objPermisos.impuesto.listado = true;

      this.objPermisos.categoria.activo = true;
      this.objPermisos.categoria.listado = true;

      this.objPermisos.descuento.activo = true;
      this.objPermisos.descuento.listado = true;

      this.objPermisos.emisor.activo = true;
      this.objPermisos.emisor.configuracion = true;

      this.objPermisos.visita.activo = true;
      this.objPermisos.visita.registro = true;

      this.objPermisos.usuario.activo = true;
      this.objPermisos.usuario.listado = true;
      this.objPermisos.usuario.bodegas = true;
    }
    else if(Number(permiso.split(':')[1]) == 5){
      this.objPermisos.documentos.activo = true;
      this.objPermisos.documentos.facturar = true;
      this.objPermisos.documentos.consultar = true;
      this.objPermisos.documentos.recepcion = false;
      this.objPermisos.documentos.recepciones = false;
      this.objPermisos.documentos.compra = false;
      this.objPermisos.documentos.credito = false;
      
      this.objPermisos.reportes.activo = true;
      this.objPermisos.reportes.ventas.activo = true;
      this.objPermisos.reportes.ventas.facturacion = true;
      this.objPermisos.reportes.ventas.detallado = false;
      this.objPermisos.reportes.ventas.productos = false;
      this.objPermisos.reportes.ventas.cliente = false;
      this.objPermisos.reportes.ventas.formaPago = false;

      this.objPermisos.reportes.compras.activo = false;
      this.objPermisos.reportes.compras.compras = false;
      this.objPermisos.reportes.compras.articulo = false;
      this.objPermisos.reportes.compras.proveedor = false;

      this.objPermisos.reportes.inventario.activo = true;
      this.objPermisos.reportes.inventario.existencia = true;
      this.objPermisos.reportes.inventario.ajuste = false;

      this.objPermisos.reportes.credito.activo = false;
      this.objPermisos.reportes.credito.estadoCuenta = false;

      this.objPermisos.reportes.visita.activo = true;
      this.objPermisos.reportes.visita.visitaCliente = true;

      this.objPermisos.pos.activo = false;
      this.objPermisos.pos.venta = false;

      this.objPermisos.cliente.activo = false;
      this.objPermisos.cliente.listado = false;

      this.objPermisos.proveedor.activo = false;
      this.objPermisos.proveedor.listado = false;

      this.objPermisos.producto.activo = false;
      this.objPermisos.producto.listado = false;
      this.objPermisos.producto.receta = false;

      this.objPermisos.articulo.activo = false;
      this.objPermisos.articulo.listado = false;
      this.objPermisos.articulo.existencia = false;
      this.objPermisos.articulo.movimiento = false;

      this.objPermisos.impuesto.activo = false;
      this.objPermisos.impuesto.listado = false;



      this.objPermisos.categoria.activo = false;
      this.objPermisos.categoria.listado = false;

      this.objPermisos.descuento.activo = false;
      this.objPermisos.descuento.listado = false;

      this.objPermisos.emisor.activo = false;
      this.objPermisos.emisor.configuracion = false;

      this.objPermisos.visita.activo = true;
      this.objPermisos.visita.registro = true;

      this.objPermisos.usuario.activo = false;
      this.objPermisos.usuario.listado = false;
      this.objPermisos.usuario.bodegas = false;

    } else {
      this.objPermisos.documentos.activo = false;
      this.objPermisos.documentos.facturar = false;
      this.objPermisos.documentos.consultar = false;
      this.objPermisos.documentos.recepcion = false;
      this.objPermisos.documentos.recepciones = false;
      this.objPermisos.documentos.compra = false;
      this.objPermisos.documentos.credito = false;

      this.objPermisos.reportes.activo = false;
      this.objPermisos.reportes.ventas.activo = false;
      this.objPermisos.reportes.ventas.facturacion = false;
      this.objPermisos.reportes.ventas.detallado = false;
      this.objPermisos.reportes.ventas.productos = false;
      this.objPermisos.reportes.ventas.cliente = false;
      this.objPermisos.reportes.ventas.formaPago = false;

      this.objPermisos.reportes.compras.activo = false;
      this.objPermisos.reportes.compras.compras = false;
      this.objPermisos.reportes.compras.articulo = false;
      this.objPermisos.reportes.compras.proveedor = false;

      this.objPermisos.reportes.inventario.activo = false;
      this.objPermisos.reportes.inventario.existencia = false;
      this.objPermisos.reportes.inventario.ajuste = false;

      this.objPermisos.reportes.credito.activo = false;
      this.objPermisos.reportes.credito.estadoCuenta = false;  

      this.objPermisos.reportes.visita.activo = false;
      this.objPermisos.reportes.visita.visitaCliente = false;

      this.objPermisos.pos.activo = false;
      this.objPermisos.pos.venta = false;

      this.objPermisos.cliente.activo = false;
      this.objPermisos.cliente.listado = false;

      this.objPermisos.proveedor.activo = false;
      this.objPermisos.proveedor.listado = false;

      this.objPermisos.producto.activo = false;
      this.objPermisos.producto.listado = false;
      this.objPermisos.producto.receta = false;

      this.objPermisos.articulo.activo = false;
      this.objPermisos.articulo.listado = false;
      this.objPermisos.articulo.existencia = false;
      this.objPermisos.articulo.movimiento = false;

      this.objPermisos.impuesto.activo = false;
      this.objPermisos.impuesto.listado = false;

      this.objPermisos.categoria.activo = false;
      this.objPermisos.categoria.listado = false;

      this.objPermisos.descuento.activo = false;
      this.objPermisos.descuento.listado = false;

      this.objPermisos.emisor.activo = false;
      this.objPermisos.emisor.configuracion = false;

      this.objPermisos.visita.activo = false;
      this.objPermisos.visita.registro = false;

      this.objPermisos.usuario.activo = false;
      this.objPermisos.usuario.listado = false;
      this.objPermisos.usuario.bodegas = false;
    }
  }
}


