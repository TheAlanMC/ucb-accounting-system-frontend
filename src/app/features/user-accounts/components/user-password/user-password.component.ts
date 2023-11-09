import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { ConfirmEventType } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { PasswordUpdateDto } from 'src/app/features/user-accounts/models/password-update.dto';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserPasswordComponent {

  constructor(private userService: UserService, private messageService: MessageService){}

  value!: string;
  value2!: string;
  value3!: string;

  passwordData: any = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };



  updatePassword(): void {
    // console.log('Datos de la contraseña:', this.passwordData);
    // update messageService z-index
    if (!this.checkPassword()) {
      // console.log('Contraseñas no coinciden');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifica tus datos' });
    } else {
      this.userService.updateUserPassword(this.passwordData).subscribe({
        next: (response) => {
          // console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Contraseña actualizada' });
          this.passwordData = {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          };
        },
        error: (error) => {
          // console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifica que la contraseña sea correcta' });
        }
      });
    }
  }

  checkPassword(): boolean {
    if (this.passwordData.newPassword != this.passwordData.confirmNewPassword) {
      return false;
    } else if(this.passwordData.newPassword == "" || this.passwordData.confirmNewPassword == "" || this.passwordData.currentPassword == "") {
      return false;
    }else{
      return true;
    }
  }
}
