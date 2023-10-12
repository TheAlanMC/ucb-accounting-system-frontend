import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ResponseDto } from '../models/reponse.dto';
import { CustomerDto } from 'src/app/features/sales/models/customer.dto';
import { Observable } from 'rxjs';
import { CustomerAbstractDto } from 'src/app/features/sales/models/customer.-abstract.dto';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl: string = `${environment.API_URL}/api/v1/customers`;

  constructor(private http: HttpClient) { }

  //Create a new customer
  public createCustomer(companyId: number, customer: CustomerDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/companies/${companyId}`, customer);
  }

  //Get all the customers by company id
  public getAllCustomers(companyId: number): Observable<ResponseDto<CustomerAbstractDto[]>>{
    return this.http.get<ResponseDto<CustomerAbstractDto[]>>(`${this.baseUrl}/companies/${companyId}`);
  }

  //Get a customer by id, and company id
  public getCustomerById(companyId: number, customerId: number): Observable<ResponseDto<CustomerDto>>{
    return this.http.get<ResponseDto<CustomerDto>>(`${this.baseUrl}/${customerId}/companies/${companyId}`);
  }

  //Update a customer by id, and company id
  public updateCustomer(companyId: number, customerId: number, customer: CustomerDto): Observable<ResponseDto<CustomerDto>>{
    return this.http.put<ResponseDto<CustomerDto>>(`${this.baseUrl}/${customerId}/companies/${companyId}`, customer);
  }
  
}
