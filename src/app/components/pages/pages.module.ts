import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// modulos
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './logistica/productos/productos.component';
import { AddproductoComponent } from './logistica/productos/addproducto.component';
import { ListadoProductosComponent } from './logistica/productos/listado-productos.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// controles
import { DialogboxComponent } from '../control/dialogbox/dialogbox.component';
import { AutocompleteComponent } from '../control/autocomplete/autocomplete.component';



@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
        ProductosComponent,
        AddproductoComponent,
        ListadoProductosComponent,
        LoginComponent,
        NopagefoundComponent,
        DialogboxComponent,
        AutocompleteComponent
    ],
    exports: [
        // PagesComponent
        // HomeComponent,
        // ProductosComponent,
        // AddproductoComponent,
        // ListadoProductosComponent
        // LoginComponent,
        // NopagefoundComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule.forRoot()
    ]
})

export class PagesModule { }