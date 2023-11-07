import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ResponseDto } from "../models/reponse.dto";
import { SaleAbstractDto } from "src/app/features/sales/models/sale-abstract.dto";
import { Observable } from "rxjs";
import { SaleDashboardDto } from "src/app/features/home-page/models/carousel/sale-dashboard.dto";
import { ExpenseSalesDashboardDto } from "src/app/features/home-page/models/carousel/expenses-sales-dashboard.dto";

@Injectable({
    providedIn: 'root'
  })
  export class ExpensesSalesDashboardService {
  
    baseUrl: string = `${environment.API_URL}/api/v1/expense-sale-dashboards/companies`;
  
    constructor(private http: HttpClient) { }
  
    // Get all sales
    public getExpensesSales(companyId: number, dateFrom: string, dateTo: string): Observable<ResponseDto<ExpenseSalesDashboardDto>>{
      return this.http.get<ResponseDto<ExpenseSalesDashboardDto>>(`${this.baseUrl}/${companyId}?dateTo=${dateTo}&dateFrom=${dateFrom}`);
}
  }