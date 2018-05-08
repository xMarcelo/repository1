import { Component, OnInit, ViewChildren, Query, Input, ViewChild, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { LogisticaService, PrintcodbarraService } from '../../../../services/service.index';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; // Map
import swal from 'sweetalert2';

import { UploadfileService } from '../../../../services/servicios/uploadfile.service';
import { DIALOG_LOADING } from '../../../../config/config';


@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styles: []
})
export class ListadoProductosComponent implements OnInit {
  @ViewChildren('check') check: QueryList<ElementRef>;

  public isGuardandoLista = false;
  public itemSel: any;
  public itemSiImg: boolean = false;
  public itemImgArray: any[] = [];
  public itemsPrintCodBarra: any[] = [];  // items para imprimir codigo de barra

  private fileListUpload: any[] = [];
  private fotos: any[]= [];
  private dataCambios: any[]= [];

  formData: FormData = new FormData();

  constructor(public _logisticaService: LogisticaService,
    private http: Http,
    private _uploadfileService: UploadfileService,
    private _printcodbarraService: PrintcodbarraService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this._logisticaService.getListadoProductos();
  }
  onBlurMoneda = ( el: HTMLInputElement) => el.value = parseFloat(el.value).toFixed(2);

  detectaCambios(item: any) {
    for (const key in this.dataCambios) {
        if (this.dataCambios[key].idproducto_stock === item.idproducto_stock) {
          this.dataCambios[key].idproducto_detalle = item.idproducto_detalle;
          this.dataCambios[key].precio1 = item.precio1;
          this.dataCambios[key].precio2 = item.precio2;
          this.dataCambios[key].stock = item.stock;
          return false;
        }
    }
    this.dataCambios.push({'idproducto': item.idproducto, 'idproducto_detalle': item.idproducto_detalle,
                            'idproducto_stock': item.idproducto_stock, 'precio1': item.precio1,
                            'precio2': item.precio2, 'stock': item.stock, 'idsede': item.idsede});
  }

  guardarCambios() {
    const dtProducto = btoa(JSON.stringify(this.dataCambios));
    this.isGuardandoLista = true;
    this._logisticaService.guardarCambisListaProductos(dtProducto).subscribe(data => {
      if (!data.success) {alert(data.error); this.isGuardandoLista = false; return; }
      this.isGuardandoLista = false;
      this.dataCambios = [];
      this._logisticaService.getListadoProductos();
    });
  }

  xupload(event, index: number) {
    this.fileListUpload[index] = event.target.files;
  }

  subirImage() {
      // swal(showConfirmButton: false, icon: ICON_MSJ_TIMER, closeOnClickOutside: false);
      swal(DIALOG_LOADING);
      this._uploadfileService.subirArchivos(this.fileListUpload, 'uploads', this.itemSel.idproducto_detalle )
      .then((res: any) => {
        // console.log(res);
        // swal('Listo', 'Archivo subido correctamente', {buttons: false, timer: 1500, icon :'success'});
       swal({type: 'success', title: 'Listo', text: 'Archivo subido correctamente', showConfirmButton: false, timer: 1500});
      })
      .catch((res: any) => {
        swal({title: 'Error', text: 'Error al intentar subir archivo: ' + res.mensaje, type: 'warning'});
        // swal('Hello world!');
      });
  }

  itemSelect(item: any) {
    this.itemSel = item;
    if (item.img) {
      this.itemSiImg = true;
      this.itemImgArray = item.img.split(',');
      // console.log(this.itemImgArray);
    }else {
      this.itemSiImg = false;
      this.itemImgArray = [];
    }

    console.log(item);
  }

  imprimirCodBarra() {
    let contador: number = 0;
    this.itemsPrintCodBarra = [];
    this.check.forEach(check => {
      if (!check.nativeElement.checked) { return; }
      const dataid: number = check.nativeElement.attributes['data-id'].value;
      this.itemsPrintCodBarra[contador] = this._logisticaService.datosBusquedaListado[dataid];
      contador++;
    });


    setTimeout(() => {
      swal.close();
      this._printcodbarraService.print('codbarraprint');
    }, 1800, swal(DIALOG_LOADING));
  }

  // seleccionar todos los items para impresion de codigo de barra
  SelectAllItems() {
    this.check.forEach(check => {
      this.renderer.selectRootElement(check.nativeElement).click();
    });
  }
}
