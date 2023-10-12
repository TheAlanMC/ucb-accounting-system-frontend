import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEntryPageComponent } from './components/journal-entry-page/journal-entry-page.component'

const routes: Routes = [
  {path: 'journal', component: JournalEntryPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalEntryRoutingModule { }
