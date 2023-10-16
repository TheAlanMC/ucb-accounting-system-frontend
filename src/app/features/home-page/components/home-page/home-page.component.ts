import { Component } from '@angular/core';
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
  activeTabIndex = 0;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    console.log(this.isNavbarOpen);
  }
  constructor(private communicationService: CommunicationService, private userService: UserService, private valuesService: ValuesService) {}

  ngOnInit(): void {
    this.communicationService.getActiveTabIndex().subscribe((index) => {
      this.activeTabIndex = index;
    });
    //Guardamos el company id en el local storage
    this.userService.getUserById().subscribe({
      next: (data) => {
        localStorage.setItem('companyId', data.data!.companyIds[0].toString());
        this.valuesService.setUser(data.data!);
        console.log(localStorage.getItem('companyId'));
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
