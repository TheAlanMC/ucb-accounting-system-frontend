import { Component, OnInit, inject } from '@angular/core';
import { UserAbstractDto } from '../../../user-accounts/models/user-abstract.dto';
import { UserService } from 'src/app/core/services/user.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { KeycloakService } from 'keycloak-angular';
import { MessageService } from 'primeng/api';
import { NewUserDto } from 'src/app/features/user-accounts/models/new-user.dto';
import {debounceTime, Subject} from "rxjs";
import {th} from "date-fns/locale";



@Component({
  selector: 'app-user-list-company',
  templateUrl: './user-list-company.component.html',
  styleUrls: ['./user-list-company.component.css'],
  providers: [MessageService]
})
export class UserListCompanyComponent implements OnInit{
    //Variables
    isNavbarOpen : boolean = false;
    searchValue: string = '';
    companyId = Number(localStorage.getItem('companyId'));
    name: string = '';
    email: string = '';
    lastName: string = '';
    addNewAccountVisible: boolean = false;
    selectedAccount: any;
    accountstype: any[] = [];
    canAddAccountant: boolean = false;
    newUserDto!: NewUserDto;
    // Pagination variables
    sortBy: string = 'id';
    sortType: string = 'asc';
    page: number = 0;
    size: number = 10;
    totalElements: number = 0;
    isLoading: boolean = true;

    searchTerm: string = '';

  private searchSubject = new Subject<string>();



  constructor(private userService: UserService, private sidebarService: SidebarService, private keycloakService: KeycloakService, private messageService: MessageService) { }

    onNavbarToggle(isOpen: boolean) {
      this.isNavbarOpen = isOpen;
      // console.log(this.isNavbarOpen);
      this.sidebarService.setIsOpen(this.isNavbarOpen);
    }

    //crea una variable de tipo user con datos de tipo user
    users: UserAbstractDto[] = [];

    ngOnInit(): void {
      this.sidebarService.getIsOpen().subscribe((isOpen) => {
        this.isNavbarOpen = isOpen;
      });
      this.getData();
      this.determineRole();

      this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
        // When the user has stopped typing for 500 milliseconds, trigger the getAllTransactions method
        this.getData()
      });

    }

    createAccount(){
      if(this.verifyData()){
        this.newUserDto = {
          firstName: this.name,
          lastName: this.lastName,
          email: this.email,
          password: null,
          confirmPassword: null,
        }
        if(this.selectedAccount.code==1){
          this.userService.createAccountant(this.newUserDto).subscribe({
            next: (data) => {
              this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Cuenta de contador creada con éxito'});
              this.getData();
              },
            error: (error) => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la cuenta'});
            }
          });

        }else if(this.selectedAccount.code==2){
          this.userService.createAccountingAssistant(this.newUserDto, this.companyId).subscribe({
            next: (data) => {
              this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Cuenta de asistente contable creada con éxito'});
              this.getData();
              },
            error: (error) => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la cuenta'});
            }
          });
        }else if(this.selectedAccount.code==3){
          this.userService.createClient(this.newUserDto, this.companyId).subscribe({
            next: (data) => {
              this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Cuenta de cliente creada con éxito'});
              this.getData();
              },
            error: (error) => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la cuenta'});
            }
          });
        }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la cuenta'});
      }
    }
  }

    verifyData(): boolean {
      if(this.name=='' || this.email=='' || this.lastName=='' || this.selectedAccount==undefined){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe llenar todos los campos'});
        return false;
      }
      //Verificar que el correo sea valido
      if(!this.email.includes('@')){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'El correo debe ser válido'});
        return false;
      }
      return true;
    }


    determineRole(){
      //TODO: Review
      const roles = this.keycloakService.getUserRoles(true);
      if (roles.includes('accountant-register')) {
        this.canAddAccountant = true;
        this.accountstype = [
          { code: 1, name: 'Contador' },
          { code: 2, name: 'Asistente Contable' },
          { code: 3, name: 'Cliente' },
        ]
      }else{
        this.canAddAccountant = false;
        this.accountstype = [
          { code: 2, name: 'Asistente Contable' },
          { code: 3, name: 'Cliente' },
        ]
      }
    }

  onPageChange(event: any) {
    var first = event.first;
    var rows = event.rows;
    this.page = Math.floor(first / rows);
    this.size = rows;
    // console.log(event);
    this.getData();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.userService.findAllUsersByCompanyId(this.companyId, this.sortBy, this.sortType,this.page, this.size, this.searchTerm ).subscribe((users) => {
      this.users = users.data!;
      this.totalElements = users.totalElements!;
      this.isLoading = false;
    });
  }

  onSearch(event: any) {
      this.searchTerm = event.target.value;
      this.searchSubject.next(this.searchTerm);
  }

}
