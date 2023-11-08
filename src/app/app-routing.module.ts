import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './security/auth.guard';


const routes: Routes = [
  {path: 'login',loadChildren:()=> import('../app/security/security.module').then(m => m.SecurityModule)},
  {path:'',canActivate:[AuthGuard], component: LayoutComponent},
  {path:'controle-entrega',canActivate:[AuthGuard], component: LayoutComponent,loadChildren:()=> import('./empregados/empregados.module').then(m=> m.EmpregadosModule)},
  {path:'teste',component: LayoutComponent,loadChildren:()=> import('./empregados/empregados.module').then(m=> m.EmpregadosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
