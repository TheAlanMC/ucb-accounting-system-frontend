import { Component, EventEmitter, Output } from '@angular/core';
import { JournalEntryDto } from '../../models/journal-entry.dto';
import { TransactionDetailDto } from '../../models/transaction-detail.dto';

interface Cuenta {
  codigo?: string;
  nombre?: string;
  nivel?: string;
  moneda?: string;
  cliente_proveedor?: string;
}

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})

export class TransactionTableComponent {
  //Object emmited to the parent component
  @Output() transactionDetailsEmmited = new EventEmitter<TransactionDetailDto[]>();
  @Output() glossAndTotalEmmited = new EventEmitter<string[]>();

  //Variables
  journalEntry!: JournalEntryDto;
  totalDebitAmount: number = 0;
  totalCreditAmount: number = 0;
  transactions: TransactionDetailDto[] = [];

  cuentas: Cuenta[] = [];
    cols: any[] = [];
    constructor() { }
  
  ngOnInit(): void {
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
    this.cuentas = [
      {
        codigo: '1101010001',
        nombre: "Caja Moneda Nacional - MLL",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101010002',
        nombre: "Caja Moneda Nacional - CBBA",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101010003',
        nombre: "Caja Moneda Nacional - SCZ",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101010004',
        nombre: "Caja Moneda Nacional - PTI",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101010005',
        nombre: "Caja Moneda Nacional - SAC",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101020001',
        nombre: "Caja Moneda Extranjera - Mll",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101030001',
        nombre: "Caja Chica Moneda Nacional - Mll",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },

      {
        codigo: '1101040001',
        nombre: "Cta Cte Banco Bisa - 56950036 (MN)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },

      {
        codigo: '1101040002',
        nombre: "Cta Cte Banco De Credito - 2015014846341 (MN)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      
      {
        codigo: '1101040003',
        nombre: "Cta Cte Banco Union - 10000006791524 (MN)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },

      {
        codigo: '1101040004',
        nombre: "Cta Cte Banco Fortaleza - 2041005229 (MN)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },

      {
        codigo: '1101040005',
        nombre: "Cta Cte Banco Nacional De Bolivia - 1000294221 (MN)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },

      {
        codigo: '1101040006',
        nombre: "Cta Cte Banco De Credito - 2015095294347 (MN)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101040007',
        nombre: "Cta Cte Banco Fortaleza - 2042005238 (MN)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },

      {
        codigo: '1101050001',
        nombre: "Cta Cte Banco Bisa - 56952012 (ME)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },

      {
        codigo: '1101050002',
        nombre: "Cta Cte Banco De Credito - 2010718992267 (ME)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101050002',
        nombre: "Cta Cte Banco De Credito - 2010718992267 (ME)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101050002',
        nombre: "Cta Cte Banco De Credito - 2010718992267 (ME)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
      {
        codigo: '1101050002',
        nombre: "Cta Cte Banco De Credito - 2010718992267 (ME)",
        nivel: "S",
        moneda: "Bs.",
        cliente_proveedor: ""
      },
    ]
  }

/*   onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
  } */

  //Initial data - 4 rows  
  transactionDetails = Array.from({ length: 4 }, () => ({
    cuenta: '',
    debe: 0,
    haber: 0,
    descripcion: '',
    nombre: ''
  }));

  //Send data to the parent component
  sendTransactionDetails() {
    this.transactions = [];
    for (let i = 0; i < this.transactionDetails.length; i++) {
      this.transactions.push({
        subaccountId: parseInt(this.transactionDetails[i].cuenta),
        debitAmountBs: parseFloat(this.transactionDetails[i].debe + ""),
        creditAmountBs: parseFloat(this.transactionDetails[i].haber + "")
      })
      // console.log(this.transactions)
    }
    this.transactionDetailsEmmited.emit(this.transactions);
  }
  sendGlossAndTotal() {
    this.glossAndTotalEmmited.emit([this.transactionDetails[0].descripcion, this.totalDebitAmount + "", this.totalCreditAmount + ""]);
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
    // En el caso de que se haya modificado la columna 'debe' con un valor diferente a 0, la columna 'haber' debe ser 0
    else if(event.field == 'debe' && this.transactionDetails[event.index].debe != 0 ) {
      this.transactionDetails[event.index].haber = 0
    } 
    // En el caso de que se haya modificado la columna 'haber' con un valor diferente a 0, la columna 'debe' debe ser 0
    else if(event.field == 'haber' && this.transactionDetails[event.index].haber != 0) {
      this.transactionDetails[event.index].debe = 0
    }

    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
  }

  //Add a new row
  addRow() {
    this.transactionDetails.push({
      cuenta: '',
      debe: 0,
      haber: 0,
      descripcion: this.transactionDetails[0].descripcion,
      nombre: ''
    })
  }

  //Delete a row
  deleteRow(index: number) {
    //If there is only one row, it is not deleted
    if (this.transactionDetails.length == 1) {
      return;
    }
    this.transactionDetails.splice(index, 1)
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
  }

  //Delete all rows
  deleteAllRows() {
    this.transactionDetails = [];
    this.transactionDetails.push({
      cuenta: '',
      debe: 0,
      haber: 0,
      descripcion: '',
      nombre: ''
    })
    this.totalCreditAmount = 0;
    this.totalDebitAmount = 0;
  }

  //Calculate the total amount of the debit and credit columns
  calculateTotalDebitAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.debe.toString());
    }
    this.totalDebitAmount = total;
  }

  //Calculate the total amount of the debit and credit columns
  calculateTotalCreditAmount() {
    let total = 0;
    for (let transaction of this.transactionDetails) {
      total += parseFloat(transaction.haber.toString());
    }
    this.totalCreditAmount = total;
  }


  updateDefaultValue(index: number, value: any, column: number) {
    if (value == null) {
      if (column == 0) {
        this.transactionDetails[index].debe = 0;
      } else {
        this.transactionDetails[index].haber = 0;
      }

    }
  }

  seleccionarCuenta(index: number) {
    let cuentas = document.getElementById("accountModal");
    if (cuentas != null) {
      cuentas.style.display = "block";
      
    }
    console.log("selectAccount")
  }

  sidebarVisible2: boolean = false;
  
}

