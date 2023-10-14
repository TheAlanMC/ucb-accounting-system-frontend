import {AttachmentDto} from "../../../core/models/attachment.dto";
import {TransactionDetailDto} from "./transaction-detail.dto";
import {DocumentTypeDto} from "./document-type.dto";

export interface TransactionJournalEntryDto {
    documentType: DocumentTypeDto;
    journalEntryNumber: number;
    gloss: string;
    description: string;
    transactionDate: Date;
    attachments: AttachmentDto[]
    transactionDetails: TransactionDetailDto[];
}
