import {AccountCategoryIsDto} from "../../financial-statements/models/account-category-is.dto";
import {FinancialStatementDetailsDto} from "../../financial-statements/models/financial-statements-details.dto";

export interface OpeningBalanceDto {
  openingBalanceDate: Date;
  financialStatementReports: FinancialStatementDetailsDto[];
}

