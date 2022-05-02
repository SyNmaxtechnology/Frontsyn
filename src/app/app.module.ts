import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './interceptors/token-interceptor';
// IMPORTAR LAS RUTAS DEL SISTEMA
import { APP_ROUTES } from './app.routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmisorComponent } from './pages/emisor/emisor.component';
import { DescuentoComponent } from './pages/descuento/descuento.component';``
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ImpuestoComponent } from './pages/impuesto/impuesto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { FacturaCompraComponent } from './pages/factura-compra/factura-compra.component';
import { RecepcionComponent } from './pages/recepcion/recepcion.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ReporteFacturacionComponent } from './pages/reporte-facturacion/reporte-facturacion.component';
import { ReporteProductoComponent } from './pages/reporte-producto/reporte-producto.component';
import { ReporteClienteComponent } from './pages/reporte-cliente/reporte-cliente.component';
import { ReporteComprasComponent } from './pages/reporte-compras/reporte-compras.component';
import { ReporteArticuloComponent } from './pages/reporte-articulo/reporte-articulo.component';
import { ReporteProveedorComponent } from './pages/reporte-proveedor/reporte-proveedor.component';
import { ListaEmisoresComponent } from './pages/lista-emisores/lista-emisores.component';
import { POSComponent } from './pages/pos/pos.component';
import { ReporteFormaPagoComponent } from './pages/reporte-forma-pago/reporte-forma-pago.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { BodegaComponent } from './pages/bodega/bodega.component';
import { ExistenciaComponent } from './pages/existencia/existencia.component';
import { MovimientosComponent } from './pages/movimientos/movimientos.component';
import { ReporteExistenciaArticuloComponent } from './pages/reporte-existencia-articulo/reporte-existencia-articulo.component';
import { ReporteAjusteComponent } from './pages/reporte-ajuste/reporte-ajuste.component';
import { FacturaDetalladoComponent } from './pages/factura-detallado/factura-detallado.component';
import { AplicacionRecibosCreditoComponent } from './pages/aplicacion-recibos-credito/aplicacion-recibos-credito.component';
import { FacturasCreditoCanceladasComponent } from './pages/facturas-credito-canceladas/facturas-credito-canceladas.component';
import { RecepcionesComponent } from './pages/recepciones/recepciones.component';
import { VisitaComponent } from './pages/visita/visita.component';
import { OpcionComponent } from './pages/opcion/opcion.component';
import { ReporteVisitasComponent } from './pages/reporte-visitas/reporte-visitas.component';
import { NoautorizadoComponent } from './pages/noautorizado/noautorizado.component';
import { D151ventasComponent } from './pages/d151ventas/d151ventas.component';
import { D151ventasresumidoComponent } from './pages/d151ventasresumido/d151ventasresumido.component';
import { D151comprasComponent } from './pages/d151compras/d151compras.component';
import { D151comprasresumidoComponent } from './pages/d151comprasresumido/d151comprasresumido.component';
import { ResumenIVAVentasComponent } from './pages/resumen-ivaventas/resumen-ivaventas.component';
import { ResumenIVAComprasComponent } from './pages/resumen-ivacompras/resumen-ivacompras.component';
import { AplicacionCreditoEntradasComponent } from './pages/aplicacion-credito-entradas/aplicacion-credito-entradas.component';
import { ComprasCreditoCanceladasComponent } from './pages/compras-credito-canceladas/compras-credito-canceladas.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { MovimientosBancoComponent } from './pages/movimientos-banco/movimientos-banco.component';
import { ReporteDepositosComponent } from './pages/reporte-depositos/reporte-depositos.component';
import { ReporteTransferenciaComponent } from './pages/reporte-transferencia/reporte-transferencia.component';
import { ReporteMovimientosCuentaComponent } from './pages/reporte-movimientos-cuenta/reporte-movimientos-cuenta.component';
import { EncuestaServicioComponent } from './pages/encuesta-servicio/encuesta-servicio.component';
import { RazonNoVentaComponent } from './pages/razon-no-venta/razon-no-venta.component';
import { ResultadoEncuestaServicioComponent } from './pages/resultado-encuesta-servicio/resultado-encuesta-servicio.component';
import { ReporteResultadoEncuestaServicioComponent } from './pages/reporte-resultado-encuesta-servicio/reporte-resultado-encuesta-servicio.component';
import { EncuestaRequerimientoComponent } from './pages/encuesta-requerimiento/encuesta-requerimiento.component';
import { ResultadoEncuestaRequerimientoComponent } from './pages/resultado-encuesta-requerimiento/resultado-encuesta-requerimiento.component';
import { ReporteEncuestaRequerimientoPorRequerimientoComponent } from './pages/reporte-encuesta-requerimiento-por-requerimiento/reporte-encuesta-requerimiento-por-requerimiento.component';
import { ReporteEncuestaRequerimientoPorClienteComponent } from './pages/reporte-encuesta-requerimiento-por-cliente/reporte-encuesta-requerimiento-por-cliente.component';
import { ListadoSucursalesComponent } from './pages/listado-sucursales/listado-sucursales.component';
import { ReporteRazonesNoVentaComponent } from './pages/reporte-razones-no-venta/reporte-razones-no-venta.component';

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
    ConsultaComponent,
    ReporteComponent,
    UsuarioComponent,
    NopagefoundComponent,
    FacturaCompraComponent,
    RecepcionComponent,
    ProveedorComponent,
    ArticuloComponent,
    ReporteFacturacionComponent,
    ReporteProductoComponent,
    ReporteClienteComponent,
    ReporteComprasComponent,
    ReporteArticuloComponent,
    ReporteProveedorComponent,
    ListaEmisoresComponent,
    POSComponent,
    ReporteFormaPagoComponent,
    RecetaComponent,
    BodegaComponent,
    ExistenciaComponent,
    MovimientosComponent,
    ReporteExistenciaArticuloComponent,
    ReporteAjusteComponent,
    FacturaDetalladoComponent,
    AplicacionRecibosCreditoComponent,
    FacturasCreditoCanceladasComponent,
    RecepcionesComponent,
    VisitaComponent,
    OpcionComponent,
    ReporteVisitasComponent,
    NoautorizadoComponent,
    D151ventasComponent,
    D151ventasresumidoComponent,
    D151comprasComponent,
    D151comprasresumidoComponent,
    ResumenIVAVentasComponent,
    ResumenIVAComprasComponent,
    AplicacionCreditoEntradasComponent,
    ComprasCreditoCanceladasComponent,
    CuentasComponent,
    MovimientosBancoComponent,
    ReporteDepositosComponent,
    ReporteTransferenciaComponent,
    ReporteMovimientosCuentaComponent,
    RazonNoVentaComponent,
    EncuestaServicioComponent,
    ResultadoEncuestaServicioComponent,
    ReporteResultadoEncuestaServicioComponent,
    EncuestaRequerimientoComponent,
    ResultadoEncuestaRequerimientoComponent,
    ReporteEncuestaRequerimientoPorRequerimientoComponent,
    ReporteEncuestaRequerimientoPorClienteComponent,
    ListadoSucursalesComponent,
    ReporteRazonesNoVentaComponent
  ],
  imports: [// todos los modulos que se importen en este componente, se deben pasar a el array imports
    BrowserModule,
    APP_ROUTES,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
