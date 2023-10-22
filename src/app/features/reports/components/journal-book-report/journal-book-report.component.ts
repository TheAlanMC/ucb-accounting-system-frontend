import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

export interface JournalBookDto{
  accountNumber: number;
  date: string;
  code: string;
  name: string;
  reference: string;
  debit: number;
  credit: number;
}

@Component({
  selector: 'app-journal-book-report',
  templateUrl: './journal-book-report.component.html',
  styleUrls: ['./journal-book-report.component.css']
})
export class JournalBookReportComponent {
  @ViewChild('dt2') dt2!: Table;
  companyId = Number(localStorage.getItem('companyId'));
  items: any[] = [];

  // Pagination variables
  sortBy: string = 'saleTransactionId';
  sortType: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  // Filter variables
  filterDate: string = '';
  filterCustomer: string[] = [];
  filterDocumentType: string = '';
  constructor() {
    
  }

  //Variables
  selectedjournalBook!: String;
  searchValue: string = '';
  dateValue!: Date;

  //sales: SaleAbstractDto[] = [];
  journalBook: JournalBookDto[] = [];
  dateFilters: any;

  ngOnInit(): void {
    this.getAllJournals();
    /*this.transactionTypeService.getAllTransactionTypes().subscribe({
      next: (data) => {
        this.types = data.data!.map((documentType) => ({
          name: documentType.transactionTypeName,
          code: documentType.transactionTypeId
        }));
        // add the default option
          this.types.unshift({name: 'Todos', code: ''});
        // console.log(this.types);
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.customerService.getAllCustomers(this.companyId).subscribe({
      next: (data) => {
        this.customers = data.data!.map((customer) => ({
            name: customer.displayName,
            code: customer.customerId
          }
        ));
      },
      error: (error) => {
        console.log(error);
      }
    });*/
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.size = event.rows;
    this.getAllJournals();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllJournals();
  }

  getAllJournals() {
    this.journalBook = [
      {
        accountNumber: 1,
        date: "2023-11-21",
        code: "A001",
        name: "Venta de productos",
        reference: "FACT-12345",
        debit: 1000,
        credit: 0,
      },
      {
        accountNumber: 2,
        date: "2023-10-01",
        code: "A002",
        name: "Compra de mercaderías",
        reference: "FACT-67890",
        debit: 0,
        credit: 500,
      },
      {
        accountNumber: 3,
        date: "2023-10-20",
        code: "A003",
        name: "Pago de sueldos",
        reference: "RECIBO-12345",
        debit: 200,
        credit: 0,
      },
      {
        accountNumber: 4,
        date: "2023-10-21",
        code: "A004",
        name: "Cobro de deudas",
        reference: "RECIBO-67890",
        debit: 0,
        credit: 100,
      },
      {
        accountNumber: 5,
        date: "2023-12-21",
        code: "A005",
        name: "Gastos varios",
        reference: "RECIBO-12345",
        debit: 50,
        credit: 0,
      },
    ];
  }


  onDateSelect(value: any) {
    this.dt2.filter(this.formatDate(value), 'journalBookDate', 'equals')
  }

  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return date.getFullYear() + '-' + month + '-' + day;
  }
  filterByDate(event: any) {
    if (event == null) {
      this.filterDate = '';
    } else {
      this.filterDate = this.formatDate(event);
    }
    this.getAllJournals();
  }
  
}
