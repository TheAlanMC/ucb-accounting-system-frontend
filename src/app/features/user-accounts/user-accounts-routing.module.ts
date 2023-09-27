import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListCompanyComponent } from './components/user-list-company/user-list-company.component';

const routes: Routes = [
  {
    path: 'list/users/company',
    component: UserListCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountsRoutingModule { }
