import {AttachmentDto} from "./attachment.dto";
import {TransactionDto} from "./transaction.dto";
import {DocumentTypeDto} from "./documentType.dto";

export interface TransactionJournalEntryDto {
    documentType: DocumentTypeDto;
    journalEntryNumber: number;
    gloss: string;
    description: string;
    transactionDate: Date;
    attachments: AttachmentDto[]
    transactionDetails: TransactionDto[];
}
