import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { CustomerAbstractDto } from '../../models/customer.-abstract.dto';
import { CustomerDto } from '../../models/customer.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [MessageService]
})
export class CustomersComponent {
  @ViewChild('dt', { static: false }) dt: any;

  constructor(private customerService: CustomerService, private messageService: MessageService) { }
  //Variables
  companyId = Number(localStorage.getItem('companyId'));
  selectedProducts!: String;
  searchValue: string = '';
  addCustomerVisible: boolean = false;
  customers : CustomerAbstractDto[] = [];
  newCustomer!: CustomerDto;
  subaccountId: number = 1; //TODO: Get the subaccount id from the service
  prefix: string = '';
  displayName!: string;
  firstName: string = '';
  lastName: string = '';
  companyName: string = '';
  companyEmail: string = '';
  companyPhoneNumber: string = '';
  companyAddress: string = '';
  editMode: boolean = false;
  editCustomerId!: number;

  // Pagination variables
  sortBy: string = 'customerId';
  sortType: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  ngOnInit(): void {
    this.getAllCustomers();
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.size = event.rows;
    // console.log(event);
    this.getAllCustomers();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.customerService.getAllCustomers(this.companyId, this.sortBy, this.sortType,this.page, this.size ).subscribe({
      next: (data) => {
        this.customers = data.data!;
        // console.log(data);
        this.totalElements = data.totalElements!;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  addCustomer(){
    this.addCustomerVisible = true;
    this.prefix = '';
    this.firstName = '';
    this.lastName = '';
    this.displayName = '';
    this.companyName = '';
    this.companyPhoneNumber = '';
    this.companyEmail = '';
    this.companyAddress = '';
    this.editMode = false;
  }

  createCustomer(){
    //Get all the data
    this.newCustomer = {
      subaccountId: this.subaccountId,
      prefix: this.prefix,
      displayName: this.displayName,
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      companyEmail: this.companyEmail,
      companyPhoneNumber: this.companyPhoneNumber,
      companyAddress: this.companyAddress
    }

    //Validate empty fields
    if(this.prefix == '' || this.firstName == '' || this.lastName == '' || this.companyName == '' || this.companyEmail == '' || this.companyPhoneNumber == '' || this.companyAddress == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor llene todos los campos' });
      return;
    }

    this.customerService.createCustomer(this.companyId, this.newCustomer).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente creado correctamente' });
        this.addCustomerVisible = false;
        this.getAllCustomers();
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el cliente, intente nuevamente' });
      }
    })
  }

  editCustomer(customerId: number){
    this.editMode = true;
    console.log(customerId);
    //Get the customer data
    this.customerService.getCustomerById(this.companyId, customerId).subscribe({
      next: (data) => {
        console.log(data);
        this.prefix = data.data!.prefix;
        this.firstName = data.data!.firstName;
        this.lastName = data.data!.lastName;
        this.displayName = data.data!.displayName;
        this.companyName = data.data!.companyName;
        this.companyPhoneNumber = data.data!.companyPhoneNumber;
        this.companyEmail = data.data!.companyEmail;
        this.companyAddress = data.data!.companyAddress;
        this.editCustomerId = customerId;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  saveCustomerChanges(){
    //Get all the data
    this.newCustomer = {
      subaccountId: this.subaccountId,
      prefix: this.prefix,
      displayName: this.displayName,
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      companyEmail: this.companyEmail,
      companyPhoneNumber: this.companyPhoneNumber,
      companyAddress: this.companyAddress
    }
    //Update the customer
    this.customerService.updateCustomer(this.companyId, this.editCustomerId, this.newCustomer).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado correctamente' });
        this.getAllCustomers();
        this.addCustomerVisible = false;
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el cliente, intente nuevamente' });
      }
    })
  }

    //Update the display name
    onChange(event: any) {
      //Actulizamos el display name
      this.displayName = this.prefix + ' ' + this.firstName + ' ' + this.lastName;
      console.log(this.displayName);
    }

    //Filter the table
    applyFilterGlobal(event: Event, stringVal: string) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.dt.filterGlobal(inputValue, stringVal);
    }


}
