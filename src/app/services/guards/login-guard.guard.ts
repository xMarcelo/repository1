import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor ( private _usuarioService: UsuarioService, private router: Router ) {}
  canActivate() {
    if ( this._usuarioService.estaLogueado() ) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
