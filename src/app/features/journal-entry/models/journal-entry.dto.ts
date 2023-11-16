import { AttachmentDto } from "../../../core/models/attachment.dto";
import { TransactionDetailDto } from "./transaction-detail.dto";

export interface JournalEntryDto {
    documentTypeId: number;
    journalEntryNumber: number;
    gloss: string;
    description: string;
    transactionDate: Date;
    attachments: AttachmentDto[];
    transactionDetails: TransactionDetailDto[];
}