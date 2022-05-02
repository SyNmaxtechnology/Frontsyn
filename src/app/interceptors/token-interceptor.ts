import { Injectable } from "@angular/core";
import { HttpInterceptor, 
         HttpHandler, 
         HttpRequest, 
         HttpEvent, 
         HttpResponse } 
from "@angular/common/http";
import { Observable} from 'rxjs';
import { LoginService } from './../services/pages/login.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../services/pages/usuario.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private loginService: LoginService,
        private router:Router,
        private usuarioService: UsuarioService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const reqAuth = req.headers.get('Authorization');
        const token = this.usuarioService.obtenerToken();
        if(reqAuth){
            if(this.loginService.existeToken()){
                if(!this.loginService.estaAutenticado(token)){
                    this.router.navigate(['/login']);
                } else {
                    return next.handle(req);
                }
            } else {
                this.router.navigate(['/login']);
            }
        } else {
            return next.handle(req);
        }
    }
}