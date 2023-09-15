import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPasswordComponent } from './components/user-password/user-password.component';

const routes: Routes = [
  {path: 'user/pass', component: UserPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountsRoutingModule { }
