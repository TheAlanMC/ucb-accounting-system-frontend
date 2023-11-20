import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SidebarProfileComponent } from './components/sidebar-profile/sidebar-profile.component';


@NgModule({
  declarations: [
    SidebarComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarProfileComponent,

  ],
  imports: [
    CommonModule,
    TieredMenuModule,
    ToolbarModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    ConfirmPopupModule
  ],
  exports: [
    SidebarComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarProfileComponent,
  ]
})
export class SharedModule { }
