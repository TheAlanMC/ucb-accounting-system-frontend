import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { UserDto } from '../../features/user-accounts/models/user.dto';
import { PasswordUpdateDto } from 'src/app/features/user-accounts/models/password-update.dto';
import { UserAbstractDto } from 'src/app/features/user-accounts/models/user-abstract.dto';
import { NewUserDto } from 'src/app/features/user-accounts/models/new-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = `${environment.API_URL}/api/v1/users`;

  constructor(private http: HttpClient) { }

  // Get user by id (token)
  public getUserById(): Observable<ResponseDto<UserDto>>{
    return this.http.get<ResponseDto<UserDto>>(`${this.baseUrl}`);
  }

  //Update user
  public updateUser(user: UserDto): Observable<ResponseDto<UserDto>>{
    return this.http.put<ResponseDto<UserDto>>(`${this.baseUrl}`, user);
  }

  //Update user password
  public updateUserPassword(password: PasswordUpdateDto): Observable<ResponseDto<String>>{
    return this.http.put<ResponseDto<String>>(`${this.baseUrl}/passwords`, password);
  }

  //Find all users by company id
  public findAllUsersByCompanyId(companyId: number): Observable<ResponseDto<UserAbstractDto[]>>{
    return this.http.get<ResponseDto<UserAbstractDto[]>>(`${this.baseUrl}/companies/${companyId}`);
  }

  //==========================Create users=============================
  //Create accountant
  public createAccountant(accountant: NewUserDto):Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/accountants`, accountant);
  }

  //Create accounting assistant
  public createAccountingAssistant(accountingAssistant: NewUserDto, companyId: number):Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/accounting-assistants/companies/${companyId}`, accountingAssistant);
  }

  //Create client
  public createClient(client: NewUserDto, companyId: number):Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/clients/companies/${companyId}`, client);
  }
}
