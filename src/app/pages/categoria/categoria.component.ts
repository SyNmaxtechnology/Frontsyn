import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/pages/categoria.service';
import Swal from 'sweetalert2'; 
import { fromEvent } from 'rxjs';
declare var $:any
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) { 
    this.obtenerCategorias();
  }

  objCategoria = {
    id: '',
    descripcion: '',
    codigo: '',
    codigocabys: '',
    descripcioncodigo: ''
  };

  queryDescripcionCodigoCabys : string ='';

  config: any;
  collection = { count: 0, data: [] };
  query = '';
  listaCategorias= [];
  listaCategoriasCargadas= [];
  listaCodigos = [];
  titulo = 'Nueva Categoría';
  tablaPequena = false;
  ngOnInit() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    window.addEventListener("resize",() => {
      if (screen.width < 638) 
       {
        this.tablaPequena = true;
        console.log(this.tablaPequena)
       }
      else {
        this.tablaPequena = false;
        console.log(this.tablaPequena)
      }
    })

    const btnBuscarCodigo = (document.getElementById("btnBuscarCodigo") as HTMLButtonElement);

    const btnBuscarCodigoClick = fromEvent(btnBuscarCodigo,'click');

    btnBuscarCodigoClick.subscribe((e: Event) => {
      
      if(this.queryDescripcionCodigoCabys.length === 0){
        return alert("Debe ingresar alguna descripción")
      } else {
        this.categoriaService.buscarCodigoCabysPorDescripcion(this.queryDescripcionCodigoCabys)
          .subscribe(response => {
            this.listaCodigos =[];
            console.log(response);
            const codigos = JSON.parse(response);

            if(codigos.length === 0){
              Swal.fire('Búsquda','No hay resultados','warning');
            } else {
              for(let codigo of codigos){
                this.listaCodigos.push({
                  codigo: codigo.codigo,
                  impuesto: '% '+codigo.impuesto,
                  descripcion: codigo.descripcion
                })
              }
            }
        },
        err => {
          console.log(err)
        })
      }
    })
  }

  cargarLinea(linea){
    this.objCategoria.codigocabys = linea.codigo;
    this.objCategoria.descripcioncodigo = linea.descripcion;
  } 


  pageChanged(event){
    this.config.currentPage = event;
  }

  procesarCategoria(obj){
    if(this.objCategoria.id === ''){
      this.nuevaCategoria(obj);
    }else{
      this.actualizarCategoria(obj);
    }
  }

  nuevaCategoria(obj) {
    console.log("obj", obj);
    this.categoriaService.guardarCategoria(obj)
      .subscribe((response: any) => {
         (document.getElementById("formNuevaCategoria") as HTMLFormElement).reset();
         $('#ModalNuevaCategoria').modal('hide');
         Swal.fire('Nueva Categoría', response.message, 'success');
         this.obtenerCategorias();
         this.objCategoria.id = ''
         this.objCategoria.descripcion = '' 
         this.objCategoria.codigo = ''
         this.objCategoria.codigocabys = '';
         this.objCategoria.descripcioncodigo = '';
         this.listaCodigos = [];
      },
      err => console.log(err));
  }

  actualizarCategoria(obj){
    console.log("obj", obj);
    this.categoriaService.actualizarCategoria(obj)
      .subscribe((response: any) => {
        (document.getElementById("formNuevaCategoria") as HTMLFormElement).reset();
         $('#ModalNuevaCategoria').modal('hide');
        Swal.fire('Editar Categoría', response.message, 'success');
         this.obtenerCategorias();
         this.objCategoria.id = ''
         this.objCategoria.descripcion = '' 
         this.objCategoria.codigo = ''
         this.objCategoria.codigocabys = '';
         this.objCategoria.descripcioncodigo = '';
         this.listaCodigos = [];
      }, 
      err => console.log(err))

  }

  buscarCategoria(texto){
    if(texto === ''){
      return;
    }else {
      this.listaCategorias.forEach( cat =>  {
        if(texto == cat.descripcion){
          this.listaCategorias = [];
          this.listaCategorias.push(cat);
          for (let categoria of this.listaCategorias) {
            if(categoria.estado_categoria == 1){
              categoria.estado_categoria = 'SI'
            } else {
              categoria.estado_categoria = 'NO'
            }
          }
        }
      })
      this.collection.count = this.listaCategorias.length;
      this.collection.data = this.listaCategorias; 
      //this.listaCategoriasCargadas = this.listaCategorias;
      
    }
  }

  obtenerCategorias(){
    this.categoriaService.obtenerCategorias()
      .subscribe(response => {
        const datosCategorias = JSON.parse(response);
        this.listaCategorias = datosCategorias.categorias;

        for(const i in this.listaCategorias){
          if(this.listaCategorias[i].estado_categoria == 1){
            this.listaCategorias[i].estado_categoria = 'SI'
          } else {
            this.listaCategorias[i].estado_categoria = 'NO'
          }
        }
        this.listaCategoriasCargadas = this.listaCategorias;
        this.collection.count = this.listaCategorias.length;
        this.collection.data = this.listaCategorias;
      },
      err => {
        console.log(err);
      })
  }

  actualizarEstado(categoria){
    let nuevoEstado : number, descripcion: string;

    if(categoria.estado_categoria == 'SI'){
      descripcion = 'NO';
      nuevoEstado = 0;
    } else {
      descripcion = 'SI';
      nuevoEstado = 1;
    }

    const obj = {
      estado: nuevoEstado,
      idcategoria: categoria.id
    }

    this.categoriaService.actualizarEstado(obj)
      .subscribe(response => {
        categoria.estado_categoria = descripcion;
      },
      err => {
        console.log(err);
      })
  }

  obtenerCategoriaPorId(id: number){
    this.categoriaService.obtenerCategoriaPorId(id)
      .subscribe(response => {
        console.log(response);
        const datosCategoria = JSON.parse(response);
        this.titulo = 'Actualizar Categoría'
        this.objCategoria.id = datosCategoria.categoria[0].id;
          this.objCategoria.descripcion = datosCategoria.categoria[0].descripcion;
          this.objCategoria.codigo = datosCategoria.categoria[0].codigo;
          this.objCategoria.codigocabys = datosCategoria.categoria[0].codigoCabys;
          this.objCategoria.descripcioncodigo = datosCategoria.categoria[0].descripcionCodigoCabys;
         //this.objCategoria.idcodigocabys = datosCategoria.categoria[0].idcodigo;
      },
      err => {
        console.log(err);
      })
  }

  limpiarDatos(){
    this.titulo = 'Nueva Categoría';
    this.objCategoria.descripcion = '' 
    this.objCategoria.codigo = ''
    this.objCategoria.codigocabys = '';
    this.objCategoria.descripcioncodigo = '';
    this.objCategoria.id = '';
  }
// 
  recargarCategorias(texto: string){
    if(texto.length === 0){
      this.listaCategorias = this.listaCategoriasCargadas;
      this.collection.count = this.listaCategorias.length;
      this.collection.data = this.listaCategorias;
    }
  }
}
