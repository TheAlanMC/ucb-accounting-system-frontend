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
}
