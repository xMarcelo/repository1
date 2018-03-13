import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
  usuario: any;
  token: string;
  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
    // console.log('servicio usuario listo para usarse');
  }

  logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('wp::token');
    localStorage.removeItem('wp::us');
    localStorage.removeItem('wp::id');

    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('wp::token') ) {
      this.token = localStorage.getItem('wp::token');
      this.usuario = JSON.parse(localStorage.getItem('wp::us'));
    }else {
      this.token = '';
      this.usuario = null;
    }
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
            localStorage.setItem('wp::id', resp.idusuario);
            localStorage.setItem('wp::token', resp.token);
            localStorage.setItem('wp::us', JSON.stringify(resp.usuario));

            this.token = resp.token;
            this.usuario = resp.usuario;
          });
  }

  crearUsuario(dt_usuario: object) {
    const url = URL_SERVICIOS + 'apigen/registrarusuario/usuario';
    // console.log('data', dt_usuario);
    return this.http.post( url, dt_usuario )
      .map((resp: any) => {
        // swal('Usuario creado correctamente', {buttons: false,timer: 2000, icon: 'success'});
        return resp;
      });
  }

  loadUsuarios(desde: number = 0, filas: number = 10, condiciones: string = '') {
    const url = URL_SERVICIOS + 'apigen/usuario?desde=' + desde + '&filas=' + filas;
    console.log(url);
    return this.http.get(url, { headers: new HttpHeaders().set('condiciones', condiciones) });
  }

}
