import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule} from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { CalendarModule} from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JournalEntryRoutingModule } from './journal-entry-routing.module';
import { JournalEntryPageComponent } from './components/journal-entry-page/journal-entry-page.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { AttachmentsSectionComponent } from './components/attachments-section/attachments-section.component';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    JournalEntryPageComponent,
    TransactionTableComponent,
    AttachmentsSectionComponent
  ],
  imports: [
    CommonModule,
    JournalEntryRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    FileUploadModule,
    InputTextareaModule,
    ToastModule,
    DropdownModule,
    SharedModule
  ]
})
export class JournalEntryModule { }
