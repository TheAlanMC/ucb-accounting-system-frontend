import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { KeycloakService } from 'keycloak-angular';
import { CommunicationService } from 'src/app/core/services/tabview/communication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ConfirmationService]
})



export class SidebarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('btn') btn!: ElementRef;
  isNavbarOpen = false;
  homeUrl = environment.ANGULAR_URL;

  @Output() navbarToggle = new EventEmitter<boolean>();

  constructor(private communicationService: CommunicationService, private confirmationService: ConfirmationService, private keycloakService: KeycloakService) {

  }
  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estás seguro de que quieres cerrar sesión?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.keycloakService.logout(this.homeUrl).then(r => console.log(r));
      }
    });
  }

  // Función para cambiar la pestaña activa
  changeTab(tabIndex: number) {
    this.communicationService.setActiveTabIndex(tabIndex);
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.nativeElement.classList.toggle("open");
      this.isNavbarOpen = !this.isNavbarOpen;
      this.navbarToggle.emit(this.isNavbarOpen); // Raise event
    }
  }

  expandir() {
    this.toggleSidebar();
    //this.menuBtnChange(); // calling the function (optional)
  }

}

