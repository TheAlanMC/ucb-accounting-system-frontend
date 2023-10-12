import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpenseTransactionsComponent } from './components/expense-transactions/expense-transactions.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';


@NgModule({
  declarations: [
    ExpenseTransactionsComponent,
    SuppliersComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule
  ]
})
export class ExpensesModule { }
