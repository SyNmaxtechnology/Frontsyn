import { RouterModule,Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const appRouest: Routes = [

    {path: '', component: PagesComponent,
    children: [ // subrutas del componente pages
        {path: 'producto', component: ProductoComponent},
        {path: 'factura', component: FacturaComponent},
        {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    ]},
    {path: 'login', component: LoginComponent},
    // {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    {path: '**', component: NopagefoundComponent}
];
// exportar las rutas
export const APP_ROUTES = RouterModule.forRoot(appRouest, { useHash: true});
