import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEntryPageComponent } from './components/journal-entry-page/journal-entry-page.component'
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {path: 'journal', component: JournalEntryPageComponent, data: {roles: ['journal-entry-recorder']}, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalEntryRoutingModule { }
