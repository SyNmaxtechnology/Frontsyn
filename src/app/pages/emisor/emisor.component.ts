import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emisor',
  templateUrl: './emisor.component.html',
  styles: []
})
export class EmisorComponent implements OnInit {
  objEmisor = {};

  constructor() { }

  ngOnInit() {
  }

  nuevoEmisor(e) {
       // formatear informacion a formData para enviar el archivo p12 del emisor
      e.preventDefault();

      let formData = new FormData();
  }

}
