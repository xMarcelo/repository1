import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/service.index';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  dt_usuarios: any[] = [];
  desde: number = 0;
  filas: number = 10;
  condiciones: string = 'where estado=0';
  total_registros: number;
  loading: boolean = false;

  constructor(public _usuarioService: UsuarioService) { }
  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.loading = true;
    this._usuarioService.loadUsuarios(this.desde, this.filas, this.condiciones)
      .subscribe((resp: any) => {
          this.loading = false;
          console.log(resp);
          this.dt_usuarios = resp.data;
          this.total_registros = resp.count;
        });
  }

  movePag(valor: number) {
    const desde = this.desde + valor;
    if ( desde >= this.total_registros ) { return; }
    if ( desde < 0 ) { return; }
    this.desde = desde;
    this.cargarUsuario();
  }
  buscar(termino: string) {
    // if (termino.length <= 3 ) { return; }
    this.desde = 0;
    this.condiciones = 'where estado=0 and concat(nombres, usuario, email) like "%' + termino + '%"';
    this.cargarUsuario();
  }
}
