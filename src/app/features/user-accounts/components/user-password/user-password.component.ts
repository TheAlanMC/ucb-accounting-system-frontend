import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { ConfirmEventType } from 'primeng/api';
import { UserPasswordService } from 'src/app/core/services/user-password.service';
import { Password } from 'src/app/features/user-accounts/models/PasswordDTO';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserPasswordComponent {

  constructor(private UserPasswordService: UserPasswordService, private messageService: MessageService){}

  value!: string;
  value2!: string;
  value3!: string;
  
  passwordData: any = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  
  

  updatePassword(): void {
    if (this.checkPassword() == false) {
      this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Verifica tus datos' });
    } else {
      this.UserPasswordService.updatePassword("asd", this.passwordData).subscribe(
        (response) => {
          if (response.code.startsWith('200')) {
            this.messageService.add({ severity: 'success', summary: 'EXITO', detail: 'La contraseña se actualizó correctamente' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Hubo un error. La contraseña no se actualizó' });
          }
          console.log('Respuesta:', response);
        },
        (error) => {
          
          console.error('Error al actualizar la contraseña:', error);
        }
      );
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
