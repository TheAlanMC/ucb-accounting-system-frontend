import { Component } from '@angular/core';
import {SidebarService} from "../../../../core/services/sidebar/sidebar.service";
import { ReportService } from 'src/app/core/services/report.service';
import { GeneralLedgerReportDataDto } from '../../models/general-ledger-report-data.dto';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-ledger-book-page',
  templateUrl: './ledger-book-page.component.html',
  styleUrls: ['./ledger-book-page.component.css']
})
export class LedgerBookPageComponent {
  companyId = Number(localStorage.getItem('companyId'));
  isNavbarOpen : boolean = false;
  saldoFinal: number = 0;
  allTransactions: GeneralLedgerReportDataDto[] = [];
  transaction!: GeneralLedgerReportDataDto;
  nombreCuenta: string = 'Caja Moneda Nacional - MLL';
  dateFrom!: string;
  dateTo!: string;
  sortType: string = 'asc';
  sortBy: string = '';
  subaccountIds: string[] = ['1','2','3'];
  index: number = 0;
  moreThanOneAccount: boolean = false;
  isLoading: boolean = true;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }
  constructor(private sidebarService: SidebarService, private reportService: ReportService, private ledgerBookService: LedgerBookService) {
  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    this.getInitialTransaction();
  }

  getInitialTransaction(){
    // this.ledgerBookService.getdateFrom().subscribe((dateFrom) => {
    //   this.dateFrom = format(dateFrom, 'yyyy-MM-dd');
    //   this.ledgerBookService.getdateTo().subscribe((dateTo) => {
    //     this.dateTo = format(dateTo, 'yyyy-MM-dd');
    //     this.ledgerBookService.getsubaccountIds().subscribe((subaccountIds) => {
    //       this.subaccountIds = subaccountIds;
    //       this.getTransactions();

    //     });
    //   });
    // });

      this.dateFrom = format(this.ledgerBookService.getdateFrom(), 'yyyy-MM-dd');
      this.dateTo = format(this.ledgerBookService.getdateTo(), 'yyyy-MM-dd');
      this.subaccountIds = this.ledgerBookService.getsubaccountIds();
      this.getTransactions();
  }

  getTransactions(){
    this.reportService.getGeneralLedgers(this.companyId, this.dateFrom, this.dateTo, '', 'asc', this.subaccountIds).subscribe({
      next: (response) => {
        this.allTransactions = response.data!.reportData;
        this.transaction = this.allTransactions[0];
        console.log(response.data);
        if(this.allTransactions.length > 1){
          this.moreThanOneAccount = true;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  nextAccount(){
    this.index = (this.index + 1) % this.allTransactions.length;
    this.transaction = this.allTransactions[this.index];
    console.log(this.index);
  }
  previousAccount(){
    if(this.index > 0){
      this.index--;
    }else{
      //Vamos a la ultima cuenta
      this.index = this.allTransactions.length - 1;
    }
    this.transaction = this.allTransactions[this.index];
    console.log(this.index);
  }


}
