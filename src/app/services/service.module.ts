import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FrasesService,
  ObservablesService,
  LogisticaService,
  SiderbarService,
  UsuarioService,
  LoginGuardGuard,
  UploadfileService} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FrasesService, ObservablesService, LogisticaService, SiderbarService, UsuarioService,
    LoginGuardGuard, UploadfileService
  ],
  declarations: []
})
export class ServiceModule { }
