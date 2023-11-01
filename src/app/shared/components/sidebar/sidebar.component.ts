import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { KeycloakService } from 'keycloak-angular';
import { CommunicationService } from 'src/app/core/services/tabview/communication.service';
import { environment } from 'src/environments/environment';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
// import * as jwt_decode from "jwt-decode";


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
  isAccountant = false;
  isOpen:boolean = false;

  @Output() navbarToggle = new EventEmitter<boolean>();

  constructor(private communicationService: CommunicationService, private confirmationService: ConfirmationService, private keycloakService: KeycloakService, private sidebarService: SidebarService) {

  }

  ngOnInit() {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.determineRole();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estás seguro de que quieres cerrar sesión?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.removeItem('companyId');
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
      // this.sidebar.nativeElement.classList.toggle("open");
      this.isNavbarOpen = !this.isNavbarOpen;
      this.navbarToggle.emit(this.isNavbarOpen); // Raise event
      this.sidebarService.setIsOpen(this.isNavbarOpen);

    }
  }

  expandir() {
    this.toggleSidebar();
    //this.menuBtnChange(); // calling the function (optional)
  }

  determineRole(){
    // Obtén el token JWT de Keycloak
      const roles = this.keycloakService.getUserRoles(true);
      //Si roles contiene el rol 'journal-entry-recorder' o 'accounting-management' asignar true a isAccountant
      if (roles.includes('journal-entry-recorder') || roles.includes('accounting-management')) {
        this.isAccountant = true;
      }
  }


}

