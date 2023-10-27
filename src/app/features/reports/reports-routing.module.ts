import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { WorksheetReportComponent } from './components/worksheet-report/worksheet-report.component';

const routes: Routes = [{
  path: 'reports',
  children: [{
    path: 'worksheet-report', component: WorksheetReportComponent},
    {path: '', component: ReportsPageComponent, data: { roles: ['report-generator', 'report-viewer']}, canActivate: [AuthGuard] 
  }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
