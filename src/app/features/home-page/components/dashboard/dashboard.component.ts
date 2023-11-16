import { Component } from '@angular/core';
import { CategoryScale } from 'chart.js';
import { format } from 'date-fns';
import { ExpenseDashboardService } from 'src/app/core/services/expense-dashboard.service';
import { ExpensesSalesDashboardService } from 'src/app/core/services/expenses-sales-dashboard.service';
import { SalesDashboardService } from 'src/app/core/services/sale-dashboard.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { ValuesService } from 'src/app/core/services/values/values.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  companyId = Number(localStorage.getItem('companyId'));
  username: string = ' ';
  dateFrom: Date | undefined;
  itemsExpenses: any[] = [
    { label: 'Proovedor', value: '1' },
    { label: 'Subcuenta', value: '2' },
    // Agrega más elementos aquí...
  ];
  itemsSales: any[] = [
    { label: 'Cliente', value: '1' },
    { label: 'Subcuenta', value: '2' },
    // Agrega más elementos aquí...
  ];
  dateTo: Date | undefined;
  data: any;
  dataVentas: any; // New data for ventas
  options: any;
  optionsVentas = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        }
      }
    }
  };
  totalGastos = 0; // Agregamos una variable para almacenar el total de los gastos
  totalVentas = 0; // New variable for total ventas

  barDataGastos: any; // New data for Gastos bar chart
  barDataVentas: any; // New data for Ventas bar chart
  barOptions: any; // New options for bar chart
  selectedSale: any;
  selectedExpense: any;
  pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        }
      }
    }
  };

  isNavbarOpen: boolean = false;
  activeTabIndex = 0;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(isOpen);

  }


  constructor(private valuesService: ValuesService, private sidebarService: SidebarService, private expensesSalesService: ExpensesSalesDashboardService, private expenseDashboarService: ExpenseDashboardService, private salesDashboardService: SalesDashboardService, private messageService: MessageService) {
    this.valuesService.getUserInfo().subscribe({
      next: (response) => {
        // console.log(response);
        this.username = response.firstName + ' ' + response.lastName;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSelectedExpenses(event: any) {
    // console.log(event);
    if (event.value.value === '1') {
      this.getExpensesSupplierInfo();
    } else {
      this.getExpensesSubaccountInfo();
    }
  }

  onSelectedSales(event: any) {
    // console.log(event);
    if (event.value.value === '1') {
      this.getSalesClientInfo();
    } else {
      this.getSalesSubaccountInfo();
    }
  }

  ngOnInit(): void {
    const bgColor = 'white'; // Define el nuevo estilo aquí
    // fecha por default
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.dateFrom.setDate(this.dateFrom.getDate() - 365); // Restamos 30 días a la fecha actual
    this.sidebarService.setBackgroundColor(bgColor);
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    this.selectedExpense = this.itemsExpenses[0];
    this.selectedSale = this.itemsSales[0];
    this.getExpensesSalesInfo();
    this.getSalesClientInfo();
    this.getExpensesSupplierInfo();
  }


  obtenertransacciones() {
    // Aquí va el código para obtener las transacciones
  }

  getSalesSubaccountInfo() {
    // Aquí va el código para obtener la información de ventas por subcuenta
    this.salesDashboardService.getSaleDashboardDataBySubaccount(this.companyId, format(this.dateFrom!, 'yyyy-MM-dd'), format(this.dateTo!, 'yyyy-MM-dd')).subscribe({
      next: (response) => {
        // console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataVentas = {
          labels: response.data?.info.map((subaccount) => subaccount.name),
          datasets: [
            {
              data: response.data?.info.map((subaccount) => subaccount.total),
              backgroundColor: ['#79B2E9','#F1E1A6', '#C3E5AE'],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        this.options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor
              }
            }
          }
        };
        this.totalVentas = this.dataVentas.datasets[0].data.reduce((a: any, b: any) => a + b, 0); // Calculamos el total de los gastos
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getSalesClientInfo() {
    // Aquí va el código para obtener la información de ventas por cliente
    this.salesDashboardService.getSaleDashboardDataByClient(this.companyId, format(this.dateFrom!, 'yyyy-MM-dd'), format(this.dateTo!, 'yyyy-MM-dd')).subscribe({
      next: (response) => {
        // console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataVentas = {
          labels: response.data?.info.map((client) => client.name),
          datasets: [
            {
              data: response.data?.info.map((client) => client.total),
              backgroundColor: ['#79B2E9', '#F1E1A6','#C3E5AE'],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        this.options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor
              }
            }
          }
        };
        this.totalVentas = this.dataVentas.datasets[0].data.reduce((a: any, b: any) => a + b, 0); // Calculamos el total de los gastos
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getExpensesSubaccountInfo() {
    this.expenseDashboarService.getExpenseDashboardDataBySubaccount(this.companyId, format(this.dateFrom!, 'yyyy-MM-dd'), format(this.dateTo!, 'yyyy-MM-dd')).subscribe({
      next: (response) => {
        // console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
          labels: response.data?.info.map((subaccount) => subaccount.name),
          datasets: [
            {
              data: response.data?.info.map((subaccount) => subaccount.total),
              backgroundColor: ['#f9635c','#F4BBBB', '#ff7c70','#ff9e8f',],

              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        this.options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor
              }
            }
          }
        };
        this.totalGastos = this.data.datasets[0].data.reduce((a: any, b: any) => a + b, 0); // Calculamos el total de los gastos
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getExpensesSupplierInfo() {
    this.expenseDashboarService.getExpenseDashboardDataBySupplier(this.companyId, format(this.dateFrom!, 'yyyy-MM-dd'), format(this.dateTo!, 'yyyy-MM-dd')).subscribe({
      next: (response) => {
        // console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
          labels: response.data?.info.map((supplier) => supplier.name),
          datasets: [
            {
              data: response.data?.info.map((supplier) => supplier.total),
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        this.options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor
              }
            }
          }
        };
        this.totalGastos = this.data.datasets[0].data.reduce((a: any, b: any) => a + b, 0); // Calculamos el total de los gastos
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getExpensesSalesInfo() {
    // Aquí va el código para obtener la información de gastos y ventas
    this.expensesSalesService.getExpensesSales(this.companyId, format(this.dateFrom!, 'yyyy-MM-dd'), format(this.dateTo!, 'yyyy-MM-dd')).subscribe({
      next: (response) => {
        // console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        if (response.data != null) {
          // Pasamos los labels de numeros a meses
          var labels: number[] = []
          if (response.data.info.length != 0) {
            labels = response.data.info.map((expense) => expense.month);
          }
          this.barDataGastos = {
            labels: this.transformToMonth(labels),
            datasets: [
              {
                label: 'Ventas',
                backgroundColor: '#78D1D2',
                borderRadius: 5,
                data: response.data?.info.map((expense) => expense.sales)
              },
              {
                label: 'Gastos',
                backgroundColor: '#97DBAE',
                borderRadius: 5,
                data: response.data?.info.map((expense) => expense.expenses)
              },

            ]
          };
          this.barOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  fontColor: textColor
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: textColorSecondary,
                  font: {
                    weight: 500
                  }
                },
                grid: {
                  display: false,
                  drawBorder: false
                }
              },
              y: {
                ticks: {
                  color: textColorSecondary
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false
                }
              },
            }
          };
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  transformToMonth(month: number[]): string[] {
    //Recibe un arreglo de numeros y los transforma a meses
    const months: string[] = [];
    month.forEach((element: number) => {
      switch (element) {
        case 1:
          months.push('Enero');
          break;
        case 2:
          months.push('Febrero');
          break;
        case 3:
          months.push('Marzo');
          break;
        case 4:
          months.push('Abril');
          break;
        case 5:
          months.push('Mayo');
          break;
        case 6:
          months.push('Junio');
          break;
        case 7:
          months.push('Julio');
          break;
        case 8:
          months.push('Agosto');
          break;
        case 9:
          months.push('Septiembre');
          break;
        case 10:
          months.push('Octubre');
          break;
        case 11:
          months.push('Noviembre');
          break;
        case 12:
          months.push('Diciembre');
          break;
        default:
          break;
      }
    });
    return months;
  }

  onDateFromChange(event: Date) {
    this.dateFrom = event;
    if (this.dateFrom > this.dateTo!) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'La fecha de inicio no puede ser mayor a la fecha final'});
      return;
    }
    this.getExpensesSalesInfo();
    this.getExpensesSupplierInfo();
    this.getExpensesSubaccountInfo();
    this.getSalesClientInfo();
    this.getSalesSubaccountInfo();
  }

  onDateToChange(event: Date) {
    // console.log(event);
    this.dateTo = event;
    if (this.dateFrom! > this.dateTo) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'La fecha de inicio no puede ser mayor a la fecha final'});
      return;
    }
    this.getExpensesSalesInfo();
    this.getExpensesSupplierInfo();
    this.getExpensesSubaccountInfo();
    this.getSalesClientInfo();
    this.getSalesSubaccountInfo();
  }

}
