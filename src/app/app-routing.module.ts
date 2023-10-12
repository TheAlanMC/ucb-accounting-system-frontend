import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/sales', pathMatch: 'full'},

  // {path: '', redirectTo: '/invoice', pathMatch: 'full'},
  //{path: '', redirectTo: '/sales', pathMatch: 'full'},
  
  // Lazy loaded module routes
  { path: 'sales-page', loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule) },
  // { path: '', loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
