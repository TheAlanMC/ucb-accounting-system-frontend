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



@NgModule({
  declarations: [
    SidebarComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    TieredMenuModule,
    ToolbarModule,
    AvatarModule,
    ButtonModule,
  ],
  exports: [
    SidebarComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NavbarComponent,
  ]
})
export class SharedModule { }
