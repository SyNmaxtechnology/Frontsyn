import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductoComponent } from './producto/producto.component';
import { FacturaComponent } from './factura/factura.component';
import { EmisorComponent } from './emisor/emisor.component';
import { DescuentoComponent } from './descuento/descuento.component';
import {CategoriaComponent} from './categoria/categoria.component';
import { ImpuestoComponent } from './impuesto/impuesto.component';


const pagesRoutes: Routes = [
    {path: '', component: PagesComponent,
    children: [ // subrutas del componente pages
        {path: 'producto', component: ProductoComponent},
        {path: 'factura', component: FacturaComponent},
        {path: 'Emisor', component: EmisorComponent},
        {path: 'descuento', component: DescuentoComponent},
        {path: 'categoria', component: CategoriaComponent},
        {path: 'impuesto', component: ImpuestoComponent},
        {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    ]}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
