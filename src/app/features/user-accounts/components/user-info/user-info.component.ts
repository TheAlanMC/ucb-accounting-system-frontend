import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/services/user.service';
import { UserDto } from '../../models/user.dto';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { ConfirmEventType } from 'primeng/api';
import { FilesService } from 'src/app/core/services/files.service';
import { UserAbstractDto } from '../../models/user-abstract.dto';

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

  constructor(private userService: UserService, private filesService: FilesService ,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  userData!: UserDto;
  ngOnInit(): void {
    this.userService.getUserById().subscribe((data) => {
      this.userData = data.data!;
      console.log(this.userData);
    }
    );
  }

  saveUserData(): void {

    if(this.imageChanged){
      this.saveImage();
    }

    // if (this.verifyData() == false) {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifica tus datos' });

    // } else {
    //   this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Tus datos se guardaron correctamente' });
    //   this.userService.updateUser(this.userData).subscribe((data) => {
    //     console.log(data);
    //   }, (error) => {
    //     console.error(error);
    //   });
    // }
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
    if (this.file){
      console.log(this.file);
      const formData = new FormData();
      formData.append('picture', this.file);
      this.filesService.uploadPicture(formData).subscribe((data) => {
        console.log(data);
        //this.userData.profilePicture = data.data?.fileUrl;
      }, (error) => {
        console.error(error);
      });
     }
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


  confirm1() {
    this.confirmationService.confirm({
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}


}
