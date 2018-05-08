// filtra array por campo y parametro enviados
// ejemplo si en una lista se muestra solo la sede AAAA o todas menos la sede AAA 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarArray'
})
export class FiltrarArrayPipe implements PipeTransform {
  //  campo: string, parametro: string igualar
  transform(items: any[], arg?: any): any[] {
    if (!items) {return []; }
    if (!arg) {return items; }
    const campo = arg[0];
    const parametro = String(arg[1]);
    const igualar: boolean = arg[2];
    // const esNumero: boolean = !isNaN(parametro);

    // si es numero
    // if ( !esNumero ) {
    //   parametro = parametro.toLowerCase();
    // }else {
    //   parametro = parseInt(parametro, 0);
    // }

    return items.filter( it => {      
      const valIt = it[campo];
      // return it.toLowerCase().includes(parametro);
      // if ( esNumero ) {        
      //   return igualar ? parseInt(it[campo], 0) === parametro : it[campo] !== parametro;
      // }else { // si es string
      //   return igualar ? it[campo].toLowerCase() === parametro : it[campo].toLowerCase() !== parametro;
      // }
      return igualar ? parametro.indexOf(valIt) > -1 : parametro.indexOf(valIt) === -1;
    });
  }
}
