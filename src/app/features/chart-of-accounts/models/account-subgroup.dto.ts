import { AccountDto } from "./account.dto";

export interface AccountSubgroupDto {
    accountSubgroupCode: number;
    accountSubgroupId: number;
    accountSubgroupName: string;
    accounts: AccountDto[];
}