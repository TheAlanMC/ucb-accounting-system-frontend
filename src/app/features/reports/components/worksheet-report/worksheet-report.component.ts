import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ReportWorksheetService } from 'src/app/core/services/report-worksheet.service';
import { WorksheetDetail, WorksheetReportDto } from '../../models/worksheet-report.dto';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { MessageService } from 'primeng/api';
import {ReportService} from "../../../../core/services/report.service";
import {format} from "date-fns";

export interface worksheetDto {
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
  isLoading: boolean = true;
  message: string = 'Seleccione un rango de fechas para generar su reporte.';
  emptyTable: boolean = true;

  constructor(private reportService: ReportService, private sidebarService: SidebarService, private messageService: MessageService) {

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
  worksheetDetail: WorksheetDetail[] = [
    {
      balanceCreditor: 0,
      balanceDebtor: 0,
      balanceSheetAsset: 0,
      balanceSheetLiability: 0,
      incomeStatementExpense: 0,
      incomeStatementIncome: 0,
      subaccount: {
        subaccountCode: 0,
        subaccountName: '',
        subaccountId: 0,
      }
    }
  ];

  ngOnInit(): void {
    const bgColor = '#F3F6F6;'; // Cambiamos el color
    this.sidebarService.setBackgroundColor(bgColor);
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });

  }

  generateReport() {
    this.isLoading = true;
    this.message = '';
    if (this.endDate == null || this.startDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No olvide seleccionar las fechas' });
    } else if (this.startDate > this.endDate) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha inicial debe ser menor a la fecha final' });
    } else {
      this.emptyTable = false;
      this.reportService.getWorksheetReport(this.companyId, this.formatDate(this.startDate!), this.formatDate(this.endDate!)).subscribe({
        next: (data) => {
          this.worksheetReport = data.data!;
          this.worksheetDetail = this.worksheetReport.reportData.worksheetDetails;
          if(this.worksheetDetail.length == 0){
            this.message = 'No se encontraron movimientos en este rango de fechas, por favor intente con otro intérvalo.';
            this.worksheetDetail = [
              {
                balanceCreditor: 0,
                balanceDebtor: 0,
                balanceSheetAsset: 0,
                balanceSheetLiability: 0,
                incomeStatementExpense: 0,
                incomeStatementIncome: 0,
                subaccount: {
                  subaccountCode: 0,
                  subaccountName: '',
                  subaccountId: 0,
                }
              }
            ];
            this.isLoading = true;
            this.emptyTable = true;
          }else{
            this.isLoading = false;
          }

        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

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

  exportPdf() {
    this.reportService.getWorksheetReportPdf(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
      next: (data) => {
        window.open(data.data!.fileUrl, '_blank');
      }
    });
  }

}
