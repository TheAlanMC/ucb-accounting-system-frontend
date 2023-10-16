import { AccountGroupDto } from "./account-group.dto";

export interface AccountCategoryDto {
    accountCategoryCode: number;
    accountCategoryId: number;
    accountCategoryName: string;
    accountGroups: AccountGroupDto[];
}