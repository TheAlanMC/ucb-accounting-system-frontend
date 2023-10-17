import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { SubaccountDto } from 'src/app/features/expenses/models/subaccount.dto';
import { InvoiceDto } from 'src/app/features/expenses/models/invoice.dto';
import { PaymentDto } from 'src/app/features/expenses/models/payment.dto';
import {ExpenseAbstractDto} from "../../features/expenses/models/expense-abstract.dto";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  baseUrl: string = `${environment.API_URL}/api/v1/expense-transactions`;

  constructor(private http: HttpClient) { }

  // Get all expenses
  public getAllExpenses(companyId: number, sortBy: string, sortType: string, page: number, size: number, filterDate: string, filterSupplier: string[], filterDocumentType: string) : Observable<ResponseDto<ExpenseAbstractDto[]>>{;
    return this.http.get<ResponseDto<ExpenseAbstractDto[]>>(`${this.baseUrl}/companies/${companyId}?sortBy=${sortBy}&sortType=${sortType}&page=${page}&size=${size}&creationDate=${filterDate}&suppliers=${filterSupplier}&transactionType=${filterDocumentType}`);
  }


  //==============================Invoices===================================

  //Get all the subaccount by company id and focused on expense transacctions
  public getInvoiceSubaccounts(companyId: number): Observable<ResponseDto<SubaccountDto[]>>{
    return this.http.get<ResponseDto<SubaccountDto[]>>(`${this.baseUrl}/invoices/companies/${companyId}/subaccounts`);
  }

  // Register a new expense transaction (invoice), including the transaction info and transaction details
  public createInvoice(companyId: number, expense: InvoiceDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/invoices/companies/${companyId}`, expense);
  }

  //Get last expense number
  public getLastInvoiceNumber(companyId: number): Observable<ResponseDto<number>>{
    return this.http.get<ResponseDto<number>>(`${this.baseUrl}/invoices/last-numbers/companies/${companyId}`);
  }

  //==============================Expense Payments===================================

  //Create a payment expense transaction
  public createPaymentExpense(companyId: number, paymentExpense: PaymentDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/payments/companies/${companyId}`, paymentExpense);
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
