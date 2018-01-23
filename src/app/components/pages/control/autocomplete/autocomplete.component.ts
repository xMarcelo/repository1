import {Component,Input, Output,EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent {
  @Input() placeholder:string="";
  @Input() dataComplete:any[]=[];
  @Input() required:boolean=false;
  //@Output()  model: any[];
  @Output() onSelectItem: EventEmitter<any> = new EventEmitter();
  public model: any[];


  //formatter = (result: string) => result.toUpperCase();
  formatter = (x: {name: string}) => x.name.toUpperCase();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term =>term === '' ? [] : this.dataComplete.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


  onChange(){
    setTimeout(()=>{
      let itemBusqueda:any[]=[];
      //si es string vuelve a buscar agarra la primer coicidencia exacta
      //esto para evitar redundancia en bd
      if(typeof this.model==='string'){
        let valModel:string=this.model;
        itemBusqueda=this.dataComplete.filter(v => v.name.toLowerCase()===valModel.toLowerCase()).slice(0, 1)
        this.model=itemBusqueda.length>0?itemBusqueda[0]:this.model;
      }
      // console.log('busqueda',typeof itemBusqueda);
      // console.log('f',itemBusqueda);
      // console.log('m',this.model);
      this.onSelectItem.emit(this.model)
    },100);
  }

  onItemSelect($event){
    setTimeout(()=>{this.model=$event.item; this.onSelectItem.emit($event.item)},10);
  }
}
