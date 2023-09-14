import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule} from 'primeng/menubar';
import { BarsIcon } from 'primeng/icons/bars';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    UserInfoComponent
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
    ImageModule
  ]
})
export class UserAccountsModule { }
