import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carousel } from '../../../features/user-accounts/models/carousel/carousel';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }
  getCarousel() {
    return this.http.get<any>('/assets/carousel/carousel.json')
      .toPromise()
      .then(res => <Carousel[]>res.data)
      .then(data => { return data; });
  }
}
