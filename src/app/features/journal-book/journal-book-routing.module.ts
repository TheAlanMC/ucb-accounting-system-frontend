import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListJournalentriesGeneratedComponent } from './components/list-journalentries-generated/list-journalentries-generated.component';

const routes: Routes = [
  { path: 'list/journal/g', component: ListJournalentriesGeneratedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalBookRoutingModule { }
