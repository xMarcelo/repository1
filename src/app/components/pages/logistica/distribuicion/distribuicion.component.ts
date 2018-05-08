import { Component, OnInit, group, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MaestrosService, LogisticaAllService, FuncionesService } from '../../../../services/service.index';
import { ArrayBackEnd } from '../../../../interface/array-back-end';


@Component({
  selector: 'app-distribuicion',
  templateUrl: './distribuicion.component.html',
  styles: []
})
export class DistribuicionComponent implements OnInit {
  dtSedes: any[] = [];
  dtProductos: any[] = [];
  dtProductosPasar: any[] = [];
  dtProductosMostrar: any[];
  itemSelect: any;
  selectStock: number = 1;
  cantidadValida: boolean = true;
  valCantidad: number = 0;
  lectorCodigoBarra: boolean = false;
  cantidadPedeterminado: boolean = false;
  valIdAlmacenOrigen: number = 1;
  valIdAlmacenDestino: number;
  
  @ViewChild ('txt_stock') txt_stock: ElementRef;  
  @ViewChild ('txt_codigobarra') txt_codigobarra: ElementRef;
  @ViewChild ('almacenDestino') select_almacen_destino: ElementRef;  

  constructor(private _maestrosService: MaestrosService, 
    private _logisticaAllService: LogisticaAllService,
  private _funcionesService: FuncionesService,
private renderer: Renderer2) { }

  ngOnInit() {
    this._maestrosService.Sedes().subscribe((res: any) => {
      this.dtSedes = res.data;
    });

    // this.forma = new FormGroup({
    //   producto: new FormControl(null, Validators.required),
    //   cantidad: new FormControl(null, Validators.required)
    // }, {validators: this.validaCantidad('cantidad')});
  }

  // validaCantidad(cantidad) {
  //   return (grupo: FormGroup) => {
  //     const valcant = grupo.controls[cantidad].value;
  //     if ( valcant <= this.selectStock) { return null; }
  //     return {
  //       cantidad : true
  //     };
  //   };
  // }
  // seval(event) {
  //   console.log(event);
  // }
  onSelectProducto(data: any) {
    if ( data === null ) {return; }
    this.itemSelect = data;
    this.selectStock = this.cantidadPedeterminado ? 1 : data.stock;
    this.valCantidad = this.selectStock;
    const idindex = this.itemSelect.idproducto_detalle;

    if (this.dtProductosPasar[idindex]) {
      this.itemSelect.stock = parseInt(this.itemSelect.stock, 0) - this.dtProductosPasar[idindex].cantidad;      
      if (this.itemSelect.stock <= 0) { this.itemSelect.stock = 0; this.cantidadValida = false; }
      this.selectStock = this.itemSelect.stock;
    }

    if (this.cantidadPedeterminado) {
      this.txt_codigobarra.nativeElement.value = '';      
      this.addProductoLista();
    }  
  }

  onChangeSelectProducto(parametro: string) {
    // if (parametro.length < 3) {return; }    
    this._logisticaAllService.dis_loadProductos(parametro).subscribe((res: any) => {        
      this.dtProductos = res.data;      

      // con lector codigo barra
      if (this.lectorCodigoBarra) {

        if (this.dtProductos.length === 0) {
          this.dtProductos = null;           
        } else { 
          this.dtProductos = this.dtProductos[0];
          if (!this.cantidadPedeterminado) {
            this.txt_stock.nativeElement.focus();
          }
        }

        this.onSelectProducto(this.dtProductos); 
      }
    });
  }

  onSelectAlmacenOrigen(val: number) {    
    this.valIdAlmacenOrigen = val;    
  }

  validarStock(stock: string) {
    this.valCantidad = parseFloat(stock);
    this.cantidadValida = this.valCantidad > this.selectStock ? false : true;    
  }

  addProductoLista() {
    if (!this.cantidadValida) { return; }
    let cantidadExistente = 0;
    const indexId = this.itemSelect.idproducto_detalle;
    if (this.dtProductosPasar[indexId]) {
      cantidadExistente = this.dtProductosPasar[indexId].cantidad;
    }  
    if ( !this.itemSelect.cantidad ) {this.itemSelect.cantidad = 0; }
    this.itemSelect.cantidad = cantidadExistente + this.valCantidad;
    
    this.valIdAlmacenDestino = parseInt(this.select_almacen_destino.nativeElement.value, 0);
    this.itemSelect.idsede = this.valIdAlmacenDestino;
    // restringir a stock existente
    // if (this.itemSelect.cantidad > this.itemSelect.stock ) { this.itemSelect.cantidad = this.itemSelect.stock; }
    
    this.dtProductosPasar[indexId] = this.itemSelect;
    //    
    this.dtProductosMostrar = this._funcionesService.indexarArray(this.dtProductosPasar);    
  }

  borrarProductoLista(index: number) {    
    delete this.dtProductosPasar[index];
    this.dtProductosMostrar = this._funcionesService.indexarArray(this.dtProductosPasar);
    if (this.dtProductosMostrar.length === 0) {this.dtProductosMostrar = null; }
    
  }

  guardarDistribuicion() {        
    const arrPOSTInsert = this._funcionesService.obtenerArrayBD('idproducto_detalle,idsede,cantidad', this.dtProductosMostrar);
    const arrayBakEndInsertStock: ArrayBackEnd = { tabla: 'producto_stock', 
                                                    campos: 'idproducto_stock,idproducto_detalle,idsede,stock', 
                                                    valuesPOST: arrPOSTInsert} ;
    
    const arrPOSTUpdate = this._funcionesService.obtenerArrayBD('cantidad,idproducto_stock', this.dtProductosMostrar);
    const arrayBackEndUpdateStock: ArrayBackEnd = { tabla: 'producto_stock', 
                                                 campos: 'stock, idproducto_stock', 
                                                 valuesPOST: arrPOSTUpdate} ;
        
    this._logisticaAllService.dis_guardarListaDistribuicion([arrayBakEndInsertStock, arrayBackEndUpdateStock]).subscribe(() => {
      this.nuevaDistribuicion();
    });
  }

  nuevaDistribuicion() {
    this.dtProductosMostrar = [];
    this.dtProductosPasar = [];
  }

}
