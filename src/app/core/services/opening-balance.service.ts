import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ResponseDto } from "../models/reponse.dto";
import { Observable } from "rxjs";
import { FinancialStatementDetailsDto } from "src/app/features/financial-statements/models/financial-statements-details.dto";

@Injectable({
    providedIn: 'root'
  })
  export class OpeningBalaceService {
    baseUrl: string = `${environment.API_URL}/api/v1/opening-balances`;
    constructor(private http: HttpClient) { }
  
    // Get opening balance
    public getOpeningBalance(companyId: number): Observable<ResponseDto<FinancialStatementDetailsDto[]>>{
      return this.http.get<ResponseDto<FinancialStatementDetailsDto[]>>(`${this.baseUrl}/companies/${companyId}`);
    }
    // Create opening balance
    public createOpeningBalance(companyId: number, financialStatements: FinancialStatementDetailsDto[]): Observable<ResponseDto<string>>{
      return this.http.post<ResponseDto<string>>(`${this.baseUrl}/companies/${companyId}`, financialStatements);
    }
}