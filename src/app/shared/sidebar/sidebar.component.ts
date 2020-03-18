import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  mostrar() {
    const permiso = localStorage.getItem('role');
    if ( permiso.toString() === 'admin') {
      return true;
    } else {
      return false;
    }
  }

}
