

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  constructor(private http: HttpClient) { }

  lancamentosUrl = 'http://10.1.20.119:3000/entrega/';

  salvarDigital(digital: any): Observable<any> {
    var body = digital
    return this.http.post(`${this.lancamentosUrl}cadastrar`, body)
  }
}


