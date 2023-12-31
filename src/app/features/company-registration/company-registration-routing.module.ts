import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { StartFormComponent } from './components/start-form/start-form.component';
import {CompanySelectComponent} from "./components/company-select/company-select.component";

const routes: Routes = [
  { path: 'start',
    children: [
      // { path: '', component: StartFormComponent },
      { path: '', component: RegistrationFormComponent },
      { path: 'start', component: StartFormComponent },
      { path: 'select-company', component: CompanySelectComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRegistrationRoutingModule { }
