import { Component, NgZone, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, fromEvent, map, startWith } from 'rxjs';

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => {
      return list.matches}
      )
  );
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private translateService: TranslateService, private primengConfig: PrimeNGConfig, ) {

  }
  ngOnInit(): void {
    this.translateService.setDefaultLang('pt-BR');
    let language =  localStorage.getItem('language')
    if(language)
      this.translate(language)
    this.primengConfig.ripple = true;
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe((res: any) => this.primengConfig.setTranslation(res));
  }
}


