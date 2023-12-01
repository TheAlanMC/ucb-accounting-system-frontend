import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { JournalEntryDto } from '../../models/journal-entry.dto';
import { TransactionDetailDto } from '../../models/transaction-detail.dto';
import {AccountPlanService} from "../../../../core/services/account-plan.service";
import {AccountCategoryDto} from "../../../chart-of-accounts/models/account-category.dto";
import {TableAccountDto} from "../../../chart-of-accounts/models/table-account.dto";
import {PartnerService} from "../../../../core/services/partner.service";

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})

export class TransactionTableComponent {
  @ViewChild('dt', { static: false }) dt: any;

  //Object emmited to the parent component
  @Output() transactionDetailsEmmited = new EventEmitter<TransactionDetailDto[]>();
  @Output() glossAndTotalEmmited = new EventEmitter<string[]>();

  //Variables
  journalEntry!: JournalEntryDto;
  companyId = Number(localStorage.getItem('companyId'));
  totalDebitAmount: number = 0;
  totalCreditAmount: number = 0;
  searchValue: string = '';

  transactions: TransactionDetailDto[] = [];

  accountCategory: AccountCategoryDto[] = []
  accounts: TableAccountDto[] = []
  isExpanded: boolean = false;


  clients: any = [];

  //Listas almacenadas para el select
  categories: any = [];
  selectedRow: number = 0;

  constructor(private accountPlanService: AccountPlanService, private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
    this.getAccountingPlan();
    this.getClients();
  }

  applyFilterGlobal(event: Event, stringVal: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    // console.log(inputValue);
    this.dt.filterGlobal(inputValue, stringVal);
    // this.expandAll();
  }


/*   onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
  } */

  //Initial data - 4 rows
  transactionDetails = Array.from({ length: 4 }, () => ({
    cuenta: '',
    nombrecuenta: '',
    debe: 0,
    haber: 0,
    descripcion: '',
    nombre: ''
  }));

  //Send data to the parent component
  sendTransactionDetails() {
    this.transactions = [];
    for (let i = 0; i < this.transactionDetails.length; i++) {
      this.transactions.push({
        subaccountId: parseInt(this.transactionDetails[i].cuenta),
        debitAmountBs: parseFloat(this.transactionDetails[i].debe + ""),
        creditAmountBs: parseFloat(this.transactionDetails[i].haber + "")
      })
      // console.log(this.transactions)
    }
    this.transactionDetailsEmmited.emit(this.transactions);
  }
  sendGlossAndTotal() {
    this.glossAndTotalEmmited.emit([this.transactionDetails[0].descripcion, this.totalDebitAmount + "", this.totalCreditAmount + ""]);
  }

  //Table events
  onEditInit(event: any) {
    // console.log("onEditInit", event);
  }
  onEditCancel(event: any) {
    //  console.log("onEditCancel", event);
  }
  onEditComplete(event: any) {
    // En el caso de que se haya modificado la columna 'descripcion' se debe repetir el contenido en toda la columna
    if (event.field == 'descripcion') {
      for (let transaction of this.transactionDetails) {
        transaction.descripcion = this.transactionDetails[event.index].descripcion;
      }
    }
    // En el caso de que se haya modificado la columna 'debe' con un valor diferente a 0, la columna 'haber' debe ser 0
    else if(event.field == 'debe' && this.transactionDetails[event.index].debe != 0 ) {
      this.transactionDetails[event.index].haber = 0
    }
    // En el caso de que se haya modificado la columna 'haber' con un valor diferente a 0, la columna 'debe' debe ser 0
    else if(event.field == 'haber' && this.transactionDetails[event.index].haber != 0) {
      this.transactionDetails[event.index].debe = 0
    }

    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
  }

  //Add a new row
  addRow() {
    this.transactionDetails.push({
      cuenta: '',
      nombrecuenta: '',
      debe: 0,
      haber: 0,
      descripcion: this.transactionDetails[0].descripcion,
      nombre: ''
    })
  }

  //Delete a row
  deleteRow(index: number) {
    //If there is only one row, it is not deleted
    if (this.transactionDetails.length == 1) {
      return;
    }
    this.transactionDetails.splice(index, 1)
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
  }

  //Delete all rows
  deleteAllRows() {
    this.transactionDetails = [];
    this.transactionDetails.push({
      cuenta: '',
      nombrecuenta: '',
      debe: 0,
      haber: 0,
      descripcion: '',
      nombre: ''
    })
    this.totalCreditAmount = 0;
    this.totalDebitAmount = 0;
  }

  //Calculate the total amount of the debit and credit columns
  calculateTotalDebitAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.debe.toString());
    }
    this.totalDebitAmount = total;
  }

  //Calculate the total amount of the debit and credit columns
  calculateTotalCreditAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.haber.toString());
    }
    this.totalCreditAmount = total;
  }


  updateDefaultValue(index: number, value: any, column: number) {
    if (value == null) {
      if (column == 0) {
        this.transactionDetails[index].debe = 0;
      } else {
        this.transactionDetails[index].haber = 0;
      }

    }
  }

  seleccionarCuenta(index: number) {
    let cuentas = document.getElementById("accountModal");
    if (cuentas != null) {
      cuentas.style.display = "block";

    }
    console.log("selectAccount")
  }

  sidebarVisible2: boolean = false;
  getAccountingPlan() {
    this.accountPlanService.getAccountPlan(this.companyId).subscribe({
      next: (data => {
        // console.log(data.data);
        this.accountCategory = data.data!;
        this.accounts = this.transformData(this.accountCategory, 1);
        // console.log(this.cuentas);
        //Map cuentas
        this.categories = this.accountCategory.map((item: any) => {
          return {
            name: item.accountCategoryName,
            code: item.accountCategoryId
          }
        })
      }),
      error: ((error: any) => {
          console.log(error);
        }
      )
    })
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
        children: [],
        expanded: this.isExpanded
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

  selectAccount(accountId: number, level: number) {

    // Get the id only ig Sub cuenta
    if (level == 5) {
      console.log(`Sub cuenta ${accountId}`)
    }
  }

  onAccountSelected(rowData: any) {
    console.log(rowData);
    if (rowData.level == 5) {
      this.transactionDetails[this.selectedRow].cuenta = rowData.accountId;
      this.transactionDetails[this.selectedRow].nombrecuenta = rowData.accountName;
      this.sidebarVisible2 = false;
    }
  }

  selectRow(index: number) {
    this.selectedRow = index;
    this.sidebarVisible2 = true;
  }

  getClients() {
    this.partnerService.getAllPartners(this.companyId).subscribe({
      next: (data) => {
        this.clients = data.data!.customers.map((clientType) => ({
          name: clientType.displayName,
          code: clientType.customerId
        }));
        this.clients = this.clients.concat(data.data!.suppliers.map((clientType) => ({
          name: clientType.displayName,
          code: clientType.supplierId
        })));
        console.log(this.clients);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
  expandAll() {
    this.isExpanded = true;
    this.accounts = this.transformData(this.accountCategory, 1);
  }

  collapseAll() {
    this.isExpanded = false;
    this.accounts = this.transformData(this.accountCategory, 1);
  }

}
