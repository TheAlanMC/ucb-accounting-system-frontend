import { CompanyDto } from "../../company/models/company.dto";
import { CurrencyTypeDto } from "../../ledger-book/models/currency-type.dto";
import { IncomeStatemetsReportDataDto } from "./income-statements-report-data.dto";


export interface IncomeStatementsReportDto {
    company:CompanyDto;
    currencyType: CurrencyTypeDto;
    startDate: Date;
    endDate: Date;
    reportData: IncomeStatemetsReportDataDto;

}