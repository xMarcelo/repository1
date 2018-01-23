import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'; // Map

@Injectable()
export class FrasesService {
  private urlApiFrase="https://viudanegra.com.pe/API2/api_frase.php";
  constructor(private http:Http) { }

  getFrase(){
    return this.http.get(this.urlApiFrase).map(data=>data.json().datos[0]);
  }

}
