import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart-of-accounts-page',
  templateUrl: './chart-of-accounts-page.component.html',
  styleUrls: ['./chart-of-accounts-page.component.css']
})
export class ChartOfAccountsPageComponent {
  @ViewChild('dt', { static: false }) dt: any;
  searchValue: string = '';
  isNavbarOpen : boolean = false;
  isEditing = false;
  activeTabIndex = 0;
  accountName = '';
  accountCode = '';

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
  }
 
  
  cuentas = [
    // Aquí puedes agregar las cuentas que quieras
    {
      nombre: 'Caja',
      codigo: '1101',
      nivel: 'Grupo',
    }
  ];
  products = [
    // Aquí puedes agregar las cuentas que quieras
    {
      name: 'Caja',
      code: '1101',
      category: '1',
      quantity: '1',
    }
  ];
  sidebarVisible2: boolean = false;
  agregarNuevaCuenta() {
  }
  obtenercuentas() {
    // this.chartOfAccountService.getAllChartOfAccounts(1).subscribe({
    //   next: (data => {
    //     console.log(data.data);
    //   }
    //   ),
    //   error: (error => {
    //     console.log(error);
    //   })
    // }
    // )
  }
  onSearch(event: any) {
    const query = event.target.value;
    // Aquí puedes implementar la lógica para buscar en tus cuentas basándote en la consulta
  }

  createAccount() {
  }

  saveAccountChanges(){

  }

  //Filter the table
  applyFilterGlobal(event: Event, stringVal: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(inputValue, stringVal);
  }

}