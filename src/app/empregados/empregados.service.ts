import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { EmpregadoFilter } from '../model/empregado';
import { EntregaFilter } from '../model/entrega';

@Injectable({
  providedIn: 'root'
})
export class EmpregadosService {

  empregadosUrl = `${environment.apiUrl}/empregado/`
  statusEmpregadoUrl = `${environment.apiUrl}/statusEmpregado/list?searchValue=`
  entregasUrl = `${environment.apiUrl}/controleEntrega/entregas/`
  digitalInfoUrl = `${environment.apiUrl}/empregado/digital/info/`

  lancamentosUrl = 'http://10.1.20.119:3000/empregado';
  constructor(private http: HttpClient) { }

  findeEmpregadoDigitalByIdEmpregado(id: number): Observable<any> {
    return this.http.get(`http://10.1.20.119:3000/entrega/${id}`)
  }

  getEmpregadosByIdEmpresa(idEmpresa: number): Observable<any> {
    return this.http.get(`${this.empregadosUrl}list?&idEmpresa=${idEmpresa}`)
  }

  filterEmpregado(idEmpresa: number, filter: string,status: any[], idSetor: number): Observable<any> {
    let url = this.empregadosUrl + 'list?'
    if(status){
      let statusFilter = ''
      status.forEach((status:any) =>{
        statusFilter += status.id+','
      })
      url += `&statusEmpregado=${statusFilter}`
    }
    if (idEmpresa)
      url += `&idEmpresa=${idEmpresa}`
    if (idSetor)
      url += `&idSetor=${idSetor}`
    if (filter)
      url += `&searchValue=${filter}`
    return this.http.get(`${url}`)
  }

  getStatusEmpregado():Observable<any>{
    return this.http.get(`${this.statusEmpregadoUrl}`)
  }

  findEmpregadoByIdEmpresaAndIdEmpregado(idEmpresa: number, idEmpregado:number):Observable<any>{
    return this.http.get(`${this.empregadosUrl}info/${idEmpresa}/${idEmpregado}`)
  }

  getEmpregadoEpi(filter: EntregaFilter):Observable<any> {
    var params = new  HttpParams()
    if(filter?.searchvalue)
      params = params.set('searchValue',filter.searchvalue)
    params = params.set('page', filter.page)
    params = params.set('size', filter.size)
    params = params.set('sort','nome,desc')
    return this.http.get(`${this.entregasUrl}${filter.idEmpresa}/${filter.idEmpregado}?`,{params})
  }

  getDigitalEmpregadoByIdEmpresaAndIdEmpregado(idEmpresa: number, idEmpregado: number):Observable<any>{
    return this.http.get(`${this.digitalInfoUrl}${idEmpresa}/${idEmpregado}`)
  }
}
