import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresaUrl = `${environment.apiUrl}/empresa`
  localDeEstoqueUrl = `${environment.apiUrl}/localEstoque/list`
  setorUrl = `${environment.apiUrl}/setor/list?`

  constructor(private http: HttpClient) { }

  getAllEmpresas(filter:string):Observable<any>{
    return this.http.get(`${this.empresaUrl}/list?fields=denominacao,razaoSocial&searchValue=${filter}`)

  }

  getLocaisDeEstoque():Observable<any>{
    return this.http.get(`${this.localDeEstoqueUrl}`)
  }

  filterSetores(idEmpresa: number, filter?: string):Observable<any>{
    let url = this.setorUrl
    if(idEmpresa)
      url += `&idEmpresa=${idEmpresa}`
    if(filter)
      url += `&searchValue=${filter}`
    return this.http.get(url)
  }
}
