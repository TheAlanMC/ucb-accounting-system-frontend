import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { JournalBookReportComponent } from './components/journal-book-report/journal-book-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    ReportsPageComponent,
    JournalBookReportComponent,

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    InputNumberModule,
    TabViewModule,
    SplitButtonModule,
    SharedModule,
    PaginatorModule,
    MultiSelectModule,
  ]
})
export class ReportsModule { }
