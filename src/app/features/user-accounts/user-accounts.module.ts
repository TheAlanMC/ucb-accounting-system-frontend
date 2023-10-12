import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountsRoutingModule } from './user-accounts-routing.module';
<<<<<<< HEAD
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
=======
import { CreateAccountComponent } from './components/create-account/create-account.component';
>>>>>>> Uas-96
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule} from 'primeng/menubar';
import { BarsIcon } from 'primeng/icons/bars';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
<<<<<<< HEAD
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    UserPasswordComponent,
    UserInfoComponent
=======
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [
    CreateAccountComponent
>>>>>>> Uas-96
  ],
  imports: [
    CommonModule,
    UserAccountsRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    BarsIcon,
    AvatarModule,
    AvatarGroupModule,
    ImageModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
<<<<<<< HEAD
    PasswordModule
=======
    FileUploadModule,
    PasswordModule,
    DropdownModule
>>>>>>> Uas-96
  ]
})
export class UserAccountsModule { }
