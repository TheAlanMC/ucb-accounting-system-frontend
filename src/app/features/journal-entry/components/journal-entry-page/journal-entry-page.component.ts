import { Component, ViewChild } from '@angular/core';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { AttachmentsSectionComponent } from '../attachments-section/attachments-section.component';
import { TransactionDetailDto } from '../../models/transaction-detail.dto';
import { AttachmentDto } from '../../../../core/models/attachment.dto';
import { JournalEntryDto } from '../../models/journal-entry.dto';
import { JournalEntryService } from 'src/app/core/services/journal-entry.service';
import { FilesService } from 'src/app/core/services/files.service';
import { format } from 'date-fns';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DocumentTypeService } from 'src/app/core/services/document-type.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-journal-entry-page',
  templateUrl: './journal-entry-page.component.html',
  styleUrls: ['./journal-entry-page.component.css'],
  providers: [MessageService]
})
export class JournalEntryPageComponent {
  @ViewChild(TransactionTableComponent) transactionTableComponent!: TransactionTableComponent; // Obtén una referencia al componente hijo
  @ViewChild(AttachmentsSectionComponent) attachmentsComponent!: AttachmentsSectionComponent; // Obtén una referencia al componente hijo

  companyId = Number(localStorage.getItem('companyId'));
  dateValue!: Date;
  selectedDocumentType: any;
  documentTypes: any = []; //Document types from service
  journalEntryNumber: number = 0;  //Journal entry number from service
  transactionDetails: TransactionDetailDto[] = []; //Transactions from component - transaction table, ready to send to the service
  filesDetails: any[] = []; //Files from component - attachments section
  attachments: AttachmentDto[] = []; //Files to send to the service
  journalEntry!: JournalEntryDto;
  description: string = '';
  gloss: string = ''; //Gloss from component - transaction table
  totalDebitAmount: number = 0;
  totalCreditAmount: number = 0;
  selectedSaveAndNew: boolean = false;
  saved: boolean = false;
  constructor(private journalEntryService: JournalEntryService, private filesService: FilesService, private messageService: MessageService, private documentTypeService: DocumentTypeService, private location: Location) { }
  ngOnInit(): void {
    //Get the document types
    this.getDocumentTypes();
    //Get the journal entry number
    this.getJournalEntryNumber();
  }

  //Retrieve the data from the child component - transaction table
  retrieveTransactionDetails(transactionDetails: TransactionDetailDto[]) {
   // console.log(transactionDetails)
    this.transactionDetails = transactionDetails;
  }
  //Retrieve the gloss from the child component - transaction table
  retrieveGlossAndTotal(values: string[]) {
    this.gloss = values[0];
    this.totalDebitAmount = parseFloat(values[1]);
    this.totalCreditAmount = parseFloat(values[2]);
  }

  //Retrieve the data from the child component - attachments section
  retrieveAttachments(attachments: any[]) {
    // console.log(attachments)
    this.filesDetails = attachments;
  }

