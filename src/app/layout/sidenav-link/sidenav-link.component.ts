import { LayoutService } from './../layout.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-sidenav-link',
  templateUrl: './sidenav-link.component.html',
  styleUrls: ['./sidenav-link.component.css']
})
export class SidenavLinkComponent implements OnInit{

isSidenavExpanded!: boolean

 @Input() route!: string ;
 @Input() icon = '';
 @Input() label = '';

  constructor(private router: ActivatedRoute,private layoutService:LayoutService){

  }
  ngOnInit(): void {
   this.isSidenavExpanded =  this.layoutService.isSideNavExpanded
  }

  get isExpanded() {
    return this.layoutService.isSideNavExpanded
  }

  isActiveRoute():boolean{
    return window.location.href.includes(this.route)
  }


}
