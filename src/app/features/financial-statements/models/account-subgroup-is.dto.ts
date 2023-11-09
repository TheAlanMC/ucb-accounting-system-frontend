import { AccountIsDto } from "./account.dto-is";

export interface AccountSubgroupIsDto {
    accountSubgroupCode: number;
    accountSubgroupId: number;
    accountSubgroupName: string;
    accounts: AccountIsDto[];
    totalAmountBs: number;
}