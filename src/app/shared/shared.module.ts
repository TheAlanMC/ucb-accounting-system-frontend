import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TieredMenuModule } from 'primeng/tieredmenu';



@NgModule({
  declarations: [
    NavbarComponent,
    ForbiddenComponent,
    NotFoundComponent,

  ],
  imports: [
    CommonModule,
    TieredMenuModule
  ],
  exports: [
    NavbarComponent,
    ForbiddenComponent,
    NotFoundComponent,
  ]
})
export class SharedModule { }
