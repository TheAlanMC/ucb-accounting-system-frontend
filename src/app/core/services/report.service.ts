import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubaccountDto } from "src/app/features/chart-of-accounts/models/subaccount.dto";
import { environment } from "src/environments/environment";
import { ResponseDto } from "../models/reponse.dto";

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    
    baseUrl: string = `${environment.API_URL}/api/v1/reports`;

    constructor(private http: HttpClient) { }

    // 

    // ================================LEDGER BOOK=========================================

    // Get general ledgers -TODO: Change any to GeneralLedgerDto
    public getGeneralLedgers(companyId: number): any {
        return this.http.get<any>(`${this.baseUrl}/general-ledgers/companies/${companyId}`);
    }

    // Get avaliable subaccounts
    public getLedgerBookSubaccounts(companyId: number, dateFrom: string, dateTo: string, sortBy: string, sortType: string): Observable<ResponseDto<SubaccountDto[]>> {
        return this.http.get<ResponseDto<SubaccountDto[]>>(`${this.baseUrl}/general-ledgers/companies/${companyId}/subaccounts?dateFrom=${dateFrom}&dateTo=${dateTo}&sortBy=${sortBy}&sortType=${sortType}`);
    }





}