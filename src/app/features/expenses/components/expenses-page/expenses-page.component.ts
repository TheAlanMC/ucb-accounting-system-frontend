import { Component } from '@angular/core';
import {CommunicationService} from "../../../../core/services/tabview/communication.service";
import {MessageService} from "primeng/api";
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.css'],
  providers: [MessageService]
})
export class ExpensesPageComponent {
  isNavbarOpen : boolean = false;
  activeTabIndex = 0;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }
  constructor(private communicationService: CommunicationService, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.communicationService.getActiveTabIndex().subscribe((index) => {
      this.activeTabIndex = index;
    });
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
  }

}
