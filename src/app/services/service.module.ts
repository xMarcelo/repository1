import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FrasesService,
  ObservablesService,
  LogisticaService,
  SiderbarService,
  UsuarioService,
  LoginGuardGuard,
  UploadfileService,
  PrintcodbarraService,
  LogisticaAllService,
  MaestrosService,
  FuncionesService,
  ErroresService,
  VentasService  
} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FrasesService, ObservablesService, LogisticaService, SiderbarService, UsuarioService,
    LoginGuardGuard, UploadfileService, PrintcodbarraService, LogisticaAllService, MaestrosService, FuncionesService,
    ErroresService, VentasService
  ],
  declarations: []
})
export class ServiceModule { }
