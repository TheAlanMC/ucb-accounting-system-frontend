import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesPageComponent } from './components/sales-page/sales-page.component';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {
    path: 'sales',
    children: [
      {path: '', component: SalesPageComponent},
      {path: 'invoice', component: InvoicePageComponent},
      {path: 'receipt', component: ReceiptPageComponent},
      // {path: 'customers', component: CustomersComponent},
      {path: '**', redirectTo: 'sales'}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
