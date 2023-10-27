import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../core/guards/auth.guard";
import {LedgerBookPageComponent} from "./components/ledger-book-page/ledger-book-page.component";
import { AccountModalComponent } from './components/account-modal/account-modal.component';

const routes: Routes = [
  {path: 'ledgerbook', component: LedgerBookPageComponent},
  {path: 'prueba', component: AccountModalComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerBookRoutingModule { }
