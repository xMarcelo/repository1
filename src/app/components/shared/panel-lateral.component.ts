import { Component, OnInit } from '@angular/core';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-panel-lateral',
  templateUrl: './panel-lateral.component.html',
  styles: []
})
export class PanelLateralComponent implements OnInit {
  panelLateralEstado:boolean=false;
  constructor(private _observablesService:ObservablesService) {

  }

  ngOnInit() {
    this._observablesService.panelLateralShow$.subscribe((val)=>{
      this.panelLateralEstado=val;      
    })
  }

}