  // Save the journal entry - service
  save() {
    this.saved = false;
    // this.selectedSaveAndNew = false;
    //Getting the gloss from the child component - transaction table
    this.transactionTableComponent.sendGlossAndTotal();
    //Validating the total amount of the debit and credit columns
    if (this.validateTotalAmount()) {
      //Date field is required
      if (this.dateValue == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No olvide ingresar la fecha del comprobante.' });
        return;
      }
      //Getting the transaction details from the child component - transaction table
      this.transactionTableComponent.sendTransactionDetails();
      // console.log(this.transactionDetails)

      //Dont recieve empty transactions, with no debe and haber
      //If there is not debe and haber at least in one transaction, the journal entry wont be created
      let emptyTransactions = false;
      for (let i = 0; i < this.transactionDetails.length; i++) {
        if (this.transactionDetails[i].debitAmountBs == 0 && this.transactionDetails[i].creditAmountBs == 0) {
          emptyTransactions = true;
        }
      }
      if (emptyTransactions) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede crear el comprobante si existen filas sin valores en el debe y haber. Elimine las filas que no están siendo utilizadas' });
        return;
      }

      //Getting the attachments from the child component - attachments section
      this.attachmentsComponent.sendAttachments();

      if (this.attachmentsComponent.uploadedFiles.length == 0) {
        this.uploadJournalEntry();
      } else {

        //Upload files
        //Calling service - each file
        const uploadObservables = this.attachmentsComponent.uploadedFiles.map((file) => {
          const formData = new FormData();
          formData.append('attachment', file);
          return this.filesService.uploadFile(this.companyId, formData);
        });

        forkJoin(uploadObservables).subscribe({
          next: (responses) => {
            // console.log("Todos los archivos se han subido correctamente");
            // console.log(responses);

            // Se asigna los datos de los archivos subidos a 'this.attachments'.
            this.attachments = responses.map((data: any) => ({
              attachmentId: data.data.attachmentId,
              contentType: data.data.contentType,
              filename: data.data.filename
            }));

            // console.log(this.attachments);
            this.uploadJournalEntry()
          },
          error: (error) => {
            // console.log("Hubo un error al subir los archivos");
            // console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el comprobante, intente nuevamente' });
          }
        });
      }
    } else {
      //En caso de que el monto total del debe y el haber no sea igual
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El monto total del debe y el haber debe ser igual' });
    }
  }

  // Save the journal entry and add another - service
  saveAndNew() {
    this.selectedSaveAndNew = true;
    this.save();
    // if (this.saved) {
    //   //Vaciamos el formulario
    //   this.transactionTableComponent.deleteAllRows();
    //   this.attachmentsComponent.deleteAllFiles();
    //   this.gloss = '';
    //   this.description = '';
    //   this.dateValue = new Date();
    //   this.totalDebitAmount = 0;
    //   this.totalCreditAmount = 0;
    //   this.selectedDocumentType = undefined;
    //   this.getJournalEntryNumber();
    // }

  }

  uploadJournalEntry() {
    //Upload journal entry
    //Journal entry dto
    this.journalEntry = {
      documentTypeId: this.selectedDocumentType.code,
      journalEntryNumber: this.journalEntryNumber,
      gloss: this.gloss,
      description: this.description,
      transactionDate: new Date(format(new Date(this.dateValue), 'yyyy-MM-dd')),
      // transactionDate: new Date(),
      attachments: this.attachments,
      transactionDetails: this.transactionDetails
    }
    // console.log(this.journalEntry)
    //Calling service
    this.journalEntryService.createJournalEntry(this.companyId, this.journalEntry).subscribe({
      next: (data) => {
        // console.log(data);
        // console.log("Se creoo");
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Comprobante creado correctamente' });
        this.saved = true;
        //Esperar  segundos antes de redireccionar
        if(!this.selectedSaveAndNew){
          setTimeout(() => {
            this.goBack()
          }, 2000);
        } else {
          this.transactionTableComponent.deleteAllRows();
          this.attachmentsComponent.deleteAllFiles();
          this.gloss = '';
          this.description = '';
          this.dateValue = new Date();
          this.totalDebitAmount = 0;
          this.totalCreditAmount = 0;
          this.selectedDocumentType = undefined;
          this.getJournalEntryNumber();
        }
      },
      error: (error) => {
        // console.log(error);
        // console.log("Hubo un error al crear el asiento");
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el comprobante, intente nuevamente' });
      }
    });
  }

  //Validate the total amount of the debit and credit columns
  validateTotalAmount() {
    if (this.totalDebitAmount != this.totalCreditAmount) {
      return false;
    }
    return true;
  }

  //Get the document types
  getDocumentTypes() {
    this.documentTypeService.getDocumentTypes().subscribe({
      next: (data) => {
        if (data.data != null) {
          // Parsing the data
          this.documentTypes = data.data.map((documentType) => ({
            name: documentType.documentTypeName,
            code: documentType.documentTypeId
          }));
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getJournalEntryNumber() {
    this.journalEntryService.getLastJournalEntryNumber(this.companyId).subscribe({
      next: (data) => {
        if (data.data != null) {
          this.journalEntryNumber = data.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  delete(){
    //Vaciamos el formulario
    this.transactionTableComponent.deleteAllRows();
    this.attachmentsComponent.deleteAllFiles();
    this.gloss = '';
    this.description = '';
    this.dateValue = new Date();
    this.totalDebitAmount = 0;
    this.totalCreditAmount = 0;
    this.selectedDocumentType = undefined;
  }
}

