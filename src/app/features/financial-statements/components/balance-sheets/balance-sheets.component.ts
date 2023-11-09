import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/core/services/report.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { BalanceSheetsDto, FinancialStatementDetail } from '../../../reports/models/balance-sheets.dto';
import { format } from 'date-fns';
import { TableAccountExpandDto } from '../../../reports/models/table-account-expand.dto';

@Component({
  selector: 'app-balance-sheets',
  templateUrl: './balance-sheets.component.html',
  styleUrls: ['./balance-sheets.component.css']
})
export class BalanceSheetsComponent {
  startDate: Date | undefined;  // Variable para la fecha de inicio
  endDate: Date | undefined;
  companyId = Number(localStorage.getItem('companyId'));

  isNavbarOpen: boolean = false;
  isLoading: boolean = true;
  message: string = 'Seleccione un rango de fechas para generar su reporte.';
  emptyTable: boolean = true;

  BalanceSheetsReport!: BalanceSheetsDto;
  BalanceSheetsDetail!: FinancialStatementDetail[];

  
  activo: any = [];
  pasivo: any = [];
  patrimonio: any = [];
  totalActivo: number = 0;
  totalPasivo: number = 0;
  totalPatrimonio: number = 0;

  constructor(private reportService: ReportService, private sidebarService: SidebarService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    const bgColor = '#F3F6F6;'; // Cambiamos el color
    this.sidebarService.setBackgroundColor(bgColor);
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
      this.reportService.getBalanceSheetsReport(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
        next: (data) => {
          console.log(data);
          this.BalanceSheetsReport = data.data!;
          console.log(this.BalanceSheetsReport);
          this.BalanceSheetsDetail = this.BalanceSheetsReport.reportData.financialStatementDetails;
          this.activo = this.transformData(this.BalanceSheetsDetail[0].accountCategory.accountGroups);
          this.pasivo = this.transformData(this.BalanceSheetsDetail[1].accountCategory.accountGroups);
          this.patrimonio = this.transformData(this.BalanceSheetsDetail[2].accountCategory.accountGroups);
          this.totalActivo = this.BalanceSheetsDetail[0].totalAmountBs;
          this.totalPasivo = this.BalanceSheetsDetail[1].totalAmountBs;
          this.totalPatrimonio = this.BalanceSheetsDetail[2].totalAmountBs;
          if (this.BalanceSheetsDetail.length == 0) {
            this.message = 'No se encontraron movimientos en este rango de fechas, por favor intente con otro intérvalo.';
            this.BalanceSheetsDetail = this.BalanceSheetsReport.reportData.financialStatementDetails;

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
