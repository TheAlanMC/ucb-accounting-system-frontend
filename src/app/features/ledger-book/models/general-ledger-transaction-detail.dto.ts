export interface GeneralLedgerTransactionDetailDto{
    balanceAmount: number;
    creditAmount: number;
    debitAmount: number;
    description: string;
    gloss: string;
    transactionDate: Date;
}