import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../pages/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(): boolean {
    

    if(!this.loginService.existeToken()){
      this.router.navigate(['/login']); 
      return false;
    } else {
      const token =this.loginService.existeToken();
      if (!this.loginService.estaAutenticado(token)) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    // tslint:disable-next-line: max-line-length
  }
}
