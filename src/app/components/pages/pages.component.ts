import { Component, OnInit } from '@angular/core';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  panelLateralEstado = false;

  constructor(private _observablesService: ObservablesService) { }
  ngOnInit() {
    this._observablesService.panelLateralShow$
        .subscribe((val) => {
          this.panelLateralEstado = val;
        });
  }

}
