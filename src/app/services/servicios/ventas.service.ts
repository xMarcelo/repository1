import { Injectable } from '@angular/core';
import { URL_SERVICIOS, DIALOG_LOADING, DIALOG_LOADING_SUCCESS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ArrayBackEnd } from '../../interface/array-back-end';
import { ErroresService } from './errores.service';
import swal from 'sweetalert2';
import { FuncionesService } from './funciones.service';


@Injectable()
export class VentasService {
  url: string = URL_SERVICIOS;  

  constructor(private http: HttpClient, private _usuarioService: UsuarioService, private _errorService: ErroresService
              , private _funcionesService: FuncionesService) { }

  // ven_guardarVenta(arr_cliente) {
  //   this.guardarCliente(arr_cliente).suscribe(res => console.log('rpt idcliente', res));
  // }

  ven_guardarVenta(_arraysBD: any) {
    // guardar cliente si no tiene idcliente
    const arr_cliente = _arraysBD[0];
    const arr_venta = _arraysBD[1];
    const arr_venta_detalle = _arraysBD[2];
    const arr_tipopago = _arraysBD[3];

    const idcliente = arr_cliente[0].id;
    const url = URL_SERVICIOS + 'ventas/venta/1?token=' + this._usuarioService.token;
    // arr_cliente.idorg = this._usuarioService.usuario.idorg;
    // if ( arr_cliente[0].idcliente === '' ) {
      arr_cliente[0].idcliente = 1;
      // cliente
      let arrPOSTInsert = this._funcionesService.obtenerArrayBD('dni,nombre,direccion', arr_cliente);
      const arrayBakEndInsertCliente: ArrayBackEnd = { tabla: 'cliente',                                                      
                                                      campos: 'idorg,dni,nombre,direccion', 
                                                      valuesPOST: arrPOSTInsert, id: arr_cliente[0].idcliente};      

      // venta
      arrPOSTInsert = this._funcionesService.obtenerArrayBD('idtipocomprobante,numcomprobante,total', arr_venta);
      const arrayBakEndInsertVenta: ArrayBackEnd = { tabla: 'venta', 
                                campos: 'idtipocomprobante,numcomprobante,total,idorg,idsede,idcliente,idusuario,fecha,hora', 
                                valuesPOST: arrPOSTInsert} ;      

      // venta detalle
      arrPOSTInsert = this._funcionesService.obtenerArrayBD('idproducto_detalle,cantidad,tipoprecio,descuento,punitario,total', 
                                                            arr_venta_detalle);
      const arrayBakEndInsertVentaDetalle: ArrayBackEnd = { tabla: 'venta_detalle', 
                                campos: 'idventa,idproducto_detalle,cantidad,tipoprecio,descuento,punitario,total', 
                                valuesPOST: arrPOSTInsert};
      
      // cliente
      arrPOSTInsert = this._funcionesService.obtenerArrayBD('idsel,importeR', arr_tipopago);
      const arrayBakEndInsertTipoPago: ArrayBackEnd = { tabla: 'venta_pago_detalle', 
                                                      campos: 'idventa,idtipopago,importe', 
                                                      valuesPOST: arrPOSTInsert};

      // descontar stock      
      arrPOSTInsert = this._funcionesService.obtenerArrayBD('cantidad,idproducto_stock', arr_venta_detalle);
      const arrayBakEndUpdateStock: ArrayBackEnd = { tabla: 'producto_stock', 
                                                      campos: 'stock,idproducto_stock', 
                                                      valuesPOST: arrPOSTInsert};
                                                    

      return this.http.post(url, [arrayBakEndInsertCliente, arrayBakEndInsertVenta, 
                                  arrayBakEndInsertVentaDetalle, arrayBakEndInsertTipoPago, arrayBakEndUpdateStock])
        .map((res: any) => {
          console.log(res);
          return res;
        });
    }
  // }

}
