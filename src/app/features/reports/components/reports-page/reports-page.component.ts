import { Component, ViewChild } from '@angular/core';
import {SidebarService} from "../../../../core/services/sidebar/sidebar.service";
import { Router } from '@angular/router';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';
import { AccountModalComponent } from 'src/app/features/ledger-book/components/account-modal/account-modal.component';
import { SubaccountDto } from 'src/app/features/sales/models/subaccount.dto';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
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

  constructor(private sidebarService: SidebarService, private router: Router, private ledgerBookService: LedgerBookService) {}

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
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
      //Router link to ledgerbook
      this.router.navigate(['/ledgerbook']);
    }else{
      this.ledgerBookDate = false;
      this.title = "Seleccionar cuentas";
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
}
