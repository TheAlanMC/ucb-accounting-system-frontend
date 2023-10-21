import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { StartFormComponent } from './components/start-form/start-form.component';
import { CompanySelectComponent } from './components/company-select/company-select.component';
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RegistrationFormComponent,
    StartFormComponent,
    CompanySelectComponent
  ],
  imports: [
    CommonModule,
    CompanyRegistrationRoutingModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    FormsModule
  ]
})
export class CompanyRegistrationModule { }
