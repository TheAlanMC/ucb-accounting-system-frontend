import { Component, ViewChild } from '@angular/core';
import { AccountPlanService } from 'src/app/core/services/account-plan.service';
import { AccountCategoryDto } from '../../models/account-category.dto';
import { TableAccountDto } from '../../models/table-account.dto';
import { AccountGroupPartialDto } from '../../models/account-group-partial.dto';
import { AccountSubgroupPartialDto } from '../../models/account-subgroup-partial.dto';
import { AccountPartialDto } from '../../models/account-partial.dto';
import { SubaccountPartialDto } from '../../models/subaccount-partial.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chart-of-accounts-page',
  templateUrl: './chart-of-accounts-page.component.html',
  styleUrls: ['./chart-of-accounts-page.component.css'],
  providers: [MessageService]
})
export class ChartOfAccountsPageComponent {
  @ViewChild('dt', { static: false }) dt: any;
  searchValue: string = '';
  isNavbarOpen: boolean = false;
  isEditing = false;
  activeTabIndex = 0;
  accountNameInput = '';
  accountCodeInput = '';
  sidebarVisible2: boolean = false;
  editLevel: number = 0;
  editAccountId: number = 0;
  editParentId: number = 0;
  cuentas: TableAccountDto[] = []
  accountCategory: AccountCategoryDto[] = []
  accountGroup: AccountGroupPartialDto[] = []
  level: string = 'Grupo';

  //Listas almacenadas para el select
  categorias: any = [];
  grupos: any = [];
  subgrupos: any = [];
  cuentasList: any = [];

  //Data
  groupsListDto: AccountGroupPartialDto[] = [];
  subgroupsListDto: AccountSubgroupPartialDto[] = [];
  accountsListDto: AccountPartialDto[] = [];

  selectedCategory: any = null;
  selectedGroup: any = null;
  selectedSubgroup: any = null;
  selectedAccount: any = null;

  constructor(private accountPlanService: AccountPlanService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.obtenercuentas();
    this.getGroups();
    this.getSubgroups();
    this.getAccounts();
  }

  agregarNuevaCuenta() {
    this.accountCodeInput = '';
    this.accountNameInput = '';

  }
  onSelectedCategory(event: any) {
    this.selectedGroup = null;
    this.selectedSubgroup = null;
    this.selectedAccount = null;
    if (this.level != 'Grupo') {
      var aux = this.groupsListDto.filter((item: any) => {
        return item.accountCategoryId == event.value.code;
      })
      this.grupos = aux.map((item: any) => {
        return {
          name: item.accountGroupName,
          code: item.accountGroupId
        }
      })
    }
  }

  onSelectedGroup(event: any) {
    this.selectedSubgroup = null;
    this.selectedAccount = null;
    if (this.level != 'Subgrupo' && this.level != 'Grupo') {
      var aux = this.subgroupsListDto.filter((item: any) => {
        return item.accountGroupId == event.value.code;
      })
      this.subgrupos = aux.map((item: any) => {
        return {
          name: item.accountSubgroupName,
          code: item.accountSubgroupId
        }
      })
    }
  }

  onSelectedSubgroup(event: any) {
    this.selectedAccount = null;
    console.log(event);
    if (this.level == 'Subcuenta') {
      var aux = this.accountsListDto.filter((item: any) => {
        return item.accountSubgroupId == event.value.code;
      })
      this.cuentasList = aux.map((item: any) => {
        return {
          name: item.accountName,
          code: item.accountId
        }
      })
    }
  }

  getGroups() {
    this.accountPlanService.getAllAccountGroups(1).subscribe({
      next: (data => {
        console.log(data.data);
        this.groupsListDto = data.data!;
      }
      ),
      error: (error => {
        console.log(error);
      })
    }
    )
  }

  handleRadioChange(event: any) {
    console.log(event.value);
    this.selectedCategory = null;
    this.selectedGroup = null;
    this.selectedSubgroup = null;
    this.selectedAccount = null;
  }

  getSubgroups() {
    this.accountPlanService.getAllAccountSubgroups(1).subscribe({
      next: (data => {
        console.log(data.data);
        this.subgroupsListDto = data.data!;
      }
      ),
      error: (error => {
        console.log(error);
      })
    }
    )
  }

