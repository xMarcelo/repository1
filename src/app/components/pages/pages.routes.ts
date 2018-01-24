import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './logistica/productos/productos.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: HomeComponent  },
          { path: 'productos', component: ProductosComponent },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
      }
];

export const PAGES_ROUTING = RouterModule.forChild( pagesRoutes );