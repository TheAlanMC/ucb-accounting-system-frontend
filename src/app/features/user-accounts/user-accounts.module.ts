import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MenubarModule} from 'primeng/menubar';
import { BarsIcon } from 'primeng/icons/bars';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    UserPasswordComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    UserAccountsRoutingModule,
    ButtonModule,
    MenubarModule,
    BarsIcon,
    AvatarModule,
    AvatarGroupModule,
    ConfirmDialogModule,
    ToastModule,
    PasswordModule,
    CardModule,
    FormsModule,
    ImageModule,
    SharedModule,
    DialogModule
  ],
})

export class UserAccountsModule { }
