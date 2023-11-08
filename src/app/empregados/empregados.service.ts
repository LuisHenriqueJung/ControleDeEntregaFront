import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class EmpregadosService {

  empregadosUrl = `${environment.apiUrl}/empregado/`
  statusEmpregadoUrl = `${environment.apiUrl}/statusEmpregado/list?searchValue=`

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

  getEmpregadoEpi() {
    return [
      {
        id: 1,
        dataPrevista: Date.now(),
        epi: {
          CA: 3244,
          nome: 'Protetor auditivo',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Cachorro comeu'
      }, {
        id: 2,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Estragou na meiota'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }, {
        id: 3,
        dataPrevista: Date.now(),
        epi: {
          CA: 34344,
          nome: 'Óculos de segurança',
          marca: 'LEDAN',
          validadeCA: Date.now(),
          quantidade: 1,
          dataEntrega: Date.now()
        },
        motivo: 'Furo'
      }
    ]
  }
}
