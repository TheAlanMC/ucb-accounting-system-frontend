import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartOfAccountsPageComponent } from './components/chart-of-accounts-page/chart-of-accounts-page.component';

const routes: Routes = [
  { path: 'chartofaccounts',component: ChartOfAccountsPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartOfAccountsRoutingModule { }
