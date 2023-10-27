import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ReportWorksheetService } from 'src/app/core/services/report-worksheet.service';
import { WorksheetDetail, WorksheetReportDto } from '../../models/worksheet-report.dto';

export interface worksheetDto{
  accountNumber: number;
  account: string;
  clasification: string;
  initialBalance: number;
  transactions: number;
  finalBalance: number;
  detail: string;
}


@Component({
  selector: 'app-worksheet-report',
  templateUrl: './worksheet-report.component.html',
  styleUrls: ['./worksheet-report.component.css']
})
export class WorksheetReportComponent {
  @ViewChild('dt2') dt2!: Table;

  startDate: Date | undefined;  // Variable para la fecha de inicio
  endDate: Date | undefined;

  companyId = Number(localStorage.getItem('companyId'));
  items: any[] = [];

  // Pagination variables
  sortBy: string = 'saleTransactionId';
  sortType: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  // Filter variables
  filterDate: string = '';
  filterCustomer: string[] = [];
  filterDocumentType: string = '';
  constructor(private reportWorksheetService: ReportWorksheetService) {

  }

  //Variables
  selectedworksheet!: String;
  searchValue: string = '';
  dateValue!: Date;

  //sales: SaleAbstractDto[] = [];
  worksheet: worksheetDto[] = [];
  dateFilters: any;


  worksheetReport: WorksheetReportDto = {company: {
    businessEntity: {
      businessEntityId: 0,
      businessEntityName: ''
    },
    companyAddress: '',
    companyLogo: '',
    companyName: '',
    companyNit: '',
    industry: {
      industryId: 0,
      industryName: ''
    },
    phoneNumber: ''
  },
  currencyType: {
    currencyCode: '',
    currencyName: ''
  },
  endDate: '',
  reportData: {
    totalBalanceCreditor: 0,
    totalBalanceDebtor: 0,
    totalBalanceSheetAsset: 0,
    totalBalanceSheetEquity: 0,
    totalBalanceSheetLiability: 0,
    totalIncomeStatementExpense: 0,
    totalIncomeStatementIncome: 0,
    totalIncomeStatementNetIncome: 0,
    worksheetDetails: []
  },
  startDate: ''}; 
  worksheetDetail: WorksheetDetail[] = [];

  ngOnInit(): void {
    this.getAllWorksheets();
    
  }

  generateReport(){
    this.reportWorksheetService.getWorksheetReport(this.formatDate(this.startDate!), this.formatDate(this.endDate!)).subscribe({
        
        next: (data) => {
          console.log(data);
          this.worksheetReport = data.data!;
          console.log(this.worksheetReport);

          this.worksheetDetail = this.worksheetReport.reportData.worksheetDetails;
          console.log(this.worksheetDetail);
          //this.worksheet = data.data!.reportData.worksheetDetails;
          console.log(this.worksheet);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  /*
  generateReport(){
    console.log(this.startDate);
    console.log(this.endDate);
    this.reportJournalBookService.getJournalBookReport(this.formatDate(this.startDate!), this.formatDate(this.endDate!)).subscribe({

      next: (data) => {
        console.log(data);
        this.journalBooks = data.data!;
        console.log(this.journalBooks);

        this.reportDatas = this.journalBooks.reportData;
        console.log(this.reportDatas);
        console.log("sdasadas")
        console.log(this.reportDatas[0].transactionDetails);
        console.log("sdasadas22")
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
   */

  onPageChange(event: any) {
    this.page = event.page;
    this.size = event.rows;
    this.getAllWorksheets();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllWorksheets();
  }

  getAllWorksheets() {
    this.worksheet = [
      {
        accountNumber: 101,
        account: 'Cuenta de Ahorro',
        clasification: 'Deudor',
        initialBalance: 5000,
        transactions: 10,
        finalBalance: 5500,
        detail: 'Detalles de la cuenta de ahorro.',
      },
      {
        accountNumber: 201,
        account: 'Cuenta Corriente',
        clasification: 'Deudor',
        initialBalance: 10000,
        transactions: 5,
        finalBalance: 9500,
        detail: 'Detalles de la cuenta corriente.',
      },
      {
        accountNumber: 301,
        account: 'Préstamo Hipotecario',
        clasification: 'Deudor',
        initialBalance: 80000,
        transactions: 1,
        finalBalance: 79500,
        detail: 'Detalles del préstamo hipotecario.',
      },
      {
        accountNumber: 401,
        account: 'Ingresos por Ventas',
        clasification: 'Acreedor',
        initialBalance: 0,
        transactions: 50,
        finalBalance: 25000,
        detail: 'Detalles de los ingresos por ventas.',
      },
      {
        accountNumber: 501,
        account: 'Gastos de Oficina',
        clasification: 'Acreedor',
        initialBalance: 5000,
        transactions: 10,
        finalBalance: 4500,
        detail: 'Detalles de los gastos de oficina.',
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
    this.getAllWorksheets();
  }

}
