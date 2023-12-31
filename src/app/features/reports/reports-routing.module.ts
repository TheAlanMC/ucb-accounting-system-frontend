import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { JournalBookReportComponent } from './components/journal-book-report/journal-book-report.component';
import { WorksheetReportComponent } from './components/worksheet-report/worksheet-report.component';
import { TrialBalanceComponent } from './components/trial-balance/trial-balance.component';
import { LedgerBookPageComponent } from '../ledger-book/components/ledger-book-page/ledger-book-page.component';
import { AccountModalComponent } from '../ledger-book/components/account-modal/account-modal.component';
import { BalanceSheetsComponent } from '../financial-statements/components/balance-sheets/balance-sheets.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { IncomeStatementsComponent } from '../financial-statements/components/income-statements/income-statements.component';

const routes: Routes = [{
  path: 'reports',
  children: [
    { path: 'journalbook', component: JournalBookReportComponent },
    { path: 'trialbalance', component: TrialBalanceComponent },
    { path: 'worksheet', component: WorksheetReportComponent },
    { path: 'ledgerbook', component: LedgerBookPageComponent },
    { path: 'balancesheet', component: BalanceSheetsComponent },
    { path: 'list', component: ReportListComponent },
    { path: 'incomestatements', component: IncomeStatementsComponent },
    {path: '', component: ReportsPageComponent, data: { roles: ['report-generator', 'report-viewer'] }, canActivate: [AuthGuard]}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
