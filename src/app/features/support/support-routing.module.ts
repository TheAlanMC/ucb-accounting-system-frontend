import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportPageComponent } from './components/support-page/support-page.component';

const routes: Routes = [{
  path: 'support',
  children: [{
    path: '', component: SupportPageComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
