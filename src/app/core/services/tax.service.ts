import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubaccountTaxTypeAbstractDto } from 'src/app/features/taxes/models/subaccount-tax-type-abstract.dto';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { Observable } from 'rxjs';
import { SubaccountTaxTypeDto } from 'src/app/features/taxes/models/subaccount-tax-type.dto';
import { TaxTypeDto } from 'src/app/features/taxes/models/tax-type.dto';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  baseUrl: string = `${environment.API_URL}/api/v1/taxes`;

  constructor(private http: HttpClient) { }

  // getSubaccountTaxTypes
  public getSubaccountTaxTypes(companyId: number): Observable<ResponseDto<SubaccountTaxTypeAbstractDto[]>>{
    return this.http.get<ResponseDto<SubaccountTaxTypeAbstractDto[]>>(`${this.baseUrl}/companies/${companyId}`);
  }

  // updateSubaccountTaxTypeRate

  public updateSubaccountTaxTypeRate (companyId: number, subbacount: SubaccountTaxTypeDto): Observable<ResponseDto<TaxTypeDto>>{
    return this.http.put<ResponseDto<TaxTypeDto>>(`${this.baseUrl}/companies/${companyId}`, subbacount);
  }


} 
