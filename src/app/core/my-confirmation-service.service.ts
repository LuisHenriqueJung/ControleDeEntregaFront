import { Injectable } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { MyTranslateService } from './my-translate.service';
import { ShowMessageService } from './show-message-service.service';

export interface ShowFuntion{
  confirm: Function
}
@Injectable({
  providedIn: 'root'
})
export class MyConfirmationServiceService {

  constructor(
    private confirmationService: ConfirmationService,
    private idiomaService: MyTranslateService,
    private showMessageService: ShowMessageService
  ) { }


  confirmDelete(showFunction: ShowFuntion){
    return this.confirmationService.confirm({
      message: this.idiomaService.getLabel('MSG.CONFIRMAR_EXCLUSAO'),
      acceptLabel: this.idiomaService.getLabel('SIM'),
      rejectLabel: this.idiomaService.getLabel('NAO'),
      header: this.idiomaService.getLabel('MSG.CONFIRMAR_EXCLUSAO_HEADER'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       showFunction.confirm()
      },
      acceptButtonStyleClass:"p-button-danger",
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.showMessageService.rejected()
            break;
          case ConfirmEventType.CANCEL:
            this.showMessageService.canceled()
            break;
        }
      }
    })

  }

  invalidFormSubmited(formulario: FormGroup){
    return this.confirmationService.confirm({
      message: this.idiomaService.getLabel('msg.campos invalidos'),
      header: this.idiomaService.getLabel('msg.verifique os dados'),
      accept:()=>{
        Object.keys(formulario.controls).forEach(key => {
          formulario.get(key)!.markAsDirty();
        });
        Object.keys(formulario.controls).forEach(key => {
          formulario.get(key)!.markAsTouched();
        });
      },
      rejectVisible: false,
      acceptLabel: 'OK',
      icon: "pi pi-info-circle"
    });
  }
}
