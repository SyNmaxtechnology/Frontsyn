import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductoComponent } from './producto/producto.component';
import { FacturaComponent } from './factura/factura.component';
import { EmisorComponent } from './emisor/emisor.component';
import { DescuentoComponent } from './descuento/descuento.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ImpuestoComponent } from './impuesto/impuesto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { LoginGuard } from '../services/shared/guard/login.guard';
import { FacturaCompraComponent } from './factura-compra/factura-compra.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { ReporteFacturacionComponent } from './reporte-facturacion/reporte-facturacion.component';
import { ReporteProductoComponent } from './reporte-producto/reporte-producto.component';
import { ReporteClienteComponent } from './reporte-cliente/reporte-cliente.component';
import { ReporteComprasComponent } from './reporte-compras/reporte-compras.component';
import { ReporteArticuloComponent } from './reporte-articulo/reporte-articulo.component';
import { ReporteProveedorComponent } from './reporte-proveedor/reporte-proveedor.component';
import { POSComponent } from './pos/pos.component';
import { ReporteFormaPagoComponent } from './reporte-forma-pago/reporte-forma-pago.component';
import { RecetaComponent } from './receta/receta.component';
import { BodegaComponent } from './bodega/bodega.component';
import { ExistenciaComponent } from './existencia/existencia.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { ReporteExistenciaArticuloComponent } from './reporte-existencia-articulo/reporte-existencia-articulo.component';
import { ReporteAjusteComponent } from './reporte-ajuste/reporte-ajuste.component';
import { FacturaDetalladoComponent } from './factura-detallado/factura-detallado.component';
import { AplicacionRecibosCreditoComponent } from './aplicacion-recibos-credito/aplicacion-recibos-credito.component';
import { FacturasCreditoCanceladasComponent } from './facturas-credito-canceladas/facturas-credito-canceladas.component';
import { RecepcionesComponent } from './recepciones/recepciones.component';
import { VisitaComponent } from './visita/visita.component';
import { ReporteVisitasComponent } from './reporte-visitas/reporte-visitas.component';
import { D151ventasComponent } from './d151ventas/d151ventas.component';
import { D151ventasresumidoComponent } from './d151ventasresumido/d151ventasresumido.component';
import { D151comprasComponent } from './d151compras/d151compras.component';
import { D151comprasresumidoComponent } from './d151comprasresumido/d151comprasresumido.component';
import { ResumenIVAVentasComponent } from './resumen-ivaventas/resumen-ivaventas.component';
import { ResumenIVAComprasComponent } from './resumen-ivacompras/resumen-ivacompras.component';
import { AplicacionCreditoEntradasComponent } from './aplicacion-credito-entradas/aplicacion-credito-entradas.component';
import { ComprasCreditoCanceladasComponent } from './compras-credito-canceladas/compras-credito-canceladas.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { MovimientosBancoComponent } from './movimientos-banco/movimientos-banco.component';
import { ReporteDepositosComponent } from './reporte-depositos/reporte-depositos.component';
import { ReporteTransferenciaComponent } from './reporte-transferencia/reporte-transferencia.component';
import { ReporteMovimientosCuentaComponent } from './reporte-movimientos-cuenta/reporte-movimientos-cuenta.component';
import { RazonNoVentaComponent } from './razon-no-venta/razon-no-venta.component';
import { EncuestaServicioComponent } from './encuesta-servicio/encuesta-servicio.component';
import { ResultadoEncuestaServicioComponent } from './resultado-encuesta-servicio/resultado-encuesta-servicio.component';
import { ReporteResultadoEncuestaServicioComponent } from './reporte-resultado-encuesta-servicio/reporte-resultado-encuesta-servicio.component';
import { EncuestaRequerimientoComponent } from './encuesta-requerimiento/encuesta-requerimiento.component';
import { ResultadoEncuestaRequerimientoComponent } from './resultado-encuesta-requerimiento/resultado-encuesta-requerimiento.component';
import { ReporteEncuestaRequerimientoPorRequerimientoComponent } from './reporte-encuesta-requerimiento-por-requerimiento/reporte-encuesta-requerimiento-por-requerimiento.component';
import { ReporteEncuestaRequerimientoPorClienteComponent } from './reporte-encuesta-requerimiento-por-cliente/reporte-encuesta-requerimiento-por-cliente.component';
import { ReporteRazonesNoVentaComponent } from './reporte-razones-no-venta/reporte-razones-no-venta.component';

