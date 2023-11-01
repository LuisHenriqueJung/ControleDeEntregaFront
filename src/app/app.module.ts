import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule} from 'primeng/inputtext'
import { CommonModule } from '@angular/common';
import { EntregaService } from './entrega.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { SidenavLinkComponent } from './layout/sidenav-link/sidenav-link.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    SidenavComponent,
    SidenavLinkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    TreeModule

  ],
  providers: [
    EntregaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
