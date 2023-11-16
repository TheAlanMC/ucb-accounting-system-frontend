import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../models/reponse.dto";
import {PaymentTypeDto} from "../models/payment-type.dto";
import {TransactionTypeDto} from "../../features/sales/models/transaction-type.dto";

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {
  baseUrl: string = `${environment.API_URL}/api/v1/transaction-types`;

  constructor(private http: HttpClient) { }

  // Get all transaction types
  public getAllTransactionTypes(): Observable<ResponseDto<TransactionTypeDto[]>>{
    return this.http.get<ResponseDto<TransactionTypeDto[]>>(`${this.baseUrl}`);
  }

}
