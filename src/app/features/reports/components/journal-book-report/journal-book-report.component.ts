import { Component, ViewChild } from '@angular/core';
import {da, th} from 'date-fns/locale';
import { Table } from 'primeng/table';
import { ReportJournalbookService } from 'src/app/core/services/report-journalbook.service';
import { ReportData } from 'src/app/features/reports/models/journal-book-report.dto';
import { CommunicationService } from "../../../../core/services/tabview/communication.service";
import { SidebarService } from "../../../../core/services/sidebar/sidebar.service";
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';
import {ReportService} from "../../../../core/services/report.service";

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
  isLoading: boolean = true;
  emptyTable: boolean = true;
  totalDebit: number = 0;
  totalCredit: number = 0;
  message: string = 'Seleccione un rango de fechas para generar su reporte.';
  loading = false;

  constructor(private messageService: MessageService, private reportService: ReportService, private sidebarService: SidebarService) {
  }


  journalBooks: JournalBookDto | undefined;

  reportDatas: ReportData[] = [
    {
      attachments: [{ attachmentId: 0, contentType: '', filename: '' },],
      description: '',
      documentType: {
        documentTypeId: 0,
        documentTypeName: '',
      },
      gloss: '',
      journalEntryId: 0,
      journalEntryNumber: 0,
      transactionDate: new Date().toString(),
      transactionDetails: [{
        creditAmountBs: 0,
        debitAmountBs: 0,
        subaccount: {
          subaccountCode: 0,
          subaccountName: '',
          subaccountId: 0,
        }
      }
      ]
    }
  ];

  isNavbarOpen: boolean = false;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }

  ngOnInit(): void {
    const bgColor = '#F3F6F6;'; // Cambiamos el color
    this.sidebarService.setBackgroundColor(bgColor);
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
  }

  generateReport() {
    this.isLoading = true;
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.message = '';
    //Validate dates
    if (this.startDate == null || this.endDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No olvide seleccionar las fechas' });
    } else if (this.startDate > this.endDate) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha inicial debe ser menor a la fecha final' });
    } else {
      this.emptyTable = false;
      this.reportService.getJournalBookReport(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
        next: (data) => {
          this.journalBooks = data.data!;
          this.reportDatas = this.journalBooks.reportData;
          if (this.reportDatas.length == 0) {
            this.message = 'No se encontraron movimientos en este rango de fechas, por favor intente con otro intérvalo.';
            this.reportDatas = [
              {
                attachments: [{ attachmentId: 0, contentType: '', filename: '' },],
                description: '',
                documentType: {
                  documentTypeId: 0,
                  documentTypeName: '',
                },
                gloss: '',
                journalEntryId: 0,
                journalEntryNumber: 0,
                transactionDate: new Date().toString(),
                transactionDetails: [{
                  creditAmountBs: 0,
                  debitAmountBs: 0,
                  subaccount: {
                    subaccountCode: 0,
                    subaccountName: '',
                    subaccountId: 0,
                  }
                }
                ]
              }
            ];
            this.isLoading = true;
            this.emptyTable = true;
          }else{
            this.calculateTotal();
            this.isLoading = false;
          }

        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  exportPdf() {
    this.loading = true;
    this.reportService.getJournalBookReportPdf(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
      next: (data) => {
        window.open(data.data!.fileUrl, '_blank');
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
    this.reportService.getJournalBookReportExcel(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
      next: (data) => {
        // window.open(data.data!.fileUrl, '_blank');
        fetch(data.data!.fileUrl).then(res => res.blob()).then(blob => {
          // Create a new blob object using the response data of the onload object
          const blobData = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          // Create a link element
          const anchor = document.createElement('a');
          // Create a reference to the object URL
          anchor.href = window.URL.createObjectURL(blobData);
          // Set the filename that will be downloaded
          anchor.download = `LIBRO DIARIO ${format(this.startDate!, 'dd-MM-yyyy')} - ${format(this.endDate!, 'dd-MM-yyyy')}.xlsx`;
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

  calculateTotal() {
    this.totalCredit = 0;
    this.totalDebit = 0;
    for (const transaction of this.reportDatas) {
      for (const transactionDetail of transaction.transactionDetails) {
        this.totalCredit += transactionDetail.creditAmountBs;
        this.totalDebit += transactionDetail.debitAmountBs;
      }
    }
  }

}
