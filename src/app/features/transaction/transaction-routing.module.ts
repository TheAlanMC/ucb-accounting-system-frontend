import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEntriesListComponent } from './components/journal-entries-list/journal-entries-list.component';

const routes: Routes = [
  { path: 'transactions',
    children: [
      { path: '', component: JournalEntriesListComponent },
      // { path: ':id', component: JournalEntriesListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
