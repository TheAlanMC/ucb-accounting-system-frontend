import { Component, ViewChild } from '@angular/core';
import { th } from 'date-fns/locale';
import { Table } from 'primeng/table';
import { ReportJournalbookService } from 'src/app/core/services/report-journalbook.service';
import { ReportData } from 'src/app/features/reports/models/journal-book-report.dto';
import { CommunicationService } from "../../../../core/services/tabview/communication.service";
import { SidebarService } from "../../../../core/services/sidebar/sidebar.service";
import { MessageService } from 'primeng/api';

export interface JournalBookDto {
  reportData: ReportData[];
  accountNumber: number;
  date: string;
  code: string;
  name: string;
  reference: string;
  debit: number;
  credit: number;
}

export interface Country {
  name?: string;
  code?: string;
}


@Component({
  selector: 'app-journal-book-report',
  templateUrl: './journal-book-report.component.html',
  styleUrls: ['./journal-book-report.component.css'],
  providers: [MessageService]
})
export class JournalBookReportComponent {
  @ViewChild('dt2') dt2!: Table;

  startDate: Date | undefined;  // Variable para la fecha de inicio
  endDate: Date | undefined;

  companyId = Number(localStorage.getItem('companyId'));

  // Filter variables
  filterDate: string = '';
  filterCustomer: string[] = [];
  filterDocumentType: string = '';
  constructor(private messageService: MessageService, private reportJournalBookService: ReportJournalbookService, private communicationService: CommunicationService, private sidebarService: SidebarService) {
  }



  //sales: SaleAbstractDto[] = [];
  journalBooks: JournalBookDto | undefined;

  reportDatas: ReportData[] = [];

  isNavbarOpen: boolean = false;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
  }

  generateReport() {
    //Validate dates
    if (this.startDate == null || this.endDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No olvide seleccionar las fechas' });
    } else if (this.startDate > this.endDate) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha inicial debe ser menor a la fecha final' });
    } else {
      this.reportJournalBookService.getJournalBookReport(this.formatDate(this.startDate!), this.formatDate(this.endDate!)).subscribe({
        next: (data) => {
          this.journalBooks = data.data!;
          this.reportDatas = this.journalBooks.reportData;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  exportPdf() {
    this.reportJournalBookService.getJournalBookReportPdf(this.formatDate(this.startDate!), this.formatDate(this.endDate!)).subscribe({
      next: (data) => {
        // console.log(data);
        // open url in new tab
        window.open(data.data!.fileUrl, '_blank');
        // this.journalBooks = data.data!;
        // console.log(this.journalBooks);
        //
        // this.reportDatas = this.journalBooks.reportData;
        // console.log(this.reportDatas);
        // console.log("sdasadas")
        // console.log(this.reportDatas[0].transactionDetails);
        // console.log("sdasadas22")
      }
    });
  }

  calculateSum(transactionDetails: any[], type: string) {
    let suma = 0;
    for (const transaction of transactionDetails) {
      if (type == 'credit') {
        suma += transaction.creditAmountBs;
      } else {
        suma += transaction.debitAmountBs;
      }
    }
    return suma;
  }



  onDateSelect(value: any) {
    this.dt2.filter(this.formatDate(value), 'journalBookDate', 'equals')
  }

  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return date.getFullYear() + '-' + month + '-' + day;
  }
  filterByDate(event: any) {
    if (event == null) {
      this.filterDate = '';
    } else {
      this.filterDate = this.formatDate(event);
    }
  }



}
