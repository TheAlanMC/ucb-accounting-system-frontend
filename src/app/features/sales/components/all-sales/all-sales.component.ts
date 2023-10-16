import { Component, ElementRef, ViewChild } from '@angular/core';
import { SalesService } from 'src/app/core/services/sales.service';
import { SaleAbstractDto } from '../../models/sale-abstract.dto';
import { Table } from 'primeng/table';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css']
})


export class AllSalesComponent {
    @ViewChild('dt2') dt2!: Table;
    companyId = Number(localStorage.getItem('companyId'));
    items: any[] = [];
    constructor(private salesService: SalesService, private userService: UserService) { 
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
        
    }

    getAllSales(){
        this.salesService.getAllSales(this.companyId).subscribe({
            next: (data) => {
                this.sales = data.data!;
                console.log(data);
                this.getCustomerFromData();
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
}
