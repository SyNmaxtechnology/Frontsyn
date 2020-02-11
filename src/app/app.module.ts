
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
// IMPORTAR LAS RUTAS DEL SISTEMA
import {APP_ROUTES} from './app.routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmisorComponent } from './pages/emisor/emisor.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmisorComponent,
  ],
  imports: [// todos los modulos que se importen en este componente, se deben pasar a el array imports
    BrowserModule,
    APP_ROUTES,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
