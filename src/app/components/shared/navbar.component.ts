import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  @Input() plShow: boolean= false;
  @Output() SiderBarShow: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
  ngOnInit() {
  }

  checkPanelLatera() {
    this.plShow = !this.plShow;
    this.SiderBarShow.emit(this.plShow);
  }

}
