import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MyTranslateService } from './my-translate.service';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(
    private messageService: MessageService,
    private idiomaService: MyTranslateService
  ) { }

  deleteSuccess(){
    this.messageService.add({ severity: 'success', summary: this.idiomaService.getLabel('MSG.SUCESSO_SUMARY'), detail: this.idiomaService.getLabel('MSG.DELETE_SUCESSO'), });
  }

  includeSuccess(){
    this.messageService.add({ severity: 'success', summary: this.idiomaService.getLabel('MSG.SUCESSO_SUMARY'), detail: this.idiomaService.getLabel('MSG.SUCESSO_DETAIL'), });

  }

  updateSuccess(){
    this.messageService.add({ severity: 'success', summary: this.idiomaService.getLabel('MSG.SUCESSO_SUMARY'), detail: this.idiomaService.getLabel('MSG.UPDATE_SUCESSO_DETAIL'), });

  }

  rejected(){
    this.messageService.add({ severity: 'info', summary:  this.idiomaService.getLabel('REJEITADO'), detail:  this.idiomaService.getLabel('MSG.INFO_SUCESSO'), });
  }

  canceled(){
    this.messageService.add({ severity: 'info', summary:  this.idiomaService.getLabel('CANCELADO'), detail:  this.idiomaService.getLabel('MSG.INFO_SUCESSO'), });

  }

  error(error: string){
    this.messageService.add({ severity: 'error', summary:  this.idiomaService.getLabel('ERRO'), detail:  error, });

  }
  falhaDeLogin(){
    this.messageService.add({ severity: 'error', summary:  this.idiomaService.getLabel('MSG.FALHA_LOGIN_HEADER'), detail:   this.idiomaService.getLabel('MSG.FALHA_LOGIN'), });

  }
  downloadIniciado(){
    this.messageService.add({  severity: 'info', summary:this.idiomaService.getLabel('MSG.DOWNLOAD_INICIADO'), detail: this.idiomaService.getLabel('MSG.FIQUE_A_VONTADE') });
  }

  downloadConcluido(){
    this.messageService.add({  severity: 'success', summary: this.idiomaService.getLabel('MSG.DOWNLOAD_CONCLUIDO'), detail:  this.idiomaService.getLabel('MSG.DOWNLOAD_SUCESSO') });

  }
  falhaDeDownload(){
    this.messageService.add({  severity: 'error', summary: this.idiomaService.getLabel('MSG.ERRO_INSEPERADO'), detail: this.idiomaService.getLabel('MSG.ERRO_DOWNLOAD')  });

  }
}
