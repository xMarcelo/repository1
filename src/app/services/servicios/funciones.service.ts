// funciones generales

import { Injectable } from '@angular/core';

@Injectable()
export class FuncionesService {

  constructor() { }

  buscarEnArray ( objeto: any, campo: string, parametro: any ): any {    
    const esNumero: boolean = !isNaN(parametro);
    return objeto.filter(x => {
      if (esNumero) {
        return esNumero ? parseInt(x[campo], 0) === parseInt(parametro, 0) : x[campo].toLowerCase() === parametro.toLowerCase();
      }      
    });
  }

  // retorna el index del item buscado
  retornarIndexArray ( objeto: any, campo: string, parametro: any ): number {    
    if (objeto.length === 0) {return null; } 

    const esNumero: boolean = !isNaN(parametro);    
    let rpt: number = null;

    for (let index = 0; index < objeto.length; index++) {
      const x = objeto[index];
      if ( esNumero ) {
        if ( parseInt(x[campo], 0) === parseInt(parametro, 0) ) {
          rpt = index;
          break;
        }
      } else if ( x[campo].toLowerCase() === parametro.toLowerCase() ) {
        rpt = index;
        break;
      }    
    }

    return rpt;
  }

  // sumar valores de columnas ejemplo tabla columna total
  // columnas sepradas por coma
  // delvuelve un arr con los nombres de columnas{total: 100, descuento: 5 ...}
  sumarColumnaArray ( arr: any, columna: any) {    
    const arrRPT: any[] = [];    
    columna = columna.toLowerCase();

    for (const item of arr) {      
      Object.keys(item).map((key) => {                
        const non_key = key.toLowerCase();
        // buscamos si el nombre de la llave coicide con el numbre de la columna y agregamos
        if ( columna.indexOf(non_key) !== -1 ) {
          if ( isNaN(arrRPT[non_key]) ) { arrRPT[non_key] = 0; }
          arrRPT[non_key] += parseFloat(item[key]);
        }
      });
    }

    return arrRPT;
  }

  // ordernar el index 5 , 20 => 0,1 
  indexarArray(objeto: any): any {
    return objeto.filter(function(item, index, array){
      return item;
    });
  }
  
  // obtener un array para enviar al back-end INSERT || UPDATE 
  // ordenado segun el orden de los campos RECIBIDO EJEMPLO
  // var sql = "INSERT INTO Test (name, email, n) VALUES ?";
  // var values = [
  //     ['demian', 'demian@gmail.com', 1],
  //     ['john', 'john@gmail.com', 2]
  // ];

  obtenerArrayBD (_campos: string, _array: any): any {
    if ( !_array || _array.length === 0 ) { return []; }
    const array_rpt: any[] = [];
    let array_row: any[] = [];
    const campos = _campos.split(',');

    for (const it of _array) {    
      array_row = [];
      for (const campo of campos) {        
        array_row.push(it[campo.trim()]);         
      }      
      array_rpt.push(array_row);
    }

    return array_rpt;
  }


  fechaActualISO() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // enero es 0!
    const yyyy = today.getFullYear();

    let dia: string = '';
    let mes: string = '';
    
    if (dd < 10) {
      dia = '0' + dd;
    } 

    if (mm < 10) {
      mes = '0' + mm; 
    } 
     
    return yyyy + '-' + mes + '-' + dia;
  }



}
