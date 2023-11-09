import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavLinkComponent } from './sidenav-link/sidenav-link.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
