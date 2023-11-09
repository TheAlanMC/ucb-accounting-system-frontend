import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialStatementsRoutingModule } from './financial-statements-routing.module';
import { IncomeStatementsComponent } from './components/income-statements/income-statements.component';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [
    IncomeStatementsComponent
  ],
  imports: [
    CommonModule,
    FinancialStatementsRoutingModule,
    CalendarModule,
    SkeletonModule,
    SidebarModule,
    SharedModule,
    ToastModule,
    TableModule,
    FormsModule,
    DividerModule,
    TreeTableModule
  ]
})
export class FinancialStatementsModule { }
