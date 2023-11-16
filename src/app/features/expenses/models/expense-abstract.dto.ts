import { SupplierAbstractDto } from './supplier-abstract.dto';
import { TransactionTypeDto } from './transaction-type.dto';
export interface ExpenseAbstractDto {
    expenseTransactionId: number;
    expenseTransactionNumber: number;
    expenseTransactionDate: Date;
    supplier: SupplierAbstractDto;
    totalAmountBs: number;
    gloss: string;
    expenseTransactionAccepted: boolean;
    transactionType: TransactionTypeDto;
}
