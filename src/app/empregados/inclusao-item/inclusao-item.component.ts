import { DataPrevistaItem, ItemFields } from './../../model/item';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EpiService } from 'src/app/epi/epi.service';
import { Item } from 'src/app/model/item';
import { EmpregadosService } from '../empregados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DropdownChangeEvent } from 'primeng/dropdown';

import { MyConfirmationServiceService } from 'src/app/core/my-confirmation-service.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { formatDate } from 'src/app/app.component';



@Component({
  selector: 'app-inclusao-item',
  templateUrl: './inclusao-item.component.html',
  styleUrls: ['./inclusao-item.component.css']
})
export class InclusaoItemComponent implements OnInit {

  constructor(
    private epiService: EpiService,
    private empregadoService: EmpregadosService,
    private formBuilder: FormBuilder,
    private deviceDetector: DeviceDetectorService,
    private confirmationService: MyConfirmationServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) { }



  ngOnInit(): void {
    this.initForms()
    this.route.queryParams.subscribe(params => {
      this.idEmpregado = params['idEmpregado']
      this.idEmpresa = params['idEmpresa']
      if (!this.idEmpregado || !this.idEmpresa) {
        this.location.back()
      }
    })
  }

  visible = true
  idEmpregado!: number
  idEmpresa!: number
  itens: Item[] = []
  selectedItem!: Item
  quantidadeEpis!: number
  motivos: any[] = []
  tamanhos: any[] = []
  itemForm!: FormGroup
  descricaoVisible: boolean = false
  showCaEpiCombo = false
  caEpiList: any[] = []
  sizesBoxDisabled = false

  initForms() {
    this.itemForm = this.formBuilder.group({
      item: [, [Validators.required]],
      quantidade: [1, [Validators.required]],
      tamanho: [null],
      dataEntrega: [new Date(), [Validators.required]],
      proximaTroca: [null, [Validators.required]],
      motivo: [null,],
      descricaoMotivo: [null],
      caEPI: [null]
    })
  }

  searchEpi(event: AutoCompleteCompleteEvent) {
    this.empregadoService.searchItem(event.query).subscribe({
      next: (r) => {
        this.itens = r
      }
    })
  }

  epiSelected(selectedEpi: any) {
    this.selectedItem = selectedEpi.value
    if (selectedEpi.value.tipoEpi) {
      this.empregadoService.getMotivosDeTrocaEpi().subscribe({
        next: (r) => {
          this.motivos = r
        }
      })
    } else {
      this.empregadoService.getMotivosDeTrocaMAterial().subscribe({
        next: (r) => {
          this.motivos = r
        }
      })
    }
    this.verifyTipoEpiAndgetCa(selectedEpi.value)
    if (selectedEpi.value.grade != null) {
      this.tamanhos = selectedEpi.value.grade!.tamanhos
      this.itemForm.get(ItemFields.TAMANHO)?.setValidators(Validators.required)
    } else {
      this.tamanhos = []
      this.itemForm.get(ItemFields.TAMANHO)?.removeValidators(Validators.required)
    }
    this.recalculateDataPrevista()
  }

  verifyTipoEpiAndgetCa(produto: Item) {
    if (produto.tipoEpi) {
      this.empregadoService.getCaEpi(produto.id).subscribe({
        next: (r: any[]) => {
          if (r.length == 1) {
            this.setCaEpi(r[0])
          } else if (r.length > 1) {
            this.caEpiList = r
            r.forEach(ca => {
              if (ca.padrao) {
                this.showCaEpiCombo = true
                this.setCaEpi(ca)
              }
            })
          }
        }
      })
    }
  }

  setCaEpi(caEpi: any) {
    this.itemForm.get(ItemFields.CA_EPI)?.setValue(caEpi)
    this.sizesBoxDisabled = false
    if (caEpi.tamanho) {
      this.itemForm.get(ItemFields.TAMANHO)?.setValue(caEpi.tamanho)
      this.sizesBoxDisabled = true
    }
  }

  recalculateDataPrevista() {
    if (this.itemForm.get(ItemFields.ITEM)?.value) {
      let dataEntrega: Date = this.itemForm.get(ItemFields.DATA_ENTREGA)?.value
      let quantidade = this.itemForm.get(ItemFields.QUANTIDADE)?.value
      let item = new DataPrevistaItem
      item.dataEntrega = formatDate(dataEntrega)
      item.idEmpregado = +this.idEmpregado
      item.idEmpresa = +this.idEmpresa
      item.qtd = quantidade
      item.idProduto = this.itemForm.get(ItemFields.ITEM)?.value.id
      this.empregadoService.getDataPrevistaItem(item).subscribe({
        next: (r) => {
          if (r.dataPrevista) {
            let novaDataProximaTroca = new Date(r.dataPrevista)
            this.itemForm.get(ItemFields.PROXIMA_TROCA)?.setValue(novaDataProximaTroca)
          }
        }
      })
    }
  }

  confirmarCadastro() {
    if (this.itemForm.invalid) {
      this.confirmationService.invalidFormSubmited(this.itemForm)
    } else {
      let entrega = {
        idEmpresa: +this.idEmpresa,
        idEmpregado: +this.idEmpregado,
        idProduto: this.itemForm.get(ItemFields.ITEM)?.value.id,
        tipoEpi: this.selectedItem.tipoEpi,
        dataEntrega: formatDate(this.itemForm.get(ItemFields.DATA_ENTREGA)?.value),
        dataPrevista: formatDate(this.itemForm.get(ItemFields.PROXIMA_TROCA)?.value),
        qtde: this.itemForm.get(ItemFields.QUANTIDADE)?.value,
        idGrade: this.selectedItem.grade!.id,
        idGradeItem: this.itemForm.get(ItemFields.TAMANHO)?.value ? this.itemForm.get(ItemFields.TAMANHO)?.value!.id : null,
        motivo: this.itemForm.get(ItemFields.DESCRICAO_MOTIVO)?.value ? this.itemForm.get(ItemFields.DESCRICAO_MOTIVO)?.value : '',
        idEpiMotivo: this.itemForm.get(ItemFields.MOTIVO)?.value ? this.itemForm.get(ItemFields.MOTIVO)?.value!.id : null,
        forcarInclusao: false,
        idCa: this.itemForm.get(ItemFields.CA_EPI)?.value!.idCa,
        idCaEpi: this.itemForm.get(ItemFields.CA_EPI)?.value!.idCaEpi
      }
      this.cadastrar(entrega)
    }
  }

  cadastrar(entrega: any) {
    this.empregadoService.saveEntrega(entrega).subscribe({
      next: () => {
        alert('Cadastrado com sucesso')
      }
    })
  }

  changeMotivo(event: DropdownChangeEvent) {
    if (event.value?.id == 1) {
      this.descricaoVisible = true
      this.itemForm.get(ItemFields.DESCRICAO_MOTIVO)?.addValidators(Validators.required)
    } else {
      this.descricaoVisible = false
      this.itemForm.get(ItemFields.DESCRICAO_MOTIVO)?.removeValidators(Validators.required)
    }
  }
  visibleChangeFunction() {
    this.location.back()
  }

  get showSizesBox() {
    return this.tamanhos.length > 0
  }

  get isMobile() {
    return this.deviceDetector.isMobile() || this.deviceDetector.isTablet()
  }
}
