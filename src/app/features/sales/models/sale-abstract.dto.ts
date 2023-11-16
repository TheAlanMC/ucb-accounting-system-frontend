import { CustomerAbstractDto } from './customer.-abstract.dto';
import { TransactionTypeDto } from './transaction-type.dto';
export interface SaleAbstractDto {
    saleTransactionId: number;
    saleTransactionNumber: number;
    saleTransactionDate: Date;
    customer: CustomerAbstractDto;
    totalAmountBs: number;
    gloss: string;
    saleTransactionAccepted: boolean;
    transactionType: TransactionTypeDto;
}