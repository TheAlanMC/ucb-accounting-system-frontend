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
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FieldsComponent } from './components/fields/fields.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselService } from 'src/app/core/services/carousel/carousel.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { InfoCardComponent } from './components/info-card/info-card.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FieldsComponent,
    CarouselComponent,
    FooterComponent,
    InfoCardComponent
  ],
  imports: [
    CommonModule,
    UserAccountsRoutingModule,
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
    HttpClientModule
  ],
  exports: [HomePageComponent],
  providers: [CarouselService],
})

export class UserAccountsModule { }
