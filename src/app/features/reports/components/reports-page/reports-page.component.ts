import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {SidebarService} from "../../../../core/services/sidebar/sidebar.service";
import { Router } from '@angular/router';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';
import { AccountModalComponent } from 'src/app/features/ledger-book/components/account-modal/account-modal.component';
import { SubaccountDto } from 'src/app/features/sales/models/subaccount.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css'],
  providers: [MessageService]
})
export class ReportsPageComponent {
  @ViewChild(AccountModalComponent) accountModalComponent!: AccountModalComponent; // Obtén una referencia al componente hijo

  isNavbarOpen : boolean = false;
  visible: boolean = false;
  ledgerBookDate: boolean = true;
  title: string = "Seleccionar fechas";
  sidebarVisible2: boolean = false;
  accounts: SubaccountDto[] = [];
  selectedSubaccount!: SubaccountDto;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }

  constructor(private messageService: MessageService, private sidebarService: SidebarService, private router: Router, private ledgerBookService: LedgerBookService) {}

  ngOnInit(): void {
    const bgColor = '#F3F6F6;'; // Cambiamos el color
    this.sidebarService.setBackgroundColor(bgColor);
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    this.ledgerBookService.setdateTo(null);
    this.ledgerBookService.setdateFrom(null);

  }

  //Retrieve the data from the child component - account modal
  retrieveState(state: boolean) {
    this.sidebarVisible2 = state;
    this.accountModalComponent.sendAccounts();
    console.log(this.accounts);
  }
  //Retrieve the data from the child component - account modal
  retrieveAccounts(accounts: SubaccountDto[]){
    this.accounts = accounts;
  }

  selectAccounts(){
    if(!this.ledgerBookDate){
      //Validate if there are accounts selected
      console.log(this.ledgerBookService.getsubaccountIds());
      if(this.ledgerBookService.getsubaccountIds().length > 0){
        if(this.ledgerBookService.getsubaccountIds()[0]=="error"){
          this.messageService.add({severity:'error', summary: 'Error', detail: 'La cuenta inicial debe ser menor a la cuenta final'});
        }else{
          //Router link to ledgerbook
          this.router.navigate(['/reports/ledgerbook']);
        }
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar al menos una cuenta'});
      }
    }else{
      //Validate dates
      if(this.ledgerBookService.getdateFrom() != null && this.ledgerBookService.getdateTo() != null){
        if(this.ledgerBookService.getdateFrom() <= this.ledgerBookService.getdateTo()){
          this.ledgerBookDate = false;
          this.title = "Seleccionar cuentas";
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'La fecha inicial debe ser menor a la fecha final'});
        }
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar una fecha inicial y una fecha final'});
      }
    }
  }

  ocultar(){
    this.visible = false;
    this.ledgerBookDate = true;
    this.title = "Seleccionar fechas";
  }

  onAccountSelected(rowIndex: number){
    this.selectedSubaccount = this.accounts[rowIndex];
    this.sidebarVisible2 = false;
    //Send the selected account to the child component - account modal
    this.accountModalComponent.getSelectedSubaccount(this.selectedSubaccount, rowIndex);
  }

  ngAfterViewInit() {
    this.selectedSubaccount = this.accountModalComponent.subaccountDto;
    console.log(this.selectedSubaccount);
  }

  goBack(){
    this.ledgerBookDate = true;
    this.title = "Seleccionar fechas";
  }
}
