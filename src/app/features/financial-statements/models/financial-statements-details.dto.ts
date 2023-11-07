import { AccountCategoryIsDto } from "./account-category-is.dto";
import { AccountGroupIsDto } from "./account-group-is.dto";

export interface FinancialStatementDetailsDto {
    accountCategory: AccountCategoryIsDto;
    description: string;
    totalAmountBs: number;
}