import { RutasModule } from './pages.routes';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
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
        RutasModule,
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
