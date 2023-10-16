import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { JournalEntriesListComponent } from './components/journal-entries-list/journal-entries-list.component';
import { TableModule } from 'primeng/table';
import { TagModule} from 'primeng/tag';
import { JournalEntryGeneratedComponent } from './components/journal-entry-generated/journal-entry-generated.component';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";
import {TransactionTableComponent} from "./components/transaction-table/transaction-table.component";
import {SidebarModule} from "primeng/sidebar";
import {InputTextModule} from "primeng/inputtext";
import {AttachmentsSectionComponent} from "./components/attachments-section/attachments-section.component";
import {FileUploadModule} from "primeng/fileupload";
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JournalEntriesListComponent,
    JournalEntryGeneratedComponent,
    TransactionTableComponent,
    AttachmentsSectionComponent
  ],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        TableModule,
        TagModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        FormsModule,
        InputTextareaModule,
        ToastModule,
        SidebarModule,
        InputTextModule,
        FileUploadModule,
        SharedModule
    ]
})
export class TransactionModule { }
