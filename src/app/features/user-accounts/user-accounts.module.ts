import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CompanyComponent } from './components/company/company.component';
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
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { UserListCompanyComponent } from './components/user-list-company/user-list-company.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    UserPasswordComponent,
    UserInfoComponent,
    CreateAccountComponent,
    UserListCompanyComponent,
    CompanyComponent
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
    PasswordModule,
    FileUploadModule,
    PasswordModule,
    DropdownModule,
    TableModule,
    ButtonModule
  ]
})
export class UserAccountsModule { }
