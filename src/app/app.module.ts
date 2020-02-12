
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// IMPORTAR LAS RUTAS DEL SISTEMA
import {APP_ROUTES} from './app.routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmisorComponent } from './pages/emisor/emisor.component';
import { DescuentoComponent } from './pages/descuento/descuento.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ImpuestoComponent } from './pages/impuesto/impuesto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmisorComponent,
    DescuentoComponent,
    CategoriaComponent,
    ImpuestoComponent
  ],
  imports: [// todos los modulos que se importen en este componente, se deben pasar a el array imports
    BrowserModule,
    APP_ROUTES,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
