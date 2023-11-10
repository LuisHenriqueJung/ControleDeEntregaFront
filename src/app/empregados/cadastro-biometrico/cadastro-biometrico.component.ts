import { Component, NgZone, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { EmpregadosService } from '../empregados.service';
import { EmpregadosDigital } from 'src/app/model/empregado';
import { media } from 'src/app/app.component';

@Component({
  selector: 'app-cadastro-biometrico',
  templateUrl: './cadastro-biometrico.component.html',
  styleUrls: ['./cadastro-biometrico.component.css']
})
export class CadastroBiometricoComponent implements OnInit {
  sm$ = media(`(max-width: 767px)`);
  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);
  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);
  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);
  xl2$ = media(`(min-width: 1536px)`);

  constructor(private empregadoService: EmpregadosService,private zone: NgZone){
    this.window['componentRef'] = {
      zone: this.zone,
      componentFn: [() => this.entregaEpiFail(), () => this.entregaEpiSuccess()],
      component: this
    };
  }
  ngOnInit(): void {
    this.getEmpregadoDigitalInfo(this.idEmpresa,this.idEmpregado)
  }
  @Input('visible') visible!: boolean
  @Input('idEmpresa') idEmpresa!: number
  @Input('idEmpregado') idEmpregado!: number
  @Output() onVisibleChange = new EventEmitter<boolean>();

  empregadoDigital: EmpregadosDigital = new EmpregadosDigital
  handFingers = ['Polegar Direito','Indicador Direito','Médio Direito','Anelar Direito','Mínimo Direito','Polegar Esquerdo','Indicador Esquerdo','Médio Esquerdo','Anelar Esquerdo','Mínimo Esquerdo']

  getEmpregadoDigitalInfo(idEmpresa: number,idEmpregado: number){
    this.empregadoService.getDigitalEmpregadoByIdEmpresaAndIdEmpregado( idEmpresa,idEmpregado).subscribe({
      next:(r)=>{
        this.empregadoDigital = r
      }
    })
  }


  setFingerColor(finger: string){
    switch(finger){
      case 'd1': {
        this.empregadoDigital.d1='capture'
        break
      }
      case 'd2': {
        this.empregadoDigital.d2='capture'
        break
      }case 'd3': {
        this.empregadoDigital.d3='capture'
        break
      }case 'd4': {
        this.empregadoDigital.d4='capture'
        break
      }case 'd5': {
        this.empregadoDigital.d5='capture'
        break
      }case 'e1': {
        this.empregadoDigital.e1='capture'
        break
      }case 'e2': {
        this.empregadoDigital.e2='capture'
        break
      }case 'e3': {
        this.empregadoDigital.e3='capture'
        break
      }case 'e4': {
        this.empregadoDigital.e4='capture'
        break
      }case 'e5': {
        this.empregadoDigital.e5='capture'
        break
      }
    }
  }


  get window() {
    return (window as any)
  }

  entregaEpiFail() {
  }

  entregaEpiSuccess() {
  }
  onVisibleChangeFunction(){
    this.onVisibleChange.emit(false)
  }
}
