import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserData } from 'src/app/features/user-accounts/models/user-infoDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }
  private baseUrl = `${environment.API_URL}/api/v1/users`;

  getUserData(userId: string): Observable<UserData> {
    const apiUrl = `${this.baseUrl}/${userId}`; // Reemplaza con la URL de tu API
    return this.http.get(apiUrl).pipe(
      map((response: any) => {
        // Mapea los datos del JSON a UserData
        return {
          companyId: response.data.companyId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          profilePicture: response.data.profilePicture
        };
      })
    );
  }
  updateUserData(user: UserData, id:String): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, user);
  }
  
}
