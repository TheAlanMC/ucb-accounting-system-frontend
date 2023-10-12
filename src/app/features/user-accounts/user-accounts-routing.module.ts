import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  {path: 'user/pass', component: UserPasswordComponent},
  {path: 'user/profile', component: UserInfoComponent}
=======
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
  {
    path: 'accounts/create',
    component: CreateAccountComponent
  }
>>>>>>> Uas-96
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountsRoutingModule { }
