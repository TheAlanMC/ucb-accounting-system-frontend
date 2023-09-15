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
    this.messageService.add({ severity: 'success', summary: 'EXITO', detail: 'La contraseña se actualizo correctamente' });
    this.UserPasswordService.updatePassword("asd", this.passwordData).subscribe(
      (response) => {
        
        console.log('Contraseña actualizada:', response);
      },
      (error) => {
        
        console.error('Error al actualizar la contraseña:', error);
      }
    );
  }
}
