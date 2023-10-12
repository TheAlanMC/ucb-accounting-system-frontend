import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ResponseDto } from '../models/reponse.dto';
import { AttachmentDto } from 'src/app/features/journal-entry/models/attachment.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  baseUrl: string = `${environment.API_URL}/api/v1/files/attachments/companies`;

  constructor(private http: HttpClient) { }

  // Upload a file
  public uploadFile(companyId: number, files: FormData): Observable<ResponseDto<AttachmentDto>>{
    return this.http.post<ResponseDto<AttachmentDto>>(`${this.baseUrl}/${companyId}`, files);
  }
}
