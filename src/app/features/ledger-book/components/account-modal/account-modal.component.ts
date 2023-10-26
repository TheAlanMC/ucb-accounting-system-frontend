import { Component } from '@angular/core';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import { ReportService } from 'src/app/core/services/report.service';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';
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
  selectedAccounts!: SubaccountDto[];
  isLoading: boolean = true;

  constructor(private reportService: ReportService, private ledgerBookService: LedgerBookService) { }

  ngOnInit(): void {
    this.getAccounts();
  }
  
  getAccounts() {
    if(this.ledgerBookService.getdateFrom() != null && this.ledgerBookService.getdateTo() != null){
      this.ledgerBookService.getdateFrom().subscribe((dateFrom) => {
        var formattedDateFrom = format(dateFrom, 'yyyy-MM-dd');
        this.ledgerBookService.getdateTo().subscribe((dateTo) => {
          var formattedDateTo = format(dateTo, 'yyyy-MM-dd');
          this.reportService.getLedgerBookSubaccounts(this.companyId, formattedDateFrom, formattedDateTo, '', 'asc').subscribe({
            next: (response) => {
              this.accounts = response.data!;
              this.isLoading = false;
            },
            error: (error) => {
              console.log(error);
            }
          });
        });
      });
    }
  }

  onCheckboxChange(event: any) {
    console.log(this.selectedAccounts);
    if(this.selectedAccounts != null){
      //Map the selected accounts to an array of strings
      var selectedAccountsIds: string[] = [];
      selectedAccountsIds = this.selectedAccounts.map((account) => account.subaccountId.toString());
      console.log(selectedAccountsIds);
      this.ledgerBookService.setsubaccountIds(selectedAccountsIds);
    }
  }
}
