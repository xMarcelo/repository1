import { Component, OnInit, ElementRef } from '@angular/core';

import { NgForm } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { LogisticaService } from '../../../../services/service.index';

@Component({
  selector: 'app-addproducto',
  templateUrl: './addproducto.component.html',
  styles: [`
      .ng-invalid.ng-touched:not(form) {
        border: 1px solid #EE2B47;
      }
    `],
  providers: [DecimalPipe]
})
export class AddproductoComponent implements OnInit {
  dataTallaColor: any= [];
  isBoutique = true;
  isItemRepetido = false;
  isFormItemValid = false;
  numAleatorio = '';

  private guardando = false;
  public dtItemAdd: any = {
    idcategoria: null,
    des_categoria: null,
    idmarca: null,
    des_marca: null,
    idcolor: null,
    des_color: null,
    idtalla: null,
    des_talla: null
  };

  private el: HTMLInputElement;

  constructor(public _logisticaService: LogisticaService, private elementRef: ElementRef) {
      this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this._logisticaService.getCategorias();
    this._logisticaService.getTallas();
    this._logisticaService.getMarcas();
    this._logisticaService.getColor();
  }

  onSelectCategoria(data: any) {
    this.dtItemAdd.idcategoria = data.id ? data.id : 0;
    this.dtItemAdd.des_categoria = data === '' ? '' : data;
  }
  onSelectTalla(talla: string) {
    const rpttalla = talla.split('-');
    this.dtItemAdd.idtalla = rpttalla[0];
    this.dtItemAdd.des_talla = rpttalla[1];
    this.codigoBarras();
  }
  onSelectMarca(data: any) {
    this.dtItemAdd.idmarca = data.id ? data.id : 0;
    this.dtItemAdd.des_marca = data === '' ? '' : data;
  }
  onSelectColor(data: any) {
    this.dtItemAdd.idcolor = data.id ? data.id : 0;
    this.dtItemAdd.des_color = data === '' ? '' : data.name ? data.name : data;
  }

  codigoBarras() {
    let length = 0;
    let rpt = '';
    while (length <= 7) {
        rpt = rpt + (Math.floor(Math.random() * (9 - 0))).toString();
        length++;
    }
    this.numAleatorio = rpt;
  }

  onBlurMoneda= ( el: HTMLInputElement) => el.value = parseFloat(el.value).toFixed(2);

  borrarItem(i: number) {
    this.dataTallaColor.splice(i, 1);
    this.isFormItemValid = this.dataTallaColor.length === 0 ? false : true;
  }

  insertarItem(forma_item: NgForm) {
    if (!forma_item.valid) { return; }
    // valida si no se repite talla y cod barras
    this.isItemRepetido = false;
    this.isItemRepetido = this.validarEntradaItem(forma_item.value.codigobarras);
    if (this.isItemRepetido) { return false; }

    // console.log(this.dtItemAdd, forma_item.value)
    forma_item.value.idcolor = this.dtItemAdd.idcolor;
    this.dtItemAdd.codigobarras = forma_item.value.codigobarras;
    this.dataTallaColor.push({'idcolor': this.dtItemAdd.idcolor,
                              'des_color': this.dtItemAdd.des_color.toUpperCase(),
                              'idtalla': this.dtItemAdd.idtalla, 'talla': this.dtItemAdd.des_talla,
                              'cantidad': forma_item.value.stock, 'codigobarras': forma_item.value.codigobarras});

  }

  validarEntradaItem(codigobarras: string): boolean {
    for (let key in this.dataTallaColor) {
        if (this.dataTallaColor[key].codigobarras === codigobarras) { return true; }
    }
    return false;
  }

  validar(forma: NgForm) {
    this.guardando = true;
    forma.value.idcategoria = this.dtItemAdd.idcategoria;
    forma.value.des_categoria = this.dtItemAdd.des_categoria;
    forma.value.idmarca = this.dtItemAdd.idmarca;
    forma.value.des_marca = this.dtItemAdd.des_marca;

    const dtProducto = btoa(JSON.stringify(forma.value));
    const dtItem = btoa(JSON.stringify(this.dataTallaColor));

    this._logisticaService.guardarProducto(dtProducto, dtItem)
        .subscribe(res => {
          // console.log(res);
          if (!res.success) {alert(res.error); this.guardando = false; return; }
          forma.resetForm();
          this.dataTallaColor = [];
          this.guardando = false;
        })
  }
}
