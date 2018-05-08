import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(value: any): any {
    const urlimg = URL_SERVICIOS + 'img/' + value;
    console.log(urlimg);
    return urlimg;
  }

}
