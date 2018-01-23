import { Component, OnInit } from '@angular/core';
import { FrasesService } from '../../../services/frases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  frase_dia: any[];
  constructor(private _frasesService: FrasesService) { }

  ngOnInit() {
    this._frasesService.getFrase()
      .subscribe(data => {
        this.frase_dia = data;
      });
  }

}
