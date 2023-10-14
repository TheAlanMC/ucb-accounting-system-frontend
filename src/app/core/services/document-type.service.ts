import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { Observable } from 'rxjs';
import { DocumentTypeDto } from 'src/app/features/journal-entry/models/document-type.dto';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  baseUrl: string = `${environment.API_URL}/api/v1/document-types`;
  
  constructor(private http: HttpClient) { }

  // Get document types
  public getDocumentTypes(): Observable<ResponseDto<DocumentTypeDto[]>>{
    return this.http.get<ResponseDto<DocumentTypeDto[]>>(`${this.baseUrl}`);
  }
}
