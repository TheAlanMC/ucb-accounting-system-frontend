import { Component } from '@angular/core';
import { FinancialStatementDetailsDto } from '../../../financial-statements/models/financial-statements-details.dto';
import { ReportService } from 'src/app/core/services/report.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';
import { OpeningBalaceService } from 'src/app/core/services/opening-balance.service';
import { AccountCategoryIsDto } from 'src/app/features/financial-statements/models/account-category-is.dto';
import { TableAccountExpandDto } from 'src/app/features/financial-statements/models/table-account-expand.dto';
import { TableAccountExpandLevelDto } from '../../models/table-account-expand.dto';

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

  incomeStatementsDetail!: FinancialStatementDetailsDto[];
  
  //TODO: Rellenar arreglos
  activos: any = [];
  pasivos: any = [];
  patrimonio: any = [];
  totalActivos: number = 0;
  totalPasivos: number = 0;
  totalPatrimonio: number = 0;

  constructor(private openingBalanceService: OpeningBalaceService, private sidebarService: SidebarService, private messageService: MessageService) {
    
  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    this.generateReport();

  }

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }

  generateReport() {
    this.isLoading = true;
    this.message = '';
    
      this.openingBalanceService.getOpeningBalance(this.companyId).subscribe({
        next: (data) => {
          console.log(data);
          this.incomeStatementsDetail = data.data!;
          this.activos = this.transformData(this.incomeStatementsDetail[0].accountCategory.accountGroups,2);
          this.pasivos = this.transformData(this.incomeStatementsDetail[1].accountCategory.accountGroups,2);
          this.patrimonio = this.transformData(this.incomeStatementsDetail[2].accountCategory.accountGroups,2);
          console.log(this.activos);
          console.log(this.pasivos);
          console.log(this.patrimonio);
          this.totalActivos = this.incomeStatementsDetail[0].totalAmountBs;
          this.totalPasivos = this.incomeStatementsDetail[1].totalAmountBs;
          this.totalPatrimonio = this.incomeStatementsDetail[2].totalAmountBs;

          if(this.incomeStatementsDetail.length == 0){
            this.message = 'No se encontraron movimientos en este rango de fechas, por favor intente con otro intérvalo.';
          // this.incomeStatementsDetail = this.incomeStatements.reportData.financialStatementDetails;
            
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
  // Función recursiva para actualizar los valores de los padres
  updateParentTotal(node: TableAccountExpandLevelDto) {
    if (node && node.parent) {
      const parent = node.parent;
      if (parent) {
        // parent.data.totalAmountBs = parent.children.reduce((total, child) => total + child.data.totalAmountBs, 0);
        //Obtener todos los totalamount de los hijos
        console.log(parent);
        parent.data.totalAmountBs = parent.children.reduce((total, child) => total + child.data.totalAmountBs, 0);
        this.updateParentTotal(parent); // Llamada recursiva para actualizar a lo largo de la jerarquía
        
      }
    }
  }

  // Función para manejar la edición del inputNumber
  updateTotalAmountBs(node: TableAccountExpandLevelDto, listNumber: number) {
    
    // Lógica de actualización
    this.updateParentTotal(node);
    if(listNumber==0){
      this.calculateActivos();
    }else if(listNumber==1){
      this.calculatePasivos();
    }else{
      this.calculatePatrimonio();
    }
  }

  // updateDefaultValue(index: number, value: any, column: number) {
  //   // console.log(index);
  //   // console.log(value);
  //   // console.log(column);
  //   if(column==0){
  //     //Actualizamos el padre
  //     this.totalActivos = this.calculateActivos();
  //   }else if(column==1){
  //     this.totalPasivos = this.calculatePasivos();
  //   }else{
  //     this.totalPatrimonio = this.calculatePatrimonio();
  //   }

  //   // if (value == null) {
  //   //   if (column == 0) {
  //   //     this.transactionDetails[index].debe = 0;
  //   //   } else {
  //   //     this.transactionDetails[index].haber = 0;
  //   //   }

  //   // }
  // }
  calculateActivos(){
    console.log(this.activos)
    let total : number = 0;
    for (let transaction of this.activos) {
      total += transaction.data.totalAmountBs;
    }
    this.totalActivos = total;
  }
  calculatePasivos(){
    let total : number = 0;
    for (let transaction of this.pasivos) {
      total += transaction.data.totalAmountBs;
    }
    this.totalPasivos = total;
  }
  calculatePatrimonio(){
    let total : number = 0;
    for (let transaction of this.patrimonio) {
      total += transaction.data.totalAmountBs;
    }
    this.totalPatrimonio = total;
  }
  exportPdf() {
    // this.reportService.getWorksheetReportPdf(this.companyId, format(this.startDate!, 'yyyy-MM-dd'), format(this.endDate!, 'yyyy-MM-dd')).subscribe({
    //   next: (data) => {
    //     window.open(data.data!.fileUrl, '_blank');
    //   }
    // });
  }
  
  transformData(data: any, level: number): any[] {
    return data.map((item: any) => {
      const transformedItem: TableAccountExpandLevelDto = {
        data: {
          accountId: item.accountGroupId || item.accountSubgroupId || item.accountId || item.subaccountId || item.accountCategoryId,
          accountCode: item.accountGroupCode || item.accountSubgroupCode || item.accountCode || item.subaccountCode || item.accountCategoryCode,
          accountName: item.accountCategoryName || item.accountGroupName || item.accountSubgroupName || item.accountName || item.subaccountName,
          totalAmountBs: item.totalAmountBs,
          level: level,
        },
        children: [],
        expanded: true
      };

      if (item.accountGroups || item.accountSubgroups || item.accounts || item.subaccounts) {
        transformedItem.children = this.transformData(
          item.accountGroups || item.accountSubgroups || item.accounts || item.subaccounts,
          level + 1
        );
      }
      return transformedItem;
    });
  }


  
}
