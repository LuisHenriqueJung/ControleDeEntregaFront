import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpregadosComponent } from './empregados/empregados.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { InclusaoItemComponent } from './inclusao-item/inclusao-item.component';

const routes: Routes = [
  {path:'',component: EmpregadosComponent,children:
    [{path:'empregado',component: DetalhesComponent,children:[
      {path: 'novo-item',component: InclusaoItemComponent}
    ]}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpregadosRoutingModule { }
