import { Component } from '@angular/core';
import { ReportsService } from 'src/app/core/services/reports.service';
import { TrialBalanceReportDto } from '../../models/trial-balance-report.dto';
import { TrialBalanceReportDataDto } from '../../models/trial-balance-report-data.dto';
import { addDays, format } from 'date-fns';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { TrialBalanceDetailsDto } from '../../models/trial-balance-details.dto';
import { MessageService } from 'primeng/api';
import {ReportService} from "../../../../core/services/report.service";

@Component({
  selector: 'app-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.css'],
  providers: [MessageService]
})
export class TrialBalanceComponent {
  companyid = Number(localStorage.getItem('companyId'));
  cuentas!: TrialBalanceReportDto;
  alltransactions: TrialBalanceReportDataDto[] = []; // Aquí declaramos alltransactions
  transaction!: TrialBalanceReportDataDto;
  transactionTrial: TrialBalanceDetailsDto[] = [{
    balanceCreditor: 0,
    balanceDebtor: 0,
    creditAmount: 0,
    debitAmount: 0,
    subaccount: {
      subaccountCode: 0,
      subaccountName: '',
      subaccountId: 0,
    },
    }
  ];
  fechaInicial!: Date; // Aquí declaramos fechaInicial
  fechaFinal!: Date; // Aquí declaramos fechaFinal
  isNavbarOpen: boolean = false;
  isLoading: boolean = true;
  message: string = 'Seleccione un rango de fechas para generar su reporte.';
  emptyTable: boolean = true;
  totalDebtor: number = 0;
  totalCreditor: number = 0;
  totalCredit: number = 0;
  totalDebit: number = 0;
  loading = false;


  constructor(private reportService: ReportService, private sidebarService: SidebarService, private messageService: MessageService) { }

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

  obtenertransacciones() {
    this.isLoading = true;
    this.message = '';
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.totalCreditor = 0;
    this.totalDebtor = 0;
    //Validate dates
    if (this.fechaFinal == null || this.fechaInicial == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No olvide seleccionar las fechas' });
    } else if (this.fechaInicial > this.fechaFinal) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha inicial debe ser menor a la fecha final' });
    } else {
      this.emptyTable = false;
      this.reportService.getTrialBalances(this.companyid, format(this.fechaInicial, 'yyyy-MM-dd'), format(this.fechaFinal, 'yyyy-MM-dd')).subscribe({
        next: (response) => {
          console.log(response);
          this.alltransactions = response.data!.reportData;
          this.transaction = this.alltransactions[0];
          this.transactionTrial = this.transaction.trialBalanceDetails;
          if (this.alltransactions.length == 0) {
            this.message = 'No se encontraron movimientos en este rango de fechas, por favor intente con otro intérvalo.';
            this.transactionTrial = [
              {
                balanceCreditor: 0,
                balanceDebtor: 0,
                creditAmount: 0,
                debitAmount: 0,
                subaccount: {
                  subaccountCode: 0,
                  subaccountName: '',
                  subaccountId: 0,
                },
                }
            ];
            this.isLoading = true;
            this.emptyTable = true;
         }else{
          this.calculateAll()
          this.isLoading = false;
         }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }

  }

  exportPdf() {
    this.loading = true;
    this.reportService.getTrialBalancesPdf(this.companyid, format(this.fechaInicial!, 'yyyy-MM-dd'), format(this.fechaFinal!, 'yyyy-MM-dd')).subscribe({
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
    this.reportService.getTrialBalancesExcel(this.companyid, format(this.fechaInicial!, 'yyyy-MM-dd'), format(this.fechaFinal!, 'yyyy-MM-dd')).subscribe({
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
            anchor.download = `BALANCE DE SUMAS Y SALDOS ${format(this.fechaInicial!, 'dd-MM-yyyy')} - ${format(this.fechaFinal!, 'dd-MM-yyyy')}.xlsx`;
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

  calculateAll(){
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.totalCreditor = 0;
    this.totalDebtor = 0;
    for (const transaction of this.alltransactions) {
      for (const transactionDetail of transaction.trialBalanceDetails) {
        this.totalCredit += transactionDetail.creditAmount;
        this.totalDebit += transactionDetail.debitAmount;
        this.totalCreditor += transactionDetail.balanceCreditor;
        this.totalDebtor += transactionDetail.balanceDebtor;
      }
    }
  }

}
