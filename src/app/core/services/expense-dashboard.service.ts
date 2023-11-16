import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ResponseDto } from "../models/reponse.dto";
import { SaleAbstractDto } from "src/app/features/sales/models/sale-abstract.dto";
import { Observable } from "rxjs";
import { SaleDashboardDto } from "src/app/features/home-page/models/carousel/sale-dashboard.dto";

@Injectable({
    providedIn: 'root'
  })
  export class ExpenseDashboardService {
  
    baseUrl: string = `${environment.API_URL}/api/v1/expense-dashboards/companies`;
  
    constructor(private http: HttpClient) { }
  
    // Get all sales
    public getExpenseDashboardDataBySubaccount(companyId: number, dateFrom: string, dateTo: string): Observable<ResponseDto<SaleDashboardDto>>{
      return this.http.get<ResponseDto<SaleDashboardDto>>(`${this.baseUrl}/${companyId}/subaccounts?dateTo=${dateTo}&dateFrom=${dateFrom}`);
}
public getExpenseDashboardDataBySupplier(companyId: number, dateFrom: string, dateTo: string): Observable<ResponseDto<SaleDashboardDto>>{
  return this.http.get<ResponseDto<SaleDashboardDto>>(`${this.baseUrl}/${companyId}/suppliers?dateTo=${dateTo}&dateFrom=${dateFrom}`);
}
  }