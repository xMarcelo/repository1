// modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './components/pages/pages.module';

// services
import { ObservablesService } from './services/observables.service';
import { FrasesService } from './services/frases.service';
import { LogisticaService } from './services/logistica.service';


// rutas
import { APP_ROUTING } from './app.routes';

// components
import { PagesComponent } from './components/pages/pages.component';
import { AppComponent } from './app.component';



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
