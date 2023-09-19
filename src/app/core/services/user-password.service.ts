import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Password } from 'src/app/features/user-accounts/models/PasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordService {

  constructor(private http: HttpClient) { }
  private baseUrl = `${environment.API_URL}/api/v1/users/:KcUuid/passwords`;

  updatePassword(KcUuid: string, passwordChangeRequest: Password): Observable<any> {
    const url = `${this.baseUrl}/passwords`;

    // Define los encabezados de la solicitud si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Puedes ajustar los encabezados según tus necesidades
    });

    // Crea un objeto con los parámetros que deseas enviar en la solicitud
    const params = {
      KcUuid: KcUuid
    };

    // Combina los parámetros con el cuerpo de la solicitud
    const body = { ...passwordChangeRequest, ...params };

    // Realiza la solicitud PUT con los encabezados, la URL y el cuerpo
    return this.http.put(url, body, { headers: headers });
  }
}
