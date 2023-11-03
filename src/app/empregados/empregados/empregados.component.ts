import { Component, NgZone, OnInit } from '@angular/core';
import { EmpregadosService } from '../empregados.service';
import { Table } from 'primeng/table';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Empregado } from 'src/app/model/empregado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empregados',
  templateUrl: './empregados.component.html',
  styleUrls: ['./empregados.component.scss']
})
export class EmpregadosComponent implements OnInit {
  empregados: any[] = []
  MENSAGEM = ""
  visible = false
  empregadoSelecionado: Empregado = {
    id:1,
    nome: 'João',
    empresa: 'Consetra',
    setor: 'Produção',
    matricula: '8346835409',
    sexo: 'Masculino',
    cargo:'Auxiliar de produção'
  }
  fingers: any[]| undefined;



  suggestions: Empregado[] = []


  constructor(private empregadosService: EmpregadosService, private zone: NgZone,private router: Router) {
    this.window['componentRef'] = {
      zone: this.zone,
      componentFn: [() => this.validationSuccess(), () => this.validationFail()],
      component: this
    };
  }
  ngOnInit(): void {
    this.listEmpregados()
    this.fingers = [
      { name: 'Polegar', code: 'd1' },
      { name: 'Indicador', code: 'd2' },
      { name: 'Médio', code: 'd3' },
      { name: 'Anelar', code: 'd4' },
      { name: 'Mindinho', code: 'd5' }
  ];
  }

  employerSelected(event: any){
    this.empregadoSelecionado = event
  }

  search(event: AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    for (let i = 0; i < (this.empregados as any[]).length; i++) {
      let country = (this.empregados as any[])[i];
      if (country.nome.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
  }
  this.suggestions = filtered
  }

  get window() {
    return (window as any)
  }

  validationFail() {
    this.visible = false
    this.MENSAGEM = "FALHA"
  }

  validationSuccess() {
    this.visible = false
    this.MENSAGEM = "SUCESSO"
  }

  listEmpregados() {
    this.empregados = this.empregadosService.listEmpregados()
  }

  selectFinger(empregado: any) {
    this.visible = true
    this.empregadoSelecionado = empregado
  }

  passToValidate(dedo: string) {
    this.visible = false
    let digital: any;
    this.empregadosService.findeEmpregadoDigitalByIdEmpregado(this.empregadoSelecionado.id).subscribe({
      next: (r) => {
        digital = r
        console.warn(digital)
        let bin = atob(digital[dedo]);
        let bytes = [];
        for (let i = 0; i < bin.length; i++) {
          bytes.push(bin.charCodeAt(i));
        }
        Android!.validate(bytes);
      }
    })

  }

onPageChange($event:any){

}
}

interface WebAppInterface {
  validate(fingerPrintReceived: any): any;

}

declare var Android: WebAppInterface;
