import { Component, EventEmitter, Output } from '@angular/core';
import { InvoiceDetailDto } from '../../models/invoice-detail.dto';
import { SubaccountDto } from '../../models/subaccount.dto';
import { SalesService } from 'src/app/core/services/sales.service';


@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {
  //Object emmited to the parent component
  @Output() transactionDetailsEmmited = new EventEmitter<InvoiceDetailDto[]>();
  @Output() glossAndTotalEmmited = new EventEmitter<string[]>();

  //Variables
  totalAmount: number = 0;
  saldoAmount: number = 0;
  transactions: InvoiceDetailDto[] = [];
  subaccounts: any[] = [];

  constructor(private salesService: SalesService) {

  }

  ngOnInit(): void {
    this.getSubaccounts();
     this.calculateTotalAmount();
     this.calculateSaldoAmount();
  }

  //Initial data - 4 rows  
  transactionDetails = Array.from({ length: 4 }, () => ({
    producto: 0,
    descripcion: '',
    cantidad: 0,
    precioUnitario: 0,
    importe: 0
  }));

  //Send data to the parent component
  sendTransactionDetails() {
    this.transactions = [];
    for (let i = 0; i < this.transactionDetails.length; i++) {
      this.transactions.push({
        subaccountId: this.transactionDetails[i].producto,
        quantity: parseInt(this.transactionDetails[i].cantidad + ""),
        unitPriceBs: parseFloat(this.transactionDetails[i].precioUnitario + "")
      })
      // console.log(this.transactions)
    }
    this.transactionDetailsEmmited.emit(this.transactions);
  }
  sendGlossAndTotal() {
    this.glossAndTotalEmmited.emit([this.transactionDetails[0].descripcion, this.saldoAmount + ""]);
  }

  //Table events
  onEditInit(event: any) {
    // console.log("onEditInit", event); 
  }
  onEditCancel(event: any) {
    //  console.log("onEditCancel", event); 
  }
  onEditComplete(event: any) {
    // En el caso de que se haya modificado la columna 'descripcion' se debe repetir el contenido en toda la columna
    if (event.field == 'descripcion') {
      for (let transaction of this.transactionDetails) {
        transaction.descripcion = this.transactionDetails[event.index].descripcion;
      }
    } 
    // En el caso de que se haya modificado la columna cantidad o precio unitario se debe recalcular el importe
    else if (event.field == 'cantidad' || event.field == 'precioUnitario') {
      this.transactionDetails[event.index].importe = this.transactionDetails[event.index].cantidad * this.transactionDetails[event.index].precioUnitario;
    }

    this.calculateTotalAmount();
    this.calculateSaldoAmount();
    this.sendGlossAndTotal();
  }

  //Select subaccount
  onSelectSubaccount(event: any, index: number) {
    console.log(event)
    // Update the subaccount code in the transaction details
    this.transactionDetails[index].producto = event.value.code;
    console.log(index)
    console.log(event.value.code)
    console.log(this.transactionDetails)

  }

  //Add a new row
  addRow() {
    this.transactionDetails.push({
      producto: 0,
      descripcion: '',
      cantidad: 0,
      precioUnitario: 0,
      importe: 0
    })
  }

  //Delete a row
  deleteRow(index: number) {
    //If there is only one row, it is not deleted
    if (this.transactionDetails.length == 1) {
      return;
    }
    this.transactionDetails.splice(index, 1)
    this.calculateTotalAmount();
    this.calculateSaldoAmount();
    this.sendGlossAndTotal();
  }

  //Delete all rows
  deleteAllRows() {
    this.transactionDetails = [];
    this.transactionDetails.push({
      producto: 0,
      descripcion: '',
      cantidad: 0,
      precioUnitario: 0,
      importe: 0
    })
    this.calculateTotalAmount();
    this.calculateSaldoAmount();
    this.sendGlossAndTotal();
  }

  //Calculate the total amount of the debit and credit columns
  calculateTotalAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.importe.toString());
    }
    this.totalAmount = total;
  }

  //Calculate the total amount of the debit and credit columns
  calculateSaldoAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.importe.toString()); //TODO: Corregir
    }
    this.saldoAmount = total;
  }


  updateDefaultValue(index: number, value: any, column: number) {
    if (value == null) {
      if (column == 0) {
        this.transactionDetails[index].cantidad = 0;
      } else {
        this.transactionDetails[index].importe = 0;
      }
    }
  }

  getSubaccounts(){
    this.salesService.getInvoiceSubaccounts(1).subscribe({
      next: (data) => {
        if(data.data != null){
          //Parsing the data
          this.subaccounts = data.data.map((subaccount) => ({
            name: subaccount.subaccountName,
            code: subaccount.subaccountId
          }));
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}

