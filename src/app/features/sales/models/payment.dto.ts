import { AttachmentDto } from "../../../core/models/attachment.dto";
import { PaymentDetailDto } from "./payment-detail.dto";

export interface PaymentDto {
    paymentNumber: number;
    reference: string;
    clientId: number;
    paymentTypeId: number;
    gloss: string;
    description: string;
    paymentDate: Date;
    attachments: AttachmentDto[];
    paymentDetail: PaymentDetailDto;
}