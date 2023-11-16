import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningBalanceComponent } from './components/opening-balance/opening-balance.component';

const routes: Routes = [
  {path: 'openingbalance', component: OpeningBalanceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeningBalanceRoutingModule { }
