import { Component, OnInit, inject } from '@angular/core';
import { user } from '../../models/UserListCompany.dto';
import { UserListCompanyService } from 'src/app/core/services/user-list-company.service';



@Component({
  selector: 'app-user-list-company',
  templateUrl: './user-list-company.component.html',
  styleUrls: ['./user-list-company.component.css']
})
export class UserListCompanyComponent implements OnInit{

    userlistcompanyservice = inject(UserListCompanyService);
    
  
    //crea una variable de tipo user con datos de tipo user
    users: user[] = [
      {
        kcGroupName: 'Admin',
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'asdsa',
        creationDate: 'asdsa'
      },
    ];

    ngOnInit(): void {
      this.userlistcompanyservice.getUserListCompany(1).subscribe((users) => {
        this.users = users;
        console.log(users);
      });
    }

   
}
