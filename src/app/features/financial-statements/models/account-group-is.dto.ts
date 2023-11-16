import { AccountSubgroupIsDto } from "./account-subgroup-is.dto";

export interface AccountGroupIsDto {
    accountGroupCode: number;
    accountGroupId: number;
    accountGroupName: string;
    accountSubgroups: AccountSubgroupIsDto[];
    totalAmountBs: number;
}