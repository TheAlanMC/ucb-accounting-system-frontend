import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportData } from 'src/app/features/reports/models/generated-reports.dto';
import { ResponseDto } from '../models/reponse.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AttachmentDownloadDto } from '../models/attachment-download.dto';

@Injectable({
  providedIn: 'root'
})
export class GeneratedReportsListService {

  baseUrl: string = `${environment.API_URL}/api/v1/reports/generated-reports/companies`;

  constructor(private http: HttpClient) { }

  public getGeneratedReports(companyId: number, dateFrom: string, dateTo: String, sortBy: string, sortType: string, page: number, size: number): Observable<ResponseDto<ReportData[]>>{
    return this.http.get<ResponseDto<ReportData[]>>(`${this.baseUrl}/${companyId}/pdf?dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&size=${size}&sortType=${sortType}&sortBy=${sortBy}`);
  }

  public getGeneratedReportsbyId(companyId: number, reportId: number): Observable<ResponseDto<AttachmentDownloadDto>>{
    return this.http.get<ResponseDto<AttachmentDownloadDto>>(`${this.baseUrl}/${companyId}/pdf/${reportId}`);
  }
  

  /*

  public getWorksheetReport(dateFrom: string, dateTo: String):  Observable<ResponseDto<WorksheetReportDto>>{
    console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<WorksheetReportDto>>(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }
  baseUrl: string = `${environment.API_URL}/api/v1/reports/journal-books/companies`;

  constructor(private http: HttpClient) { }
  
  public getJournalBookReport(companyId: number, dateFrom: string, dateTo: String):  Observable<ResponseDto<JournalBookDto>>{
    console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<JournalBookDto>>(`${this.baseUrl}/${companyId}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }

  public getJournalBookReportPdf(dateFrom: string, dateTo: String):  Observable<ResponseDto<AttachmentDto>>{
    console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<AttachmentDto>>(`${environment.API_URL}/api/v1/report/journal-book/companies/1?startDate=${dateFrom}&endDate=${dateTo}`);
  }
  */
}
