import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CreateAccountsService } from 'src/app/core/services/create-accounts.service';
import { User } from '../../models/NewAccount.dto';

interface accountType {
  id: number;
  type: string;
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{
  value!: string;
  messageService = inject(MessageService);
  createAccountService = inject(CreateAccountsService);
  
  accountstype: accountType[] | undefined;
  dataAccount: User = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

    selectedAccount: accountType | undefined;

    ngOnInit() {
        
      this.accountstype =[
        { id: 1, type: 'Usuario' },
        { id: 2, type: 'Asistente Contable' },
        { id: 3, type: 'Cliente' },
      ]
      
    }

    createAccount(): void{
      if(this.verifydata()){
        console.log(this.dataAccount);
        console.log(this.selectedAccount?.id);
        if(this.selectedAccount?.id==1){
          this.createAccountService.createUser(this.dataAccount).subscribe(
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
          this.createAccountService.createAccountingAssistant(this.dataAccount, 1).subscribe(
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
          this.createAccountService.createClient(this.dataAccount, 1).subscribe(
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
