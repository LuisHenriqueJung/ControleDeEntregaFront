import { Component, NgZone, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { MyTranslateService } from './core/my-translate.service';

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => {
      return list.matches}
      )
  );
}

export function  formatDate(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private translateService: TranslateService, private primengConfig: PrimeNGConfig,private myTranslate:MyTranslateService ) {

  }
  ngOnInit(): void {
    this.translateService.setDefaultLang('pt-BR');
    this.primengConfig.ripple = true;
    this.myTranslate.idioma.subscribe((val: string)=>{
      this.translate(val)
    })
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe((res: any) => this.primengConfig.setTranslation(res));
  }
}


