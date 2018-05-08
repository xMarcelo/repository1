// enumera la lista cuando no tiene index correlativo 
// caso: index[5, 8, 100] => index[1,2,3]
// de esta forma se puede mostrar el numero de fila en front end

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumerarList'  
})
export class NotitemnullPipe implements PipeTransform {

  transform(value: any): any {    
    let contador: number = 1;
    return value.filter(function(item, index, array){
      item.num = contador;
      contador++;
      return item;
    });
  }

}
