import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { Observable } from 'rxjs';
import { WorksheetReportDto } from 'src/app/features/reports/models/worksheet-report.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportWorksheetService {

  baseUrl: string = `${environment.API_URL}/api/v1/reports/worksheets/companies/1`;
  constructor(private http: HttpClient) {

  }
  public getWorksheetReport(dateFrom: string, dateTo: String):  Observable<ResponseDto<WorksheetReportDto>>{
    console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<WorksheetReportDto>>(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }

  /*
   baseUrl: string = `${environment.API_URL}/api/v1/reports/journal-books/companies/1`;

  constructor(private http: HttpClient) { }
  /*public getAllPaymentTypes(): Observable<ResponseDto<PaymentTypeDto[]>>{
    return this.http.get<ResponseDto<PaymentTypeDto[]>>(`${this.baseUrl}`);
  }
  public getJournalBookReport(dateFrom: string, dateTo: String):  Observable<ResponseDto<JournalBookDto>>{
    console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<JournalBookDto>>(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }
  */
}
