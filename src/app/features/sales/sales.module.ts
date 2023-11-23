import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule} from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { CalendarModule} from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SalesRoutingModule } from './sales-routing.module';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { SalesPageComponent } from './components/sales-page/sales-page.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { CustomersComponent } from './components/customers/customers.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AttachmentsSectionComponent } from './components/attachments-section/attachments-section.component';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { FieldsetModule } from 'primeng/fieldset';
import {MultiSelectModule} from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {PaginatorModule} from "primeng/paginator";
import {KeyFilterModule} from 'primeng/keyfilter';
import { MenuModule } from 'primeng/menu';
import {CheckboxModule} from "primeng/checkbox";
@NgModule({
  declarations: [
    InvoicePageComponent,
    TransactionTableComponent,
    SalesPageComponent,
    AllSalesComponent,
    CustomersComponent,
    AttachmentsSectionComponent,
    ReceiptPageComponent
  ],
    imports: [
        CommonModule,
        SalesRoutingModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        FileUploadModule,
        InputTextareaModule,
        ToastModule,
        DropdownModule,
        InputNumberModule,
        TabViewModule,
        SidebarModule,
        FieldsetModule,
        MultiSelectModule,
        TagModule,
        SplitButtonModule,
        SharedModule,
        PaginatorModule,
        KeyFilterModule,
        MenuModule,
        CheckboxModule
    ]
})
export class SalesModule { }
