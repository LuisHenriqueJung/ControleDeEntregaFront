import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';


const routes: Routes = [
  {path:'controle-entrega',component: LayoutComponent,loadChildren:()=> import('./empregados/empregados.module').then(m=> m.EmpregadosModule)},
  {path:'teste',component: LayoutComponent,loadChildren:()=> import('./empregados/empregados.module').then(m=> m.EmpregadosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
