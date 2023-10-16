import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { NewUserDto } from '../../../user-accounts/models/new-user.dto';

interface accountType {
  id: number;
  type: string;
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [MessageService]
})
export class CreateAccountComponent implements OnInit{
  value!: string;
  
  constructor(private userService: UserService, private messageService: MessageService) { }
  companyId = Number(localStorage.getItem('companyId'));
  accountstype: accountType[] | undefined;
  dataAccount: NewUserDto = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

    selectedAccount: accountType | undefined;

    ngOnInit() {
      this.accountstype =[
        { id: 1, type: 'Contador' },
        { id: 2, type: 'Asistente Contable' },
        { id: 3, type: 'Cliente' },
      ]
      
    }

    createAccount(): void{
      if(this.verifydata()){
        console.log(this.dataAccount);
        console.log(this.selectedAccount?.id);
        if(this.selectedAccount?.id==1){
          this.userService.createAccountant(this.dataAccount).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Cuenta creada con exito'});
            },
            error => {
              console.log(error);
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la cuenta'});
            }
          );
        }else if(this.selectedAccount?.id==2){
          this.userService.createAccountingAssistant(this.dataAccount, this.companyId).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Cuenta creada con exito'});
            },
            error => {
              console.log(error);
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la cuenta'});
            }
          );
        }else if(this.selectedAccount?.id==3){
          this.userService.createClient(this.dataAccount, this.companyId).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Cuenta creada con exito'});
            },
            error => {
              console.log(error);
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la cuenta'});
            }
          );
        }
      }else{
        console.log('error');

      }
    }

    verifydata(): boolean {
      if(this.dataAccount.email=='' || this.dataAccount.firstName=='' || this.dataAccount.lastName=='' || this.dataAccount.password=='' || this.dataAccount.confirmPassword==''){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe llenar todos los campos'});
        return false;
      }else if(this.dataAccount.password!=this.dataAccount.confirmPassword){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Las contraseñas no coinciden'});
        return false;
      }else if(this.dataAccount.password.length<8){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'La contraseña debe tener al menos 8 caracteres'});
        return false;
      }else if(this.dataAccount.email.indexOf('@')==-1){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'El correo no es valido'});
        return false;
      }else if(this.dataAccount.email.indexOf('.')==-1){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'El correo no es valido'});
        return false;
      }else{
        return true;  
      }
    }

}
