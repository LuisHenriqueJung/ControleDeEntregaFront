import { Component, NgZone, OnInit } from '@angular/core';
import { Empregado, EmpregadoInfo, EmpregadosDigital } from 'src/app/model/empregado';
import { EmpregadosService } from '../empregados.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EpiService } from 'src/app/epi/epi.service';
import { SlideInOutAnimation } from 'src/app/animations/animations';
import { media } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { WebAppInterface } from 'src/app/model/android';
import { Entrega, EntregaFilter } from 'src/app/model/entrega';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
  animations: [SlideInOutAnimation]

})
export class DetalhesComponent implements OnInit {
  sm$ = media(`(max-width: 767px)`);
  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);
  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);
  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);
  xl2$ = media(`(min-width: 1536px)`);

  constructor(
    private empregadoService: EmpregadosService,
    private epiService: EpiService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private zone: NgZone
  ) {
    this.window['componentRef'] = {
      zone: this.zone,
      componentFn: [() => this.entregaEpiFail(), () => this.entregaEpiSuccess()],
      component: this
    };
  }
  ngOnInit(): void {
    this.epis = this.epiService.getAllEpis()
    this.motivos = this.epiService.getAllMotivosTroca()

    this.route.params.subscribe( params =>{
      this.userLoading = true
      this.episLoading = true
      let idEmpregado = params['idEmpregado']
      let idEmpresa = params['idEmpresa']
      if (idEmpregado && idEmpresa) {
        this.entregaFilter.idEmpresa = idEmpresa
        this.entregaFilter.idEmpregado = idEmpregado
        this.getEmpregadoInfo(idEmpresa,idEmpregado)
        this.getEmpregadosEpis(this.entregaFilter)
        this.getEmpregadoDigitalInfo(idEmpresa,idEmpregado)
      }
    })

  }

  entregaEpis: Entrega[] = []
  episParaEntrega: any[] = []
  dialogIncluirVisible = false
  epis: any[] = []
  epiSuggestions: any[] = []
  epi!: any
  quantidadeEpis!: number
  motivos: any[] = []
  empregado = new EmpregadoInfo
  userLoading: boolean = true
  episLoading: boolean = true
  dialogFingerVisible = false
  totalRegisters!: number
  entregaFilter = new EntregaFilter
  empregadoDigital!: EmpregadosDigital


  getEmpregadoDigitalInfo(idEmpresa: number,idEmpregado: number){
    this.empregadoService.getDigitalEmpregadoByIdEmpresaAndIdEmpregado( idEmpresa,idEmpregado).subscribe({
      next:(r)=>{
        this.empregadoDigital = r
      }
    })
  }

  getEmpregadosEpis(entregaFilter: EntregaFilter){
    this.empregadoService.getEmpregadoEpi(entregaFilter).subscribe({
      next: (r)=>{
        this.entregaEpis = r.content
        this.totalRegisters = r.totalElements
        this.episLoading = false
      }
    })
  }

  getEmpregadoInfo(idEmpresa: number,idEmpregado: number) {
    this.empregadoService.findEmpregadoByIdEmpresaAndIdEmpregado(idEmpresa,idEmpregado).subscribe({
      next: (r:EmpregadoInfo) => {
        this.empregado = r
        this.userLoading = false
      }
    })
  }

  get getFoto() {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + this.empregado.foto);
  }

  confirmarEntregaEpis(finger: any) {
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

    let digital: any;
    this.empregadoService.findeEmpregadoDigitalByIdEmpregado(1).subscribe({
      next: (r) => {
        digital = r
        console.warn(digital)
        let bin = atob(digital[finger]);
        let bytes = [];
        for (let i = 0; i < bin.length; i++) {
          bytes.push(bin.charCodeAt(i));
        }
        Android!.validate(bytes);
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

  searchEpi(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    for (let i = 0; i < (this.epis as any[]).length; i++) {
      let country = (this.epis as any[])[i];
      if (country.nome.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.epiSuggestions = filtered
  }

  epiSelected(selectedEpi: any) {
    this.epi = selectedEpi
  }

  onPageChange(evento: TableLazyLoadEvent){
    this.episLoading = true
    this.entregaFilter.page = evento.first! / evento.rows!
    this.getEmpregadosEpis(this.entregaFilter)
  }

  filterEntrega(){
    this.episLoading = true
    this.getEmpregadosEpis(this.entregaFilter)
  }

}
declare var Android: WebAppInterface;
