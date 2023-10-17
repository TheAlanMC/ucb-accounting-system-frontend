import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [{
  path: 'reports',
  children: [{
    path: '', component: ReportsPageComponent, data: { roles: ['report-generator', 'report-viewer']}, canActivate: [AuthGuard] 
  }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
