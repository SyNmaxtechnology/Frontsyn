import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        PagesComponent
    ],
    exports: [

    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        CommonModule,
        JwtModule.forRoot({
            config: {
              tokenGetter,
              whitelistedDomains: [],
              blacklistedRoutes: []
            }
          })
    ]
})

export class PagesModule { }
