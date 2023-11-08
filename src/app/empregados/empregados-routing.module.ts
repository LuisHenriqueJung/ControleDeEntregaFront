import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpregadosComponent } from './empregados/empregados.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

const routes: Routes = [
  {path:'',component: EmpregadosComponent,children:
    [{path:'empregado/:idEmpresa/:idEmpregado',component: DetalhesComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpregadosRoutingModule { }
