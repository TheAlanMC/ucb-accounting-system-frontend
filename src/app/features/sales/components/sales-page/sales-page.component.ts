import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { CommunicationService } from 'src/app/core/services/tabview/communication.service';

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
    this.sidebarService.setIsOpen(isOpen);
    
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
