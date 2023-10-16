import { Component } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { CommunicationService } from 'src/app/core/services/tabview/communication.service';
import { UserService } from 'src/app/core/services/user.service';
import { ValuesService } from 'src/app/core/services/values/values.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  isNavbarOpen : boolean = false;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }
  constructor(private userService: UserService, private valuesService: ValuesService, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    //Guardamos el company id en el local storage
    this.userService.getUserById().subscribe({
      next: (data) => {
        localStorage.setItem('companyId', data.data!.companyIds[0].toString()); //TODO: Change this to get the company id selected by the user
        this.valuesService.setUser(data.data!);
        console.log(localStorage.getItem('companyId'));
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
