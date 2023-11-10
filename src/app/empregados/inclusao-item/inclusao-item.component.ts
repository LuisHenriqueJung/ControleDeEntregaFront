import { DataPrevistaItem } from './../../model/item';
import { formatDate } from 'src/app/app.component';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { EpiService } from 'src/app/epi/epi.service';
import { Item } from 'src/app/model/item';
import { EmpregadosService } from '../empregados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ShowMessageService } from 'src/app/core/show-message-service.service';
import { MyConfirmationServiceService } from 'src/app/core/my-confirmation-service.service';



@Component({
  selector: 'app-inclusao-item',
  templateUrl: './inclusao-item.component.html',
  styleUrls: ['./inclusao-item.component.css']
})
export class InclusaoItemComponent  implements OnInit{

  constructor(
    private epiService: EpiService,
    private empregadoService: EmpregadosService,
    private formBuilder: FormBuilder,
    private deviceDetector: DeviceDetectorService,
    private confirmationService: MyConfirmationServiceService
    ){}

  ngOnInit(): void {
    this.getMotivosDeTroca()
    this.initForms()
  }

  @Input('visible') visible!: boolean
  @Input('idEmpregado') idEmpregado!: number
  @Input('idEmpresa') idEmpresa!: number
  @Output() onVisibleChange = new EventEmitter<boolean>();

  itens: Item[] = []
  selectedItem!: Item
  quantidadeEpis!: number
  motivos: any[] = []
  tamanhos: any[] = []
  itemForm!: FormGroup
  descricaoVisible:boolean = false

  initForms(){
    this.itemForm = this.formBuilder.group({
      item: [,[Validators.required]],
      quantidade: [1,[Validators.required]],
      tamanho: [null],
      dataEntrega: [new Date(),[Validators.required]],
      proximaTroca:[null],
      motivo:[null,[Validators.required]],
      descricaoMotivo:[null]
    })
  }

  getMotivosDeTroca(){
    this.empregadoService.getMotivosDeTroca().subscribe({
      next: (r)=>{
        this.motivos = r
      }
    })
  }

  searchEpi(event: AutoCompleteCompleteEvent) {
    this.empregadoService.searchItem(event.query).subscribe({
      next:(r)=>{
        this.itens = r
      }
    })
  }

  epiSelected(selectedEpi: any) {
    this.selectedItem = selectedEpi.value
    if(selectedEpi.value.grade != null){
      this.tamanhos = selectedEpi.value.grade!.tamanhos
      this.itemForm.get('tamanho')?.setValidators(Validators.required)
    }else{
      this.tamanhos = []
      this.itemForm.get('tamanho')?.removeValidators(Validators.required)
    }
    this.recalculateDataPrevista()
  }

  recalculateDataPrevista(){
    if(this.itemForm.get('item')?.value){
      let dataEntrega:string = this.itemForm.get('dataEntrega')?.value
      let quantidade = this.itemForm.get('quantidade')?.value
      let item = new DataPrevistaItem
      item.dataEntrega = dataEntrega
      item.idEmpregado = +this.idEmpregado
      item.idEmpresa = +this.idEmpresa
      item.qtd = quantidade
      item.idProduto = this.itemForm.get('item')?.value.id
      this.empregadoService.getDataPrevistaItem(item).subscribe({
        next:(r)=>{
          let novaDataProximaTroca = new Date(r.dataPrevista)
          this.itemForm.get('proximaTroca')?.setValue(novaDataProximaTroca)
        }
      })
    }
  }

  confirmarCadastro(){
    if(this.itemForm.invalid){
      this.confirmationService.invalidFormSubmited(this.itemForm)
    }
  }

  changeMotivo(event: DropdownChangeEvent){
    if(event.value?.id == 1){
      this.descricaoVisible = true
      this.itemForm.get('descricaoMotivo')?.addValidators(Validators.required)
    }else{
      this.descricaoVisible = false
      this.itemForm.get('descricaoMotivo')?.removeValidators(Validators.required)
    }
  }
  visibleChangeFunction(){
    this.onVisibleChange.emit(false)
  }

  get showSizesBox(){
    return this.tamanhos.length > 0
  }

  get isMobile(){
    return this.deviceDetector.isMobile() || this.deviceDetector.isTablet()
  }
}