  getAccounts() {
    this.accountPlanService.getAllAccounts(1).subscribe({
      next: (data => {
        console.log(data.data);
        this.accountsListDto = data.data!;
      }
      ),
      error: (error => {
        console.log(error);
      })
    }
    )
  }


  obtenercuentas() {
    this.accountPlanService.getAccountPlan(1).subscribe({
      next: (data => {
        console.log(data.data);
        this.accountCategory = data.data!;
        this.cuentas = this.transformData(this.accountCategory, 1);
        console.log(this.cuentas);
        //Map cuentas
        this.categorias = this.accountCategory.map((item: any) => {
          return {
            name: item.accountCategoryName,
            code: item.accountCategoryId
          }
        })
      }
      ),
      error: (error => {
        console.log(error);
      })
    }
    )
  }

  transformData(data: any, level: number): any[] {
    return data.map((item: any) => {
      const transformedItem: TableAccountDto = {
        data: {
          accountId: item.accountGroupId || item.accountSubgroupId || item.accountId || item.subaccountId || item.accountCategoryId,
          accountCode: item.accountGroupCode || item.accountSubgroupCode || item.accountCode || item.subaccountCode || item.accountCategoryCode,
          accountName: item.accountCategoryName || item.accountGroupName || item.accountSubgroupName || item.accountName || item.subaccountName,
          level: level,
        },
        children: []
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



  createAccount() {
    if (this.validateAddAccount()) {
      switch (this.level) {
        case 'Grupo':
          var accountGroup: AccountGroupPartialDto = {
            accountGroupName: this.accountNameInput,
            accountGroupCode: parseInt(this.accountCodeInput),
            accountGroupId: null,
            accountCategoryId: this.selectedCategory.code
          }
          console.log(accountGroup);
          this.accountPlanService.createAccountGroup(1, accountGroup).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Grupo creado correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }
            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el grupo, intente nuevamente' });
              console.log(error);
            })
          }
          )
          break;
        case 'Subgrupo':
          var accountSubgroup: AccountSubgroupPartialDto = {
            accountSubgroupName: this.accountNameInput,
            accountSubgroupCode: parseInt(this.accountCodeInput),
            accountSubgroupId: null,
            accountGroupId: this.selectedGroup.code
          }

          this.accountPlanService.createAccountSubgroup(1, accountSubgroup).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Subgrupo creado correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }

            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el subgrupo, intente nuevamente' });
              console.log(error);
            })
          }
          )
          break;
        case 'Cuenta':
          var account: AccountPartialDto = {
            accountName: this.accountNameInput,
            accountCode: parseInt(this.accountCodeInput),
            accountSubgroupId: this.selectedSubgroup.code,
            accountId: null
          }
          this.accountPlanService.createAccount(1, account).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cuenta creada correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }

            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear la cuenta, intente nuevamente' });
            })
          })
          break;
        case 'Subcuenta':
          var subaccount: SubaccountPartialDto = {
            subaccountName: this.accountNameInput,
            subaccountCode: parseInt(this.accountCodeInput),
            accountId: this.selectedAccount.code,
            subaccountId: null
          }
          this.accountPlanService.createSubaccount(1, subaccount).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Subcuenta creada correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }
            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear la subcuenta, intente nuevamente' });
              console.log(error);
            })
          }
          )
          break;
      }
    }
  }

  saveAccountChanges() {
    if (this.validateEditAccount()) {
      switch (this.editLevel) {
        case 2:
          var accountGroup: AccountGroupPartialDto = {
            accountGroupName: this.accountNameInput,
            accountGroupCode: parseInt(this.accountCodeInput),
            accountGroupId: this.editAccountId,
            accountCategoryId: this.editParentId
          }
          console.log(accountGroup);
          this.accountPlanService.updateAccountGroup(1, this.editAccountId, accountGroup).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cuenta actualizada correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }
            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar la cuenta, intente nuevamente' });
              console.log(error);
            })
          }
          )
          break;
        case 3:
          var accountSubgroup: AccountSubgroupPartialDto = {
            accountSubgroupName: this.accountNameInput,
            accountSubgroupCode: parseInt(this.accountCodeInput),
            accountSubgroupId: this.editAccountId,
            accountGroupId: this.editParentId
          }

          this.accountPlanService.updateAccountSubgroup(1, this.editAccountId, accountSubgroup).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cuenta actualizada correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }

            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar la cuenta, intente nuevamente' });
              console.log(error);
            })
          }
          )
          break;
        case 4:
          var account: AccountPartialDto = {
            accountName: this.accountNameInput,
            accountCode: parseInt(this.accountCodeInput),
            accountId: this.editAccountId,
            accountSubgroupId: this.editParentId
          }
          this.accountPlanService.updateAccount(1, this.editAccountId, account).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cuenta actualizada correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }

            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar la cuenta, intente nuevamente' });
              console.log(error);
            })
          }
          )
          break;
        case 5:
          var subaccount: SubaccountPartialDto = {
            subaccountName: this.accountNameInput,
            subaccountCode: parseInt(this.accountCodeInput),
            subaccountId: this.editAccountId,
            accountId: this.editParentId
          }
          this.accountPlanService.updateSubaccount(1, this.editAccountId, subaccount).subscribe({
            next: (data => {
              console.log(data.data);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cuenta actualizada correctamente' });
              this.sidebarVisible2 = false;
              this.obtenercuentas();
            }
            ),
            error: (error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar la cuenta, intente nuevamente' });
              console.log(error);
            })
          }
          )
          break;
      }
    }
  }

  //Filter the table
  applyFilterGlobal(event: Event, stringVal: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(inputValue, stringVal);
  }

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
  }

  editAccount(accountId: number, level: number) {
    this.editLevel = level;
    this.editAccountId = accountId;

    //Switch case, por nivel
    switch (level) {
      case 2:
        this.level = 'Grupo';
        this.accountPlanService.getAccountGroup(1, accountId).subscribe({
          next: (data => {
            console.log(data.data);
            this.accountNameInput = data.data!.accountGroupName;
            this.accountCodeInput = data.data!.accountGroupCode.toString();
            this.editParentId = data.data!.accountCategoryId;
          }

          ),
          error: (error => {
            console.log(error);
          })
        }
        )
        break;
      case 3:
        this.level = 'Subgrupo';
        this.accountPlanService.getAccountSubgroup(1, accountId).subscribe({
          next: (data => {
            console.log(data.data);
            this.accountNameInput = data.data!.accountSubgroupName;
            this.accountCodeInput = data.data!.accountSubgroupCode.toString();
            this.editParentId = data.data!.accountGroupId;
          }

          ),
          error: (error => {
            console.log(error);
          })
        }
        )
        break;
      case 4:
        this.level = 'Cuenta';
        this.accountPlanService.getAccount(1, accountId).subscribe({
          next: (data => {
            console.log(data.data);
            this.accountNameInput = data.data!.accountName;
            this.accountCodeInput = data.data!.accountCode.toString();
            this.editParentId = data.data!.accountSubgroupId;
          }

          ),
          error: (error => {
            console.log(error);
          })
        }
        )
        break;
      case 5:
        this.level = 'Subcuenta';
        this.accountPlanService.getSubaccount(1, accountId).subscribe({
          next: (data => {
            console.log(data.data);
            this.accountNameInput = data.data!.subaccountName;
            this.accountCodeInput = data.data!.subaccountCode.toString();
            this.editParentId = data.data!.accountId;
          }

          ),
          error: (error => {
            console.log(error);
          })
        }
        )
        break;
    }

  }

  validateAddAccount(): boolean {
    if (this.accountNameInput == '' || this.accountCodeInput == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe llenar todos los campos' });
      return false;
    }
    switch (this.level) {
      case 'Grupo':
        if (this.selectedCategory == null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar una categoría' });
          return false;
        }
        break;
      case 'Subgrupo':
        if (this.selectedGroup == null || this.selectedCategory == null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un grupo y una categoría' });
          return false;
        }
        break;
      case 'Cuenta':
        if (this.selectedSubgroup == null || this.selectedGroup == null || this.selectedCategory == null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un subgrupo, un grupo y una categoría' });
          return false;
        }
        break;
      case 'Subcuenta':
        if (this.selectedAccount == null || this.selectedSubgroup == null || this.selectedGroup == null || this.selectedCategory == null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar una cuenta, un subgrupo, un grupo y una categoría' });
          return false;
        }
        break;
    }
    return true;
  }

  validateEditAccount(): boolean {
    if (this.accountNameInput == '' || this.accountCodeInput == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe llenar todos los campos' });
      return false;
    }
    return true;
  }
}