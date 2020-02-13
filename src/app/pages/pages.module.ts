import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { FacturaComponent } from './factura/factura.component';
import { PAGES_ROUTES } from './pages.routes';




console.log(SharedModule);

@NgModule({
    declarations: [
        PagesComponent,
        FacturaComponent,
    ],
    exports: [
        FacturaComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }
