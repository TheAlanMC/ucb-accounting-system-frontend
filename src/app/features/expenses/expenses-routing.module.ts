import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpensesPageComponent} from "./components/expenses-page/expenses-page.component";
import {InvoicePageComponent} from "./components/invoice-page/invoice-page.component";
import {ReceiptPageComponent} from "./components/receipt-page/receipt-page.component";
import {SalesPageComponent} from "../sales/components/sales-page/sales-page.component";

const routes: Routes = [
  {
    path: 'expenses',
    children: [
      {path: '', component: ExpensesPageComponent},
      {path: 'invoice', component: InvoicePageComponent},
      {path: 'receipt', component: ReceiptPageComponent},
      {path: '**', redirectTo: 'expenses'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
