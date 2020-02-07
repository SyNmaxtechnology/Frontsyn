import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { FacturaComponent } from './factura/factura.component';
import { ProductoComponent } from './producto/producto.component';
import { PAGES_ROUTES } from './pages.routes';
import { EmisorComponent } from './emisor/emisor.component';
console.log(SharedModule);

@NgModule({
    declarations: [
        PagesComponent,
        ProductoComponent,
        FacturaComponent,
        EmisorComponent,
    ],
    exports: [
        ProductoComponent,
        FacturaComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }

// comentario de prueba