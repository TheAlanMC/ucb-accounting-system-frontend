import {Component, Input} from '@angular/core';
import {TransactionDetailDto} from "../../models/transaction-detail.dto";

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})

export class TransactionTableComponent {
  //Object emmited to the parent component
  @Input() transactionDetailsList : TransactionDetailDto[] = [];
  @Input() description: string = '';
  @Input() client: string = '';

  //Variables
  totalDebitAmount: number = 0;
  totalCreditAmount: number = 0;

    constructor() { }
  //Initial data - 4 rows
  transactionDetails = Array.from({ length: 4 }, () => ({
    cuenta: '',
    debe: 0,
    haber: 0,
    descripcion: '',
    nombre: ''
  }));

  ngOnInit(): void {
    this.transactionDetails = this.transactionDetailsList.map((transaction) => {
        return {
            cuenta: transaction.subaccount.subaccountName,
            debe: transaction.debitAmountBs,
            haber: transaction.creditAmountBs,
            descripcion: this.description,
            nombre: ''
        }
    } );
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
  }




  calculateTotalDebitAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.debe.toString());
    }
    this.totalDebitAmount = total;
  }
  //
  //Calculate the total amount of the debit and credit columns
  calculateTotalCreditAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.haber.toString());
    }
    this.totalCreditAmount = total;
  }
  //
  //
  // updateDefaultValue(index: number, value: any, column: number) {
  //   if (value == null) {
  //     if (column == 0) {
  //       this.transactionDetails[index].debe = 0;
  //     } else {
  //       this.transactionDetails[index].haber = 0;
  //     }
  //
  //   }
  // }
  //
  // seleccionarCuenta(index: number) {
  //   let cuentas = document.getElementById("accountModal");
  //   if (cuentas != null) {
  //     cuentas.style.display = "block";
  //
  //   }
  //   console.log("selectAccount")
  // }
  //
  // sidebarVisible2: boolean = false;

}

