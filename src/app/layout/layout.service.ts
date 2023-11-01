import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

   isSideNavExpanded:  boolean = true

  toggleSidenav() {
   this.isSideNavExpanded = !this.isSideNavExpanded
 }

 closeSidenav(){
  this.isSideNavExpanded = false
 }

}
