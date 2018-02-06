import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PlansComponent } from './plans/plans.component';
import { PublicPageComponent } from './public-page/public-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'plans', component: PlansComponent},
  {path: 'public', component: PublicPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
