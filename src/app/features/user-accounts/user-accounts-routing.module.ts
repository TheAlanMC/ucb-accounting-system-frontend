import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { UserListCompanyComponent } from './components/user-list-company/user-list-company.component';


const routes: Routes = [
  {path: 'user/pass', component: UserPasswordComponent},
  {path: 'user/profile', component: UserInfoComponent},
  {path: 'accounts/create', component: CreateAccountComponent},
  {path: 'list/users/company', component: UserListCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountsRoutingModule { }
