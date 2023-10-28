import { Component } from '@angular/core';
import { ReportsService } from 'src/app/core/services/reports.service';
import { TrialBalanceReportDto } from '../../models/trial-balance-report.dto';
import { TrialBalanceReportDataDto } from '../../models/trial-balance-report-data.dto';
import { addDays, format } from 'date-fns';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { TrialBalanceDetailsDto } from '../../models/trial-balance-details.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  providers: [MessageService]
})
export class BalanceComponent {
  companyid = Number(localStorage.getItem('companyId'));
  cuentas!: TrialBalanceReportDto;
  alltransactions: TrialBalanceReportDataDto[] = []; // Aquí declaramos alltransactions
  transaction!: TrialBalanceReportDataDto;
  transactionTrial: TrialBalanceDetailsDto[] = [];
  fechaInicial!: Date; // Aquí declaramos fechaInicial
  fechaFinal!: Date; // Aquí declaramos fechaFinal
  isNavbarOpen: boolean = false;

  constructor(private reportsService: ReportsService, private sidebarService: SidebarService, private messageService: MessageService) { }

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
  }

  obtenertransacciones() {
    //Validate dates
    if (this.fechaFinal == null || this.fechaInicial == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No olvide seleccionar las fechas' });
    } else if (this.fechaInicial > this.fechaFinal) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha inicial debe ser menor a la fecha final' });
    } else {
      this.reportsService.getTrialBalances(this.companyid, format(this.fechaInicial, 'yyyy-MM-dd'), format(this.fechaFinal, 'yyyy-MM-dd')).subscribe({
        next: (response) => {
          console.log(response);
          this.alltransactions = response.data!.reportData;
          this.transaction = this.alltransactions[0];
          this.transactionTrial = this.transaction.trialBalanceDetails;
          console.log(this.cuentas);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }

  }

}
