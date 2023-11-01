import { Component, NgZone, OnInit } from '@angular/core';
import { EmpregadosService } from '../empregados.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-empregados',
  templateUrl: './empregados.component.html',
  styleUrls: ['./empregados.component.scss']
})
export class EmpregadosComponent implements OnInit {
  empregados: [] = []
  MENSAGEM = ""
  visible = false
  empregadoSelecionado : any
  fingers: any[]| undefined;


  constructor(private empregadosService: EmpregadosService, private zone: NgZone) {
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
  clear(table: Table) {
    table.clear();
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
    this.empregadosService.listEmpregados().subscribe({
      next: (empregados) => {
        this.empregados = empregados
      }
    })
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
}

interface WebAppInterface {
  validate(fingerPrintReceived: any): any;

}

declare var Android: WebAppInterface;
