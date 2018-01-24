import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PanelLateralComponent } from './components/shared/panel-lateral.component';
import { NavbarComponent } from './components/shared/navbar.component';

// services
import { ObservablesService } from './services/observables.service';
import { FrasesService } from './services/frases.service';
import { LogisticaService } from './services/logistica.service';

// modulos
import { PagesModule } from './components/pages/pages.module';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app.routes';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './components/pages/pages.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING,
    PagesModule,
  ],
  providers: [
    ObservablesService,
    FrasesService,
    LogisticaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
