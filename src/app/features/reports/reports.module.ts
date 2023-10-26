import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { BalanceComponent } from './components/balance/balance.component';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportsPageComponent,
    BalanceComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    CalendarModule,
    FormsModule
  ]
})
export class ReportsModule { }
