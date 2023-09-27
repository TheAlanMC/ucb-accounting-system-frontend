import { Component, OnInit } from '@angular/core';
import { user } from '../../models/UserListCompany.dto';



@Component({
  selector: 'app-user-list-company',
  templateUrl: './user-list-company.component.html',
  styleUrls: ['./user-list-company.component.css']
})
export class UserListCompanyComponent {
  
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

   
}
