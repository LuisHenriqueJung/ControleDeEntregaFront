import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  public idioma: BehaviorSubject<string> = new BehaviorSubject<string>('pt-BR');
  constructor(
    public translate: TranslateService,
 ) {}
   getLabel(arg0: string): string {
   return this.translate.instant(arg0,)
 }

 setLanguage(lang: string){
  this.idioma.next(lang);
 }

}
