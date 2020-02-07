
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
// IMPORTAR LAS RUTAS DEL SISTEMA
import { PagesComponent } from './pages/pages.component';
import {APP_ROUTES} from './app.routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [// todos los modulos que se importen en este componente, se deben pasar a el array imports
    BrowserModule,
    APP_ROUTES,
    AppRoutingModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
