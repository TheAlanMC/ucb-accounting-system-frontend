import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { SaleAbstractDto } from 'src/app/features/sales/models/sale-abstract.dto';
import { SubaccountDto } from 'src/app/features/sales/models/subaccount.dto';
import { InvoiceDto } from 'src/app/features/sales/models/invoice.dto';
import { PaymentDto } from 'src/app/features/sales/models/payment.dto';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  baseUrl: string = `${environment.API_URL}/api/v1/sale-transactions`;

  constructor(private http: HttpClient) { }

  // Get all sales
  public getAllSales(companyId: number): Observable<ResponseDto<SaleAbstractDto[]>>{
    return this.http.get<ResponseDto<SaleAbstractDto[]>>(`${this.baseUrl}/companies/${companyId}`);
  }


  //==============================Invoices===================================

  //Get all the subaccount by company id and focused on sale transacctions
  public getInvoiceSubaccounts(companyId: number): Observable<ResponseDto<SubaccountDto[]>>{
    return this.http.get<ResponseDto<SubaccountDto[]>>(`${this.baseUrl}/invoices/companies/${companyId}/subaccounts`);
  }

  // Register a new sale transaction (invoice), including the transaction info and transaction details
  public createInvoice(companyId: number, sale: InvoiceDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/invoices/companies/${companyId}`, sale);
  }

  //Get last sale number
  public getLastInvoiceNumber(companyId: number): Observable<ResponseDto<number>>{
    return this.http.get<ResponseDto<number>>(`${this.baseUrl}/invoices/last-numbers/companies/${companyId}`);
  }

  //==============================Sale Payments===================================

  //Create a payment sale transaction
  public createPaymentSale(companyId: number, paymentSale: PaymentDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/payments/companies/${companyId}`, paymentSale);
  }
 
  //Get payment subaccounts
  public getPaymentSubaccounts(companyId: number): Observable<ResponseDto<SubaccountDto[]>>{
    return this.http.get<ResponseDto<SubaccountDto[]>>(`${this.baseUrl}/payments/companies/${companyId}/subaccounts`);
  }

  //Get last payment number
  public getLastPaymentNumber(companyId: number): Observable<ResponseDto<number>>{
    return this.http.get<ResponseDto<number>>(`${this.baseUrl}/payments/last-numbers/companies/${companyId}`);
  }

}
