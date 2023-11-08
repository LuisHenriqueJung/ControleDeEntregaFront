import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { SecurityRoutingModule } from './security-routing.module';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TranslateModule,
    SecurityRoutingModule,
    PasswordModule
  ]
})
export class SecurityModule { }
