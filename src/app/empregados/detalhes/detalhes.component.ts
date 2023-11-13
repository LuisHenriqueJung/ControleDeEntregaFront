import { Component, NgZone, OnInit } from '@angular/core';
import { Empregado, EmpregadoInfo, EmpregadosDigital } from 'src/app/model/empregado';
import { EmpregadosService } from '../empregados.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EpiService } from 'src/app/epi/epi.service';
import { SlideInOutAnimation } from 'src/app/animations/animations';
import { media } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe( params =>{
      this.userLoading = true
      this.episLoading = true
      let idEmpregado = params['idEmpregado']
      let idEmpresa = params['idEmpresa']
      if (idEmpregado && idEmpresa) {
        this.entregaFilter.idEmpresa = idEmpresa
        this.entregaFilter.idEmpregado = idEmpregado
        this.getEmpregadoInfo(idEmpresa,idEmpregado)
        this.getEmpregadosEpis(this.entregaFilter)
      }
    })
  }

  entregaEpis: Entrega[] = []
  episParaEntrega: any[] = []
  dialogIncluirVisible = false
  empregado = new EmpregadoInfo
  userLoading: boolean = true
  episLoading: boolean = true
  dialogFingerVisible = false
  totalRegisters!: number
  entregaFilter = new EntregaFilter

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


  onPageChange(evento: TableLazyLoadEvent){
    this.episLoading = true
    this.entregaFilter.page = evento.first! / evento.rows!
    this.getEmpregadosEpis(this.entregaFilter)
  }

  filterEntrega(){
    this.episLoading = true
    this.getEmpregadosEpis(this.entregaFilter)
  }
  include(){
    this.router.navigate(['novo-item'],{queryParams: {idEmpresa: this.entregaFilter.idEmpresa,idEmpregado: this.entregaFilter.idEmpregado},relativeTo:this.route})  }

  changeFingerVisibility(visible: boolean){
    this.dialogFingerVisible = visible
  }
}
declare var Android: WebAppInterface;
