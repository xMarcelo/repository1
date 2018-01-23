import { Component, OnInit } from '@angular/core';
import { LogisticaService } from '../../../../services/logistica.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  constructor(private _logisticaService: LogisticaService) { }

  ngOnInit() {
    // this._logisticaService.getCategorias().subscribe(data=>{
    //   this.dataCategoria=data;
    // });
  }

}
