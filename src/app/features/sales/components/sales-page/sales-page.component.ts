import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommunicationService } from 'src/app/core/services/communication.service';

@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.css'],
  providers: [MessageService]
})
export class SalesPageComponent {
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
