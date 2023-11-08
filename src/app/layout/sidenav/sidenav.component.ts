import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LayoutService } from '../layout.service';
import { AuthService } from 'src/app/security/auth.service';
import { media } from 'src/app/app.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  @ViewChild('overlay') sideNav! :ElementRef
  userName:string = ''
  constructor(private router:Router, private layoutService: LayoutService,private auth:AuthService){}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user')!
    if(this.sm$ || this.md$){
      this.closeSidenav()
    }
  }

  sm$ = media(`(max-width: 767px)`);
  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);
  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);
  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);
  xl2$ = media(`(min-width: 1536px)`);

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

  logout(){
    this.auth.logout()
  }

}
