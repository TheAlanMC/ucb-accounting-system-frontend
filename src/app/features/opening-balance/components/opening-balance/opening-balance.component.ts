import { Component } from '@angular/core';
import { IncomeStatementsReportDto } from '../../../financial-statements/models/income-statements-report.dto';
import { FinancialStatementDetailsDto } from '../../../financial-statements/models/financial-statements-details.dto';
import { ReportService } from 'src/app/core/services/report.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';

@Component({
  selector: 'app-opening-balance',
  templateUrl: './opening-balance.component.html',
  styleUrls: ['./opening-balance.component.css']
})
export class OpeningBalanceComponent {
  startDate: Date | undefined;  // Variable para la fecha de inicio
  endDate: Date | undefined;
  companyId = Number(localStorage.getItem('companyId'));

  isNavbarOpen: boolean = false;
  isLoading: boolean = true;
  message: string = 'Seleccione un rango de fechas para generar su reporte.';
  emptyTable: boolean = true;

  incomeStatements!: IncomeStatementsReportDto;
  incomeStatementsDetail!: FinancialStatementDetailsDto[];
  
  //TODO: Rellenar arreglos
  activos: any = [];
  pasivos: any = [];
  patrimonio: any = [];

  constructor(private reportService: ReportService, private sidebarService: SidebarService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
  }

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
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
      this.reportService.getIncomeStatements(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
        next: (data) => {
          console.log(data);
          this.incomeStatements = data.data!;
          this.incomeStatementsDetail = this.incomeStatements.reportData.financialStatementDetails;
          if(this.incomeStatementsDetail.length == 0){
            this.message = 'No se encontraron movimientos en este rango de fechas, por favor intente con otro intérvalo.';
          this.incomeStatementsDetail = this.incomeStatements.reportData.financialStatementDetails;
            
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

  exportPdf() {
    // this.reportService.getWorksheetReportPdf(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
    //   next: (data) => {
    //     window.open(data.data!.fileUrl, '_blank');
    //   }
    // });
  }

  
}
