import { SubaccountDto } from "../../sales/models/subaccount.dto";

export interface TrialBalanceDetailsDto{
    balanceCreditor: number,
balanceDebtor: number,
creditAmount: number,
debitAmount: number,
subaccount: SubaccountDto
}