const pagesRoutes: Routes = [ 
    {path: '', component: PagesComponent,
    children: [ // subrutas del componente pages
        {path: 'producto', component: ProductoComponent,canActivate:  [LoginGuard]},
        {path: 'factura', component: FacturaComponent,canActivate:  [LoginGuard]},
        {path: 'Emisor', component: EmisorComponent,canActivate:  [LoginGuard]},
        {path: 'descuento', component: DescuentoComponent,canActivate:  [LoginGuard]},
        {path: 'categoria', component: CategoriaComponent,canActivate:  [LoginGuard]},
        {path: 'impuesto', component: ImpuestoComponent,canActivate:  [LoginGuard]},
        {path: 'cliente', component: ClienteComponent,canActivate:  [LoginGuard]},
        {path: 'consulta', component: ConsultaComponent,canActivate:  [LoginGuard]},
        {path: 'usuario', component: UsuarioComponent,canActivate:  [LoginGuard]},
        {path: 'recepcion', component: RecepcionComponent,canActivate:  [LoginGuard]}, // RecepcionesComponent
        {path: 'recepciones', component: RecepcionesComponent,canActivate:  [LoginGuard]},
        {path: 'compra', component: FacturaCompraComponent,canActivate:  [LoginGuard]},
        {path: 'proveedor', component: ProveedorComponent,canActivate:  [LoginGuard]},
        {path: 'articulo', component: ArticuloComponent,canActivate:  [LoginGuard]},
        {path: 'reporte/comprobantes/:tipoFactura', component: ReporteComponent,canActivate:  [LoginGuard]},
        {path: 'reporte-facturacion', component: ReporteFacturacionComponent,canActivate:  [LoginGuard]},
        {path: 'reporte-producto', component: ReporteProductoComponent,canActivate:  [LoginGuard]},
        {path: 'reporte-cliente', component: ReporteClienteComponent,canActivate:  [LoginGuard]},
        {path: 'reporte-compra', component: ReporteComprasComponent,canActivate:  [LoginGuard]},
        {path: 'reporte-articulo', component: ReporteArticuloComponent,canActivate:  [LoginGuard]},
        {path: 'reporte-proveedor', component: ReporteProveedorComponent, canActivate:  [LoginGuard]},
        {path: 'reporte-existencia', component: ReporteExistenciaArticuloComponent, canActivate:  [LoginGuard]},
        {path: 'reporte-ajuste', component: ReporteAjusteComponent, canActivate:  [LoginGuard]},
        {path: 'reporte-factura-detallado', component: FacturaDetalladoComponent, canActivate: [LoginGuard]},
        {path: 'reporte-forma-pago', component: ReporteFormaPagoComponent,canActivate:  [LoginGuard]},
        {path: 'venta', component: POSComponent,canActivate:  [LoginGuard]},
        {path: 'receta', component: RecetaComponent,canActivate:  [LoginGuard]},
        {path: 'bodega', component: BodegaComponent, canActivate:  [LoginGuard]},
        {path: 'existencia', component: ExistenciaComponent, canActivate: [LoginGuard]},
        {path: 'movimiento', component: MovimientosComponent, canActivate: [LoginGuard]},
        {path: 'recibos-credito', component: AplicacionRecibosCreditoComponent, canActivate: [LoginGuard]},
        {path: 'facturas-credito-canceladas', component: FacturasCreditoCanceladasComponent, canActivate: [LoginGuard]},
        {path: 'entradas-credito-canceladas', component: ComprasCreditoCanceladasComponent, canActivate: [LoginGuard]},
        {path: 'visita', component: VisitaComponent, canActivate: [LoginGuard]}, 
        {path: 'reporte-visitas', component: ReporteVisitasComponent, canActivate: [LoginGuard]}, 
        {path: 'd151-ventas', component: D151ventasComponent, canActivate: [LoginGuard]}, 
        {path: 'd151-ventas-resumido', component: D151ventasresumidoComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'd151-compras', component: D151comprasComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'd151-compras-resumido', component: D151comprasresumidoComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'resumen-iva-ventas', component: ResumenIVAVentasComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'resumen-iva-compras', component: ResumenIVAComprasComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'entradas-credito', component: AplicacionCreditoEntradasComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'cuentas', component: CuentasComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'movimientos-banco', component: MovimientosBancoComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'reporte-depositos', component: ReporteDepositosComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'reporte-transferencias', component: ReporteTransferenciaComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'reporte-movimientos-cuenta', component: ReporteMovimientosCuentaComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'razon', component: RazonNoVentaComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'listado-encuesta-servicio', component: EncuestaServicioComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'encuesta-servicio', component: ResultadoEncuestaServicioComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'reporte-encuesta-servicio', component: ReporteResultadoEncuestaServicioComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'encuesta-requerimiento', component: EncuestaRequerimientoComponent, canActivate: [LoginGuard]}, //d151-compra
        {path: 'resultado-encuesta-requerimiento', component: ResultadoEncuestaRequerimientoComponent, canActivate: [LoginGuard]}, //d151-compra        
        {path: 'reporte-encuesta-requerimiento', component: ReporteEncuestaRequerimientoPorRequerimientoComponent, canActivate: [LoginGuard]}, //d151-compra        
        {path: 'reporte-encuesta-requerimiento-por-cliente', component: ReporteEncuestaRequerimientoPorClienteComponent, canActivate: [LoginGuard]}, //d151-compra        
        {path: 'reporte-razones-no-venta', component: ReporteRazonesNoVentaComponent, canActivate: [LoginGuard]}, //d151-compra        
        {path: '', redirectTo: '/consulta', pathMatch: 'full'} // si la ruta esta vacía entonces redireccionar a /factura  
    ]}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(pagesRoutes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class RutasModule {
 
}
