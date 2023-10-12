import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private activeTabIndexSubject = new BehaviorSubject<number>(0);

  constructor() {}

  // Método para obtener el índice de la pestaña activa como observable
  getActiveTabIndex(): Observable<number> {
    return this.activeTabIndexSubject.asObservable();
  }

  // Método para establecer el índice de la pestaña activa
  setActiveTabIndex(tabIndex: number) {
    this.activeTabIndexSubject.next(tabIndex);
  }
}
