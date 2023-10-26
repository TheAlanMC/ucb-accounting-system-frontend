import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TrialBalanceReportDto } from "src/app/features/reports/models/trial-balance-report.dto";
import { environment } from "src/environments/environment";
import { ResponseDto } from "../models/reponse.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ReportsService {
  
    baseUrl: string = `${environment.API_URL}/api/v1/reports/trial-balances/companies`;
  
    constructor(private http: HttpClient) { }
  
    // getTrialBalances
    public getTrialBalances(companyId: number, dateFrom: string, dateTo: string): Observable<ResponseDto<TrialBalanceReportDto>>{
      return this.http.get<ResponseDto<TrialBalanceReportDto>>(`${this.baseUrl}/${companyId}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  } 
}