import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountsRoutingModule } from './user-accounts-routing.module';
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


@NgModule({
  declarations: [
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
    ToastModule
  ]
})
export class UserAccountsModule { }
