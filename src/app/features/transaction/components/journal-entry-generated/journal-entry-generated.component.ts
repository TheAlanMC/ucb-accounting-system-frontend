import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionTableComponent} from "../../../journal-entry/components/transaction-table/transaction-table.component";

import {
  AttachmentsSectionComponent
} from "../../../journal-entry/components/attachments-section/attachments-section.component";
import {TransactionDetailDto} from "../../../journal-entry/models/transaction-detail.dto";
import {JournalEntryService} from "../../../../core/services/journal-entry.service";
import {FilesService} from "../../../../core/services/files.service";
import {MessageService} from "primeng/api";
import {forkJoin} from "rxjs";
import {format} from "date-fns";
import {TransactionJournalEntryDto} from "../../../journal-entry/models/transaction-journal-entry.dto";
import {DocumentTypeDto} from "../../../journal-entry/models/document-type.dto";
import { DocumentTypeService } from 'src/app/core/services/document-type.service';

@Component({
  selector: 'app-journal-entry-generated',
  templateUrl: './journal-entry-generated.component.html',
  styleUrls: ['./journal-entry-generated.component.css'],
  providers: [MessageService]
})
export class JournalEntryGeneratedComponent {

  journalEntryId: number = 0;
  transactionJournalEntry: TransactionJournalEntryDto | undefined;
  documentTypes: any = []; //Document types from service
  description: string = '';
  selectedDocumentType: any;
  dateValue: Date = new Date();



  constructor(private journalEntryService: JournalEntryService, private filesService: FilesService, private messageService: MessageService , private activatedRoute: ActivatedRoute, private router: Router, private documentTypeService: DocumentTypeService ) { }
  ngOnInit(): void {
      //Get the document types
      this.getDocumentTypes();
      //Get the journal entry id
      this.journalEntryId = this.activatedRoute.snapshot.params['id'];
      this.journalEntryService.getJournalEntryById(1, this.journalEntryId).subscribe(
          {
              next: (response) => {
                  this.transactionJournalEntry = response.data!;
                  this.description = this.transactionJournalEntry.description!;
                  this.selectedDocumentType= {
                            name: this.transactionJournalEntry.documentType!.documentTypeName,
                            code: this.transactionJournalEntry.documentType!.documentTypeId
                        }
                  this.dateValue = new Date(this.transactionJournalEntry.transactionDate!);
              },
              error: (error) => {
                  console.log(error);
              }
          }
      );
  }




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
    accept() {

    }


}


