import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface accountType {
  id: number;
  type: string;
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{
  value!: string;
  
  accountstype: accountType[] | undefined;

    selectedAccount: accountType | undefined;

    ngOnInit() {
        
        

      this.accountstype =[
        { id: 1, type: 'Usuario' },
        { id: 2, type: 'Asistente Contable' },
        { id: 3, type: 'Cliente' },
      ]
    }
}
