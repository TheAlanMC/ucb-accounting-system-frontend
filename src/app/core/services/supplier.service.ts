import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SupplierDto} from "../../features/expenses/models/supplier.dto";
import {Observable} from "rxjs";
import {ResponseDto} from "../models/reponse.dto";
import {SupplierAbstractDto} from "../../features/expenses/models/supplier-abstract.dto";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl: string = `${environment.API_URL}/api/v1/suppliers`;

  constructor(private http: HttpClient) { }

  //Create a new supplier
  public createSupplier(companyId: number, supplier: SupplierDto): Observable<ResponseDto<String>>{
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/companies/${companyId}`, supplier);
  }

  //Get all the suppliers by company id
  public getAllSuppliers(companyId: number, sortBy: string = 'supplierId', sortType: string = 'asc', page: number = 0, size: number = 100): Observable<ResponseDto<SupplierAbstractDto[]>>{
    return this.http.get<ResponseDto<SupplierAbstractDto[]>>(`${this.baseUrl}/companies/${companyId}?sortBy=${sortBy}&sortType=${sortType}&page=${page}&size=${size}`);
  }

  //Get a supplier by id, and company id
  public getSupplierById(companyId: number, supplierId: number): Observable<ResponseDto<SupplierDto>>{
    return this.http.get<ResponseDto<SupplierDto>>(`${this.baseUrl}/${supplierId}/companies/${companyId}`);
  }

  //Update a supplier by id, and company id
  public updateSupplier(companyId: number, supplierId: number, supplier: SupplierDto): Observable<ResponseDto<SupplierDto>>{
    return this.http.put<ResponseDto<SupplierDto>>(`${this.baseUrl}/${supplierId}/companies/${companyId}`, supplier);
  }

}
