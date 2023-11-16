import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private backgroundColor: any = { color: '#F3F6F6' };
  
  constructor() { }

  getIsOpen() {
    return this.isOpenSubject.asObservable();
  }

  setIsOpen(isOpen: boolean) {
    this.isOpenSubject.next(isOpen);
  }

  getBackgroundColor() {
    return this.backgroundColor;
  }

  setBackgroundColor(color: any) {
    this.backgroundColor = color;
  }
}
