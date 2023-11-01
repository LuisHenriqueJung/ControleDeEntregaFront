import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  @ViewChild('overlay') sideNav! :ElementRef
  constructor(private router:Router, private layoutService: LayoutService){}

  ngOnInit(): void {

  }
  @HostListener('document:click', ['$event'])
  documentClick(event: PointerEvent): void {
    if (event.srcElement == this.sideNav?.nativeElement) {
      this.closeSidenav();
    }
  }


  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.layoutService.isSideNavExpanded
  }

  toggleSidenav(){
    this.layoutService.toggleSidenav()
  }

  closeSidenav(){
    this.layoutService.closeSidenav()
  }
}
