import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountCategoryDto } from 'src/app/features/chart-of-accounts/models/account-category.dto';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/reponse.dto';
import { AccountGroupDto } from 'src/app/features/chart-of-accounts/models/account-group.dto';
import { AccountSubgroupDto } from 'src/app/features/chart-of-accounts/models/account-subgroup.dto';
import { AccountDto } from 'src/app/features/chart-of-accounts/models/account.dto';
import { SubaccountDto } from 'src/app/features/sales/models/subaccount.dto';
import { AccountGroupPartialDto } from 'src/app/features/chart-of-accounts/models/account-group-partial.dto';
import { AccountSubgroupPartialDto } from 'src/app/features/chart-of-accounts/models/account-subgroup-partial.dto';
import { AccountPartialDto } from 'src/app/features/chart-of-accounts/models/account-partial.dto';
import { SubaccountPartialDto } from 'src/app/features/chart-of-accounts/models/subaccount-partial.dto';

@Injectable({
  providedIn: 'root'
})
export class AccountPlanService {

  baseUrl: string = `${environment.API_URL}/api/v1`;
  constructor(private http: HttpClient) { }

  //Get account plan
  public getAccountPlan(companyId: number): Observable<ResponseDto<AccountCategoryDto[]>> {
    return this.http.get<ResponseDto<AccountCategoryDto[]>>(`${this.baseUrl}/accounting-plans/companies/${companyId}`);
  }

  //============================================ACCOUNT GROUP========================================================
  //Create account group
  public createAccountGroup(companyId: number, accountGroup: AccountGroupPartialDto): Observable<ResponseDto<String>> {
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/account-groups/companies/${companyId}`, accountGroup);
  }

  //Get account group
  public getAccountGroup(companyId: number, accountGroupId: number): Observable<ResponseDto<AccountGroupPartialDto>> {
    return this.http.get<ResponseDto<AccountGroupPartialDto>>(`${this.baseUrl}/account-groups/${accountGroupId}/companies/${companyId}`);
  }

  //Update account group
  public updateAccountGroup(companyId: number, accountGroupId: number, accountGroup: AccountGroupPartialDto): Observable<ResponseDto<AccountGroupPartialDto>> {
    return this.http.put<ResponseDto<AccountGroupPartialDto>>(`${this.baseUrl}/account-groups/${accountGroupId}/companies/${companyId}`, accountGroup);
  }

  //Get all account groups
  public getAllAccountGroups(companyId: number): Observable<ResponseDto<AccountGroupPartialDto[]>> {
    return this.http.get<ResponseDto<AccountGroupPartialDto[]>>(`${this.baseUrl}/account-groups/companies/${companyId}`);
  }


  //============================================ACCOUNT SUBGROUP========================================================
  //Create account subgroup
  public createAccountSubgroup(companyId: number, accountSubgroup: AccountSubgroupPartialDto): Observable<ResponseDto<String>> {
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/account-subgroups/companies/${companyId}`, accountSubgroup);
  }

  //Get account subgroup
  public getAccountSubgroup(companyId: number, accountSubgroupId: number): Observable<ResponseDto<AccountSubgroupPartialDto>> {
    return this.http.get<ResponseDto<AccountSubgroupPartialDto>>(`${this.baseUrl}/account-subgroups/${accountSubgroupId}/companies/${companyId}`);
  }

  //Update account subgroup
  public updateAccountSubgroup(companyId: number, accountSubgroupId: number, accountSubgroup: AccountSubgroupPartialDto): Observable<ResponseDto<AccountSubgroupPartialDto>> {
    return this.http.put<ResponseDto<AccountSubgroupPartialDto>>(`${this.baseUrl}/account-subgroups/${accountSubgroupId}/companies/${companyId}`, accountSubgroup);
  }

  //Get all account subgroups
  public getAllAccountSubgroups(companyId: number): Observable<ResponseDto<AccountSubgroupPartialDto[]>> {
    return this.http.get<ResponseDto<AccountSubgroupPartialDto[]>>(`${this.baseUrl}/account-subgroups/companies/${companyId}`);
  }


  //============================================ACCOUNT========================================================
  //Create account
  public createAccount(companyId: number, account: AccountPartialDto): Observable<ResponseDto<String>> {
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/accounts/companies/${companyId}`, account);
  }

  //Get account
  public getAccount(companyId: number, accountId: number): Observable<ResponseDto<AccountPartialDto>> {
    return this.http.get<ResponseDto<AccountPartialDto>>(`${this.baseUrl}/accounts/${accountId}/companies/${companyId}`);
  }

  //Update account
  public updateAccount(companyId: number, accountId: number, account: AccountPartialDto): Observable<ResponseDto<AccountPartialDto>> {
    return this.http.put<ResponseDto<AccountPartialDto>>(`${this.baseUrl}/accounts/${accountId}/companies/${companyId}`, account);
  }

  //Get all accounts
  public getAllAccounts(companyId: number): Observable<ResponseDto<AccountPartialDto[]>> {
    return this.http.get<ResponseDto<AccountPartialDto[]>>(`${this.baseUrl}/accounts/companies/${companyId}`);
  }

  //=======================================SUBACCOUNT========================================================
  //Create subaccount
  public createSubaccount(companyId: number, subaccount: SubaccountPartialDto): Observable<ResponseDto<String>> {
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/subaccounts/companies/${companyId}`, subaccount);
  }

  //Get subaccount
  public getSubaccount(companyId: number, subaccountId: number): Observable<ResponseDto<SubaccountPartialDto>> {
    return this.http.get<ResponseDto<SubaccountPartialDto>>(`${this.baseUrl}/subaccounts/${subaccountId}/companies/${companyId}`);
  }

  //Update subaccount
  public updateSubaccount(companyId: number, subaccountId: number, subaccount: SubaccountPartialDto): Observable<ResponseDto<SubaccountPartialDto>> {
    return this.http.put<ResponseDto<SubaccountPartialDto>>(`${this.baseUrl}/subaccounts/${subaccountId}/companies/${companyId}`, subaccount);
  }

  //Get all subaccounts
  public getAllSubaccounts(companyId: number): Observable<ResponseDto<SubaccountPartialDto[]>> {
    return this.http.get<ResponseDto<SubaccountPartialDto[]>>(`${this.baseUrl}/subaccounts/companies/${companyId}`);
  }

}
