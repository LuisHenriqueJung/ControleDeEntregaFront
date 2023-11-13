import { Component, NgZone, OnInit } from '@angular/core';
import { EmpregadosService } from '../empregados.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Empregado } from 'src/app/model/empregado';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/empresa/empresa.service';
import { Empresa } from 'src/app/model/empresa';
import { delay } from 'rxjs';
import { SlideInOutAnimation } from 'src/app/animations/animations';


@Component({
  selector: 'app-empregados',
  templateUrl: './empregados.component.html',
  styleUrls: ['./empregados.component.scss'],
  animations: [SlideInOutAnimation]

})
export class EmpregadosComponent implements OnInit {

  constructor(
    private empregadosService: EmpregadosService,
    private zone: NgZone,
    private router: Router,
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.filtersVisible = this.router.isActive('/controle-entrega', true)
    this.getAllLocalDeEstoque()
    this.getStatusEmpregado()
    this.fingers = [
      { name: 'Polegar', code: 'd1' },
      { name: 'Indicador', code: 'd2' },
      { name: 'Médio', code: 'd3' },
      { name: 'Anelar', code: 'd4' },
      { name: 'Mindinho', code: 'd5' }
    ];
  }

  empregados: any[] = []
  visible = false
  empresasSuggestions: Empresa[] = []
  setoresSuggestions: any[] = []
  empregadosSuggestions: Empregado[] = []
  locaisDeEstoque: any[] = []
  selectedStatusDoEmpregado: any[] = []
  statusDoEmpregado: any[] = []
  filtersVisible = true
  empresaFilterSelectedId!: number
  setorFilterSelectedId!: number
  fingers: any[] | undefined;

  getAllLocalDeEstoque() {
    this.empresaService.getLocaisDeEstoque().subscribe({
      next: (r) => {
        this.locaisDeEstoque = r
      }
    })
  }

  getStatusEmpregado() {
    this.empregadosService.getStatusEmpregado().subscribe({
      next: (r) => {
        this.statusDoEmpregado = r
        r.forEach((status: any) => {
          if (status.nome == 'Ativos') {
            this.selectedStatusDoEmpregado.push(status)
          }
        })
      }
    })
  }

  searchEmpresa(event: AutoCompleteCompleteEvent) {
    if (event.query.length >= 3) {
      this.empresaService.getAllEmpresas(event.query).pipe(delay(800)).subscribe({
        next: (r: []) => {
          this.empresasSuggestions = r
        }
      })
    }
  }

  empresaSelected(empresaSelecionada: any) {
    this.empresaFilterSelectedId = empresaSelecionada.value.id
    this.empresaService.filterSetores(this.empresaFilterSelectedId).subscribe({
      next: (r) => {
        this.setoresSuggestions = r
      }
    })
    this.empregadosService.getEmpregadosByIdEmpresa(empresaSelecionada.value.id).subscribe({
      next: (r) => {
        this.empregados = r
      }
    })
  }

  searchSetor(event: AutoCompleteCompleteEvent) {
    if (event.query.length >= 3) {
      this.empresaService.filterSetores(this.empresaFilterSelectedId, event.query).subscribe({
        next: (r) => {
          this.setoresSuggestions = r
        }
      })
    }
  }
  setorSelected(event: any) {
    this.setorFilterSelectedId = event.value.id
    this.empregadosService.filterEmpregado(this.empresaFilterSelectedId, '', this.selectedStatusDoEmpregado, this.setorFilterSelectedId).subscribe({
      next: (r) => {
        this.empregados = r
      }
    })
  }

  searchEmpregado(event: AutoCompleteCompleteEvent) {
    if (event.query.length >= 3) {
      this.empregadosService.filterEmpregado(this.empresaFilterSelectedId, event.query, this.selectedStatusDoEmpregado, this.setorFilterSelectedId).subscribe({
        next: (r) => {
          this.empregadosSuggestions = r
        }
      })
    }
  }

  employerSelected(event: any) {
    this.filtersVisible = false
    this.router.navigate([`empregado`], { relativeTo: this.route ,queryParams: {idEmpresa:this.empresaFilterSelectedId,idEmpregado: event.value!.id }})
  }

  onPageChange($event: any) {

  }
  changeFilterVisibility() {
    this.filtersVisible = !this.filtersVisible
  }
}

