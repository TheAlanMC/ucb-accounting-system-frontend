import { Component, EventEmitter, Input, Output } from '@angular/core';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import { MessageService } from 'primeng/api';
import { Messages } from 'primeng/messages';
import { AccountPlanService } from 'src/app/core/services/account-plan.service';
import { ReportService } from 'src/app/core/services/report.service';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';
import { AccountCategoryDto } from 'src/app/features/chart-of-accounts/models/account-category.dto';
import { SubaccountDto } from 'src/app/features/chart-of-accounts/models/subaccount.dto';
import { TableAccountDto } from 'src/app/features/chart-of-accounts/models/table-account.dto';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css'],
  providers: [MessageService]
})
export class AccountModalComponent {
  companyId = Number(localStorage.getItem('companyId'));
  typeOfSelection: string = 'checkbox';
  firstAccount: string = '';
  lastAccount: string = '';
  initialRow!: number;
  lastRow!: number;
  accounts: SubaccountDto[] = [];
  selectedAccounts!: SubaccountDto[];
  isLoading: boolean = true;
  selectedRow: number = 0;
  sidebarVisible2: boolean = false;
  editingInput: number = 1;

  constructor(private reportService: ReportService, private ledgerBookService: LedgerBookService, private accountPlanService: AccountPlanService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  //Object emmited to the parent component
  @Output() sidebarOpen = new EventEmitter<boolean>();
  @Output() listOfAccounts = new EventEmitter<SubaccountDto[]>();
  @Input() subaccountDto!: SubaccountDto;

  //Send data to the parent component
  sendState(){
    this.sidebarOpen.emit(this.sidebarVisible2);
  }
  sendAccounts(){
    this.listOfAccounts.emit(this.accounts);
  }
  
  getAccounts() {
    if(this.ledgerBookService.getdateFrom() != null && this.ledgerBookService.getdateTo() != null){
          var formattedDateFrom = format(this.ledgerBookService.getdateFrom(), 'yyyy-MM-dd');
            var formattedDateTo = format(this.ledgerBookService.getdateTo(), 'yyyy-MM-dd');
            this.reportService.getLedgerBookSubaccounts(this.companyId, formattedDateFrom, formattedDateTo, '', 'asc').subscribe({
              next: (response) => {
                this.accounts = response.data!;
                this.isLoading = false;
                this.sendAccounts();
                if(this.accounts.length == 0){
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'No hay cuentas para el periodo seleccionado'});
                }
              },
              error: (error) => {
                console.log(error);
              }
            });
      }
  }

  onCheckboxChange(event: any) {
    console.log(this.selectedAccounts);
    if(this.selectedAccounts != null){
      //Map the selected accounts to an array of strings
      var selectedAccountsIds: string[] = [];
      selectedAccountsIds = this.selectedAccounts.map((account) => account.subaccountId.toString());
      console.log(selectedAccountsIds);
      this.ledgerBookService.setsubaccountIds(selectedAccountsIds);
    }
  }

  selectRow(index: number) {
    // this.selectedRow = index;
    this.sidebarVisible2 = true;
    this.editingInput = index;
    this.sendState();


  }
  onAccountSelected(rowData: any) {
    console.log(rowData);
    if (rowData.level == 5) {
      this.firstAccount = rowData.accountCode;
      // this.transactionDetails[this.selectedRow].nombrecuenta = rowData.accountName;
      this.sidebarVisible2 = false;
    }
  }

  getSelectedSubaccount(subaccount: SubaccountDto, rowIndex: number){
    this.subaccountDto = subaccount;
    if(this.editingInput == 1){
      this.initialRow = rowIndex;
      this.firstAccount = `${this.subaccountDto.subaccountCode} - ${this.subaccountDto.subaccountName}`;
    }else{
      this.lastRow = rowIndex;
      this.lastAccount = `${this.subaccountDto.subaccountCode} - ${this.subaccountDto.subaccountName}`;
    }

    if(this.initialRow != null && this.lastRow != null){
      var rangeOfAccounts: SubaccountDto[] = [];
      var initialRow = this.initialRow;
      var lastRow = this.lastRow;
      if(this.initialRow > this.lastRow){
        this.ledgerBookService.setsubaccountIds(['error']);
      }else{
        for(var i = initialRow; i <= lastRow; i++){
          rangeOfAccounts.push(this.accounts[i]);
        }
        var selectedAccountsIds: string[] = [];
        selectedAccountsIds = rangeOfAccounts.map((account) => account.subaccountId.toString());
        console.log(selectedAccountsIds);
        this.ledgerBookService.setsubaccountIds(selectedAccountsIds);
      }
      
    }

    
  }
  onSelectionChange(event: any) {
    //Establecemos el selectedIds en el ledgerBookService
    this.ledgerBookService.setsubaccountIds([]);
    if(this.typeOfSelection == 'checkbox'){
      this.selectedAccounts = [];
    }else{
      this.firstAccount = '';
      this.lastAccount = '';
    }
  }
    


  
}
