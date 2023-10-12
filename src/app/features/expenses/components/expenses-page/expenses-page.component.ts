import { Component } from '@angular/core';
import {CommunicationService} from "../../../../core/services/communication.service";
import {MessageService} from "primeng/api";

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
    console.log(this.isNavbarOpen);
  }
  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.communicationService.getActiveTabIndex().subscribe((index) => {
      this.activeTabIndex = index;
    });
  }

}
