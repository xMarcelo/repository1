import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';

// pipes
import { PipesModule } from '../../pipes/pipes.module';


// modulos
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './logistica/productos/productos.component';
import { AddproductoComponent } from './logistica/productos/addproducto.component';
import { ListadoProductosComponent } from './logistica/productos/listado-productos.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register/register.component';

// maestros
import { UsuariosComponent } from './maestros/usuarios/usuarios.component';

// controles
// import { DialogboxComponent } from '../control/dialogbox/dialogbox.component';
import { AutocompleteComponent } from '../control/autocomplete/autocomplete.component';
import { RegistrarPagoComponent } from '../control/registrar-pago/registrar-pago.component';



// rutas
import { PAGES_ROUTING } from './pages.routes';
import { DistribuicionComponent } from './logistica/distribuicion/distribuicion.component';
import { VentaComponent } from './ventas/venta/venta.component';

// directivas
import { KeytabDirective } from '../../directive/keytab.directive';
import { UppercaseDirective } from '../../directive/uppercase.directive';
import { ResetcontrolDirective } from '../../directive/resetcontrol.directive';
import { KeyclickDirective } from '../../directive/keyclick.directive';






@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
        ProductosComponent,
        AddproductoComponent,
        ListadoProductosComponent,
        LoginComponent,
        NopagefoundComponent,
        // DialogboxComponent,
        AutocompleteComponent,
        RegistrarPagoComponent,
        RegisterComponent,
        UsuariosComponent,
        DistribuicionComponent,
        VentaComponent,
        KeytabDirective,
        UppercaseDirective,
        ResetcontrolDirective,
        KeyclickDirective
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
        BrowserModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule.forRoot(),
        SidebarModule.forRoot(),
        PAGES_ROUTING,
        PipesModule
    ]
})

export class PagesModule { }
