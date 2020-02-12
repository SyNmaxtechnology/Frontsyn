import { Component, OnInit } from '@angular/core';
import { ImpuestoService } from '../../services/pages/impuesto.service';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent implements OnInit {

  constructor(private impuestoService: ImpuestoService ) { }

  objImpuesto = {
    descripcion: '',
    porcentaje: '',
    codigo: ''
  };

  ngOnInit() {
  }

  nuevoImpuesto(e, obj) {
    e.preventDefault();

    this.impuestoService.nuevoImpuesto(obj)
      .subscribe(response => {
        console.log(response);
      },
      err => {
        console.log(err);
      });
  }
}
