import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// IMPORTAR LAS RUTAS DEL SISTEMA
import {APP_ROUTES} from './app.routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmisorComponent } from './pages/emisor/emisor.component';
import { DescuentoComponent } from './pages/descuento/descuento.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ImpuestoComponent } from './pages/impuesto/impuesto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmisorComponent,
    DescuentoComponent,
    CategoriaComponent,
    ImpuestoComponent,
    ProductoComponent,
    ClienteComponent,
    FacturaComponent,
    ConsultaComponent
  ],
  imports: [// todos los modulos que se importen en este componente, se deben pasar a el array imports
    BrowserModule,
    APP_ROUTES,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
