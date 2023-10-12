import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { BrowserModule } from '@angular/platform-browser';
import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CompanyComponent } from './components/company/company.component';
import { MenubarModule} from 'primeng/menubar';
import { BarsIcon } from 'primeng/icons/bars';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FieldsComponent } from './components/fields/fields.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselService } from 'src/app/core/services/carousel/carousel.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { UserListCompanyComponent } from './components/user-list-company/user-list-company.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    UserPasswordComponent,
    UserInfoComponent,
    HomePageComponent,
    HeaderComponent,
    FieldsComponent,
    CarouselComponent,
    FooterComponent,
    InfoCardComponent,
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
    CardModule,
    ButtonModule,
    FieldsetModule,
    PanelModule,
    DividerModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ImageModule,
    BrowserModule,
    HttpClientModule,
    FileUploadModule,
    PasswordModule,
    DropdownModule,
    TableModule,
    ButtonModule,
  ],
  exports: [HomePageComponent],
  providers: [CarouselService],
})

export class UserAccountsModule { }
