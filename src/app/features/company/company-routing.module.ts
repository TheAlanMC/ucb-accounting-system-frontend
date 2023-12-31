import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { UserListCompanyComponent } from './components/user-list/user-list-company.component';

const routes: Routes = [
  {
    path: 'company',
    children: [
      {path: '', component: CompanyInfoComponent},
      {path: 'users', component: UserListCompanyComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
