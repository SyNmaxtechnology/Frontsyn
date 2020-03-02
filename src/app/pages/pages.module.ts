import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
    declarations: [
        PagesComponent
    ],
    exports: [

    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        CommonModule
    ]
})

export class PagesModule { }
