import { PagesComponent } from './pages.component';
import { FacturaComponent } from './factura/factura.component';
import { ProductoComponent } from './producto/producto.component';
import { NgModule } from '@angular/core';


@NgModule({
    declarations:[
        ProductoComponent,
        FacturaComponent,
    ],
    exports:[
        ProductoComponent,
        FacturaComponent
    ]
})

export class PagesModule {}