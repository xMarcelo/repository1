import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrasesService, ObservablesService, LogisticaService, SiderbarService } from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FrasesService, ObservablesService, LogisticaService, SiderbarService
  ],
  declarations: []
})
export class ServiceModule { }
