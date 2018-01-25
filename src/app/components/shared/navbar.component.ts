import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  private plShow= false;
  @Output() SiderBarShow: EventEmitter<boolean> = new EventEmitter();

  // public valOnSize: number = document.documentElement.clientWidth;
  constructor() {
    // this.eventPanelShowSize();
  }
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.valOnSize = event.target.innerWidth;
  //   this.eventPanelShowSize();
  // }

  // eventPanelShowSize() {
  //   this.plShow = this.valOnSize < 768 ? false : true;
  //   this._observablesService.panelLaterShow(this.plShow);
  // }

  ngOnInit() {
  }

  checkPanelLatera() {
    this.plShow = !this.plShow;
    this.SiderBarShow.emit(this.plShow);
    // this._observablesService.panelLaterShow(this.plShow);
  }

}
