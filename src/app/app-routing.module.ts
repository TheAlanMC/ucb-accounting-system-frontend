import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {ForbiddenComponent} from "./shared/components/forbidden/forbidden.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: '', loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule) },
  { path: '', loadChildren: () => import('./features/expenses/expenses.module').then(m => m.ExpensesModule) },
  { path: '', loadChildren: () => import('./features/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: '', loadChildren: () => import('./features/support/support.module').then(m => m.SupportModule) },
  { path: '', loadChildren: () => import('./features/company/company.module').then(m => m.CompanyModule) },
  { path: '', loadChildren: () => import('./features/user-accounts/user-accounts.module').then(m => m.UserAccountsModule) },
  { path: '', loadChildren: () => import('./features/chart-of-accounts/chart-of-accounts.module').then(m => m.ChartOfAccountsModule) },
  { path: '', loadChildren: () => import('./features/transaction/transaction.module').then(m => m.TransactionModule) },
  { path: '', loadChildren: () => import('./features/taxes/taxes.module').then(m => m.TaxesModule) },
  { path: '', loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule) },
  { path: '', loadChildren: () => import('./features/journal-entry/journal-entry.module').then(m => m.JournalEntryModule) },
  { path: '', loadChildren: () => import('./features/company-registration/company-registration.module').then(m => m.CompanyRegistrationModule) },

  // 404 Error page
  { path: '404', component: NotFoundComponent },
  // // 403 Error page
  { path: '403', component: ForbiddenComponent },
  // // Redirect to 404 for any unknown paths
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
