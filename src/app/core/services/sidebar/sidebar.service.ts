import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private backgroundColor: any = { color: '#F3F6F6' };
  private opcionSeleccionadaSource = new BehaviorSubject<string>('');
  opcionSeleccionada$ = this.opcionSeleccionadaSource.asObservable();

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
  
  seleccionarOpcion(opcion: string) {
    this.opcionSeleccionadaSource.next(opcion);
  }
}
