import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JournalEntryRoutingModule } from './journal-entry-routing.module';
import { JournalEntryPageComponent } from './components/journal-entry-page/journal-entry-page.component';

@NgModule({
  declarations: [
    JournalEntryPageComponent
  ],
  imports: [
    CommonModule,
    JournalEntryRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule
  ]
})
export class JournalEntryModule { }
