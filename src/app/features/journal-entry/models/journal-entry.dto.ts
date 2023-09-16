import { AttachmentDto } from "./attachment.dto";
import { TransactionDto } from "./transaction.dto";

export interface JournalEntryDto {
    documentTypeId: number;
    journalEntryNumber: number;
    gloss: string;
    description: string;
    transactionDate: Date;
    attachments: AttachmentDto[];
    transactionDetails: TransactionDto[];
}