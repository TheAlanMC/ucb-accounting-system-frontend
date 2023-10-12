import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { ListJournalentriesGeneratedComponent } from './components/list-journalentries-generated/list-journalentries-generated.component';
import { TableModule } from 'primeng/table';
import { TagModule} from 'primeng/tag';


@NgModule({
  declarations: [
    ListJournalentriesGeneratedComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    TableModule,
    TagModule

  ]
})
export class TransactionModule { }
