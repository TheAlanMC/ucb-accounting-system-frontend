import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubaccountDto } from "src/app/features/chart-of-accounts/models/subaccount.dto";
import { environment } from "src/environments/environment";
import { ResponseDto } from "../models/reponse.dto";
import { GeneralLedgerReportDto } from "src/app/features/ledger-book/models/general-ledger-report.dto";
import {JournalBookDto} from "../../features/reports/components/journal-book-report/journal-book-report.component";
import {AttachmentDto} from "../../features/transaction/models/attachment.dto";
import {TrialBalanceReportDto} from "../../features/reports/models/trial-balance-report.dto";
import {WorksheetReportDto} from "../../features/reports/models/worksheet-report.dto";

@Injectable({
    providedIn: 'root'
})

export class ReportService {

    baseUrl: string = `${environment.API_URL}/api/v1/reports`;

    constructor(private http: HttpClient) { }

    // ================================JOURNAL BOOK=========================================
    // Get journal book
    public getJournalBookReport(companyId: number, dateFrom: string, dateTo: String):  Observable<ResponseDto<JournalBookDto>>{
      // console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
      return this.http.get<ResponseDto<JournalBookDto>>(`${this.baseUrl}/journal-books/companies/${companyId}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    }

    public getJournalBookReportPdf(companyId: number, dateFrom: string, dateTo: String):  Observable<ResponseDto<AttachmentDto>>{
      return this.http.get<ResponseDto<AttachmentDto>>(`${this.baseUrl}/journal-books/companies/${companyId}/pdf?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    }


    // ================================LEDGER BOOK=========================================

    public getGeneralLedgers(companyId: number,dateFrom: string, dateTo: string, sortBy: string, sortType: string, subaccountIds: string[]  ): Observable<ResponseDto<GeneralLedgerReportDto>> {
        // const subaccountIdsParam = subaccountIds.join(','); // Convierte la lista en una cadena separada por comas
        return this.http.get<ResponseDto<GeneralLedgerReportDto>>(`${this.baseUrl}/general-ledgers/companies/${companyId}?dateFrom=${dateFrom}&dateTo=${dateTo}&sortBy=${sortBy}&sortType=${sortType}&subaccountIds=${subaccountIds}`);
    }

    public getGeneralLedgersPdf(companyId: number,dateFrom: string, dateTo: string, sortBy: string, sortType: string, subaccountIds: string[]  ): Observable<ResponseDto<AttachmentDto>> {
      // const subaccountIdsParam = subaccountIds.join(','); // Convierte la lista en una cadena separada por comas
      return this.http.get<ResponseDto<AttachmentDto>>(`${this.baseUrl}/general-ledgers/companies/${companyId}/pdf?dateFrom=${dateFrom}&dateTo=${dateTo}&sortBy=${sortBy}&sortType=${sortType}&subaccountIds=${subaccountIds}`);
    }

    // Get avaliable subaccounts
    public getLedgerBookSubaccounts(companyId: number, dateFrom: string, dateTo: string, sortBy: string, sortType: string): Observable<ResponseDto<SubaccountDto[]>> {
        return this.http.get<ResponseDto<SubaccountDto[]>>(`${this.baseUrl}/general-ledgers/companies/${companyId}/subaccounts?dateFrom=${dateFrom}&dateTo=${dateTo}&sortBy=${sortBy}&sortType=${sortType}`);
    }

    // ================================TRIAL BALANCE=========================================
    // Get trial balance
    public getTrialBalances(companyId: number, dateFrom: string, dateTo: string): Observable<ResponseDto<TrialBalanceReportDto>>{
      return this.http.get<ResponseDto<TrialBalanceReportDto>>(`${this.baseUrl}/trial-balances/companies/${companyId}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    }

    public getTrialBalancesPdf(companyId: number, dateFrom: string, dateTo: string): Observable<ResponseDto<AttachmentDto>>{
      return this.http.get<ResponseDto<AttachmentDto>>(`${this.baseUrl}/trial-balances/companies/${companyId}/pdf?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    }

    // ================================WORKSHEET=========================================
    // Get worksheet
  public getWorksheetReport(companyId: number, dateFrom: string, dateTo: String):  Observable<ResponseDto<WorksheetReportDto>>{
    // console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<WorksheetReportDto>>(`${this.baseUrl}/worksheets/companies/${companyId}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }

  public getWorksheetReportPdf(companyId: number, dateFrom: string, dateTo: String):  Observable<ResponseDto<AttachmentDto>>{
    return this.http.get<ResponseDto<AttachmentDto>>(`${this.baseUrl}/worksheets/companies/${companyId}/pdf?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }

}
