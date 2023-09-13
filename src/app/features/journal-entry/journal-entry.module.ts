import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { JournalEntryRoutingModule } from './journal-entry-routing.module';
import { JournalEntryPageComponent } from './components/journal-entry-page/journal-entry-page.component';


@NgModule({
  declarations: [
    JournalEntryPageComponent
  ],
  imports: [
    CommonModule,
    JournalEntryRoutingModule,
    TableModule
  ]
})
export class JournalEntryModule { }
