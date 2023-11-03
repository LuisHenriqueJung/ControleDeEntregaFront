import { Component, Input, OnInit } from '@angular/core';
import { Empregado } from 'src/app/model/empregado';
import { EmpregadosService } from '../empregados.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit{

  constructor(private empregadoService:EmpregadosService){}
  ngOnInit(): void {
    this.empregadoSelecionado =   {
      id:1,
      nome: 'João',
      empresa: 'Consetra',
      setor: 'Produção',
      matricula: '8346835409',
      sexo: 'Masculino',
      cargo:'Auxiliar de produção',
      nascimento:Date.now(),
      admissao:Date.now()
    }
    this.empregadoEPIs = this.empregadoService.getEmpregadoEpi()
  }

  @Input() empregadoSelecionado!: Empregado

  empregadoEPIs: any[] = []
  episParaEntrega: any[] = []


}
