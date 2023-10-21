import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { StartFormComponent } from './components/start-form/start-form.component';
import { DropdownModule } from 'primeng/dropdown';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    StartFormComponent,
    RegistrationFormComponent
  ],
    imports: [
        CommonModule,
        CompanyRegistrationRoutingModule,
        DropdownModule,
        FormsModule,
        ButtonModule
    ]
})
export class CompanyRegistrationModule { }
