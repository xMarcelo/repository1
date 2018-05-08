import { NgModule } from '@angular/core';
import { ImgPipe } from './img.pipe';
import { DeNumAarrayPipe } from './de-num-aarray.pipe';
import { NotitemnullPipe } from './notitemnull.pipe';
import { FiltrarArrayPipe } from './filtrar-array.pipe';

@NgModule({
  declarations: [
    ImgPipe,
    DeNumAarrayPipe,
    NotitemnullPipe,
    FiltrarArrayPipe
  ],
  exports: [
    ImgPipe,
    DeNumAarrayPipe,
    NotitemnullPipe,
    FiltrarArrayPipe
  ]
})
export class PipesModule { }
