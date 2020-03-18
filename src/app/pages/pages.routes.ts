
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
import { LoginGuard } from '../services/shared/guard/login.guard';

const pagesRoutes: Routes = [
    {path: '', component: PagesComponent,
    children: [ // subrutas del componente pages
        {path: 'producto', component: ProductoComponent,canActivate: [LoginGuard]},
        {path: 'factura', component: FacturaComponent,canActivate: [LoginGuard]},
        {path: 'Emisor', component: EmisorComponent,canActivate: [LoginGuard]},
        {path: 'descuento', component: DescuentoComponent,canActivate: [LoginGuard]},
        {path: 'categoria', component: CategoriaComponent,canActivate: [LoginGuard]},
        {path: 'impuesto', component: ImpuestoComponent,canActivate: [LoginGuard]},
        {path: 'cliente', component: ClienteComponent,canActivate: [LoginGuard]},
        {path: 'consulta', component: ConsultaComponent,canActivate: [LoginGuard]},
        {path: 'usuario', component: UsuarioComponent,canActivate: [LoginGuard]},
        {path: 'reporte/comprobantes/:tipoFactura', component: ReporteComponent,canActivate: [LoginGuard]},
        {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    ]}
];
@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
