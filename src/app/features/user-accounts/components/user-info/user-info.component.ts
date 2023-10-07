import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';

import { UserInfoService } from 'src/app/core/services/user-info.service';
import { UserData } from '../../models/user-infoDTO';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { ConfirmEventType } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserInfoComponent implements OnInit {

  imageChanged: boolean = false;

  previewImage: string | ArrayBuffer | null = null;
  file: File | null = null;

  constructor(private userinfoService: UserInfoService, private confirmationService: ConfirmationService, private messageService: MessageService, private keycloakService: KeycloakService) { }

  userData: any = {
    companyId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@ucb.edu.bo',
    profilePicture: 'https://aidajerusalem.org/wp-content/uploads/2021/09/blank-profile-picture-973460_1280.png'
  };
  ngOnInit(): void {
    this.userinfoService.getUserData("70b6afe6-5a1a-43a0-9267-012eb710ff0").subscribe((data) => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  saveUserData(): void {

    if(this.imageChanged){
      this.saveImage();
    }

    if (this.verifyData() == false) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifica tus datos' });

    } else {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Tus datos se guardaron correctamente' });
      this.userinfoService.updateUserData(this.userData, "70b6afe6-5a1a-43a0-9267-012eb710ff0a").subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.error(error);
      });
    }
  }

  verifyData(): boolean {
    if (this.userData.firstName == "" || this.userData.lastName == "" || this.userData.email == "") {
      return false;
    } else if (this.userData.email.includes("@") == false || this.userData.email.includes(".") == false) {
      return false;
    }
    return true;
  }

  saveImage(): void {
    
    if (this.file) {
      this.userinfoService.uploadCompanyLogo(this.file).subscribe(
        (response) => {
          console.log(response);
          console.log("URL: "+response.body.data.fileUrl);
          this.userData.companyLogo = response.body.data.fileUrl;
          
        },
        (error) => {
          // Maneja errores aquí si es necesario
          console.error(error);
        }
      );
    }
    console.log(this.userData);
  }


  onFileSelected2(event: any) {
    this.file = event.target.files[0];
    this.imageChanged = true;
    if (this.file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.userData.profilePicture = e.target.result;
      };
  
      reader.readAsDataURL(this.file);
    }
  }


}
