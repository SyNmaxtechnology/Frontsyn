import { VisitaService } from './../../services/pages/visita.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ReporteVisitasService, Visitas } from 'src/app/services/pages/reporte-visitas.service';

@Component({
  selector: 'app-reporte-visitas',
  templateUrl: './reporte-visitas.component.html',
  styleUrls: ['./reporte-visitas.component.css']
})
export class ReporteVisitasComponent implements OnInit {

  constructor(
    private reporteVisitaService: ReporteVisitasService,
    private visitaService: VisitaService
  ) { }

  ngOnInit() {

    const btnExcel = (document.getElementById("btnExcel") as HTMLButtonElement);
    const btnWeb = (document.getElementById("btnWeb") as HTMLButtonElement);

    const btnExcelClick = fromEvent(btnExcel,'click');
    const btnWebClick = fromEvent(btnWeb,'click');

    btnWebClick.subscribe((e:Event) => {
      if(this.objVistas.fechaInicio > this.objVistas.fechaFin){
        return alert("La fecha de inicio no puede mayor a la fecha final");
      }

      

      this.objVistas.idcliente = this.idcliente;
      this.objVistas.idusuario = this.idusuario;
      
      this.reporteVisitaService.obtenerVisitas(this.objVistas).subscribe(response => {
        let arrVisitas = JSON.parse(response).visitas;

        const cliente = (document.getElementById("selectCliente") as HTMLSelectElement);
        const option = cliente.options[cliente.options.selectedIndex];
        let clienteSeleccionado = null;
        let visitaSeleccionado = null;
        //visita

        const visita = (document.getElementById("visita") as HTMLSelectElement);
        const optionVisita = visita.options[visita.options.selectedIndex];

        if(option.value !== ''){
          clienteSeleccionado = option.innerHTML;
        }

        if(visita.value !== ''){
          visitaSeleccionado = optionVisita.innerHTML;
        }

        this.reporteVisitaService.reporteWeb(arrVisitas, {
          cliente:clienteSeleccionado,tipoVisita: visitaSeleccionado,
          fechaInicio: this.objVistas.fechaInicio, fechaFin: this.objVistas.fechaFin 
        });
      },
      err => {
        const {error:{message}}= err;
        Swal.fire('Obtener Visitas', message,'error');
      })
    })

    btnExcelClick.subscribe((e:Event) => {
      if(this.objVistas.fechaInicio === '' && this.objVistas.fechaFin === '') return alert("EL parametro de fechas en obligatorio");
      if(this.objVistas.fechaInicio > this.objVistas.fechaFin){
        return alert("La fecha de inicio no puede mayor a la fecha final");
      }

      this.objVistas.idcliente = this.idcliente;
      this.objVistas.idusuario = this.idusuario;

      this.reporteVisitaService.obtenerVisitas(this.objVistas).subscribe(response => {
        const arrVisitas = JSON.parse(response).visitas;
        const arrTotales = JSON.parse(response).responseTotales;

        const cliente = (document.getElementById("selectCliente") as HTMLSelectElement);
        const option = cliente.options[cliente.options.selectedIndex];
        let clienteSeleccionado = null;
        let visitaSeleccionado = null;
        //visita

        const visita = (document.getElementById("visita") as HTMLSelectElement);
        const optionVisita = visita.options[visita.options.selectedIndex];

        if(option.value !== ''){
          clienteSeleccionado = option.innerHTML;
        }

        if(visita.value !== ''){
          visitaSeleccionado = optionVisita.innerHTML;
        }

        this.reporteVisitaService.reporteExcel(arrVisitas,
          {
            cliente:clienteSeleccionado,tipoVisita: visitaSeleccionado,
            fechaInicio: this.objVistas.fechaInicio, fechaFin: this.objVistas.fechaFin 
          },arrTotales);
      },
      err => {
        const {error:{message}}= err;
        Swal.fire('Obtener Visitas', message,'error');
      })
    })

    

    this.reporteVisitaService.obtenerUsuarios().subscribe(response => {
      const usuarios = JSON.parse(response);
      this.listaUsuarios = usuarios;
    },
    err => {
      const {error:{message}} = err;

      Swal.fire('Cargando información..', message,'error');
    })

    this.reporteVisitaService.obtenerClientes().subscribe(response => {
      const {clientes} = JSON.parse(response);
      this.listaClientes = clientes;
    },
    err => {
      const {error:{message}} = err;

      Swal.fire('Cargando información..', message,'error');
    })

    this.reporteVisitaService.cargarZonas()
      .subscribe(response => this.listaZonas = JSON.parse(response),
      err => {
        const {error:{message}} = err;
        Swal.fire('Cargando Zonas', message,'error');
      })
  }

  objVistas: Visitas = {
     fechaInicio : '',
     fechaFin: '',
     idusuario: null,
     idcliente: null,
     visita: '',
     zona: ''
  };

  idusuario: string = "";
  idcliente: string = "";
  listaUsuarios = [];
  listaClientes = [];
  listaZonas = [];
}
