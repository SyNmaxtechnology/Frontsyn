import { Component, OnInit } from '@angular/core';
import { DescuentoService } from '../../services/pages/descuento.service';

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrls: ['./descuento.component.css']
})
export class DescuentoComponent implements OnInit {

  constructor(private descuentoService: DescuentoService) { }

  objDescuento = {
    
    descuento: '',
    descripcion: ''
  
  };

  ngOnInit() {
  }
  
  nuevoDescuento(e, obj) {
    e.preventDefault();
    this.descuentoService.guardarDescuento(obj)
      .subscribe(response => {
        console.log(response)
      });
  }
}
