import { AccountCategoryIsDto } from "./account-category-is.dto";

export interface FinancialStatementDetailsDto {
    accountCategory: AccountCategoryIsDto;
    description: string;
    totalAmountBs: number;

}