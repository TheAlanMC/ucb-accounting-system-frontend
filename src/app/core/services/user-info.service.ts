import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserData } from 'src/app/features/user-accounts/models/user-infoDTO';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { ImageDto } from '../models/image.dto';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }
  private baseUrl = `${environment.API_URL}/api/v1`;

  getUserData(): Observable<ResponseDto<UserData>>{
    return this.http.get<ResponseDto<UserData>>(`${this.baseUrl}/users`);
  }

  updateUserData(user: UserData): Observable<ResponseDto<UserData>> {
    return this.http.put<ResponseDto<UserData>>(`${this.baseUrl}/users`, user);
  }

  updateCompanyLogo(file: File): Observable<ResponseDto<ImageDto>> {
    console.log(file);
    return this.http.post<ResponseDto<ImageDto>>(`${this.baseUrl}/files/pictures`, file);
  }
  
}
