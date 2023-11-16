import { Component } from '@angular/core';
import { SidebarService } from "../../../../core/services/sidebar/sidebar.service";
import { ReportService } from 'src/app/core/services/report.service';
import { GeneralLedgerReportDataDto } from '../../models/general-ledger-report-data.dto';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';
import { format } from 'date-fns';
import { GeneralLedgerTransactionDetailDto } from '../../models/general-ledger-transaction-detail.dto';

@Component({
  selector: 'app-ledger-book-page',
  templateUrl: './ledger-book-page.component.html',
  styleUrls: ['./ledger-book-page.component.css']
})

export class LedgerBookPageComponent {
  companyId = Number(localStorage.getItem('companyId'));
  isNavbarOpen: boolean = false;
  saldoFinal: number = 0;
  allTransactions: GeneralLedgerReportDataDto[] = [];
  transaction: GeneralLedgerReportDataDto = {
    subaccount: {
      subaccountCode: 0,
      subaccountName: '',
      subaccountId: 0,
    },
    totalBalanceAmount: 0,
    totalCreditAmount: 0,
    totalDebitAmount: 0,
    transactionDetails: []
  };
  transactionDetails: GeneralLedgerTransactionDetailDto[] = [
    {
      balanceAmount: 0,
      creditAmount: 0,
      debitAmount: 0,
      description: 'string',
      gloss: 'string',
      transactionDate: new Date(),

    }
  ];
  nombreCuenta: string = 'Caja Moneda Nacional - MLL';
  dateFrom!: string;
  dateTo!: string;
  sortType: string = 'asc';
  sortBy: string = '';
  subaccountIds: string[] = [];
  index: number = 0;
  moreThanOneAccount: boolean = false;
  isLoading: boolean = true;
  cuentasDropdown: any = [];
  selectedAccount: any;
  loading = false;


  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }
  constructor(private sidebarService: SidebarService, private reportService: ReportService, private ledgerBookService: LedgerBookService) {
  }

  ngOnInit(): void {
    const bgColor = '#F3F6F6;'; // Cambiamos el color
    this.sidebarService.setBackgroundColor(bgColor);
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    this.getInitialTransaction();

  }

  getInitialTransaction() {
    this.dateFrom = format(this.ledgerBookService.getdateFrom(), 'yyyy-MM-dd');
    this.dateTo = format(this.ledgerBookService.getdateTo(), 'yyyy-MM-dd');
    this.subaccountIds = this.ledgerBookService.getsubaccountIds();
    this.getTransactions();
  }

  getTransactions() {
    this.reportService.getGeneralLedgers(this.companyId, this.dateFrom, this.dateTo, '', 'asc', this.subaccountIds).subscribe({
      next: (response) => {
        this.allTransactions = response.data!.reportData;
        this.transaction = this.allTransactions[0];
        this.transactionDetails = this.transaction.transactionDetails;
        console.log(response.data);
        if (this.allTransactions.length > 1) {
          this.moreThanOneAccount = true;
        }
        for (const transaction of this.allTransactions) {
          this.cuentasDropdown.push({
            name: transaction.subaccount.subaccountName,
            code: transaction.subaccount.subaccountId
          })
        }
        //Encontramos el index para el dropdown por el id de la cuenta
        this.selectedAccount = this.cuentasDropdown[0];
        this.isLoading = false;

      },
      error: (error) => {
        // console.log(error);
      }
    });
  }

  nextAccount() {
    this.index = (this.index + 1) % this.allTransactions.length;
    this.transaction = this.allTransactions[this.index];
    this.transactionDetails = this.transaction.transactionDetails;
    this.selectedAccount = this.cuentasDropdown[this.index];
  }
  previousAccount() {
    if (this.index > 0) {
      this.index--;
    } else {
      //Vamos a la ultima cuenta
      this.index = this.allTransactions.length - 1;
    }
    this.transaction = this.allTransactions[this.index];
    this.transactionDetails = this.transaction.transactionDetails;
    this.selectedAccount = this.cuentasDropdown[this.index];
  }

  onSelectedAccount(event: any) {
    console.log(event);
    //encontrar el index que corresponda a code
    this.index = this.allTransactions.findIndex((transaction) => transaction.subaccount.subaccountId == event.value.code);
    this.transaction = this.allTransactions[this.index];
    this.transactionDetails = this.transaction.transactionDetails;
  }

  exportPdf() {
    this.loading = true;
    this.reportService.getGeneralLedgersPdf(this.companyId, this.dateFrom, this.dateTo, '', 'asc', this.subaccountIds).subscribe({
      next: (response) => {
        window.open(response.data!.fileUrl, '_blank');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  exportExcel() {
    this.loading = true;
    this.reportService.getGeneralLedgersExcel(this.companyId, this.dateFrom, this.dateTo, '', 'asc', this.subaccountIds).subscribe({
      next: (data) => {
        // window.open(data.data!.fileUrl, '_blank');
        fetch(data.data!.fileUrl).then(res => res.blob()).then(blob => {
            const newDateFrom = Date.parse(this.dateFrom + 'T04:00:00');
            const newDateTo = Date.parse(this.dateTo + 'T04:00:00');
            // Create a new blob object using the response data of the onload object
            const blobData = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            // Create a link element
            const anchor = document.createElement('a');
            // Create a reference to the object URL
            anchor.href = window.URL.createObjectURL(blobData);
            // Set the filename that will be downloaded
            anchor.download = `LIBRO MAYOR ${format(newDateFrom, 'dd-MM-yyyy')} - ${format(newDateTo, 'dd-MM-yyyy')}.xlsx`;
            // Trigger the download by simulating click
            anchor.click();
            // Revoking the object URL to free up memory
            window.URL.revokeObjectURL(anchor.href);
          }
        );
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
