import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxModificationPageComponent } from './components/tax-modification-page/tax-modification-page.component';
import { DailyJournalPageComponent } from './components/daily-journal-page/daily-journal-page.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';
import { SalesFormComponent } from './components/sales-form/sales-form.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxPageComponent } from './components/tax-page/tax-page.component';
import {ChipsModule} from "primeng/chips";
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog'; 
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    TaxModificationPageComponent,
    DailyJournalPageComponent,
    PurchaseFormComponent,
    SalesFormComponent,
    TaxPageComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    ChipsModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    SharedModule,
    ToastModule
  ]
})
export class TaxesModule { }
