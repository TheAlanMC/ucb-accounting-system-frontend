import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOfAccountsRoutingModule } from './chart-of-accounts-routing.module';
import { ChartOfAccountsPageComponent } from './components/chart-of-accounts-page/chart-of-accounts-page.component';
import  { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { TreeTableModule } from 'primeng/treetable';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    ChartOfAccountsPageComponent,
  ],
  imports: [
    CommonModule,
    ChartOfAccountsRoutingModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    ReactiveFormsModule,
    SharedModule,
    ToastModule,
    InputTextModule,
    FieldsetModule,
    TreeTableModule,
    RadioButtonModule
  ]
})
export class ChartOfAccountsModule { }
