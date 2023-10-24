import { Component } from '@angular/core';
import {SidebarService} from "../../../../core/services/sidebar/sidebar.service";

@Component({
  selector: 'app-ledger-book-page',
  templateUrl: './ledger-book-page.component.html',
  styleUrls: ['./ledger-book-page.component.css']
})
export class LedgerBookPageComponent {
  isNavbarOpen : boolean = false;
  saldoFinal: number = 0;
  transactions: any[] = [];
  nombreCuenta: string = 'Caja Moneda Nacional - MLL';

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }
  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
  }
}
