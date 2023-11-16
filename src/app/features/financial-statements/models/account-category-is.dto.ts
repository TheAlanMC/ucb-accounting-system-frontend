import { AccountGroupIsDto } from "./account-group-is.dto";

export interface AccountCategoryIsDto {
    accountCategoryCode: number;
    accountCategoryId: number;
    accountCategoryName: string;
    accountGroups: AccountGroupIsDto[];
    totalAmountBs: number;
}