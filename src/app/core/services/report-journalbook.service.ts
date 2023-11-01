import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/reponse.dto';
import { JournalBookDto } from 'src/app/features/reports/components/journal-book-report/journal-book-report.component';
import { environment } from 'src/environments/environment';
import {AttachmentDto} from "../../features/transaction/models/attachment.dto";

@Injectable({
  providedIn: 'root'
})
export class ReportJournalbookService {

  baseUrl: string = `${environment.API_URL}/api/v1/reports/journal-books/companies`;

  constructor(private http: HttpClient) { }
  /*public getAllPaymentTypes(): Observable<ResponseDto<PaymentTypeDto[]>>{
    return this.http.get<ResponseDto<PaymentTypeDto[]>>(`${this.baseUrl}`);
  }*/
  public getJournalBookReport(companyId: number, dateFrom: string, dateTo: String):  Observable<ResponseDto<JournalBookDto>>{
    console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<JournalBookDto>>(`${this.baseUrl}/${companyId}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }

  public getJournalBookReportPdf(dateFrom: string, dateTo: String):  Observable<ResponseDto<AttachmentDto>>{
    console.log(`${this.baseUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return this.http.get<ResponseDto<AttachmentDto>>(`${environment.API_URL}/api/v1/report/journal-book/companies/1?startDate=${dateFrom}&endDate=${dateTo}`);
  }
}
