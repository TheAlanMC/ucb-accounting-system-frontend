import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';


@NgModule({
  declarations: [
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    CompanyRegistrationRoutingModule
  ]
})
export class CompanyRegistrationModule { }
