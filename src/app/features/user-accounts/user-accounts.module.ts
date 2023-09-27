import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { UserListCompanyComponent } from './components/user-list-company/user-list-company.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    UserListCompanyComponent
  ],
  imports: [
    CommonModule,
    UserAccountsRoutingModule,
    TableModule,
    ButtonModule

  ]
})
export class UserAccountsModule { }
