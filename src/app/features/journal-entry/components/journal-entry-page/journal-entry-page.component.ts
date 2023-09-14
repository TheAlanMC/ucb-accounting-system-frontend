import { Component, ViewChild} from '@angular/core';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { AttachmentsSectionComponent } from '../attachments-section/attachments-section.component';
import { TransactionDto } from '../../models/transaction.dto';
import { AttachmentDto } from '../../models/attachment.dto';
import { JournalEntryDto } from '../../models/journal-entry.dto';
import { JournalEntryService } from 'src/app/core/services/journal-entry.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-journal-entry-page',
  templateUrl: './journal-entry-page.component.html',
  styleUrls: ['./journal-entry-page.component.css']
})
export class JournalEntryPageComponent{  
  @ViewChild(TransactionTableComponent) transactionTableComponent!: TransactionTableComponent; // Obtén una referencia al componente hijo
  @ViewChild(AttachmentsSectionComponent) attachmentsComponent!: AttachmentsSectionComponent; // Obtén una referencia al componente hijo
  
  dateValue!: Date;
  journalEntryNumber: number = 1;
  transactionDetails: any[] = [];
  transactions: TransactionDto[] = [];
  attachments: AttachmentDto[] = [];
  journalEntry!: JournalEntryDto;
  description: string = '';

  constructor(private journalEntryService: JournalEntryService) { }

  //Retrieve the data from the child component - transaction table
  retrieveTransactionDetails(transactionDetails: any[]){
    console.log(transactionDetails)
    this.transactionDetails = transactionDetails;
  }
  //Retrieve the data from the child component - attachments section
  retrieveAttachments(attachments: any[]){
    console.log(attachments)
    this.attachments = attachments;
  }
  
  // Save the journal entry - service
  save(){
    //Getting the transaction details from the child component
    this.transactionTableComponent.sendTransactionDetails();
    console.log(this.transactionDetails)
    //Pass the data to the transaction dto, loop
    this.transactions = [];
    for (let i = 0; i < this.transactionDetails.length; i++) {
      this.transactions.push({
        subaccountId: parseInt(this.transactionDetails[i].cuenta),
        debitAmountBs: parseFloat(this.transactionDetails[i].debe),
        creditAmountBs: parseFloat(this.transactionDetails[i].haber)
      })
      console.log(this.transactions)
    }
    //Getting the attachments from the child component
    this.attachmentsComponent.sendAttachments();
    //Pass the data to the attachment dto, loop
    this.attachments = [];
    for (let i = 0; i < this.attachmentsComponent.uploadedFiles.length; i++) {
      this.attachments.push({
        //TODO: Change the id
        attachmentId: i,
        contentType: this.attachmentsComponent.uploadedFiles[i].type,
        fileName: this.attachmentsComponent.uploadedFiles[i].name,
      })
      console.log(this.attachments)
    }

    //Journal entry dto
    this.journalEntry = {
      documentTypeId: 1,
      journalEntryNumber: this.journalEntryNumber,
      gloss: this.transactionDetails[0].descripcion,
      description: this.description,
      transactionDate: new Date(format(new Date(this.dateValue), 'yyyy-MM-dd')),
      // transactionDate: new Date(),
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

