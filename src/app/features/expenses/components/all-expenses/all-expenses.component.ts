import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {UserService} from "../../../../core/services/user.service";
import {ExpenseAbstractDto} from "../../models/expense-abstract.dto";
import {ExpensesService} from "../../../../core/services/expenses.service";

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent {
  @ViewChild('dt2') dt2!: Table;
  items: any[] = [];
  constructor(private expensesService: ExpensesService, private userService: UserService) {
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
    //Guardamos el company id en el local storage - *Ejemplo
    this.userService.getUserById().subscribe({
      next: (data) => {
        localStorage.setItem('companyId', data.data!.companyIds[0].toString());
        console.log(localStorage.getItem('companyId'));
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  getAllExpenses(){
    this.expensesService.getAllExpenses(1).subscribe({
      next: (data) => {
        this.expenses = data.data!;
        console.log(data);
        this.getSupplierFromData();
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
