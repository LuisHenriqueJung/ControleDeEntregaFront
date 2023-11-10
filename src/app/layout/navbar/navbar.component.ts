import { MyTranslateService } from 'src/app/core/my-translate.service';
import { LayoutService } from './../layout.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

constructor(private layoutService: LayoutService,private translate: MyTranslateService){

}

idiomaSelecionado: any ={ name: 'Português', code: 'br',value: 'pt-BR' }
toggleSidenav(){
  this.layoutService.toggleSidenav()
}

idiomas = [
  { name: 'Português', code: 'br',value: 'pt-BR' },
  { name: 'English', code: 'us',value:'en' },
  { name: 'Espanõl', code: 'es',value:'es' },
];


alterarIdioma(event: any){
 this.translate.setLanguage(event.value!.value)
}


}
