import { LayoutService } from './../layout.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

constructor(private layoutService: LayoutService){

}

toggleSidenav(){
  this.layoutService.toggleSidenav()
}


}
