import { Component } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';
import { SubaccountDto } from 'src/app/features/chart-of-accounts/models/subaccount.dto';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css']
})
export class AccountModalComponent {
  companyId = Number(localStorage.getItem('companyId'));
  typeOfSelection: string = 'checkbox';
  firstAccount: string = '1';
  lastAccount: string = '3';
  accounts: SubaccountDto[] = [];
  selectedAccounts!: SubaccountDto;
  isLoading: boolean = true;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getAccounts();
  }
  
  getAccounts() {
    this.reportService.getLedgerBookSubaccounts(this.companyId, '2021-01-01', '2023-12-31', '', 'asc').subscribe({
      next: (response) => {
        this.accounts = response.data!;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }

}
