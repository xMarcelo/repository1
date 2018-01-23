import { Component, OnInit } from '@angular/core';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-micontent',
  templateUrl: './micontent.component.html',
  styles: []
})
export class MicontentComponent implements OnInit {
  panelLateralEstado:boolean=false;
  get aa(){console.log('aaaa'); return}
  constructor(private _observablesService:ObservablesService) { }
  ngOnInit() {
    this._observablesService.panelLateralShow$.subscribe((val)=>{
      this.panelLateralEstado=val;
    })
  }

}
