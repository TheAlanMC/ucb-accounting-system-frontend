import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import {SharedModule} from "../../shared/shared.module";
import {ToastModule} from "primeng/toast";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import { DialogModule } from 'primeng/dialog';
import { LedgerBookModule } from '../ledger-book/ledger-book.module';


@NgModule({
  declarations: [
    ReportsPageComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    LedgerBookModule,
   

  ]
})
export class ReportsModule { }
