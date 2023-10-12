import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { UserDto } from '../models/user.dto';

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
}
