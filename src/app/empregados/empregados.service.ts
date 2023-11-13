import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';
import { EntregaFilter } from '../model/entrega';
import { DataPrevistaItem } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class EmpregadosService {

  empregadosUrl = `${environment.apiUrl}/empregado/`
  statusEmpregadoUrl = `${environment.apiUrl}/statusEmpregado/list?searchValue=`
  entregasUrl = `${environment.apiUrl}/controleEntrega/entrega`
  digitalInfoUrl = `${environment.apiUrl}/empregado/digital/info/`
  itensUrl = `${environment.apiUrl}/produto/list`
  dataPrevistaUrl = `${environment.apiUrl}/controleEntrega/dataPrevista`
  epiMotivosDeTrocaUrl = `${environment.apiUrl}/motivo/epi/list`
  materialMotivosUrl = `${environment.apiUrl}/motivo/material/list`

  caEpiUrl = `${environment.apiUrl}/caEpi/list`

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
    return this.http.get(`${this.entregasUrl}/${filter.idEmpresa}/${filter.idEmpregado}?`,{params})
  }

  getDigitalEmpregadoByIdEmpresaAndIdEmpregado(idEmpresa: number, idEmpregado: number):Observable<any>{
    return this.http.get(`${this.digitalInfoUrl}${idEmpresa}/${idEmpregado}`)
  }

  searchItem(query:string):Observable<any>{
    let params = new  HttpParams()
    params = params.set('searchValue',query)
    return this.http.get(`${this.itensUrl}`,{params})
  }

  getDataPrevistaItem(body: DataPrevistaItem):Observable<any>{
    return this.http.post(`${this.dataPrevistaUrl}`,body)
  }

  getMotivosDeTrocaEpi():Observable<any>{
    return this.http.get(this.epiMotivosDeTrocaUrl)
  }
  getMotivosDeTrocaMAterial():Observable<any>{
    return this.http.get(this.materialMotivosUrl)
  }
  getCaEpi(idProduto: number):Observable<any>{
    let params = new HttpParams()
    params = params.append('idProduto',idProduto)
    return this.http.get(this.caEpiUrl,{params})
  }

  saveEntrega(body: any): Observable<any>{
    return this.http.post(`${this.entregasUrl}`,body)
  }
}
