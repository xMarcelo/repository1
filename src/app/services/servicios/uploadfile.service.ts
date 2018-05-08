import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class UploadfileService {
  public xloading: boolean = false;
  constructor() { }

  subirArchivos ( fileListUpload: any, ruta: string, id: string ) {
    return new Promise ( ( resolve, reject)  => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      let contarFile: number = 0;

      for (const file of fileListUpload) {
        if (file && file.length !== 0) {
          const nameFile = 'F' + id +  contarFile + '.' + file[0].type.split('/')[1];
          formData.append('file', file[0], nameFile);
        }
        contarFile++;
      }

      xhr.onreadystatechange = () => {
        // console.log('states ', xhr.readyState, 'status ', xhr.status);
        this.xloading = true;
        if ( xhr.readyState === 4 ) {
          this.xloading = false;
          if ( xhr.status === 200 ) {
            resolve(JSON.parse(xhr.response));
          }else {
            // console.log('fallo subida', xhr.response);
            reject ( JSON.parse(xhr.response));
          }
        }
      };
      // otros valores del body a enviar
      formData.append('path', ruta);
      formData.append('tabla', 'producto_detalle');
      formData.append('id', id);
      formData.append('campoupdate', 'img');


      const url = URL_SERVICIOS + 'upload';
      xhr.open( 'PUT', url, true );
      xhr.send( formData );
    });



  }

}
