import { Component } from '@angular/core';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css']
})
export class AccountModalComponent {
  typeOfSelection: string = 'checkbox';
  firstAccount: string = '1';
  lastAccount: string = '3';
  accounts: any[] = [
    {code: '1', name: 'Caja'},
    {code: '2', name: 'Banco'},
    {code: '3', name: 'Clientes'},
  ];
  selectedAccounts: any[] = [];
  

}
