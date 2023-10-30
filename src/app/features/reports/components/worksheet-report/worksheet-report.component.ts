import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ReportWorksheetService } from 'src/app/core/services/report-worksheet.service';
import { WorksheetDetail, WorksheetReportDto } from '../../models/worksheet-report.dto';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { MessageService } from 'primeng/api';

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
  styleUrls: ['./worksheet-report.component.css'],
  providers: [MessageService]
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

  isNavbarOpen: boolean = false;
  constructor(private reportWorksheetService: ReportWorksheetService,  private sidebarService: SidebarService, private messageService: MessageService) {

  }

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }

  //Variables
  selectedworksheet!: String;
  searchValue: string = '';
  dateValue!: Date;

  //sales: SaleAbstractDto[] = [];
  worksheet: worksheetDto[] = [];
  dateFilters: any;


  worksheetReport: WorksheetReportDto | undefined;
  worksheetDetail: WorksheetDetail[] = [];

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    
  }

  generateReport(){
    if (this.endDate == null || this.startDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No olvide seleccionar las fechas' });
    } else if (this.startDate > this.endDate) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha inicial debe ser menor a la fecha final' });
    } else {
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
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
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
