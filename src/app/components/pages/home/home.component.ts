import { Component, OnInit } from '@angular/core';
import { FrasesService } from '../../../services/service.index';
import * as swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  public frase_dia: any[];
  constructor(private _frasesService: FrasesService) { }

  ngOnInit() {
    this._frasesService.getFrase()
      .subscribe(data => {
        this.frase_dia = data;
      });
  }

  aaa() {
    swal('Hello world!');
  }
}
