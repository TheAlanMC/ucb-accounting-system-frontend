import { AccountCategoryIsDto } from "./account-category-is.dto";
import { FinancialStatementDetailsDto } from "./financial-statements-details.dto";

export interface IncomeStatemetsReportDataDto{
    description: string;
    financialStatementDetails: FinancialStatementDetailsDto[];
    totalAmountBs: number;
}