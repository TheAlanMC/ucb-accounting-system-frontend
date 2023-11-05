import { SubaccountIsDto } from "./subaccount.dto";

export interface AccountIsDto {
    accountCode: number;
    accountId: number;
    accountName: string;
    subaccounts: SubaccountIsDto[];
    totalAmountBs: number;
}