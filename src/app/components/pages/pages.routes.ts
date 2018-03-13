import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './logistica/productos/productos.component';
import { UsuariosComponent } from './maestros/usuarios/usuarios.component';

import { LoginGuardGuard } from '../../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
          { path: 'dashboard', component: HomeComponent, data: { titulo: 'Dashboard'}  },
          { path: 'productos', component: ProductosComponent, data: { titulo: 'Producto ó Servicio'} },
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usarios'} },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
      }
];

export const PAGES_ROUTING = RouterModule.forChild( pagesRoutes );
