import {SubaccountDto} from "./subaccount.dto";

export interface TransactionDetailDto {
  subaccount:     SubaccountDto;
  debitAmountBs:  number;
  creditAmountBs: number;
}
