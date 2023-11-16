import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { AttachmentDto } from 'src/app/core/models/attachment.dto';
import { Observable } from 'rxjs';
import { AttachmentDownloadDto } from '../models/attachment-download.dto';
import { ImageDto } from '../models/image.dto';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  baseUrl: string = `${environment.API_URL}/api/v1/files`;

  constructor(private http: HttpClient) { }

  // Upload a file
  public uploadFile(companyId: number, files: FormData): Observable<ResponseDto<AttachmentDto>>{
    return this.http.post<ResponseDto<AttachmentDto>>(`${this.baseUrl}/attachments/companies/${companyId}`, files);
  }

  // Download a file
  public downloadFile(companyId: number, attachmentId: number): Observable<ResponseDto<AttachmentDownloadDto>>{
    return this.http.get<ResponseDto<AttachmentDownloadDto>>(`${this.baseUrl}/attachments/${attachmentId}/companies/${companyId}`);
  }

  //Upload a picture
  public uploadPicture(files: FormData): Observable<ResponseDto<ImageDto>>{
    return this.http.post<ResponseDto<ImageDto>>(`${this.baseUrl}/pictures`, files);
  }
}
