import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { cleanSession } from 'selenium-webdriver/safari';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {
    console.log('servicio usuario listo para usarse');
  }

  login (dt_usuario: any) {
    const url = URL_SERVICIOS + 'login/usuario';
    const email = dt_usuario.email;
    if ( dt_usuario.email.indexOf('@') < 0 ) {
      dt_usuario.usuario = email;
      delete dt_usuario['email'];
    }

    return this.http.post( url, dt_usuario )
          .map((resp: any) => {
            localStorage.setItem('wp::id', resp.id);
            localStorage.setItem('wp::token', resp.token);
            localStorage.setItem('wp::us', JSON.stringify(resp.usuario));
          });

    if ( dt_usuario.recuerdame === true ) {
       localStorage.setItem('wp::us', email);
       localStorage.setItem('wp::us', email);
    }
  }

  crearUsuario(dt_usuario: object) {
    const url = URL_SERVICIOS + 'apigen/registrarusuario/usuario';
    console.log('data', dt_usuario);
    return this.http.post( url, dt_usuario )
      .map((resp: any) => {
        // swal('Usuario creado correctamente', {buttons: false,timer: 2000, icon: 'success'});
        return resp;
      });
  }

}
