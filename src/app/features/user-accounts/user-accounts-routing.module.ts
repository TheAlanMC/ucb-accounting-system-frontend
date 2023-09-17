import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  {path: 'user/pass', component: UserPasswordComponent},
  {path: 'user/profile', component: UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountsRoutingModule { }
