import { Component } from '@angular/core';
import { ExpenseDashboardService } from 'src/app/core/services/expense-dashboard.service';
import { ExpensesSalesDashboardService } from 'src/app/core/services/expenses-sales-dashboard.service';
import { SalesDashboardService } from 'src/app/core/services/sale-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  fechaInicial: Date | undefined;
  itemsExpenses: any[] = [
    {label: 'Proovedor', value: '1'},
    {label: 'Subcuenta', value: '2'},
    // Agrega más elementos aquí...
];
itemsSales: any[] = [
  {label: 'Cliente', value: '1'},
  {label: 'Subcuenta', value: '2'},
  // Agrega más elementos aquí...
];
  fechaFinal: Date | undefined;
  transaction = {
    trialBalanceDetails: [
      // Aquí van los detalles de las transacciones
    ]
  };
  data: any;
  dataVentas: any; // New data for ventas
  options: any;
  optionsVentas: any; // New options for ventas
  totalGastos = 0; // Agregamos una variable para almacenar el total de los gastos
  totalVentas = 0; // New variable for total ventas

  barDataGastos: any; // New data for Gastos bar chart
  barDataVentas: any; // New data for Ventas bar chart
  selectedSale: any;
  selectedExpense: any;

  constructor(private expensesSalesService: ExpensesSalesDashboardService, private expenseDashboarService: ExpenseDashboardService, private salesDashboardService: SalesDashboardService) {
  }
  onSelectedExpenses(event: any) {
    console.log(event);
    if (event.value === '1') {
      this.getExpensesSupplierInfo();
    } else {
      this.getExpensesSubaccountInfo();
    }
  }

  onSelectedSales(event: any) {
    console.log(event);
    if (event.value === '1') {
      this.getSalesClientInfo();
    } else {
      this.getSalesSubaccountInfo();
    }
  }

  ngOnInit(): void {
    this.getExpensesSalesInfo();
    // Aquí va el código para inicializar el componente  
    this.getExpensesSupplierInfo();
    this.getExpensesSubaccountInfo();
    this.getSalesClientInfo();
    this.getSalesSubaccountInfo();
    }


  obtenertransacciones() {
    // Aquí va el código para obtener las transacciones
  }

  getSalesSubaccountInfo() {
    // Aquí va el código para obtener la información de ventas por subcuenta
    this.salesDashboardService.getSaleDashboardDataBySubaccount(1, '2023-12-25', '2023-12-31').subscribe({
      next: (response) => {
        console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataVentas = {
            labels: response.data?.info.map((subaccount) => subaccount.name),
            datasets: [
                {
                    data: response.data?.info.map((subaccount) => subaccount.total),
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
            this.totalVentas = this.dataVentas.datasets[0].data.reduce((a: any, b: any) => a + b, 0); // Calculamos el total de los gastos
    },
    error: (error) => {
      console.log(error);
    }
  });
  }

  getSalesClientInfo() {
    // Aquí va el código para obtener la información de ventas por cliente
    this.salesDashboardService.getSaleDashboardDataByClient(1, '2023-12-25', '2023-12-31').subscribe({
      next: (response) => {
        console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataVentas = {
            labels: response.data?.info.map((client) => client.name),
            datasets: [
                {
                    data: response.data?.info.map((client) => client.total),
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
            this.totalVentas = this.dataVentas.datasets[0].data.reduce((a: any, b: any) => a + b, 0); // Calculamos el total de los gastos
    },
    error: (error) => {
      console.log(error);
    }
  });
  }

  getExpensesSubaccountInfo() {
    this.expenseDashboarService.getExpenseDashboardDataBySubaccount(1, '2021-12-01', '2021-12-31').subscribe({
      next: (response) => {
        console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: response.data?.info.map((subaccount) => subaccount.name),
            datasets: [
                {
                    data: response.data?.info.map((subaccount) => subaccount.total),
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

getExpensesSupplierInfo() {
  this.expenseDashboarService.getExpenseDashboardDataBySupplier(1, '2021-12-01', '2021-12-31').subscribe({
    next: (response) => {
      console.log(response);
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
    this.expensesSalesService.getExpensesSales(1, '2023-01-01', '2023-12-31').subscribe({
      next: (response) => {
        console.log(response);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.barDataGastos = {
          labels: response.data?.info.map((expense) => expense.month),
          datasets: [
            {
              label: 'Gastos',
              backgroundColor: document.documentElement.style.getPropertyValue('--blue-500'),
              borderColor: document.documentElement.style.getPropertyValue('--blue-500'),
              data: response.data?.info.map((expense) => expense.expenses)
            },
            {
              label: 'Ventas',
              backgroundColor: document.documentElement.style.getPropertyValue('--pink-500'),
              borderColor: document.documentElement.style.getPropertyValue('--pink-500'),
              data: response.data?.info.map((expense) => expense.sales)
            }
          ]
        };
        this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
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
                      color: surfaceBorder,
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
              }

          }
      };
      },
      error: (error) => {
        console.log(error);
      }
    });
    }
  }
