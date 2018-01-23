import { Injectable } from '@angular/core';
import { BehaviorSubject  } from "rxjs/BehaviorSubject";

@Injectable()
export class ObservablesService {
  private panelLateralShowSource = new BehaviorSubject <boolean>(false);
  public panelLateralShow$ = this.panelLateralShowSource.asObservable();

  constructor() { }


  panelLaterShow(valor:boolean){
    this.panelLateralShowSource.next(valor);
  }
}
