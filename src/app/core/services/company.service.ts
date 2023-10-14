import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CompanyDto } from 'src/app/features/company/models/company.dto';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { CompanyAbstractDto } from 'src/app/features/company-registration/models/company-abstract.dto';
import { BusinessEntityDto } from 'src/app/features/company/models/business-entity.dto';
import { IndustryDto } from 'src/app/features/company/models/industry.dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl: string = `${environment.API_URL}/api/v1`;
  constructor(private http: HttpClient) { }

  //Recuperar informacion de compañia
  public getCompanyInfo(companyId: number): Observable<ResponseDto<CompanyDto>> {
    return this.http.get<ResponseDto<CompanyDto>>(`${this.baseUrl}/companies/${companyId}`);
  }

  //Create company
  public createCompany(company: CompanyAbstractDto): Observable<ResponseDto<String>> {
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/companies/`, company);
  }

  //Update company
  public updateCompany(company: CompanyAbstractDto, companyId: number): Observable<ResponseDto<CompanyDto>> {
    return this.http.put<ResponseDto<CompanyDto>>(`${this.baseUrl}//companies/${companyId}`, company);
  }

  // =================================== Register a company extras ===============================================
  // Get business entities
  public getBusinessEntities(): Observable<ResponseDto<BusinessEntityDto[]>> {
    return this.http.get<ResponseDto<BusinessEntityDto[]>>(`${this.baseUrl}/business-entities`);
  }

  // Get industries
  public getIndustries(): Observable<ResponseDto<IndustryDto[]>> {
    return this.http.get<ResponseDto<IndustryDto[]>>(`${this.baseUrl}/industries`);
  }
  


}
