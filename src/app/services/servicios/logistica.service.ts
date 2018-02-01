import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx'; // Map

@Injectable()
export class LogisticaService {
  private dataProductos: any[];
  private urlApiLogistica = 'http://localhost/projects/webpyme/src/app/api/log.logistica.php';

  dataCategoria: any[]= [];
  dataTallas: any[]= [];
  dataMarcas: any[]= [];
  dataColor: any[]= [];
  dataListadoProductos: any= [];
  datosBusquedaListado: any[];

  constructor(private http: Http) { }

  // all categorias
  getCategorias() {
    const url = `${this.urlApiLogistica}?op=1`;
    this.http.get(url).map(res => res).subscribe(res => this.dataCategoria = res.json().datos);
  }
  // all tallas
  getTallas() {
    const url = `${this.urlApiLogistica}?op=2`;
    this.http.get(url).map(res => res).subscribe(res => this.dataTallas = res.json().datos);
  }
  // all marcas
  getMarcas() {
    const url = `${this.urlApiLogistica}?op=3`;
    this.http.get(url).map(res => res).subscribe(res => this.dataMarcas = res.json().datos);
  }
  // all color
  getColor() {
    const url = `${this.urlApiLogistica}?op=4`;
    this.http.get(url).map(res => res).subscribe(res => this.dataColor = res.json().datos);
  }

  // guardar nuevo Producto
  guardarProducto(dataProducto: string, dataItem: string) {
    const url = `${this.urlApiLogistica}?op=5&dtP=${dataProducto}&dtI=${dataItem}`;
    return this.http.get(url).map(res => res.json());
  }


  // TODO: PARA LISTADO DE PRODCUTOS
  getListadoProductos(){
    let url=`${this.urlApiLogistica}?op=6`;
    // return this.http.get(url).map(res=>res.json());
    this.http.get(url).map(res=>res).subscribe(res=>{
      this.dataListadoProductos=res.json().datos;
      this.datosBusquedaListado=this.dataListadoProductos;});
  }

  buscarListadoProductos(val:string){
    this.datosBusquedaListado=this.dataListadoProductos.filter(v => v.txt_buscar.toLowerCase().indexOf(val.toLowerCase()) > -1)
  }

  guardarCambisListaProductos(data:string){
    const url =`${this.urlApiLogistica}?op=7&dtP=${data}`;
    return this.http.get(url).map((res) => res.json());
  }

}
