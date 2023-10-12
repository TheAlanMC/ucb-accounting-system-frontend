import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxModificationPageComponent } from './components/tax-modification-page/tax-modification-page.component';
import { DailyJournalPageComponent } from './components/daily-journal-page/daily-journal-page.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';
import { SalesFormComponent } from './components/sales-form/sales-form.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaxModificationPageComponent,
    DailyJournalPageComponent,
    PurchaseFormComponent,
    SalesFormComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class TaxesModule { }
