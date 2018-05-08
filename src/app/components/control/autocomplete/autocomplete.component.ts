import { Component, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('autocomplete-campo-mostrar') campo_mostrar: string = 'name'; // campo a mostrar default name  
  // tslint:disable-next-line:no-input-rename
  @Input('autocomplete-class') clases: string = 'form-group form-control text-uppercase';  
  @Input() placeholder: string = '';
  @Input() dataComplete: any[] = [];
  @Input() required: boolean = false;    

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectItem: EventEmitter<any> = new EventEmitter();
  public model: any[];

  private el: ElementRef;

  constructor(private _el: ElementRef) {
    this.el = this._el;
}

  formatter = (x: {name: string}) => x[this.campo_mostrar].toUpperCase();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? [] : this.dataComplete.filter(v =>  v[this.campo_mostrar].toLowerCase().indexOf(term.toLowerCase()) > -1)
      .slice(0, 10))

      // {
      //   const camp_mostrar = v['idcliente'] + ' ' + v['name'];        
      //   return camp_mostrar.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      // }

      // v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      // .map(term => {
      //   if (term === '') {
      //     return [];
      //   }else {          
      //     const dtArray = this.dataComplete.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      //     if ( dtArray.length <= 1 ) {
      //       console.log('aaaa', dtArray);
      //       this.onSelectItem.emit(dtArray);
      //       this.el.nativeElement.nextElementSibling.focus();
      //       return [];
      //     }          
      //     return dtArray;
      //   }
      //   // return term === '' ? [] : this.dataComplete.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      // })      


  onChange() {
    setTimeout(() => {
      let itemBusqueda: any[] = [];
      // si es string vuelve a buscar agarra la primer coicidencia exacta
      // esto para evitar redundancia en bd
      if (typeof this.model === 'string') {
        const valModel: string = this.model;
        itemBusqueda = this.dataComplete.filter(v => {          
          return v[this.campo_mostrar].toLowerCase() === valModel.toLowerCase();
        }).slice(0, 1);
        this.model = itemBusqueda.length > 0 ? itemBusqueda[0] : this.model;
      }
      // console.log('busqueda', typeof itemBusqueda);
      // console.log('f', itemBusqueda);
      // console.log('m', this.model);  
      this.onSelectItem.emit(this.model);      
    }, 100);
  }

  onItemSelect($event) {
    setTimeout(() => {
      this.model = $event.item;
      this.onSelectItem.emit($event.item);
    } , 10);
  }

  myMethod () {
    // console.log('fuera');
  }
}
