import { CompanyDto } from "../../company/models/company.dto";
import { CurrencyTypeDto } from "./currency-type.dto";
import { GeneralLedgerReportDataDto } from "./general-ledger-report-data.dto";

export interface GeneralLedgerReportDto {
    company:CompanyDto;
    currencyType: CurrencyTypeDto;
    startDate: Date;
    endDate: Date;
    reportData: GeneralLedgerReportDataDto[];

}