import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/core/services/carousel/carousel.service';  
import { Carousel } from 'src/app/features/home-page/models/carousel/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  carousel!:Carousel[];

  constructor(private carouselServices:CarouselService) { }

  ngOnInit() {
    this.carouselServices.getCarousel().then(carousel => {
      this.carousel = carousel;
    })
  }
}
