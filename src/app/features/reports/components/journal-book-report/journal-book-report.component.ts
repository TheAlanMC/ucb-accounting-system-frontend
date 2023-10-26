import { Component, ViewChild } from '@angular/core';
import { th } from 'date-fns/locale';
import { Table } from 'primeng/table';
import { ReportJournalbookService } from 'src/app/core/services/report-journalbook.service';
import { ReportData } from 'src/app/features/reports/models/journal-book-report.dto';
import {CommunicationService} from "../../../../core/services/tabview/communication.service";
import {SidebarService} from "../../../../core/services/sidebar/sidebar.service";

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
  styleUrls: ['./journal-book-report.component.css']
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
  constructor(private reportJournalBookService: ReportJournalbookService, private communicationService: CommunicationService, private sidebarService: SidebarService) {
  }



  //sales: SaleAbstractDto[] = [];
  journalBooks: JournalBookDto | undefined ;

  reportDatas: ReportData[] = [];

  isNavbarOpen : boolean = false;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
  }

  generateReport(){
    // console.log(this.startDate);
    // console.log(this.endDate);
    this.reportJournalBookService.getJournalBookReport(this.formatDate(this.startDate!), this.formatDate(this.endDate!)).subscribe({

      next: (data) => {
        // console.log(data);
        this.journalBooks = data.data!;
        // console.log(this.journalBooks);

        this.reportDatas = this.journalBooks.reportData;
        // console.log(this.reportDatas);
        // console.log("sdasadas")
        // console.log(this.reportDatas[0].transactionDetails);
        // console.log("sdasadas22")
      },
      error: (error) => {
        console.log(error);
      }
    });
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

  calculateCustomerTotal(name: string) {
    let total = 0;

    return total;
  }




  getAllJournals() {
    return [
      {
        accountNumber: 1,
        date: "2023-11-21",
        code: "A001",
        name: "Venta de productos",
        reference: "FACT-12345",
        debit: 1000,
        credit: 0,
      },
      {
        accountNumber: 1,
        date: "2023-11-21",
        code: "A001",
        name: "Venta de productos",
        reference: "FACT-12345",
        debit: 1000,
        credit: 0,
      },
      {
        accountNumber: 1,
        date: "2023-11-21",
        code: "A001",
        name: "Venta de productos",
        reference: "FACT-12345",
        debit: 1000,
        credit: 0,
      },
      {
        accountNumber: 1,
        date: "2023-11-21",
        code: "A001",
        name: "Venta de productos",
        reference: "FACT-12345",
        debit: 1000,
        credit: 0,
      },
      {
        accountNumber: 2,
        date: "2023-10-01",
        code: "A002",
        name: "Compra de mercaderías",
        reference: "FACT-67890",
        debit: 0,
        credit: 500,
      },
      {
        accountNumber: 2,
        date: "2023-10-01",
        code: "A002",
        name: "Compra de mercaderías",
        reference: "FACT-67890",
        debit: 0,
        credit: 500,
      },
      {
        accountNumber: 2,
        date: "2023-10-01",
        code: "A002",
        name: "Compra de mercaderías",
        reference: "FACT-67890",
        debit: 0,
        credit: 500,
      },
      {
        accountNumber: 2,
        date: "2023-10-01",
        code: "A002",
        name: "Compra de mercaderías",
        reference: "FACT-67890",
        debit: 0,
        credit: 500,
      },
      {
        accountNumber: 3,
        date: "2023-10-20",
        code: "A003",
        name: "Pago de sueldos",
        reference: "RECIBO-12345",
        debit: 200,
        credit: 0,
      },
      {
        accountNumber: 4,
        date: "2023-10-21",
        code: "A004",
        name: "Cobro de deudas",
        reference: "RECIBO-67890",
        debit: 0,
        credit: 100,
      },
      {
        accountNumber: 5,
        date: "2023-12-21",
        code: "A005",
        name: "Gastos varios",
        reference: "RECIBO-12345",
        debit: 50,
        credit: 0,
      },
    ];
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
    this.getAllJournals();
  }



}
