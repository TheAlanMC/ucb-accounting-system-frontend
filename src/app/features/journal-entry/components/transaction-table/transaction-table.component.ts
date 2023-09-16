import { Component, EventEmitter, Output } from '@angular/core';
import { JournalEntryDto } from '../../models/journal-entry.dto';
import { TransactionDto } from '../../models/transaction.dto';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {
    //Object emmited to the parent component
    @Output() transactionDetailsEmmited = new EventEmitter<TransactionDto[]>();
    @Output() glossEmmited = new EventEmitter<string>();

    //Variables
    journalEntry!: JournalEntryDto;
    totalDebitAmount: number = 0;
    totalCreditAmount: number = 0;
    transactions: TransactionDto[] = [];
    
    ngOnInit(): void {
      this.calculateTotalDebitAmount();
      this.calculateTotalCreditAmount();
    }
    
    //Initial data - 4 rows  
    transactionDetails = Array.from({ length: 4 }, () => ({
        cuenta: '',
        debe: 0,
        haber: 0,
        descripcion: '',
        nombre: ''
    }));
     
    //Send data to the parent component
    sendTransactionDetails(){
      for (let i = 0; i < this.transactionDetails.length; i++) {
        this.transactions.push({
          subaccountId: parseInt(this.transactionDetails[i].cuenta),
          debitAmountBs: parseFloat(this.transactionDetails[i].debe+""),
          creditAmountBs: parseFloat(this.transactionDetails[i].haber+"")
        })
        console.log(this.transactions)
      }
      this.transactionDetailsEmmited.emit(this.transactions);
    }
    sendGloss(){
      this.glossEmmited.emit(this.transactionDetails[0].descripcion);
    }

    //Table events
    onEditInit(event: any) { 
      // console.log("onEditInit", event); 
    }
    onEditCancel(event: any) {
      //  console.log("onEditCancel", event); 
    }
    onEditComplete(event: any) { 
      console.log("onEditComplete", event);
      // En el caso de que se haya modificado la columna 'descripcion' se debe repetir el contenido en toda la columna
      if(event.field == 'descripcion') {
        for(let transaction of this.transactionDetails) {
          transaction.descripcion = this.transactionDetails[event.index].descripcion;
        }
      }
      this.calculateTotalDebitAmount();
      this.calculateTotalCreditAmount();  
    }
      
    //Add a new row
    addRow(){
      this.transactionDetails.push({
        cuenta: '',
        debe: 0,
        haber: 0,
        descripcion: '',
        nombre: ''
      })
    }

    //Delete a row
    deleteRow(index: number){
      this.transactionDetails.splice(index, 1)
    }

    //Calculate the total amount of the debit and credit columns
    calculateTotalDebitAmount() {
        let total = 0;
        for(let transaction of this.transactionDetails){
            total += parseFloat(transaction.debe.toString());
        }
        this.totalDebitAmount = total;
        console.log(this.totalDebitAmount);
    }

    //Calculate the total amount of the debit and credit columns
    calculateTotalCreditAmount() {
        let total = 0;
        for(let transaction of this.transactionDetails) {
            total += parseFloat(transaction.haber.toString());
        }
        this.totalCreditAmount = total;
        console.log(this.totalCreditAmount);
    }
}
