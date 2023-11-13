import { Component, NgZone, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { EmpregadosService } from '../empregados.service';
import { EmpregadosDigital, Finger } from 'src/app/model/empregado';
import { media } from 'src/app/app.component';

@Component({
  selector: 'app-dropdown-biometria',
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
  @Input('idEmpresa') idEmpresa!: number
  @Input('idEmpregado') idEmpregado!: number

  empregadoDigital: EmpregadosDigital = new EmpregadosDigital
  handFingers: Finger[] = []

  getEmpregadoDigitalInfo(idEmpresa: number,idEmpregado: number){
    this.empregadoService.getDigitalEmpregadoByIdEmpresaAndIdEmpregado( idEmpresa,idEmpregado).subscribe({
      next:(r:any)=>{

        let fingerd2: Finger = {
          name: 'Indicador direito',
          motivo: r.d2 ? r.d2!.motivo : '',
          status: r.d2 ? r.d2!.status : ''
        }
        this.handFingers.push(fingerd2)
        let fingerd3: Finger = {
          name: 'Médio direito',
          motivo: r.d3 ? r.d3!.motivo : '',
          status: r.d3 ? r.d3!.status : ''
        }
        this.handFingers.push(fingerd3)
        let fingerd4: Finger = {
          name: 'Anelar direito',
          motivo: r.d4 ? r.d4!.motivo : '',
          status: r.d4 ? r.d4!.status : ''
        }
        this.handFingers.push(fingerd4)
        let fingerd5: Finger = {
          name: 'Mínimo direito',
          motivo: r.d5 ? r.d5!.motivo : '',
          status: r.d5 ? r.d5!.status : ''
        }
        this.handFingers.push(fingerd5)
        let fingere1: Finger = {
          name: 'Polegar esquerdo',
          motivo: r.e1 ? r.e1!.motivo : '',
          status: r.e1 ? r.e1!.status : ''
        }
        this.handFingers.push(fingere1)
        let fingere2: Finger = {
          name: 'Indicador esquerdo',
          motivo: r.e2 ? r.e2!.motivo : '',
          status: r.e2 ? r.e2!.status : ''
        }
        this.handFingers.push(fingere2)
        let fingere3: Finger = {
          name: 'Médio esquerdo',
          motivo: r.e3 ? r.e3!.motivo : '',
          status: r.e3 ? r.e3!.status : ''
        }
        this.handFingers.push(fingere3)
        let fingere4: Finger = {
          name: 'Anelar esquerdo',
          motivo: r.e4 ? r.e4!.motivo : '',
          status: r.e4 ? r.e4!.status : ''
        }
        this.handFingers.push(fingere4)
        let fingere5: Finger = {
          name: 'Mínimo esquerdo',
          motivo: r.e5 ? r.e5!.motivo : '',
          status: r.e5 ? r.e5!.status : ''
        }
        this.handFingers.push(fingere5)
      }
    })
  }

  get window() {
    return (window as any)
  }

  entregaEpiFail() {
  }

  entregaEpiSuccess() {
  }

}
