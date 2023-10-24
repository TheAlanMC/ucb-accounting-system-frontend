import { Component } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {
  cuentas = [
    { codigo: '001', nombre: 'Cuenta 1', saldoInicial: 1000, debito: 200, credito: 300, saldoFinal: 1500 },
    { codigo: '002', nombre: 'Cuenta 2', saldoInicial: 2000, debito: 400, credito: 600, saldoFinal: 3000 },
    { codigo: '003', nombre: 'Cuenta 3', saldoInicial: 3000, debito: 600, credito: 900, saldoFinal: 4500 },
    // Puedes agregar más cuentas aquí si lo deseas.
  ];

  sidebarVisible2 = false; // Aquí declaramos sidebarVisible2
  isEditing = false; // Aquí declaramos isEditing

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(event: any) {
    // Aquí puedes implementar la lógica para buscar en tus cuentas.
  }

  obtenercuentas() {
    // Aquí puedes implementar la lógica para obtener las cuentas.
  }

}
