import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ErroresService {  
  private _msj_error: any = {estado: false, mensaje: '', };
  private msj_erorr = new BehaviorSubject <any>(this._msj_error);
  public msj_erorr$ = this.msj_erorr.asObservable();
    

  constructor() {}

  public manejador(err: any, alert: boolean) {
    this._msj_error.estado = false;
    this._msj_error.mensaje = '';
    this.msj_erorr.next(this._msj_error);

    if (alert) {
      swal('Algo fallo', err.error.mensaje.toLowerCase(), 'error');
    } else {
      this._msj_error.estado = true;
      this._msj_error.mensaje = err.error.mensaje;
      this.msj_erorr.next(this._msj_error);
    }
  }

}
