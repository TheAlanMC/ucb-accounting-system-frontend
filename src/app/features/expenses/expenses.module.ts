import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { AllExpensesComponent } from './components/all-expenses/all-expenses.component';
import { AttachmentsSectionComponent } from './components/attachments-section/attachments-section.component';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { ExpensesPageComponent } from './components/expenses-page/expenses-page.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {SplitButtonModule} from "primeng/splitbutton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TabViewModule} from "primeng/tabview";
import {ToastModule} from "primeng/toast";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {FileUploadModule} from "primeng/fileupload";
import {FieldsetModule} from "primeng/fieldset";
import {SidebarModule} from "primeng/sidebar";
import {InputNumberModule} from "primeng/inputnumber";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [
    SuppliersComponent,
    AllExpensesComponent,
    AttachmentsSectionComponent,
    InvoicePageComponent,
    ReceiptPageComponent,
    ExpensesPageComponent,
    TransactionTableComponent,
  ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        MultiSelectModule,
        SharedModule,
        SplitButtonModule,
        TableModule,
        TagModule,
        TabViewModule,
        ToastModule,
        SharedModule,
        FormsModule,
        InputTextareaModule,
        InputTextModule,
        FileUploadModule,
        FieldsetModule,
        SidebarModule,
        InputNumberModule,
        PaginatorModule
    ]
})
export class ExpensesModule { }
