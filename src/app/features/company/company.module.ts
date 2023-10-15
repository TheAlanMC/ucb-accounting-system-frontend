import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { UserListCompanyComponent } from './components/user-list/user-list-company.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';




@NgModule({
  declarations: [
    CompanyInfoComponent,
    CreateAccountComponent,
    UserListCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ButtonModule,
    ToastModule, 
    DropdownModule, 
    TableModule,
    SharedModule,
    InputTextModule
  ],
  
})
export class CompanyModule { }
