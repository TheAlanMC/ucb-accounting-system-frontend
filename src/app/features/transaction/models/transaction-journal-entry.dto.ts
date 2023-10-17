import {ClientDto} from "./client.dto";
import {DocumentTypeDto} from "./document-type.dto";
import {TransactionTypeDto} from "./transaction-type.dto";
import {AttachmentDto} from "./attachment.dto";
import {TransactionDetailDto} from "./transaction-detail.dto";


export interface TransactionJournalEntryDto {
  journalEntryId:      number;
  transactionNumber:   number;
  client:              ClientDto;
  transactionAccepted: boolean;
  documentType:        DocumentTypeDto;
  transactionType:     TransactionTypeDto;
  gloss:               string;
  description:         string;
  transactionDate:     Date;
  attachments:         AttachmentDto[];
  transactionDetails:  TransactionDetailDto[];

}


