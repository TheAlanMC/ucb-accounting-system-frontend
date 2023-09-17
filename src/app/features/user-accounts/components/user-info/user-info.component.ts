import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';

import { UserInfoService } from 'src/app/core/services/user-info.service';
import { UserData } from '../../models/user-infoDTO';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserInfoComponent implements OnInit{

  constructor(private userinfoService: UserInfoService, private confirmationService: ConfirmationService, private messageService: MessageService){}
  
  
  userData: any = {
    companyId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@ucb.edu.bo',
    profilePicture: 'https://aidajerusalem.org/wp-content/uploads/2021/09/blank-profile-picture-973460_1280.png'
  };
  ngOnInit(): void {
    this.userinfoService.getUserData("5435a24f-735d-492d-bdb3-b833d4b187c2").subscribe((data) => {
      this.userData = data;
      console.log(this.userData); 
    }, (error) => {
      console.error(error);
    });
  }
  
  saveUserData(): void {
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Tus datos se guardaron correctamente' });
    this.userinfoService.updateUserData(this.userData, "5435a24f-735d-492d-bdb3-b833d4b187c2").subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.error(error);
    });
  }



}
