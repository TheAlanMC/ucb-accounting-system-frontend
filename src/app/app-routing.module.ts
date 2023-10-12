import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/journal', pathMatch: 'full'},
  // Lazy loaded module routes
  // { path: '', loadChildren: () => import('./features/journal-entry/journal-entry.module').then(m => m.JournalEntryModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
