import { AttachmentDto } from "../../../core/models/attachment.dto";
import { InvoiceDetailDto } from "./invoice-detail.dto";

export interface InvoiceDto{
    invoiceNumber: number;
    clientId: number;
    paymentTypeId: number;
    gloss: string;
    description: string;
    invoiceDate: Date;
    attachments: AttachmentDto[];
    invoiceDetails: InvoiceDetailDto[];
    taxTypeName: string | null;
}
