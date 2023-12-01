import { Component, ViewChild } from '@angular/core';
import { Table } from "primeng/table";
import { ExpenseAbstractDto } from "../../models/expense-abstract.dto";
import { ExpensesService } from "../../../../core/services/expenses.service";
import { TransactionTypeService } from "../../../../core/services/transaction-type.service";
import { SupplierService } from "../../../../core/services/supplier.service";
import { filter } from "rxjs";
import { el } from "date-fns/locale";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css'],
  providers: [MessageService]
})

export class AllExpensesComponent {
  @ViewChild('dt2') dt2!: Table;
  companyId = Number(localStorage.getItem('companyId'));
  items: any[] = [];

  // Pagination variables
  sortBy: string = 'expenseTransactionId';
  sortType: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  isLoading: boolean = true;

  // Filter variables
  filterDate: string = '';
  filterSupplier: string[] = [];
  filterDocumentType: string = '';

  constructor(private expensesService: ExpensesService, private supplierService: SupplierService, private transactionTypeService: TransactionTypeService, private messageService: MessageService) {
    this.items = [
      {
        label: 'Factura',
        icon: 'pi pi-book',
        command: () => {
          //Si no hay proveedores registrados, no se puede crear una factura
          if (this.suppliers.length == 0) {
            messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No hay proveedores registrados, por favor agregue uno para registrar su factura.' });
          } else {
            window.location.href = '/expenses/invoice';
          }
        },
      },
      {
        label: 'Recibo',
        icon: 'pi pi-file-edit',
        command: () => {
          //Si no hay proveedores registrados, no se puede crear un recibo
          if (this.suppliers.length == 0) {
            messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No hay proveedores registrados, por favor agregue uno para registrar su recibo.' });
          } else {
            window.location.href = '/expenses/receipt';
          }
        },
      },
    ];
  }

  //Variables
  selectedExpenses!: String;
  searchValue: string = '';
  dateValue!: Date;
  supplier: string = '';
  expenses: ExpenseAbstractDto[] = [];
  suppliers: any = [];
  types: any = [];
  dateFilters: any;

  ngOnInit(): void {
    this.getAllExpenses();
    this.transactionTypeService.getAllTransactionTypes().subscribe({
      next: (data) => {
        this.types = data.data!.map((documentType) => ({
          name: documentType.transactionTypeName,
          code: documentType.transactionTypeId
        }));
        // add the default option
        this.types.unshift({ name: 'Todos', code: '' });
        // console.log(this.types);
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.supplierService.getAllSuppliers(this.companyId).subscribe({
      next: (data) => {
        this.suppliers = data.data!.map((customer) => ({
          name: customer.displayName,
          code: customer.supplierId
        }
        ));
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  onPageChange(event: any) {
    var first = event.first;
    var rows = event.rows;
    this.page = Math.floor(first / rows);
    this.size = rows;
    this.getAllExpenses();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.isLoading = true;
    this.expensesService.getAllExpenses(this.companyId, this.sortBy, this.sortType, this.page, this.size, this.filterDate, this.filterSupplier, this.filterDocumentType).subscribe({
      next: (data) => {
        this.expenses = data.data!;
        this.totalElements = data.totalElements!;
        this.isLoading = false;
        // console.log(data);
        // this.getSupplierFromData();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getSupplierFromData() {
    //Get suppliers display name from expenses
    this.suppliers = this.expenses.map((expense) => ({
      code: expense.supplier.supplierId,
      name: expense.supplier.displayName
    }));

    //Remove duplicates
    this.suppliers = this.suppliers.filter((supplier: any, index: any, self: any) =>
      index === self.findIndex((t: any) => (
        t.code === supplier.code && t.name === supplier.name
      ))
    )

  }

  onDateSelect(value: any) {
    this.dt2.filter(this.formatDate(value), 'expenseTransactionDate', 'equals')
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

  protected readonly filter = filter;
  filterByDate(event: any) {
    if (event == null) {
      this.filterDate = '';
    } else {
      this.filterDate = this.formatDate(event);
    }
    this.getAllExpenses();
  }
  filterBySupplier(event: any) {
    this.filterSupplier = event;
    this.getAllExpenses();
  }
  filterByTransactionType(event: any) {
    if (event == 'Todos') {
      this.filterDocumentType = '';
    } else {
      this.filterDocumentType = event;
    }
    this.getAllExpenses();
  }
}
