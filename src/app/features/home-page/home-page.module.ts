import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FieldsComponent } from './components/fields/fields.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { CarouselService } from 'src/app/core/services/carousel/carousel.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FieldsComponent,
    CarouselComponent,
    FooterComponent,
    InfoCardComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CardModule,
    ButtonModule,
    PanelModule,
    DividerModule,
    CarouselModule,
    FieldsetModule,
    TableModule,
    SharedModule,
  ],
  // exports: [HomePageComponent],
  // providers: [CarouselService],
})
export class HomePageModule { }
