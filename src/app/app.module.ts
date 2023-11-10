import { JwtHelperService } from '@auth0/angular-jwt';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
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
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from './security/auth.service';
import { RsdataHttpInterceptor } from './security/interceptor';
import { JWT_OPTIONS  } from '@auth0/angular-jwt';
import { DropdownModule } from 'primeng/dropdown';
import { ShowMessageService } from './core/show-message-service.service';
import { MyConfirmationServiceService } from './core/my-confirmation-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule} from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    ToastModule,
    ConfirmDialogModule,
    TreeModule,
    DropdownModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt-BR',
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    EntregaService,
    ShowMessageService,
    MyConfirmationServiceService,
    TranslateService,
    AuthService,
    JwtHelperService,
    ConfirmationService,
    MessageService,
    { provide: HTTP_INTERCEPTORS,
      useClass:RsdataHttpInterceptor,
      multi: true},
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
