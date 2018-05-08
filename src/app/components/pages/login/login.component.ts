import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService, ErroresService } from '../../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public loading_icon: boolean= false;
  public errores: any;
  constructor(private _usuarioService: UsuarioService, private router: Router, private _erorrService: ErroresService) { }

  ngOnInit() {
    this._erorrService.msj_erorr$.subscribe((res) => {
      this.errores = res;
    });
  }

  login(forma: NgForm) {
    console.log('forma', forma.value);

    const Usuario: any = forma.value;
    console.log(Usuario);
    this._usuarioService.login(Usuario)
      .subscribe(ok => this.router.navigate(['/dashboard']));
  }
}
