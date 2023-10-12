import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CompanyData } from 'src/app/features/user-accounts/models/CompanyData.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  baseUrl: string = `${environment.API_URL}/api/v1`;
  constructor(private http: HttpClient) { }

  //Recuperar informacion de compañia
  public getCompanyInfo(companyId: number): Observable<CompanyData> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<any>(`${this.baseUrl}/companies/${companyId}`).pipe(
      map((response: any) => response.data as CompanyData)
    );
  }

  public updateCompanyInfo(companyData: CompanyData, companyId: number): Observable<HttpResponse<CompanyData>> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.put<CompanyData>(`${this.baseUrl}/companies/${companyId}`, companyData, { observe: 'response' });
  }

  // Subir imagen de compañia
  public uploadCompanyLogo(file: File): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/files/pictures`, formData, { observe: 'response' });
  }


}
