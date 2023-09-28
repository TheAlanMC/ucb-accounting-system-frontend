import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../features/user-accounts/models/NewAccount.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountsService {

  baseUrl: string = `${environment.API_URL}/api/v1`;
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    const url = `${this.baseUrl}/users/accountants`;
    return this.http.post(url, user);
  }

  createAccountingAssistant(user: User, companyId: number): Observable<any> {
    const params = new HttpParams().set('companyId', companyId.toString());
    const url = `${this.baseUrl}/users/accounting-assistants/companies/:companyId`;
    return this.http.post(url, user, {params});
  }

  createClient(user: User, companyId: number): Observable<any> {
    const params = new HttpParams().set('companyId', companyId.toString());
    const url = `${this.baseUrl}/users/accounting-assistants/companies/:companyId`;
    return this.http.post(url, user, {params});
  }
}
