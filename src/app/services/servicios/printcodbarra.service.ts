import { Injectable } from '@angular/core';

@Injectable()
export class PrintcodbarraService {

  constructor() { }

  print(print_seccion: string) {
    let printContents, popupWin;
    printContents = document.getElementById(print_seccion).innerHTML;
    popupWin = window.open(' ', 'popimpr');
    popupWin.document.write(`<html>
      <head>
        <link rel="stylesheet" type="text/css" href="style.css" />
        <link rel="stylesheet" type="text/css" media="screen,print" href="assets/b4/css/bootstrap.min.css">
      </head>
      <body onload="window.print();window.close()">${printContents}</body></html>`);

    popupWin.document.close();
  }
}
