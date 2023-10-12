import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartOfAccountsPageComponent } from './chart-of-accounts-page/chart-of-accounts-page.component';
import { ChartOfAccountsAddaccountComponent } from './chart-of-accounts-addaccount/chart-of-accounts-addaccount.component';
import { ChartOfAccountsEditaccountComponent } from './chart-of-accounts-editaccount/chart-of-accounts-editaccount.component';

const routes: Routes = [
  { path: 'chart-of-accounts-page', component: ChartOfAccountsPageComponent },
  { path: 'chart-of-accounts-addaccount', component: ChartOfAccountsAddaccountComponent },
  { path: 'chart-of-accounts-editaccount', component: ChartOfAccountsEditaccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartOfAccountsRoutingModule { }
