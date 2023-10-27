import { TrialBalanceDetailsDto } from "./trial-balance-details.dto";

export interface TrialBalanceReportDataDto{
    totalBalanceCreditor: number,
    totalBalanceDebtor: number,
    totalCreditAmount: number,
    totalDebitAmount: number,
    trialBalanceDetails: TrialBalanceDetailsDto[]
}