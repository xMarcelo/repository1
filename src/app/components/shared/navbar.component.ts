import { Component, OnInit,HostListener } from '@angular/core';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  private plShow:boolean=false;
  public valOnSize:number=document.documentElement.clientWidth;
  constructor(private _observablesService:ObservablesService) {
    this.eventPanelShowSize();
    //this.panelLateralShowSource.next(this.plShow);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.valOnSize=event.target.innerWidth;
    this.eventPanelShowSize();
  }

  eventPanelShowSize(){
    this.plShow=this.valOnSize<768?false:true;
    this._observablesService.panelLaterShow(this.plShow);
  }

  ngOnInit() {
  }

  checkPanelLatera(){
    this.plShow=!this.plShow;    
    this._observablesService.panelLaterShow(this.plShow);
    //this.panelLateralShowSource.next(this.plShow);
  }

}
