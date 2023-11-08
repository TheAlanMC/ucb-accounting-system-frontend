import { Component } from '@angular/core';
import { FinancialStatementDetailsDto } from '../../../financial-statements/models/financial-statements-details.dto';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';
import { OpeningBalaceService } from 'src/app/core/services/opening-balance.service';
import { TableAccountExpandLevelDto } from '../../models/table-account-expand.dto';

@Component({
  selector: 'app-opening-balance',
  templateUrl: './opening-balance.component.html',
  styleUrls: ['./opening-balance.component.css'],
  providers: [MessageService]
})
export class OpeningBalanceComponent {
  startDate: Date | undefined;  // Variable para la fecha de inicio
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
        this.activos = this.transformData(this.incomeStatementsDetail[0].accountCategory.accountGroups, 2);
        this.pasivos = this.transformData(this.incomeStatementsDetail[1].accountCategory.accountGroups, 2);
        this.patrimonio = this.transformData(this.incomeStatementsDetail[2].accountCategory.accountGroups, 2);

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
        parent.data.totalAmountBs = parent.children.reduce((total, child) => total + child.data.totalAmountBs, 0);
        this.updateParentTotal(parent); // Llamada recursiva para actualizar a lo largo de la jerarquía

      }
    }
  }

  // Función para manejar la edición del inputNumber
  updateTotalAmountBs(node: TableAccountExpandLevelDto, listNumber: number) {
    console.log(node);
    if(node.node.data.totalAmountBs == null){
      node.node.data.totalAmountBs = 0;
    }

    // Lógica de actualización
    this.updateParentTotal(node);
    if (listNumber == 0) {
      this.calculateActivos();
    } else if (listNumber == 1) {
      this.calculatePasivos();
    } else {
      this.calculatePatrimonio();
    }
  }

  sendData() {
    var data: FinancialStatementDetailsDto[] = [];
    var categories = [this.activos, this.pasivos, this.patrimonio]
    for (let i = 0; i < categories.length; i++) {
      data.push({
        accountCategory: {
          accountCategoryId: this.incomeStatementsDetail[i].accountCategory.accountCategoryId,
          accountCategoryCode: this.incomeStatementsDetail[i].accountCategory.accountCategoryCode,
          accountCategoryName: this.incomeStatementsDetail[i].accountCategory.accountCategoryName,
          accountGroups: this.transformDataToDto(categories[i]),
          //Condicion, si i es 1 entonces this.totalActivos, si i es 2 entonces this.totalPasivos, si i es 3 entonces this.totalPatrimonio
          totalAmountBs: i == 0 ? this.totalActivos : i == 1 ? this.totalPasivos : this.totalPatrimonio
        },
        description: this.incomeStatementsDetail[i].description,
        totalAmountBs: i == 0 ? this.totalActivos : i == 1 ? this.totalPasivos : this.totalPatrimonio,
      });
    }
    console.log(data);
    //Validamos que se haya añadido una fecha
    if (this.startDate == undefined) { //TODO: Determinar que hacer con la fecha
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 Seleccione una fecha de apertura' });
      return;
    }
    //Validamos que el activo sea igual al pasivo + patrimonio
    if (this.totalActivos == (this.totalPasivos + this.totalPatrimonio)) {
      this.openingBalanceService.createOpeningBalance(this.companyId, data).subscribe({
        next: (data) => {
          console.log(data);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Balance de apertura registrado correctamente.' });
        },
        error: (error) => {
          console.log(error);
          if(error.error.code == "409-08"){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ya existe un balance de apertura registrado.' });
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar el balance de apertura.' });
          }
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El activo debe ser igual a la suma del pasivo y patrimonio.' });
    }
  }

  calculateActivos() {
    let total: number = 0;
    for (let transaction of this.activos) {
      total += transaction.data.totalAmountBs;
    }
    this.totalActivos = total;
  }
  calculatePasivos() {
    let total: number = 0;
    for (let transaction of this.pasivos) {
      total += transaction.data.totalAmountBs;
    }
    this.totalPasivos = total;
  }
  calculatePatrimonio() {
    let total: number = 0;
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

  transformDataToDto(inputData: TableAccountExpandLevelDto[]): any[] {
    return inputData.map((item) => {
      return {
        accountGroupCode: item.data.accountCode,
        accountGroupId: item.data.accountId,
        accountGroupName: item.data.accountName,
        accountSubgroups: item.children.map((subgroup) => {
          return {
            accountSubgroupCode: subgroup.data.accountCode,
            accountSubgroupId: subgroup.data.accountId,
            accountSubgroupName: subgroup.data.accountName,
            accounts: subgroup.children.map((account) => {
              return {
                accountCode: account.data.accountCode,
                accountId: account.data.accountId,
                accountName: account.data.accountName,
                subaccounts: account.children.map((subaccount) => {
                  return {
                    subaccountCode: subaccount.data.accountCode,
                    subaccountId: subaccount.data.accountId,
                    subaccountName: subaccount.data.accountName,
                    totalAmountBs: subaccount.data.totalAmountBs,
                  };
                }),
                totalAmountBs: account.data.totalAmountBs,
              };
            }),
            totalAmountBs: subgroup.data.totalAmountBs,
          };
        }),
        totalAmountBs: item.data.totalAmountBs,
      };
    });
  }





}
