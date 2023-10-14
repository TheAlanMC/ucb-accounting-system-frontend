import { TransactionTypeDto } from "../../sales/models/transaction-type.dto";
import { ClientDto } from "./client.dto";
import { DocumentTypeDto } from "./document-type.dto";

export interface TransactionDto{
    client: ClientDto;
    documentTypeDto: DocumentTypeDto;
    gloss: string;
    journalEntryId: number;
    totalAmountBs: number;
    transactionAccepted: boolean;
    transactionDate: Date;
    transactionId: number;
    transactionNumber: number;
    transactionType: TransactionTypeDto;

}