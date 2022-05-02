import { UsuarioService } from './usuario.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) { }

  private token = this.usuarioService.obtenerToken();
  
  obtenerUbicacionActual(): any{
    return new Promise((resolve,reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          },
          (err) => {
            console.log(err);
            const {code,message} = err;

            if(message === 'User denied geolocation prompt'){
              return reject('No permitió obtener la ubicación actual');
            } else {
              const device = navigator.userAgent
              if(device.match(/Iphone/i)||
                device.match(/Ipod/i)||
                device.match(/Android/i)||
                device.match(/J2ME/i)||
                device.match(/BlackBerry/i)||
                device.match(/iPhone|iPad|iPod/i)||
                device.match(/Opera Mini/i)||
                device.match(/IEMobile/i)||
                device.match(/Mobile/i)||
                device.match(/Windows Phone/i)||
                device.match(/windows mobile/i)||
                device.match(/windows ce/i)||
                device.match(/webOS/i)||
                device.match(/palm/i)||
                device.match(/bada/i)||
                device.match(/series60/i)||
                device.match(/nokia/i)||
                device.match(/symbian/i)||
                device.match(/HTC/i)){
                return reject('Debe habilitar el acceso a la ubicación del dispositivo');
              }

              return reject('Ocurrió un error al obtener la ubicación');
            }
        },{
          enableHighAccuracy: true, // Alta precisión
          maximumAge: 0, // No queremos caché
          timeout:5000
        });
      } else {
        reject('El navegador no soporta la geolocalización');
      }
    })
  }

  agregarVisita(obj){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.post<string>(baseURL() +'/visita',obj,{headers, responseType: 'text' as 'json'});
  }

  habilitarTipoMovimiento (){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    })

    return this.http.get<string>(baseURL() +'/visita/habilitar-movimiento',{headers, responseType: 'text' as 'json'});
  }

  obtenerClientes(){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/visita/obtener-clientes/',{headers,responseType: 'text' as 'json'});
  }

  obtenerUbicacionCliente(idcliente: number){
    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/cliente/visita/ubicacion/'+idcliente,{headers,responseType: 'text' as 'json'});
  }

  obtenerCercaPerimetral(){

    const headers = new HttpHeaders({
      'Authorization': 'bearer '+this.token
    });

    return this.http.get<string>( baseURL() +'/emisor/obtener/cerca-perimetral',{headers,responseType: 'text' as 'json'});
  }
  
  /*obtenerIp(){
      //const API_KEY = process.env.API_KEY_IP_REQUEST;
    return this.http.get<string>(    
      'https://ipgeolocation.abstractapi.com/v1/?api_key=bc79d972eb2447c8b5aa458527329b29'
    ,{,responseType: ''})
  }*/

}
