import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerBookRoutingModule } from './ledger-book-routing.module';
import { LedgerBookPageComponent } from './components/ledger-book-page/ledger-book-page.component';
import {SharedModule} from "../../shared/shared.module";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import { TooltipModule } from 'primeng/tooltip';
import { DateModalComponent } from './components/date-modal/date-modal.component';
import { AccountModalComponent } from './components/account-modal/account-modal.component';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TreeTableModule } from 'primeng/treetable';
import { SkeletonModule } from 'primeng/skeleton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    LedgerBookPageComponent,
    DateModalComponent,
    AccountModalComponent
  ],
    imports: [
        CommonModule,
        LedgerBookRoutingModule,
        SharedModule,
        ToastModule,
        TableModule,
        TooltipModule,
        CalendarModule,
        FormsModule,
        DividerModule,
        RadioButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        SidebarModule,
        TreeTableModule,
        SkeletonModule,
        ScrollPanelModule,
        DropdownModule
    ],
  exports: [
    DateModalComponent,
    AccountModalComponent
  ]
})
export class LedgerBookModule { }
