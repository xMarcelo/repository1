import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app.routes';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PanelLateralComponent } from './components/shared/panel-lateral.component';
import { NavbarComponent } from './components/shared/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MicontentComponent } from './components/shared/micontent.component';

// services
import { ObservablesService } from './services/observables.service';
import { FrasesService } from './services/frases.service';
import { LogisticaService } from './services/logistica.service';


import { ProductosComponent } from './components/pages/logistica/productos/productos.component';
import { AddproductoComponent } from './components/pages/logistica/productos/addproducto.component';
import { AutocompleteComponent } from './components/pages/control/autocomplete/autocomplete.component';
import { DialogboxComponent } from './components/pages/control/dialogbox/dialogbox.component';
import { ListadoProductosComponent } from './components/pages/logistica/productos/listado-productos.component';
import { NopagefoundComponent } from './components/pages/nopagefound/nopagefound.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PagesComponent } from './components/pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    PanelLateralComponent,
    NavbarComponent,
    MicontentComponent,
    HomeComponent,
    ProductosComponent,
    AddproductoComponent,
    AutocompleteComponent,
    DialogboxComponent,
    ListadoProductosComponent,
    NopagefoundComponent,
    LoginComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ObservablesService,
    FrasesService,
    LogisticaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
