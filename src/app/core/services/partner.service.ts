import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ResponseDto} from "../models/reponse.dto";
import {PartnerDto} from "../../features/journal-entry/models/partner.dto";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  baseUrl: string = `${environment.API_URL}/api/v1/partners`;
  constructor(private http: HttpClient) { }

  // Get all partenrs
  public getAllPartners(companyId: number): Observable<ResponseDto<PartnerDto>>{
    return this.http.get<ResponseDto<PartnerDto>>(`${this.baseUrl}/companies/${companyId}`);
  }
}
