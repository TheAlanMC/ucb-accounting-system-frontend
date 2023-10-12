import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { JournalEntriesListComponent } from './components/journal-entries-list/journal-entries-list.component';
import { TableModule } from 'primeng/table';
import { TagModule} from 'primeng/tag';


@NgModule({
  declarations: [
    JournalEntriesListComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    TableModule,
    TagModule

  ]
})
export class TransactionModule { }
