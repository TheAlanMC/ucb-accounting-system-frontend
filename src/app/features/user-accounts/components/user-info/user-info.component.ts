import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/services/user.service';
import { UserDto } from '../../models/user.dto';
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { FilesService } from 'src/app/core/services/files.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserInfoComponent implements OnInit {
  //variables
  imageChanged: boolean = false;
  previewImage: string | ArrayBuffer | null = null;
  file: File | null = null;

  constructor(private userService: UserService, private filesService: FilesService, private confirmationService: ConfirmationService, private messageService: MessageService, private location: Location) { }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  userData!: UserDto;
  ngOnInit(): void {
    this.userService.getUserById().subscribe((data) => {
      this.userData = data.data!;
      console.log(this.userData);
    }
    );
  }

  save(): void {
    if (this.imageChanged) {
      if (this.file) {
        console.log(this.file);
        const formData = new FormData();
        formData.append('picture', this.file);
        this.filesService.uploadPicture(formData).subscribe({
          next: (data) => {
            console.log(data);
            this.userData.profilePicture = data.data?.fileUrl || ''; // add null check here
            this.userData.s3ProfilePictureId = data.data?.s3ObjectId || 0; // add null check here
            this.saveUserData();
          }, error: (error) => {
            console.error(error);
          }
        });
      }
    }else{
      this.saveUserData();
    }
  }

  saveUserData(){
    if (this.verifyData() == false) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifica tus datos' });
    } else {
      console.log(this.userData);
      this.userService.updateUser(this.userData).subscribe({
        next: (data) => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Tus datos se guardaron correctamente' });
      },error: (error) => {
        console.error(error);
      }});
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

  goBack(): void {
    this.location.back();
  }


}
