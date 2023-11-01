import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavLinkComponent } from './sidenav-link/sidenav-link.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
