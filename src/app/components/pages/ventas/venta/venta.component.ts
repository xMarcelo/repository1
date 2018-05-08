import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LogisticaAllService, FuncionesService, MaestrosService, VentasService } from '../../../../services/service.index';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styles: []
})
export class VentaComponent implements OnInit {
 
  isUtilizarCodigoBarra: boolean = true;
  des_producto: string = '';
  precio_sel: string = 'P1';
  precio_num_sel: number = 0;
  cantidad: number = 0;
  descuento: number = 0;
  precio_total: number = 0;  
  sumaTotales: any[] = [];
  ver_listado: boolean = false;    
  resetForm: boolean = false;

  dtProductos: any[] = [];
  dtProductoSel: any[] =  [];
  dtProductosMostrar: any[] = []; 
  dtTipoComprobante: any[] = [];
  dtClienteSelect: any[] = [];
  dtCliente: any = [{
    idcliente: '',    
    dni: '',
    nombre: '',
    direccion: ''
  }];

  dtVenta: any = [{
    idtipocomprobante: 1,    
    numcomprobante: 1,
    total: this.precio_total
  }];


  @ViewChild ('txt_stock') txt_stock: ElementRef;
  @ViewChild ('txt_total') txt_total: ElementRef;
  
  // datos de pago
  dtTipoPago: any[] = [];


  constructor(private _logisticaAllService: LogisticaAllService, 
              private _maestrosService: MaestrosService, private _funcionesService: FuncionesService,
              private _ventasService: VentasService) { }

  ngOnInit() {
    if (localStorage.getItem('wp::ven_check_codebar')) {
      this.isUtilizarCodigoBarra = localStorage.getItem('wp::ven_check_codebar') === 'true' ? true : false;      
    }

    this._maestrosService.listaGenerales('tipocomprobante').subscribe(res => {
      this.dtTipoComprobante = res.data;
    });

    this.obtenerClientes();
  }  

  onChangeCheckCodeBar() {
    this.isUtilizarCodigoBarra = !this.isUtilizarCodigoBarra;    
    localStorage.setItem('wp::ven_check_codebar', this.isUtilizarCodigoBarra.toString() );    
  }
  
  onChangeDesc(val: number) {
    this.descuento = val;
    this.calcularPrecioTotal();
  }

  onChangePrecio(val: string) {
    this.precio_sel = val;    
    this.calcularPrecioTotal();    
  }


  onChangeSelectProducto(parametro: string) {
    if (parametro.length < 3) {return; }
    this._logisticaAllService.dis_loadProductos(parametro).subscribe((res: any) => {        
      this.dtProductos = res.data;      
      // con lector codigo barra      
      console.log(this.dtProductos);
      if (this.isUtilizarCodigoBarra) {

        if (this.dtProductos.length === 0) {
          this.dtProductos = null;           
        } else { 

          this.dtProductoSel = this.dtProductos[0];
          this.precio_num_sel =  this.dtProductoSel[this.precio_sel];
          this.calcularPrecioTotal();      
          if (this.isUtilizarCodigoBarra) {
            this.txt_stock.nativeElement.focus();
            this.des_producto = this.dtProductoSel['name'];
          }          
        }

        // this.onSelectProducto(this.dtProductos); 
      }
    });
  }

  calcularPrecioTotal() {    
    if (this.dtProductos.length === 0) {return; }
    this.precio_total = 0 ;
    this.cantidad = parseFloat(this.txt_stock.nativeElement.value);
    this.precio_num_sel = this.dtProductoSel[this.precio_sel];
    this.precio_total = ( this.precio_num_sel * this.cantidad ) - this.descuento;

    this.txt_total.nativeElement.value = this.precio_total.toFixed(2);    
  }

  addProductoLista() {
    const rowAdd: any = {
      idproducto_detalle: this.dtProductoSel['idproducto_detalle'],
      idproducto_stock: this.dtProductoSel['idproducto_stock'],
      des_producto: this.des_producto,
      cantidad: this.cantidad,
      tipoprecio: this.precio_sel,
      descuento: this.descuento,
      punitario: this.precio_num_sel,
      total: this.precio_total
    };
    
    const index_table = this._funcionesService.retornarIndexArray(this.dtProductosMostrar, 'idproducto_detalle',
                                                                  this.dtProductoSel['idproducto_detalle']);

    
    if ( index_table !== null ) {
      // console.log('table con index', this.dtProductosMostrar[index_table]);  
      this.dtProductosMostrar[index_table].cantidad += parseFloat(rowAdd.cantidad);
      this.dtProductosMostrar[index_table].descuento += parseFloat(rowAdd.descuento);
      this.dtProductosMostrar[index_table].total += parseFloat(rowAdd.total);
    }else {
      this.dtProductosMostrar.push(rowAdd);
    }
    
    this.sumaTotales = this._funcionesService.sumarColumnaArray( this.dtProductosMostrar, 'total,descuento,cantidad' );    
    this.nuevoProducto();
  }

  nuevoProducto() {
    this.resetForm = true;
    this.dtProductoSel = [];    
    this.des_producto = '';
    // this.precio_sel: = 'P1';
    this.precio_num_sel = 0;
    this.cantidad = 0;
    this.descuento = 0;
    this.precio_total = 0;
    setTimeout(() => {
      this.resetForm = false;
    }, 500);
  }

  cambiarVista() {
    this.ver_listado = false;
  }

  
  ////////////////////// datos de pago  ///////////////
  datosTipoPago(event) {
    // console.log('datos de pago', event);
    this.dtTipoPago = event;    
  }
  
  obtenerClientes() {
    this._maestrosService.listaGeneralesOrg('cliente').subscribe(res => {
      // console.log(res);
      this.dtClienteSelect = res.data;

    } );
  }

  buscarCliente ( dni: string ) {

  }
  /////  guardar venta

  guardarVenta() {    
    this.dtVenta[0].total = this.precio_total;    
    console.log('mostrar', this.dtProductosMostrar);
    this._ventasService.ven_guardarVenta([this.dtCliente, this.dtVenta, this.dtProductosMostrar, this.dtTipoPago['tipopago']])
    .subscribe((res) => {
      console.log(res);
    });
  }

}
