import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {ForbiddenComponent} from "./shared/components/forbidden/forbidden.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  // {path: '', redirectTo: '/invoice', pathMatch: 'full'},
  //{path: '', redirectTo: '/sales', pathMatch: 'full'},

  // Lazy loaded module routes
  // { path: '', loadChildren: () => import('./features/journal-entry/journal-entry.module').then(m => m.JournalEntryModule) },

  { path: '', loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule) },
  { path: '', loadChildren: () => import('./features/expenses/expenses.module').then(m => m.ExpensesModule) },
  // { path: '', loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule) },
  // 404 Error page
  // { path: '404', component: NotFoundComponent },
  // // 403 Error page
  // { path: '403', component: ForbiddenComponent },
  // // Redirect to 404 for any unknown paths
  // { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
