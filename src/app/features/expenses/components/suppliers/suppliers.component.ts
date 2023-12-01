import { Component, ViewChild } from '@angular/core';
import { MessageService } from "primeng/api";
import { SupplierService } from "../../../../core/services/supplier.service";
import { SupplierAbstractDto } from "../../models/supplier-abstract.dto";
import { SupplierDto } from "../../models/supplier.dto";
import { debounceTime, Subject } from "rxjs";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  providers: [MessageService]
})
export class SuppliersComponent {
  @ViewChild('dt', { static: false }) dt: any;

  constructor(private supplierService: SupplierService, private messageService: MessageService) { }
  //Variables
  companyId = Number(localStorage.getItem('companyId'));
  selectedProducts!: String;
  searchValue: string = '';
  addSupplierVisible: boolean = false;
  suppliers: SupplierAbstractDto[] = [];
  newSupplier!: SupplierDto;
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
  editSupplierId!: number;

  // Pagination variables
  sortBy: string = 'supplierId';
  sortType: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  isLoading: boolean = true;

  searchTerm: string = '';

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.getAllSuppliers();
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      // When the user has stopped typing for 500 milliseconds, trigger the getAllTransactions method
      this.getAllSuppliers();
    });
  }

  onPageChange(event: any) {
    var first = event.first;
    var rows = event.rows;
    this.page = Math.floor(first / rows);
    this.size = rows;
    // console.log(event);
    this.getAllSuppliers();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.isLoading = true;
    this.supplierService.getAllSuppliers(this.companyId, this.sortBy, this.sortType, this.page, this.size, this.searchTerm).subscribe({
      next: (data) => {
        this.suppliers = data.data!;
        // console.log(data);
        this.totalElements = data.totalElements!;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  addSupplier() {
    this.addSupplierVisible = true;
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

  createSupplier() {
    //Get all the data
    this.newSupplier = {
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
    if (this.prefix == '' || this.firstName == '' || this.lastName == '' || this.companyName == '' || this.companyEmail == '' || this.companyPhoneNumber == '' || this.companyAddress == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor llene todos los campos' });
      return;
    }

    this.supplierService.createSupplier(this.companyId, this.newSupplier).subscribe({
      next: (data) => {
        // console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor creado correctamente' });
        //Esperar 1 segundo para que se cierre el modal
        setTimeout(() => {
          this.addSupplierVisible = false;
          this.getAllSuppliers();
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el proveedor, intente nuevamente' });
      }
    })
  }

  editSupplier(supplierId: number) {
    this.editMode = true;
    // console.log(supplierId);
    //Get the supplier data
    this.supplierService.getSupplierById(this.companyId, supplierId).subscribe({
      next: (data) => {
        // console.log(data);
        this.prefix = data.data!.prefix;
        this.firstName = data.data!.firstName;
        this.lastName = data.data!.lastName;
        this.displayName = data.data!.displayName;
        this.companyName = data.data!.companyName;
        this.companyPhoneNumber = data.data!.companyPhoneNumber;
        this.companyEmail = data.data!.companyEmail;
        this.companyAddress = data.data!.companyAddress;
        this.editSupplierId = supplierId;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  saveSupplierChanges() {
    //Get all the data
    this.newSupplier = {
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
    //Update the supplier
    this.supplierService.updateSupplier(this.companyId, this.editSupplierId, this.newSupplier).subscribe({
      next: (data) => {
        // console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor actualizado correctamente' });
        //Esperar 1 segundo para que se cierre el modal
        setTimeout(() => {
          this.getAllSuppliers();
          this.addSupplierVisible = false;
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el proveedor, intente nuevamente' });
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
  // applyFilterGlobal(event: Event, stringVal: string) {
  //   const inputValue = (event.target as HTMLInputElement).value;
  //   this.dt.filterGlobal(inputValue, stringVal);
  // }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.searchSubject.next(this.searchTerm);
  }


}
