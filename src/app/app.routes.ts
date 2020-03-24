import { RouterModule,Routes } from '@angular/router';
//import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const appRouest: Routes = [

    /*{path: '', component: PagesComponent,
    children: [ // subrutas del componente pages
        {path: 'producto', component: ProductoComponent},
        {path: 'factura', component: FacturaComponent},
        {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    ]},*/
    {path: 'login', component: LoginComponent},
    // {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
     {path: '**', component: NopagefoundComponent}// si se trata de ingresar a una ruta que no existe 
];
// exportar las rutas
export const APP_ROUTES = RouterModule.forRoot(appRouest, { useHash: true});