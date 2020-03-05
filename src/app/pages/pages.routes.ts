import { ConsultaComponent } from './consulta/consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductoComponent } from './producto/producto.component';
import { FacturaComponent } from './factura/factura.component';
import { EmisorComponent } from './emisor/emisor.component';
import { DescuentoComponent } from './descuento/descuento.component';
import {CategoriaComponent} from './categoria/categoria.component';
import { ImpuestoComponent } from './impuesto/impuesto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ReporteComponent } from './reporte/reporte.component';

const pagesRoutes: Routes = [
    {path: '', component: PagesComponent,
    children: [ // subrutas del componente pages
        {path: 'producto', component: ProductoComponent},
        {path: 'factura', component: FacturaComponent},
        {path: 'Emisor', component: EmisorComponent},
        {path: 'descuento', component: DescuentoComponent},
        {path: 'categoria', component: CategoriaComponent},
        {path: 'impuesto', component: ImpuestoComponent},
        {path: 'cliente', component: ClienteComponent},
        {path: 'consulta', component: ConsultaComponent},
        {path: 'reporte/comprobantes/:tipoFactura', component: ReporteComponent},
        {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    ]}
];
@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
