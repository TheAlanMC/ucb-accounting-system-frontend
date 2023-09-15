import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';

import { UserInfoService } from 'src/app/core/services/user-info.service';
import { UserData } from '../../models/user-infoDTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{

  constructor(private userinfoService: UserInfoService){}
  
  
  userData: any = {
    companyId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@ucb.edu.bo',
    profilePicture: 'https://aidajerusalem.org/wp-content/uploads/2021/09/blank-profile-picture-973460_1280.png'
  };
  ngOnInit(): void {
    this.userinfoService.getUserData(123).subscribe((data) => {
      this.userData = data;
      console.log(this.userData); 
      
    }, (error) => {
      console.error(error);
    });
  }
  
  saveUserData(): void {
    
    this.userinfoService.updateUserData(this.userData, "123").subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.error(error);
    });
  }

  

  

}
