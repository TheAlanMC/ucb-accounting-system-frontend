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
    ExpensesRoutingModule
  ]
})
export class ExpensesModule { }
