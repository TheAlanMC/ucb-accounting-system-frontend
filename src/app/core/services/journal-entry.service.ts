import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { JournalEntryDto } from 'src/app/features/journal-entry/models/journal-entry.dto';
import { DocumentTypeDto } from 'src/app/features/journal-entry/models/document-type.dto';
import {TransactionJournalEntryDto} from "../../features/journal-entry/models/transaction-journal-entry.dto";
import { TransactionDto } from 'src/app/features/journal-entry/models/transaction.dto';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  baseUrl: string = `${environment.API_URL}/api/v1/journal-entries`;
  constructor(private http: HttpClient) { }

  // Create a journal entry
  public createJournalEntry(companyId: number, journalEntry: JournalEntryDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/companies/${companyId}`, journalEntry);
  }

  // Get last journal entry number
  public getLastJournalEntryNumber(companyId: number): Observable<ResponseDto<number>>{
    return this.http.get<ResponseDto<number>>(`${this.baseUrl}/last-numbers/companies/${companyId}`);
  }

  // Get journal entry by id
  public getJournalEntryById(companyId: number, journalEntryId: number): Observable<ResponseDto<TransactionJournalEntryDto>>{
    return this.http.get<ResponseDto<TransactionJournalEntryDto>>(`${this.baseUrl}/${journalEntryId}/companies/${companyId}`);
  }

  // Get all journal entries (transactions) by company id
  public getAllTransactions(companyId: number): Observable<ResponseDto<TransactionDto[]>>{
    return this.http.get<ResponseDto<TransactionDto[]>>(`${this.baseUrl}/companies/${companyId}/transactions`);
  }

}
