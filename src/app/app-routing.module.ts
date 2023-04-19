import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SuccessLoginComponent } from './success-login/success-login.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'success-login',
    component: SuccessLoginComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
