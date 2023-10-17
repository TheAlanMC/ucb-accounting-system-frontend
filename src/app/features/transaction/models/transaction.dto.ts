import {ClientDto} from "./client.dto";
import {DocumentTypeDto} from "./document-type.dto";
import {TransactionTypeDto} from "./transaction-type.dto";

export interface TransactionDto {
  journalEntryId:      number;
  transactionNumber:   number;
  client:              ClientDto;
  transactionAccepted: boolean;
  documentType:        DocumentTypeDto;
  transactionType:     TransactionTypeDto;
  totalAmountBs:       number;
  creationDate:        Date;
  transactionDate:     Date;
  description:         string;
}





