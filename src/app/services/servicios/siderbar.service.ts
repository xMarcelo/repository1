import { Injectable } from '@angular/core';

@Injectable()
export class SiderbarService {
  public menu: any = [
    {
      titulo: 'Logistica',
      icono: 'fa fa-cubes',
      submenu: [
        {titulo: 'Productos o Servicios', url: '/productos'},
        {titulo: 'Compras', url: '/compras'},
        {titulo: 'Produccion', url: '/produccion'},
        {titulo: 'Distribuicion', url: '/distribuicion'},
        {titulo: 'Entradas / Salidas de productos', url: '/esproductos'},
        {titulo: 'Clientes', url: '/clientes'}
      ]
    },
    {
      titulo: 'Ventas',
      icono: 'fa fa-shopping-cart',
      submenu: [
        {titulo: 'Venta', url: '/ventas'},
        {titulo: 'Proforma', url: '/proforma'},
        {titulo: 'Ofertas, descuentos promociones', url: '/ofertas'}
      ]
    },
    {
      titulo: 'Caja',
      icono: 'fa fa-usd',
      submenu: [
        {titulo: 'Ingreso / egresos', url: '/iecaja'},
        {titulo: 'Cierre de caja', url: '/cierrecaja'},
        {titulo: 'Cuentas por pagar/cobrar', url: '/cuentas'},
        {titulo: 'Reportes', url: '/reportecaja'}
      ]
    },
    {
      titulo: 'Reportes e Indicadores',
      icono: 'fa fa-bar-chart',
      submenu: [
        {titulo: 'Resumen de opertivo', url: '/resumen-operativo'},
        {titulo: 'Indicadores basicos', url: '/indicadores-basicos'},
        {titulo: 'Indicadores', url: '/cuentas'}
      ]
    },
    {
      titulo: 'Configuracion del sistema',
      icono: 'fa fa-cogs',
      submenu: [
        {titulo: 'Configuracion General', url: '/cnf-general'},
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Sucursales', url: '/sucursales'}
      ]
    }
  ];
  constructor() { }

}
