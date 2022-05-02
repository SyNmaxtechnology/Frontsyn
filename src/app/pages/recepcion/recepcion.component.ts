import { RecepcionService } from './../../services/pages/recepcion.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit {

  constructor(
    private recepcionService: RecepcionService,
  ) { }

  ngOnInit() {
    this.condicionImpuesto();
    this.estadoAceptacion();
  }

  listaEstadoAceptacion = [];
  listaCondicionImpuesto = [];

  estadoAceptacion() {
    this.recepcionService.estadoAceptacion()
      .subscribe((response: any) => {
        console.log(response);
          this.listaEstadoAceptacion = response.estadoAceptacion;
          
      },
      err => console.error(err));
  }

  condicionImpuesto() {
    this.recepcionService.condicionImpuesto()
      .subscribe((response: any) => {
        console.log(response)
        this.listaCondicionImpuesto = response.condicionImpuesto;
      }, 
      err =>  console.log(err));
  }

  recepcionComprobante(e) {
    e.preventDefault();
    const xml = (document.getElementById("archivoXml") as HTMLInputElement);
    //File.files[0].type === 'application/x-pkcs12'
    if(xml.value.length === 0){
      alert("Debe subir un factura electrónica para poder generar la recepción");
    } else {
      if(xml.files[0].type !== 'text/xml'){
        return alert("El tipo de archivo que intenta subir no está permtido");
      } else {

        const formData = new FormData();
        const estadoAceptacion = ( document.getElementById("codigoEstadoAceptacion") as HTMLInputElement );
        const condicionImpuesto = ( document.getElementById("codigoCondicionImpuesto") as HTMLInputElement );

        if(condicionImpuesto.value.length == 0 || estadoAceptacion.value.length == 0){
          alert("Todos los campos son requeridos");
        } else {

          formData.append("imagen",xml.files[0]);
          formData.append("estadoAceptacion",estadoAceptacion.value);
          formData.append("condicionImpuesto",condicionImpuesto.value);
          this.recepcionService.recepcionComprobante(formData)
            .subscribe((response: any) => {
              console.log(response);
              Swal.fire('Recepción',response.message,'success');
            },err => {
              if(err.error.message){
                Swal.fire('Recepción',err.error.message,'error');
              }

              if(err.error.err){
                Swal.fire('Recepción',err.error.err,'error');
              }    
          })
        }  
      }
    }
  }
}
