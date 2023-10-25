import { Component } from '@angular/core';
import {SidebarService} from "../../../../core/services/sidebar/sidebar.service";
import { ReportService } from 'src/app/core/services/report.service';
import { GeneralLedgerReportDataDto } from '../../models/general-ledger-report-data.dto';

@Component({
  selector: 'app-ledger-book-page',
  templateUrl: './ledger-book-page.component.html',
  styleUrls: ['./ledger-book-page.component.css']
})
export class LedgerBookPageComponent {
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

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }
  constructor(private sidebarService: SidebarService, private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    this.getInitialTransaction();
  }

  getInitialTransaction(){
    this.reportService.getGeneralLedgers(1,'2021-01-01', '2023-12-31', '', 'asc', ['1','2','3']).subscribe({
      next: (response) => {
        this.allTransactions = response.data!.reportData;
        this.transaction = this.allTransactions[0];
        console.log(response.data);
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
