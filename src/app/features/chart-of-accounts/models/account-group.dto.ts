import { AccountSubgroupDto } from "./account-subgroup.dto";

export interface AccountGroupDto {
    accountGroupCode: number;
    accountGroupId: number;
    accountGroupName: string;
    accountSubgroups: AccountSubgroupDto[];
}