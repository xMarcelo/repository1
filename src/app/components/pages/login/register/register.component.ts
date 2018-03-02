import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/service.index';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  public forma: FormGroup;
  public loading: boolean= false;
  constructor(public _usuarioService: UsuarioService) { }

  PasswordSonIguales(campo1: string, campo2: string) {
      return ( grupoForma: FormGroup ) => {
        const pass1 = grupoForma.controls[campo1].value;
        const pass2 = grupoForma.controls[campo2].value;

        if ( pass1 === pass2 ) {
          return null;
        }
        return{
          PasswordSonIguales: true
        };
      };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombres: new FormControl( '', Validators.required ),
      email: new FormControl( '', [Validators.required, Validators.email] ),
      password: new FormControl( '', Validators.required ),
      password2: new FormControl( '', Validators.required )
    }, {validators: this.PasswordSonIguales('password', 'password2')});
  }

  registrarUsuario() {
    console.log('valido', this.forma.valid);
    console.log(this.forma.value);
    // quitamos password2
    const usuario: object = this.forma.value;
    delete usuario['password2'];

    this.loading = true;
    this._usuarioService.crearUsuario(this.forma.value)
      .subscribe(res => {
        this.loading = false;
        console.log(res);
      });
  }
}
