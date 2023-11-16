import { CompanyDto } from "../../company/models/company.dto";
import { CurrencyTypeDto } from "./currency-type.dto";
import { TrialBalanceReportDataDto } from "./trial-balance-report-data.dto";

export interface  TrialBalanceReportDto {
    company:CompanyDto;
    currencyType: CurrencyTypeDto;
    startDate: Date;
    endDate: Date;
    reportData: TrialBalanceReportDataDto[];
}