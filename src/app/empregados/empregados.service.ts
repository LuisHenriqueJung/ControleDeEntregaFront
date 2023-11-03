import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpregadosService {

  lancamentosUrl = 'http://10.1.20.119:3000/empregado';
  constructor(private http: HttpClient) { }


  listEmpregados(): any[] {
    return [
      {
        nome: 'Pedro',
        empresa: 'Consetra',
        setor: 'Produção',
        matricula: '8346835409',
        sexo: 'Masculino',
        cargo:'Mecânico',

        nascimento:Date.now(),
        admissao:Date.now()
      }, {
        nome: 'Pedro',
        empresa: 'Consetra',
        setor: 'Produção',
        matricula: '8346835409',
        sexo: 'Masculino',
        cargo:'Mecânico',

        nascimento:Date.now(),
        admissao:Date.now()
      }

    ];
  }

  findEmpregadoById(id: number): Observable<any> {
    return this.http.get(`${this.lancamentosUrl}/${id}`)

  }

  findeEmpregadoDigitalByIdEmpregado(id: number): Observable<any> {
    return this.http.get(`http://10.1.20.119:3000/entrega/${id}`)

  }

  getEmpregadoEpi(){
    return [
      {
        id:1,
        dataPrevista: Date.now(),
        epi:{
          CA:3244,
          nome:'Protetor auditivo',
          marca:'LEDAN',
          validadeCA: Date.now(),
          quantidade:1,
          dataEntrega: Date.now()
        },
        motivo: 'Teste'
      },{
        id:2,
        dataPrevista: Date.now(),
        epi:{
          CA:34344,
          nome:'òculos de seguransça',
          marca:'LEDAN',
          validadeCA: Date.now(),
          quantidade:1,
          dataEntrega: Date.now()
        },
        motivo: 'Teste'
      }
    ]
  }
}
