import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from 'src/app/features/user-accounts/models/UserListCompany.dto';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListCompanyService {
  baseUrl: string = `${environment.API_URL}/api/v1`;
  constructor(private http: HttpClient) { }

  public getUserListCompany(companyId: number): Observable<user[]> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<any>(`${this.baseUrl}/users/companies/${companyId}`, {params}).pipe(
      map((response: any) => response.data as user[])
    );
  }
}
