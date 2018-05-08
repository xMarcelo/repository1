import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from './usuario.service';

import 'rxjs/add/operator/map';

@Injectable()
export class MaestrosService {

  constructor(private http: HttpClient, private _usuarioService: UsuarioService) {}

  Sedes() {
    const url: string = URL_SERVICIOS + 'maestros/1?token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((res: any) => {
        return res;
      });
  }

  listaGenerales(tabla: string) {
    const url: string = URL_SERVICIOS + 'maestros/2?tabla=' + tabla + '&token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((res: any) => {
        return res;
      });
  }

  listaGeneralesOrg(tabla: string) {
    const url: string = URL_SERVICIOS + 'maestros/0?tabla=' + tabla + '&token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((res: any) => {
        return res;
      });
  }

}
