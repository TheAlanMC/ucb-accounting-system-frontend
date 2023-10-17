import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {UserService} from "../../../../core/services/user.service";
import {ExpenseAbstractDto} from "../../models/expense-abstract.dto";
import {ExpensesService} from "../../../../core/services/expenses.service";
import {CustomerService} from "../../../../core/services/customer.service";
import {TransactionTypeService} from "../../../../core/services/transaction-type.service";
import {SupplierService} from "../../../../core/services/supplier.service";

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
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

  constructor(private expensesService: ExpensesService, private supplierService: SupplierService, private transactionTypeService: TransactionTypeService) {
    this.items = [
      {
        label: 'Factura',
        icon: 'pi pi-book',
        routerLink: ['invoice']
      },
      {
        label: 'Recibo',
        icon: 'pi pi-file-edit',
        routerLink: ['receipt']
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
  types: any = [{code:0, name:'Factura'}];
  dateFilters: any;

  ngOnInit(): void {
    this.getAllExpenses();
    this.transactionTypeService.getAllTransactionTypes().subscribe({
      next: (data) => {
        this.types = data.data!.map((documentType) => ({
          name: documentType.transactionTypeName,
          code: documentType.transactionTypeId
        }));
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
    //Guardamos el company id en el local storage - *Ejemplo
    // this.userService.getUserById().subscribe({
    //   next: (data) => {
    //     localStorage.setItem('companyId', data.data!.companyIds[0].toString());
    //     console.log(localStorage.getItem('companyId'));
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });

  }

  onPageChange(event: any) {
    this.page = event.page;
    this.size = event.rows;
    // console.log(event);
    this.getAllExpenses();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllExpenses();
  }

  getAllExpenses(){
    this.expensesService.getAllExpenses(this.companyId, this.sortBy, this.sortType,this.page, this.size).subscribe({
      next: (data) => {
        this.expenses = data.data!;
        this.totalElements = data.totalElements!;
        // console.log(data);
        // this.getSupplierFromData();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getSupplierFromData(){
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

}
