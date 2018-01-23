import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './components/pages/pages.component';

import { HomeComponent } from './components/pages/home/home.component';
import { ProductosComponent } from './components/pages/logistica/productos/productos.component';
import { NopagefoundComponent } from './components/pages/nopagefound/nopagefound.component';
import { LoginComponent } from './components/pages/login/login.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: HomeComponent  },
      { path: 'productos', component: ProductosComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NopagefoundComponent }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true} );
