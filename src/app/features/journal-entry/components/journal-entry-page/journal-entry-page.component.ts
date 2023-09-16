import { Component, ViewChild } from '@angular/core';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { AttachmentsSectionComponent } from '../attachments-section/attachments-section.component';
import { TransactionDto } from '../../models/transaction.dto';
import { AttachmentDto } from '../../models/attachment.dto';
import { JournalEntryDto } from '../../models/journal-entry.dto';
import { JournalEntryService } from 'src/app/core/services/journal-entry.service';
import { FilesService } from 'src/app/core/services/files.service';
import { format } from 'date-fns';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-journal-entry-page',
  templateUrl: './journal-entry-page.component.html',
  styleUrls: ['./journal-entry-page.component.css'],
  providers: [MessageService]
})
export class JournalEntryPageComponent {
  @ViewChild(TransactionTableComponent) transactionTableComponent!: TransactionTableComponent; // Obtén una referencia al componente hijo
  @ViewChild(AttachmentsSectionComponent) attachmentsComponent!: AttachmentsSectionComponent; // Obtén una referencia al componente hijo

  dateValue!: Date;
  //TODO: Get the journal entry number from the service
  journalEntryNumber: number = 23;
  transactionDetails: TransactionDto[] = []; //Transactions from component - transaction table, ready to send to the service
  filesDetails: any[] = []; //Files from component - attachments section
  attachments: AttachmentDto[] = []; //Files to send to the service
  journalEntry!: JournalEntryDto; 
  description: string = ''; 
  gloss: string = ''; //Gloss from component - transaction table
  
  constructor(private journalEntryService: JournalEntryService, private filesService: FilesService,private messageService: MessageService) { }

  //Retrieve the data from the child component - transaction table
  retrieveTransactionDetails(transactionDetails: TransactionDto[]) {
    console.log(transactionDetails)
    this.transactionDetails = transactionDetails;
  }
  //Retrieve the gloss from the child component - transaction table
  retrieveGloss(gloss: string) {
    console.log(gloss)
    this.gloss = gloss;
  }

  //Retrieve the data from the child component - attachments section
  retrieveAttachments(attachments: any[]) {
    console.log(attachments)
    this.filesDetails = attachments;
  }

  // Save the journal entry - service
  save() {
    //Getting the transaction details from the child component - transaction table
    this.transactionTableComponent.sendTransactionDetails();
    console.log(this.transactionDetails)
    //Getting the gloss from the child component - transaction table
    this.transactionTableComponent.sendGloss();

    //Getting the attachments from the child component - attachments section
    this.attachmentsComponent.sendAttachments();
  
    //Upload files
    //Calling service - each file
    const uploadObservables = this.attachmentsComponent.uploadedFiles.map((file) => {
      const formData = new FormData();
      formData.append('attachment', file);
      return this.filesService.uploadFile(1, formData);
    });

    forkJoin(uploadObservables).subscribe({
      next: (responses) => {
        console.log("Todos los archivos se han subido correctamente");
        console.log(responses);

        // Se asigna los datos de los archivos subidos a 'this.attachments'.
        this.attachments = responses.map((data: any) => ({
          attachmentId: data.data.attachmentId,
          contentType: data.data.contentType,
          filename: data.data.filename
        }));

        console.log(this.attachments);
        //Upload journal entry
        //Journal entry dto
        this.journalEntry = {
          documentTypeId: 1, //TODO: Get the document type (?)
          journalEntryNumber: this.journalEntryNumber,
          gloss: this.gloss,
          description: this.description,
          transactionDate: new Date(format(new Date(this.dateValue), 'yyyy-MM-dd')),
          // transactionDate: new Date(),
          attachments: this.attachments,
          transactionDetails: this.transactionDetails
        }
        console.log(this.journalEntry)
        //Calling service
        this.journalEntryService.createJournalEntry(1, this.journalEntry).subscribe({
          next: (data) => {
            console.log(data);
            console.log("Se creoo");
            this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Asiento creado correctamente'});
          },
          error: (error) => {
            console.log(error);
            console.log("Hubo un error al crear el asiento");
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Hubo un error al crear el asiento, intente nuevamente'});
          }
        });

      },
      error: (error) => {
        console.log("Hubo un error al subir los archivos");
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Hubo un error al crear el asiento, intente nuevamente'});
      }
    });
  }
  
  // Save the journal entry and add another - service
  saveAndNew() {
    this.save()
    // console.log(this.products)
  }

  

}

