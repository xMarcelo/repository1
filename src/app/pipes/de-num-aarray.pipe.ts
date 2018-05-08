// transforma numeros a array
// para repetir cantidades en un loop dentro de ngfor que solo acepta objetos
// ejemplo que un array tenga un item con cantidad 3 y se requiere 3 subitems // caso: al imprimir codigo de barras


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deNumAarray'
})
export class DeNumAarrayPipe implements PipeTransform {

  transform(value: number): any {
    const ArrayReturn: any [] = [];
    let index: number = 0;
    if (value === undefined) { return ArrayReturn; }
    
    while (value > 0) {
      ArrayReturn[index] = [];
      index++;
      value--;
    }
    return ArrayReturn;
  }

}
