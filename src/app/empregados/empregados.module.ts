import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpregadosRoutingModule } from './empregados-routing.module';
import { EmpregadosComponent } from './empregados/empregados.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CardModule } from 'primeng/card'
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
@NgModule({
  declarations: [
    EmpregadosComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmpregadosRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CardModule,
    PanelModule,
    InputTextModule,
    PaginatorModule,
    AutoCompleteModule
  ]
})
export class EmpregadosModule { }
