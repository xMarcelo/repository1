import { Component, OnInit, HostListener } from '@angular/core';
import { ObservablesService } from '../../services/observables.service';
import { BoundElementPropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  panelLateralEstado = false;
  public _opened: boolean = true;
  public status_closeOnClickOutside: boolean;

  public _opened_siderbar: boolean = true;

  private plShow= false;
  public valOnSize: number = document.documentElement.clientWidth;

  constructor(private _observablesService: ObservablesService) {
    this.eventPanelShowSize();
  }
  ngOnInit() {
    this._observablesService.panelLateralShow$
        .subscribe((val) => {
          this.panelLateralEstado = val;
        });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.valOnSize = event.target.innerWidth;
    this.eventPanelShowSize();
  }
  eventPanelShowSize() {
    if ( this.valOnSize < 768 ) {
      // this._opened = false;
      this.status_closeOnClickOutside = true;
    }else {
      // this._opened = false;
      this.status_closeOnClickOutside = false;
    }
    console.log(this.status_closeOnClickOutside);
    // this._opened = this.valOnSize < 768 ? false : true;
    // this.status_closeOnClickOutside = this.valOnSize < 768 ? false : true;
    // // this._observablesService.panelLaterShow(this.plShow);
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  private siderBarShow(event: any) {
    this._opened = !this._opened;
    console.log(event);
  }

}
