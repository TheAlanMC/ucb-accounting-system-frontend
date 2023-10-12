import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionTableComponent} from "../../../journal-entry/components/transaction-table/transaction-table.component";

import {
  AttachmentsSectionComponent
} from "../../../journal-entry/components/attachments-section/attachments-section.component";
import {TransactionDto} from "../../../journal-entry/models/transaction.dto";
import {JournalEntryService} from "../../../../core/services/journal-entry.service";
import {FilesService} from "../../../../core/services/files.service";
import {MessageService} from "primeng/api";
import {forkJoin} from "rxjs";
import {format} from "date-fns";
import {TransactionJournalEntryDto} from "../../../journal-entry/models/transaction-journal-entry.dto";

@Component({
  selector: 'app-journal-entry-generated',
  templateUrl: './journal-entry-generated.component.html',
  styleUrls: ['./journal-entry-generated.component.css']
})
export class JournalEntryGeneratedComponent {

  journalEntryId!: number;
  transactionJournalEntry!: TransactionJournalEntryDto
  totalDebitAmount: number = 0;
  totalCreditAmount: number = 0;

  constructor(private journalEntryService: JournalEntryService, private filesService: FilesService, private messageService: MessageService , private activatedRoute: ActivatedRoute, private router: Router,) { }
  ngOnInit(): void {
      //Get the journal entry id
      this.journalEntryId = this.activatedRoute.snapshot.params['id'];
      this.journalEntryService.getJournalEntryById(1, this.journalEntryId).subscribe(
          {
              next: (response) => {
                  this.transactionJournalEntry = response.data!;
                  this.totalDebitAmount = this.transactionJournalEntry.transactionDetails!.reduce((a, b) => a + (b.debitAmountBs || 0), 0);
                  this.totalCreditAmount = this.transactionJournalEntry.transactionDetails!.reduce((a, b) => a + (b.creditAmountBs || 0), 0);
              },
              error: (error) => {
                  console.log(error);
              }
          }
      );
  }

}


