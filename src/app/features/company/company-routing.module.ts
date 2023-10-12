import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { UserListCompanyComponent } from './components/user-list/user-list-company.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
  {
    path: 'company',
    children: [
      {path: '', component: CompanyInfoComponent},
      {path: 'users', component: UserListCompanyComponent},
      {path: 'users/new', component: CreateAccountComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
