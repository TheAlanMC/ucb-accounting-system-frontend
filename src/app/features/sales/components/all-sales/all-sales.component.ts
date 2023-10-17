import { Component, ElementRef, ViewChild } from '@angular/core';
import { SalesService } from 'src/app/core/services/sales.service';
import { SaleAbstractDto } from '../../models/sale-abstract.dto';
import { Table } from 'primeng/table';

import {TransactionTypeService} from "../../../../core/services/transaction-type.service";
import {CustomerService} from "../../../../core/services/customer.service";

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css']
})


export class AllSalesComponent {
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
  constructor(private salesService: SalesService, private customerService: CustomerService, private transactionTypeService: TransactionTypeService) {
        this.items = [
            {
                label: 'Factura',
                icon: 'pi pi-book',
                routerLink: ['/sales/invoice']
            },
            {
                label: 'Recibo',
                icon: 'pi pi-file-edit',
                routerLink: ['/sales/receipt']
            },
        ];
    }

    //Variables
    selectedSales!: String;
    searchValue: string = '';
    dateValue!: Date;
    customer: string = '';
    sales: SaleAbstractDto[] = [];
    customers: any = [];
    types: any = [{code:0, name:'Factura'}];
    dateFilters: any;

    ngOnInit(): void {
      this.getAllSales();
      this.transactionTypeService.getAllTransactionTypes().subscribe({
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
      });
    }
        //Guardamos el company id en el local storage - *Ejemplo
        // this.userService.getUserById().subscribe({
        //     next: (data) => {
        //         localStorage.setItem('companyId', data.data!.companyIds[0].toString());
        //         console.log(localStorage.getItem('companyId'));
        //     },
        //     error: (error) => {
        //         console.log(error);
        //     }
        // });

  onPageChange(event: any) {
    this.page = event.page;
    this.size = event.rows;
    // console.log(event);
    this.getAllSales();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllSales();
  }

    getAllSales(){
        this.salesService.getAllSales(this.companyId, this.sortBy, this.sortType,this.page, this.size, this.filterDate, this.filterCustomer, this.filterDocumentType).subscribe({
            next: (data) => {
                this.sales = data.data!;
                this.totalElements = data.totalElements!;
                // console.log(data);
                // this.getCustomerFromData();
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    getCustomerFromData(){
        //Get customers display name from sales
        this.customers = this.sales.map((sale) => ({
            code: sale.customer.customerId,
            name: sale.customer.displayName
        }));

        //Remove duplicates
        this.customers = this.customers.filter((customer: any, index: any, self: any) =>
            index === self.findIndex((t: any) => (
                t.code === customer.code && t.name === customer.name
            ))
        )

    }

    onDateSelect(value: any) {
        this.dt2.filter(this.formatDate(value), 'saleTransactionDate', 'equals')
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
        this.getAllSales();
    }
    filterByCustomer(event: any) {
        this.filterCustomer = event;
        this.getAllSales();
    }
    filterByTransactionType(event: any) {
        if (event == 'Todos') {
            this.filterDocumentType = '';
        } else {
            this.filterDocumentType = event;
        }
        this.getAllSales();
    }
}
