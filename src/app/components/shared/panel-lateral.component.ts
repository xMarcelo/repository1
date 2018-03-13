import { Component, OnInit } from '@angular/core';
import { ObservablesService, SiderbarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-panel-lateral',
  templateUrl: './panel-lateral.component.html',
  styles: []
})
export class PanelLateralComponent implements OnInit {
  panelLateralEstado = false;
  constructor(private _observablesService: ObservablesService, public _sidebar: SiderbarService, public _usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this._observablesService.panelLateralShow$.subscribe((val) => {
      this.panelLateralEstado = val;
    });
  }


}
