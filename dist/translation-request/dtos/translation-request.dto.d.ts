import { PaymentDto } from "src/payment/dtos/payment.dto";
export declare class TranslationRequestDto {
    id: number;
    title: string;
    authorName: string;
    additionalComment?: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    payment: PaymentDto;
}
