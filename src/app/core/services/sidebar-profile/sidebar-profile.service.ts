import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarProfileService {
  private opcionSeleccionadaSource = new BehaviorSubject<string>('');
  opcionSeleccionada$ = this.opcionSeleccionadaSource.asObservable();

  seleccionarOpcion(opcion: string) {
    this.opcionSeleccionadaSource.next(opcion);
  }
}
