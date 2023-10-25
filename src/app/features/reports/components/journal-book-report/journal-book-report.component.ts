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

interface City {
  name: string,
  code: string
}
export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
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

  cities!: City[];
  selectedCity!: City;

  customers!: Customer[];


  // Filter variables
  filterDate: string = '';
  filterCustomer: string[] = [];
  filterDocumentType: string = '';
  constructor() {
    this.items = [
      {
          label: 'Factura',
          icon: 'pi pi-book',
          
      },
      {
          label: 'Recibo',
          icon: 'pi pi-file-edit',
          
      },
  ];
  }

  

  //sales: SaleAbstractDto[] = [];
  journalBooks: JournalBookDto[] = [];
  

  ngOnInit(): void {
    this.journalBooks = this.getAllJournals();
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }
  calculateCustomerTotal(name: string) {
    let total = 0;

    if (this.customers) {
        for (let customer of this.customers) {
            if (customer.representative?.name === name) {
                total++;
            }
        }
    }

    return total;
}




  getAllJournals() {
    return [
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
        accountNumber: 1,
        date: "2023-11-21",
        code: "A001",
        name: "Venta de productos",
        reference: "FACT-12345",
        debit: 1000,
        credit: 0,
      },
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
        accountNumber: 2,
        date: "2023-10-01",
        code: "A002",
        name: "Compra de mercaderías",
        reference: "FACT-67890",
        debit: 0,
        credit: 500,
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
