import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './components/pages/pages.component';

import { HomeComponent } from './components/pages/home/home.component';
import { ProductosComponent } from './components/pages/logistica/productos/productos.component';
import { NopagefoundComponent } from './components/pages/nopagefound/nopagefound.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/login/register/register.component';


const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true} );
