import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartOfAccountsRoutingModule } from './chart-of-accounts-routing.module';
import { ChartOfAccountsPageComponent } from './components/chart-of-accounts-page/chart-of-accounts-page.component';
import { ChartOfAccountsAddaccountComponent } from './components/chart-of-accounts-addaccount/chart-of-accounts-addaccount.component';
import { ChartOfAccountsEditaccountComponent } from './components/chart-of-accounts-editaccount/chart-of-accounts-editaccount.component';
import  { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ChartOfAccountsPageComponent,
    ChartOfAccountsAddaccountComponent,
    ChartOfAccountsEditaccountComponent
  ],
  imports: [
    CommonModule,
    ChartOfAccountsRoutingModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    ReactiveFormsModule
  ]
})
export class ChartOfAccountsModule { }
