import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ResponseDto } from '../models/reponse.dto';
import { PaymentTypeDto } from '../models/payment-type.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  baseUrl: string = `${environment.API_URL}/api/v1/payment-types`;

  constructor(private http: HttpClient) { }

  // Get all payment types
  public getAllPaymentTypes(): Observable<ResponseDto<PaymentTypeDto[]>>{
    return this.http.get<ResponseDto<PaymentTypeDto[]>>(`${this.baseUrl}`);
  }

}
