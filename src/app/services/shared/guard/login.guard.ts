import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../pages/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(): boolean {
    console.log(this.loginService.estaAutenticado());
    // tslint:disable-next-line: max-line-length
    if (!this.loginService.estaAutenticado()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
