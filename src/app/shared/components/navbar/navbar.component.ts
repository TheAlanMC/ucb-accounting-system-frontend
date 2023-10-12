import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { CommunicationService } from 'src/app/core/services/communication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('btn') btn!: ElementRef;
  isNavbarOpen = false;

  @Output() navbarToggle = new EventEmitter<boolean>();

  constructor(private communicationService: CommunicationService) {

  }

  // Función para cambiar la pestaña activa
  changeTab(tabIndex: number) {
    this.communicationService.setActiveTabIndex(tabIndex);
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.nativeElement.classList.toggle("open");
      this.menuBtnChange();
      this.isNavbarOpen = !this.isNavbarOpen;
      this.navbarToggle.emit(this.isNavbarOpen); // Raise event
    }
  }

  menuBtnChange() {
    if (this.sidebar) {
      if (this.sidebar.nativeElement.classList.contains("open")) {
        
          this.btn.nativeElement.classList.replace("bx-menu", "bx-menu-alt-right");
        
      } else {
          this.btn.nativeElement.classList.replace("bx-menu-alt-right", "bx-menu");
        
      }
    }

    //Correcion

  }
  expandir(){
    this.toggleSidebar();
    this.menuBtnChange(); // calling the function (optional)
  
}
  

    

    
}
