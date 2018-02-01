import { Component, OnInit, ElementRef } from '@angular/core';
import { LogisticaService } from '../../../../services/service.index';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx'; // Map


@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styles: []
})
export class ListadoProductosComponent implements OnInit {
  public isGuardandoLista = false;
  private fotos: any[]= [];
  private dataCambios: any[]= [];
  formData: FormData = new FormData();

  constructor(public _logisticaService: LogisticaService, private elementRef: ElementRef, private http: Http) { }

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


  updateFile(file, id: number) {
    this.fotos[id] = {'id': id, 'foto': file.target.files[0].name, 'file': file.target[0] };
    console.log(this.fotos);
  }

  subirFotos() {
    for (const key in this.fotos) {
      if (this.fotos.hasOwnProperty(key)) {
        const file = this.fotos[key].file;
        const name = file.name;
        const size = file.size;
        const type = file.type;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/projects/webpyme/src/app/api/upload.php',true);

        xhr.setRequestHeader( 'Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-File-Name', file.name);

        xhr.send(file);
      }
    }

    // for (const key in this.fotos) {
    //   const file = this.fotos[key].file;
    //   let name = file.name;
    //   let size = file.size;
    //   let type = file.type;

    //   let xhr = new XMLHttpRequest();

    //   xhr.open('POST','http://localhost/projects/webpyme/src/app/api/upload.php',true);

    //   xhr.setRequestHeader("Cache-Control", "no-cache");
    //   xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    //   xhr.setRequestHeader("X-File-Name", file.name);

    //   xhr.send(file);
    // }
  }



  onFileChange(event) {
     //
     // if(event.target.files.length > 0) {
     //   let body=new FormData();
     //   let file = event.target.files[0];
     //   console.log(file);
     //   body.append('X-File-Name',file,file.name);
     //   this.http.post('http://localhost/projects/webpyme/src/app/api/upload.php',body)
     //      .subscribe(res=>console.log(res));
     // }

     // let file = event.target.files[0];
     // let body=new FormData();
     // let xhr = new XMLHttpRequest();
     //
     // body.append('X-File-Name',file,file.name);
     //
     // xhr.open('PUT','http://localhost/projects/webpyme/src/app/api/upload.php',true);
     // //xhr.setRequestHeader("Cache-Control", "no-cache");
     // //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
     // //xhr.setRequestHeader("X-File-Name", file.name);
     // xhr.send(file);

     const file = event.target.files[0];
     const formData = new FormData();
     formData.append('images', file, file);
     console.log(formData);
     const body = {images: file};
     console.log(body);
     this.http
         .post('http://localhost/projects/webpyme/src/app/api/upload.php', body)
         .subscribe((data) => console.log(data));

    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost/projects/webpyme/src/app/api/upload.php', formData, options)
        .subscribe();


   }

   uploadFile(event) {
    const elem = event.target;
    const file: File = elem.files[0];
    const uploadUrl = 'http://localhost/projects/webpyme/src/app/api/upload.php';
    if ( elem.files.length > 0 ) {
      console.log(elem.files[0]);
      const formData = new FormData();
      const body = {'file': elem.files[0]};
      formData.append('file', elem.files[0]);

      const fd = new FormData();
        fd.append('file', file);
        this.http.post(uploadUrl, fd).subscribe(res => console.log(res));


      this.http.post('http://localhost/projects/webpyme/src/app/api/upload.php', formData)
      .subscribe((data) => {
        console.log('Got some data from backend ', data);
      }, (error) => {
        console.log('Error! ', error);
      });

   //    let xhr = new XMLHttpRequest();
   //    //
   //    xhr.setRequestHeader("Cache-Control", "no-cache");
   // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
   // xhr.setRequestHeader("X-File-Name", elem.files[0].name);
   //    //
   //     xhr.open('POST','http://localhost/projects/webpyme/src/app/api/upload.php',true);
   //     xhr.send(elem.files[0]);
    }
  }

  xupload($event) {
    const fileList: FileList = $event.target.files;
    if ( fileList.length > 0) {
        const file: File = fileList[0];

        this.formData.append('file[]', file, file.name);
        // let headers = new Headers();
        // /** No need to include Content-Type in Angular 4 */
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${uploadUrl}`, this.formData, options).subscribe(data=>console.log(data));
    }


  }

  subirImage() {
    const uploadUrl = 'http://localhost/projects/webpyme/src/assets/upload.php';
    const headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });
    this.http.post(`${uploadUrl}`, this.formData, options).subscribe(data => console.log(data));
  }
}
