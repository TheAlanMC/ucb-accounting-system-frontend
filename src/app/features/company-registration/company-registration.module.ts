import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { StartFormComponent } from './components/start-form/start-form.component';


@NgModule({
  declarations: [
    RegistrationFormComponent,
    StartFormComponent
  ],
  imports: [
    CommonModule,
    CompanyRegistrationRoutingModule
  ]
})
export class CompanyRegistrationModule { }
