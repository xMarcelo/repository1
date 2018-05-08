import { Injectable } from '@angular/core';
import { URL_SERVICIOS, DIALOG_LOADING, DIALOG_LOADING_SUCCESS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ArrayBackEnd } from '../../interface/array-back-end';
import { ErroresService } from './errores.service';
import swal from 'sweetalert2';

@Injectable()
export class LogisticaAllService {
  url: string = URL_SERVICIOS;  

  constructor(private http: HttpClient, private _usuarioService: UsuarioService, private _errorService: ErroresService) { }

  // distribuicion
  dis_loadProductos(parametro: string, idalmacen: number = 1) {
    const url = URL_SERVICIOS + 'logistica/distribuicion/1?desde=0&filas=8&token=' + this._usuarioService.token;
    const otrosDatos: any = {
      paginacion_desde: 0,
      paginacion_filas: 10,
      idalmacen: idalmacen,
      parametro: parametro
    };
    return this.http.get(url, { headers: {'otrosdatos': JSON.stringify(otrosDatos)}});
      // .map((res: any) => {
      //   return res;
      // });7
  }

  // guardar lista de distribuicion  
  dis_guardarListaDistribuicion(arrBakEnd: ArrayBackEnd[]) {
    swal(DIALOG_LOADING);
    let url = URL_SERVICIOS + 'logistica/distribuicion/2?token=' + this._usuarioService.token;
    return this.http.post(url, arrBakEnd[0])
    .map(() => {
      
      // guardar update de cadas stock
      url = URL_SERVICIOS + 'logistica/distribuicion/3?token=' + this._usuarioService.token;
      return this.http.post(url, arrBakEnd[1])      
      .map(() => { 
        console.log('paso update');
        swal(DIALOG_LOADING_SUCCESS); 
      })
      .catch( err => {
        this._errorService.manejador(err, true);
        return Observable.throw( err );
      }).subscribe();

    })
    .catch( err => {
      this._errorService.manejador(err, true);
      return Observable.throw( err );
    });    
  }
}
