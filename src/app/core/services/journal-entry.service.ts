import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseDto } from '../models/reponse.dto';
import { JournalEntryDto } from 'src/app/features/journal-entry/models/journal-entry.dto';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  baseUrl: string = `${environment.API_URL}/api/v1/journal-entries/companies`;
  constructor(private http: HttpClient) { }

  // Create a journal entry
  public createJournalEntry(companyId: number, journalEntry: JournalEntryDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/${companyId}`, journalEntry);
  }
}
