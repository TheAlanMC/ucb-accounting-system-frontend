import { Component } from '@angular/core';
import {SidebarService} from "../../../../core/services/sidebar/sidebar.service";
import { Router } from '@angular/router';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent {
  isNavbarOpen : boolean = false;
  visible: boolean = false;
  ledgerBookDate: boolean = true;
  title: string = "Seleccionar fechas";

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
}
