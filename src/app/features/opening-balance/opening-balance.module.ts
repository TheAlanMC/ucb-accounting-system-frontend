import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningBalanceRoutingModule } from './opening-balance-routing.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { OpeningBalanceComponent } from './components/opening-balance/opening-balance.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    OpeningBalanceComponent
  ],
  imports: [
    CommonModule,
    OpeningBalanceRoutingModule,
    TableModule,
    ToastModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    CalendarModule
  ]
})
export class OpeningBalanceModule { }
