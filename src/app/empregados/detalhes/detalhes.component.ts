import { Component, NgZone, OnInit } from '@angular/core';
import { EmpregadoInfo } from 'src/app/model/empregado';
import { EmpregadosService } from '../empregados.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EpiService } from 'src/app/epi/epi.service';
import { SlideInOutAnimation } from 'src/app/animations/animations';
import { media } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { WebAppInterface } from 'src/app/model/android';

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
    this.empregadoEPIs = this.empregadoService.getEmpregadoEpi()
    this.epis = this.epiService.getAllEpis()
    this.motivos = this.epiService.getAllMotivosTroca()
    let idEmpregado = this.route.snapshot.params['idEmpregado']
    let idEmpresa = this.route.snapshot.params['idEmpresa']
    if (idEmpregado && idEmpresa) {
      this.getEmpregadoInfo(idEmpresa, idEmpregado)
    }
  }

  empregadoEPIs: any[] = []
  episParaEntrega: any[] = []
  dialogIncluirVisible = false
  epis: any[] = []
  epiSuggestions: any[] = []
  epi!: any
  quantidadeEpis!: number
  motivos: any[] = []
  empregado = new EmpregadoInfo
  loading: boolean = true
  dialogFingerVisible = false

  getEmpregadoInfo(idEmpresa: number, idEmpregado: number) {
    this.empregadoService.findEmpregadoByIdEmpresaAndIdEmpregado(idEmpresa, idEmpregado).subscribe({
      next: (r) => {
        this.empregado = r
        this.loading = false
      }
    })
  }

  get getFoto() {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + this.empregado.foto);
  }

  confirmarEntregaEpis(finger: any) {
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
}
declare var Android: WebAppInterface;
