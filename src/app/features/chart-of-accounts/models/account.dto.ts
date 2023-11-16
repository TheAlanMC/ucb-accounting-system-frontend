import { SubaccountDto } from "./subaccount.dto";

export interface AccountDto {
    accountCode: number;
    accountId: number;
    accountName: string;
    subaccounts: SubaccountDto[];
}