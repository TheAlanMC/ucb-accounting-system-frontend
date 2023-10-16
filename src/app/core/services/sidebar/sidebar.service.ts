import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  getIsOpen() {
    return this.isOpenSubject.asObservable();
  }

  setIsOpen(isOpen: boolean) {
    this.isOpenSubject.next(isOpen);
  }
}
