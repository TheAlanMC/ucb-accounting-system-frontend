import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {LedgerBookPageComponent} from "../ledger-book/components/ledger-book-page/ledger-book-page.component";
import { AccountModalComponent } from '../ledger-book/components/account-modal/account-modal.component';

const routes: Routes = [{
  path: 'reports',
  children: [{
    path: '', component: ReportsPageComponent, data: { roles: ['report-generator', 'report-viewer']}, canActivate: [AuthGuard] },
    { path:'ledgerbook', component: LedgerBookPageComponent},
    {path: 'prueba', component: AccountModalComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
