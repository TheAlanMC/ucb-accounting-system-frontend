import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from 'src/app/features/user-accounts/models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private user = new BehaviorSubject<UserDto>( {} as UserDto);

  constructor() {}

  // Método para obtener el índice de la pestaña activa como observable
  getUserInfo(): Observable<UserDto> {
    return this.user.asObservable();
  }

  // Método para establecer el índice de la pestaña activa
  setUser(user: UserDto) {
    this.user.next(user);
  }
}