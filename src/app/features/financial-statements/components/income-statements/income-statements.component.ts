import { Component } from '@angular/core';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/core/services/report.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { IncomeStatementsReportDto } from '../../models/income-statements-report.dto';
import { FinancialStatementDetailsDto } from '../../models/financial-statements-details.dto';
import { TableAccountExpandDto } from '../../models/table-account-expand.dto';

@Component({
  selector: 'app-income-statements',
  templateUrl: './income-statements.component.html',
  styleUrls: ['./income-statements.component.css'],
  providers: [MessageService]
})
export class IncomeStatementsComponent {
  startDate: Date | undefined;  // Variable para la fecha de inicio
  endDate: Date | undefined;
  companyId = Number(localStorage.getItem('companyId'));

  isNavbarOpen: boolean = false;
  isLoading: boolean = true;
  message: string = 'Seleccione un rango de fechas para generar su reporte.';
  emptyTable: boolean = true;

  incomeStatementsReport!: IncomeStatementsReportDto;
  incomeStatementsDetail!: FinancialStatementDetailsDto[];

  //TODO: Rellenar arreglos
  ingresos: any = [];
  egresos: any = [];
  totalIngresos: number = 0;
  totalEgresos: number = 0;

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
          this.incomeStatementsReport = data.data!;
          this.incomeStatementsDetail = this.incomeStatementsReport.reportData.financialStatementDetails;
          this.ingresos = this.transformData(this.incomeStatementsDetail[0].accountCategory.accountGroups);
          this.egresos = this.transformData(this.incomeStatementsDetail[1].accountCategory.accountGroups);
          this.totalIngresos = this.incomeStatementsDetail[0].totalAmountBs;
          this.totalEgresos = this.incomeStatementsDetail[1].totalAmountBs;
          if (this.incomeStatementsDetail.length == 0) {
            this.message = 'No se encontraron movimientos en este rango de fechas, por favor intente con otro intérvalo.';
            this.incomeStatementsDetail = this.incomeStatementsReport.reportData.financialStatementDetails;

            this.isLoading = true;
            this.emptyTable = true;
          } else {
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

  transformData(data: any): any[] {
    return data.map((item: any) => {
      const transformedItem: TableAccountExpandDto = {
        data: {
          accountId: item.accountGroupId || item.accountSubgroupId || item.accountId || item.subaccountId || item.accountCategoryId,
          accountCode: item.accountGroupCode || item.accountSubgroupCode || item.accountCode || item.subaccountCode || item.accountCategoryCode,
          accountName: item.accountCategoryName || item.accountGroupName || item.accountSubgroupName || item.accountName || item.subaccountName,
          totalAmountBs: item.totalAmountBs
        },
        children: [],
        expanded: true
      };

      if (item.accountGroups || item.accountSubgroups || item.accounts || item.subaccounts) {
        transformedItem.children = this.transformData(
          item.accountGroups || item.accountSubgroups || item.accounts || item.subaccounts,
        );
      }
      return transformedItem;
    });
  }

}
