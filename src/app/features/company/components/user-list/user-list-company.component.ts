import { Component, OnInit, inject } from '@angular/core';
import { UserAbstractDto } from '../../../user-accounts/models/user-abstract.dto';
import { UserService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-user-list-company',
  templateUrl: './user-list-company.component.html',
  styleUrls: ['./user-list-company.component.css']
})
export class UserListCompanyComponent implements OnInit{

    constructor(private userService: UserService) { }
    isNavbarOpen : boolean = false;
    searchValue: string = '';
    
    onNavbarToggle(isOpen: boolean) {
      this.isNavbarOpen = isOpen;
      console.log(this.isNavbarOpen);
    }
  
    //crea una variable de tipo user con datos de tipo user
    users: UserAbstractDto[] = [
      {
        kcGroupName: 'Admin',
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'asdsa',
        creationDate: 'asdsa'
      },
    ];

    ngOnInit(): void {
      this.userService.findAllUsersByCompanyId(1).subscribe((users) => {
        this.users = users.data!;
        console.log(users);
      });
    }

   
}