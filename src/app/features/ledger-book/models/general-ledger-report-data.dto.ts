import { SubaccountDto } from "../../chart-of-accounts/models/subaccount.dto";
import { GeneralLedgerTransactionDetailDto } from "./general-ledger-transaction-detail.dto";

export interface GeneralLedgerReportDataDto{
    subaccount: SubaccountDto;
    totalBalanceAmount: number;
    totalCreditAmount: number;
    totalDebitAmount: number;
    transactionDetails: GeneralLedgerTransactionDetailDto[];
}