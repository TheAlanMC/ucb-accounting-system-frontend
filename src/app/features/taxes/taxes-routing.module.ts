import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DailyJournalPageComponent} from "./components/daily-journal-page/daily-journal-page.component";
import {PurchaseFormComponent} from "./components/purchase-form/purchase-form.component";
import {SalesFormComponent} from "./components/sales-form/sales-form.component";
import {TaxModificationPageComponent} from "./components/tax-modification-page/tax-modification-page.component";

const routes: Routes = [
  {path: 'daily-journal-page', component : DailyJournalPageComponent},
  {path: 'purchase-form', component : PurchaseFormComponent},
  {path: 'sales-form', component : SalesFormComponent},
  {path: 'tax-modification', component : TaxModificationPageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRoutingModule { }
