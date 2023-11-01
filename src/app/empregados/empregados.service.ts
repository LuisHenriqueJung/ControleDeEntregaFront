import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpregadosService {

  lancamentosUrl = 'http://10.1.20.119:3000/empregado';
  constructor(private http: HttpClient) { }


  listEmpregados(): Observable<any> {
    return this.http.get(`${this.lancamentosUrl}`)
  }

  findEmpregadoById(id: number): Observable<any> {
    return this.http.get(`${this.lancamentosUrl}/${id}`)

  }

  findeEmpregadoDigitalByIdEmpregado(id:number): Observable<any>{
    return this.http.get(`http://10.1.20.119:3000/entrega/${id}`)
  }
}
