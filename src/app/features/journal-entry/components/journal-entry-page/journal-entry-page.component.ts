import { Component, ViewChild} from '@angular/core';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { TransactionDto } from '../../models/transaction.dto';
import { AttachmentDto } from '../../models/attachment.dto';
import { JournalEntryDto } from '../../models/journal-entry.dto';
import { JournalEntryService } from 'src/app/core/services/journal-entry.service';

@Component({
  selector: 'app-journal-entry-page',
  templateUrl: './journal-entry-page.component.html',
  styleUrls: ['./journal-entry-page.component.css']
})
export class JournalEntryPageComponent{  
  @ViewChild(TransactionTableComponent) transactionTableComponent!: TransactionTableComponent; // Obtén una referencia al componente hijo
  dateValue!: Date;
  journalEntryNumber: number = 1;
  transactionDetails: any[] = [];
  transactions: TransactionDto[] = [];
  attachments!: AttachmentDto[];
  journalEntry!: JournalEntryDto;

  constructor(private journalEntryService: JournalEntryService) { }

  //Retrieve the data from the child component
  retrieveTransactionDetails(transactionDetails: any[]){
    console.log(transactionDetails)
    this.transactionDetails = transactionDetails;
  }
  
  // Save the journal entry - service
  save(){
    this.transactionTableComponent.sendTransactionDetails();
    console.log(this.transactionDetails)
    //Pass the data to the transaction dto, loop
    this.transactions = [];
    for (let i = 0; i < this.transactionDetails.length; i++) {
      this.transactions.push({
        subaccountId: this.transactionDetails[i].cuenta,
        debitAmountBs: this.transactionDetails[i].debe,
        creditAmountBs: this.transactionDetails[i].haber
      })
      console.log(this.transactions)
    }
    //Journal entry dto
    this.journalEntry = {
      documentTypeId: 1,
      journalEntryNumber: this.journalEntryNumber,
      gloss: 'string',
      description: 'string',
      transactionDate: this.dateValue,
      attachments: this.attachments,
      transactionDetails: this.transactions
    }
    console.log(this.journalEntry)

    //Calling service
    this.journalEntryService.createJournalEntry(1, this.journalEntry).subscribe({
      next: (data) => {
        console.log(data);
        console.log("Se creoo");
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
    // Save the journal entry and add another - service
    saveAndNew(){
      this.save()
      // console.log(this.products)
    }

  
}

