import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DailyJournalPageComponent} from "./components/daily-journal-page/daily-journal-page.component";
import {PurchaseFormComponent} from "./components/purchase-form/purchase-form.component";
import {SalesFormComponent} from "./components/sales-form/sales-form.component";
import {TaxModificationPageComponent} from "./components/tax-modification-page/tax-modification-page.component";
import { TaxPageComponent } from './components/tax-page/tax-page.component';

const routes: Routes = [
  {path: 'taxes', component: TaxPageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRoutingModule { }
